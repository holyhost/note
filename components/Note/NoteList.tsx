import { Container } from '@mantine/core'
import React from 'react'

export const revalidate = 20

const NoteList = async () => {
    const data = await fetch('http://localhost:3000/api/note?count=1&query=qwe')
    const j = await data.json()
    const notes = j.res
  return (
        <Container>
            {notes && notes.length}
            {notes && notes.map((item: any) => 
                (
                    <div key={item.id}>
                        {item.title}
                    </div>
                )
            )}
        </Container>
  )
}

export default NoteList
