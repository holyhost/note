import AddNote from '@/components/Note/AddNote';
import NoteList from '@/components/Note/NoteList';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import connectDB from '@/utils/db';

export default function HomePage() {
  connectDB()
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      {/* <NoteList/>
      <AddNote/> */}
    </>
  );
}
