import NoteList from '@/components/Note/NoteList'
import { getNoteList } from '@/utils/action/note.action'
import { NoteModel } from '@/utils/model/Note'
import { Button, Container } from '@mantine/core'
import React from 'react'

export default async function Page() {
  const initalNotes: NoteModel[] = await getNoteList()
  return (
    <Container>
        <NoteList notes={initalNotes} more/>
    </Container>
  )
}
