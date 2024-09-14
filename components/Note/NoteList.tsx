import { Container, Text } from '@mantine/core'
import React from 'react'
import NoteItem from './NoteItem'
import { getDomain } from '@/utils/base'

// export const revalidate = 20

const NoteList = async () => {
    const url = getDomain()
    const data = await fetch(url + '/api/note', {next: {tags: ['note']}})
    const j = await data.json()
    let notes = []
    if(j.ok){
        notes = j.res
    }
  return (
        <Container>
            {notes.length && notes.map((item: any, index: number) => (<NoteItem key={item._id} data={item}/>))}
        </Container>
  )
}

export default NoteList
