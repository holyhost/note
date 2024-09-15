"use client"
import { NOTE_TAGS, NOTE_TYPES } from '@/utils/base'
import { Button, Container, Group, MultiSelect, Select, TagsInput, Textarea, TextInput } from '@mantine/core'
import React, { useState } from 'react'

const AddNote = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [uploading, setUploading] = useState(false)
    const [noteType, setNoteType] = useState(NOTE_TYPES[0].label)
    const noteTypes = NOTE_TYPES.map(item => item.label)

    const submit = async () => {
        if(!title && !content) {
            console.log('not input any data')
            return
        }
        setUploading(true)
        const res = await fetch("/api/note", {
            method: 'POST',
            body: JSON.stringify({title, content, tags: tags.join(','), type: NOTE_TYPES.find(item => item.label === noteType)?.value || 1})
        })
        const json = await res.json()
        if(json.ok){
            setTitle('')
            setContent('')
        }
        setUploading(false)
    }
  return (
    <Container mt={'md'}>
        <TextInput
            label='笔记标题'
            value={title} 
            disabled={uploading}
            onChange={e => setTitle(e.target.value)}/>
        <Group mt={'md'}>
            <TagsInput
                w={'14rem'}
                label="标签"
                description="笔记标签，可以输入多个,回车确认"
                placeholder="请输入标签"
                onChange={(value) => setTags([...value])}
                value={tags}
                data={[...NOTE_TAGS]}
            />
           <Select
                w={'9rem'}
                label="笔记类型"
                allowDeselect={false}
                description="默认公开，所有人可见"
                placeholder="选择笔记类型"
                value={noteType}
                onChange={(value)=> setNoteType(value || '')}
                data={noteTypes}
            />
        </Group>
        <Textarea
            mt={'1rem'}
            autosize
            label={"笔记内容"}
            value={content}
            minRows={6}
            disabled={uploading}
            onChange={e => setContent(e.target.value)}
        />
        <Group justify="end">
           <Button loading={uploading} mt={'1rem'} onClick={submit} bg={'teal'}>Save</Button> 
        </Group>
        
    </Container>
  )
}

export default AddNote
