import NoteList from '@/components/Note/NoteList';
import { Welcome } from '../components/Welcome/Welcome';
import { NoteModel } from '@/utils/model/Note';
import { getNoteList } from '@/utils/action/note.action';

export default async function HomePage() {
  const initalNotes: NoteModel[] = await getNoteList()
  return (
    <>
      <Welcome />
      {/* <ColorSchemeToggle /> */}
      <NoteList notes={initalNotes}/>
    </>
  );
}
