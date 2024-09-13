import { Blockquote, Container, Text } from '@mantine/core'
import next from 'next'
import React from 'react'
import NoteItem from './NoteItem'

export const revalidate = 20

const NoteList = async () => {
    const data = await fetch('http://localhost:3000/api/note?count=3&page=2', {next: {tags: ['note']}})
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
