"use client"
import { FILE_DISPLAY_TYPES, getDomain, getFileDomain, NOTE_TAGS, NOTE_TYPES } from '@/utils/base'
import { Button, Chip, Container, FileButton, Group, Input, MultiSelect, Pill, Radio, Select, TagsInput, Text, Textarea, TextInput, Tooltip } from '@mantine/core'
import React, { useState } from 'react'
import NotePreview from './NotePreview/NotePreview'
import { IconImageInPicture, IconRefresh, IconTrashX } from '@tabler/icons-react'
import { FileConfigModel } from '@/utils/model/FileConfig'
import { nanoid } from 'nanoid'
import { updateFileAction, uploadFileAction } from '@/utils/action/file.action'

const AddNote = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [lastCursorIndex, setLastCursorIndex] = useState(0)
    const [tags, setTags] = useState<string[]>([])
    const [medias, setMedias] = useState<FileConfigModel[]>([])
    const [uploading, setUploading] = useState(false)
    const [editMediaTitle, setEditMediaTitle] = useState(false)
    const [noteType, setNoteType] = useState(NOTE_TYPES[0].label)
    const filePathFolder = getFileDomain()
    const noteTypes = NOTE_TYPES.map(item => item.label)
    const chooseFile = async(file: File | null) => {
        if(file){
            //upload file
            await uploadFileAndUpdateEditor(file, null)
            // file2Base64(file, null, res?._id)
        }
        
    }
    const onMediaDelete = async (index: number) => {
        const media = {...medias[index]}
        const mid = media._id
        const res = medias.filter((item, i) =>  i !== index)
        setMedias([...res])
        // update content, remove md image text.
        const pattern = /!\[(.*?)\]\((.*?)\)/mg
        let matcher
        while((matcher= pattern.exec(content)) !== null) {
            if(mid && matcher[2].includes(mid)){
                // remove markdown text
                const con = content.replaceAll(matcher[0], '')
                setContent(con)
                // remove db item
                await fetch('/api/file', {
                    method: 'DELETE',
                    body: JSON.stringify({_id: mid})
                })
            }
            
        }

    }
    const updateMediaInfo = async(index: number) => {
        const media = {...medias[index]}
        const mid = media.content
        // const aimStr = `![${media.title}](${filePathFolder}/${media.content})`
        const aimStr = `![${media.title}](${media.content})`
        await updateFileAction(media?._id || '', media.title, media.display)
        const pattern = /!\[(.*?)\]\((.*?)\)/mg
        let matcher
        while((matcher= pattern.exec(content)) !== null) {
            if(mid && matcher[0].includes(mid)){
                // update markdown text
                const con = content.replaceAll(matcher[0], aimStr)
                setContent(con)
            }
            
        }
    }
    const onPaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const items = event.clipboardData?.items
        const area = event.target as HTMLTextAreaElement
        const curPosition = area.selectionStart
        if (items) {
            Array.from(items).map(async item => {
                // img
                if (item.type.includes('image')) {
                    const file = item.getAsFile()
                    if(file){
                        await uploadFileAndUpdateEditor(file, area)
                        // if not login ,use local base64
                        // file2Base64(file, area,res?._id )
                    }
                    

                } else {
                    console.log(item.type, item)
                }
            })
        }
    }

    const uploadFileAndUpdateEditor = async (file: File,area: HTMLTextAreaElement|null = null)=> {
        const res = await uploadFileAction(file)
        const mid = res?._id
        let curPosition = lastCursorIndex
        area && (curPosition = area.selectionStart)
        let id = mid || nanoid()
        const imgItem: FileConfigModel = {
            _id: id,
            author: 'administrator',
            title: '插入了一个图片',
            content: res?.fileName || '',
            type: file.type,
            display: 'start'
        }
        
        const imgstr = `![${imgItem.title}](${imgItem.content})`
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
    const file2Base64 = (file: File | null, area: HTMLTextAreaElement|null = null, mid='')=> {
        if (file) {
            let curPosition = lastCursorIndex
            area && (curPosition = area.selectionStart)
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64 = reader.result + ''
                let id = mid || nanoid()
                const imgItem: FileConfigModel = {
                    _id: id,
                    author: 'administrator',
                    title: '插入了一个图片',
                    content: base64,
                    type: 'base64',
                    display: 'start'
                }
                
                const imgstr = `![${imgItem.title}](base64Temp--${mid})`
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
                    medias: medias.map(m => m._id)
                })
            })
            const json = await res.json()
            if(json.ok){
                setTitle('')
                setContent('')
            }
            medias.length && medias.map(async m => {
                const res = await updateFileAction(m._id || '', m.title, m.display, 'note')
                if(res) return 1
                return 0
            })
            setMedias([])
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
            {medias.map((m, mindex) => (<div key={'media-tool-' + mindex} 
                    onMouseEnter={()=> setSelectedIndex(mindex)}
                    onMouseLeave={()=> setSelectedIndex(-1)}>
                <div
                    style={{border: '2px solid gray', borderRadius: '2px'}}
                    onClick={()=> setSelectedIndex(mindex)}
                   >
                    <img src={filePathFolder + '/' + m.content} style={{ width: '6rem' }} alt={m.title || 'this is a image'} />
                    <Group mt={2} mb={4}>
                        {editMediaTitle && (selectedIndex === mindex)? <Input onBlur={()=> {
                            setMedias([...medias])
                            setEditMediaTitle(false)}} value={m.title} onChange={(e)=> {
                            m.title = e.target.value
                            setMedias([...medias])
                        }}/> : 
                            <Text 
                                size='12px'  
                                ta={'center'} 
                                c={'gray'}
                                onClick={()=> setEditMediaTitle(true)} >
                                    {m.title}
                            </Text>}
                        
                        
                    </Group>
                    
                </div>
                
                {selectedIndex === mindex && <Group justify="end" mt={6}>

                            <Radio.Group size='sm' value={m.display} onChange={(v)=> {
                                    m.display = v || ''
                                    setMedias([...medias])
                                }}>
                                <Group>
                                    {FILE_DISPLAY_TYPES.map(item => <Radio key={item.value} label={item.label} value={item.value}/>)}
                                </Group>
                                
                            </Radio.Group>
                            <Tooltip label="删除图片及所有引用">
                                <IconTrashX color='teal' size={'16px'} onClick={()=> onMediaDelete(mindex)}/>
                            </Tooltip>
                            <Tooltip label="同步编辑器中信息">
                                <IconRefresh color='teal' size={'16px'} onClick={() => updateMediaInfo(mindex)}/>
                            </Tooltip>
                            {/* <Select
                                label="位置"
                                allowDeselect={false}
                                value={m.display}
                                onChange={(v) => {
                                    m.display = v || ''
                                    setMedias([...medias])
                                }}
                                data={FILE_DISPLAY_TYPES}
                                /> */}
                        </Group>}
            </div>))}
            
        </Group>}
        
        <Group justify="end">
           <Button loading={uploading} mt={'1rem'} onClick={submit} bg={'teal'}>Save</Button> 
        </Group>
        {/* <NotePreview data={content}/> */}
        
    </Container>
  )
}

export default AddNote
