import AddNote from '@/components/Note/AddNote';
import NoteList from '@/components/Note/NoteList';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      <Welcome />
      {/* <ColorSchemeToggle /> */}
      <NoteList/>
    </>
  );
}
