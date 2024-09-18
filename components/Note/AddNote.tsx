"use client"
import { NOTE_TAGS, NOTE_TYPES } from '@/utils/base'
import { Button, Chip, Container, FileButton, Group, MultiSelect, Pill, Select, TagsInput, Text, Textarea, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import NoteEditor from './NoteEditor/NoteEditor'
import NotePreview from './NotePreview/NotePreview'
import { IconImageInPicture } from '@tabler/icons-react'
import { FILE_DISPLAY_TYPES, FileConfigModel } from '@/utils/model/FileConfig'
import { nanoid } from 'nanoid'

const AddNote = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [lastCursorIndex, setLastCursorIndex] = useState(0)
    const [tags, setTags] = useState<string[]>([])
    const [medias, setMedias] = useState<FileConfigModel[]>([])
    const [uploading, setUploading] = useState(false)
    const [noteType, setNoteType] = useState(NOTE_TYPES[0].label)
    const noteTypes = NOTE_TYPES.map(item => item.label)
    const chooseFile = (file: File | null) => {
        console.log(file)
        file2Base64(file)
    }
    const onPaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const items = event.clipboardData?.items
        const area = event.target as HTMLTextAreaElement
        const curPosition = area.selectionStart
        console.log(curPosition)
        if (items) {
            Array.from(items).map(item => {
                // img
                if (item.type.includes('image')) {
                    const file = item.getAsFile()
                    file2Base64(file, area)

                } else {
                    console.log(item.type, item)
                }
            })
        }
    }
    const file2Base64 = (file: File | null, area: HTMLTextAreaElement|null = null)=> {
        if (file) {
            let curPosition = lastCursorIndex
            area && (curPosition = area.selectionStart)
            console.log(curPosition)
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64 = reader.result + ''
                const mid = nanoid()
                const imgItem: FileConfigModel = {
                    _id: mid,
                    author: 'administrator',
                    title: '插入了一个图片',
                    content: base64,
                    type: 'base64',
                    display: 'start'
                }
                
                const imgstr = `![${imgItem.title}](base64--${mid})`
                if (content) {
                    const stt = content?.slice(0, curPosition)
                    const end = content?.slice(curPosition, content.length)
                    
                    // newContent = stt + imgstr + end
                    setContent(stt + imgstr + end)
                    area && setTimeout(() => {
                        area.setSelectionRange((stt + imgstr).length, (stt + imgstr).length)
                    }, 1000);

                }else {
                    setContent(imgstr)
                }
                setMedias([...medias, imgItem])


            }
            reader.readAsDataURL(file)
        }
    }
    const submit = async () => {
        if(!title && !content) {
            console.log('not input any data')
            return
        }
        setUploading(true)
        try {
            const res = await fetch("/api/note", {
                method: 'POST',
                body: JSON.stringify({
                    title, content, 
                    tags: tags.join(','), 
                    type: NOTE_TYPES.find(item => item.label === noteType)?.value || 1,
                    medias: medias
                })
            })
            const json = await res.json()
            if(json.ok){
                setTitle('')
                setContent('')
            }
        } catch (error) {
            console.log(error)
        }finally{
            setUploading(false)
        }
        
    }
  return (
    <Container mt={'md'}>
        <TextInput
            label='笔记标题'
            value={title} 
            disabled={uploading}
            onChange={e => setTitle(e.target.value)}/>
        <Group mt={'md'} align='start'>
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
            mb={10}
            autosize
            label={"笔记内容"}
            value={content}
            minRows={6}
            disabled={uploading}
            onBlur={(e) => setLastCursorIndex(e.target.selectionStart)}
            onPaste={(e) => onPaste(e)}
            onChange={e => setContent(e.target.value)}
        />
        <Group justify="end" mt={6}>
            <FileButton onChange={chooseFile} accept='image/gif,image/jpeg,image/jpg,image/png,image/svg'>
                {(props) => <Pill c={'white'} bg={'teal'} {...props}>{<IconImageInPicture size={11} />}添加图片</Pill>}
            </FileButton>
            {/* <Chip>独占一行</Chip>
            <Chip>位置</Chip>
            <Chip>宽度</Chip> */}
        </Group>
        {medias.length > 0 && <Group>
            {medias.map((m, mindex) => (<div key={'media-tool-' + mindex}>
                <div style={{border: '2px solid gray', borderRadius: '2px'}} onClick={()=> setSelectedIndex(mindex)} onBlur={()=> setSelectedIndex(-1)}>
                    <img src={m.content} style={{ width: '6rem' }} alt={m.title || 'this is a image'} />
                    <Text mt={2} size='12px' mb={4} ta={'center'} c={'gray'}>{m.title}</Text>
                </div>
                
                {selectedIndex === mindex && <Group justify="end" mt={6}>
                            <Select
                                label="位置"
                                allowDeselect={false}
                                value={m.display}
                                onChange={(v) => {
                                    m.display = v || ''
                                    setMedias([...medias])
                                }}
                                data={FILE_DISPLAY_TYPES}
                                />
                        </Group>}
            </div>))}
            
        </Group>}
        
        <Group justify="end">
           <Button loading={uploading} mt={'1rem'} onClick={submit} bg={'teal'}>Save</Button> 
        </Group>
        <NoteEditor/>
        <NotePreview data={content}/>
        
    </Container>
  )
}

export default AddNote
