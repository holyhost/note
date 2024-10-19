"use client"
import { Box, Center, Container, Loader, LoadingOverlay, Text, useMantineColorScheme } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import NoteItem from './NoteItem'
import { NoteModel } from '@/utils/model/Note'
import { useInView } from 'react-intersection-observer'
import { deleteNote, getNoteList } from '@/utils/action/note.action'
import { useDisclosure } from '@mantine/hooks'

// export const revalidate = 20

type Props = {
    notes: NoteModel[],
    more?: boolean
}

const PAGE_COUNT = 6

const NoteList = ({ notes, more = false }: Props) => {
    const [data, setData] = useState([...notes])
    const [end, setEnd] = useState(false)
    const [selectedId, setSelectedId] = useState('')
    const [loading, setLoading] = useState(false)
    const [page, sestPage] = useState(2)
    const [refView, inView] = useInView({ threshold: 0 })
    const [visible, { toggle }] = useDisclosure(false);
    const {colorScheme} = useMantineColorScheme()

    const loadMoreNotes = async ()=> {
        setLoading(true)
        const apiNotes = await getNoteList(page)
        if(!apiNotes || apiNotes.length < PAGE_COUNT){
            setEnd(true)
        }
        sestPage(page + 1)
        setData([...data, ...apiNotes])
        setLoading(false)
    }
    useEffect(()=> {
        if(inView && !loading){
            loadMoreNotes()
        }
    }, [inView])

    const onNoteDelete = async(id: string)=> {
        setSelectedId(id)
        toggle()
        const result = await deleteNote(id)
        if(result){
            setSelectedId('')
            setData([...data.filter(item => item._id !== id)])
        }
        toggle()
    }
    return (
        <Container>
            {data.length && data.map((item: any, index: number) => (<Box key={item._id} pos='relative'>
                <LoadingOverlay visible={visible && selectedId === item._id} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <NoteItem key={'item_' + item._id} data={item} theme={colorScheme} onDelete={onNoteDelete}/>
            </Box>))}
            {more && notes.length && !end && <Center mt={'md'} mb={'xl'}>
                <Text ref={refView}>{''}</Text>
                {inView && <Loader color='teal' />}
            </Center>}
            {end && <Center mt={'md'} mb={'md'}>
                    <Text c={'gray'} size='sm'>-------已经滑到底啦-------</Text>
                </Center>
            }
        </Container>
    )
}

export default NoteList
