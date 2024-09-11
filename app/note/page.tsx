import NoteList from '@/components/Note/NoteList'
import { Button, Container } from '@mantine/core'
import React from 'react'

export default function Page() {
  return (
    <Container>
        <NoteList/>
        <Button component='a' href='/note/add'>
            Add new note
        </Button>
    </Container>
  )
}
