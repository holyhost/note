import { Container } from '@mantine/core'
import next from 'next'
import React from 'react'

export const revalidate = 20

const NoteList = async () => {
    const data = await fetch('http://localhost:3000/api/note?count=1&query=qwe', {next: {tags: ['note']}})
    const j = await data.json()
    let notes = []
    if(j.ok){
        notes = j.res
    }
  return (
        <Container>
            {notes.length && notes.map((item: any, index: number) => 
                (
                    <div key={item._id + index + ''}>
                        {item.title}
                    </div>
                )
            )}
        </Container>
  )
}

export default NoteList
