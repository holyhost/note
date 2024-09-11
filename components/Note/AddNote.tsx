"use client"
import { Button, Container, Group, Textarea, TextInput } from '@mantine/core'
import React, { useState } from 'react'

const AddNote = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [uploading, setUploading] = useState(false)

    const submit = async () => {
        if(!title && !content) {
            console.log('not input any data')
            return
        }
        setUploading(true)
        console.log(11111111)
        const res = await fetch("/api/note", {
            method: 'POST',
            body: JSON.stringify({title, content})
        })
        const json = await res.json()
        console.log(json)
        if(json.ok){
            setTitle('')
            setContent('')
        }
        setUploading(false)
    }
  return (
    <Container>
        <TextInput
            label='Note title'
            value={title} 
            disabled={uploading}
            onChange={e => setTitle(e.target.value)}/>
        <Textarea
            mt={'1rem'}
            autosize
            label={"Note content"}
            value={content}
            minRows={6}
            disabled={uploading}
            onChange={e => setContent(e.target.value)}
        />
        <Group justify="end">
           <Button loading={uploading} mt={'1rem'} onClick={submit}>Save</Button> 
        </Group>
        
    </Container>
  )
}

export default AddNote
