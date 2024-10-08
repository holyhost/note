"use client"
import { Center, Container, Loader, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import NoteItem from './NoteItem'
import { getDomain } from '@/utils/base'
import { NoteModel } from '@/utils/model/Note'
import { useInView } from 'react-intersection-observer'
import { getNoteList } from '@/utils/action/note.action'

// export const revalidate = 20

type Props = {
    notes: NoteModel[],
    more?: boolean
}

const PAGE_COUNT = 6

const NoteList = ({ notes, more = false }: Props) => {
    const [data, setData] = useState([...notes])
    const [end, setEnd] = useState(false)
    const [loading, setLoading] = useState(false)
    const [page, sestPage] = useState(2)
    const [refView, inView] = useInView({ threshold: 0 })

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
    return (
        <Container>
            {data.length && data.map((item: any, index: number) => (<NoteItem key={item._id} data={item} />))}
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
