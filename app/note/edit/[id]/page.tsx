import AddNote from "@/components/Note/AddNote";
import { Container } from "@mantine/core";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: '编辑笔记',
    description: '更新笔记，保存笔记',
  }

export default function EditNotePage() {

    return (
        <Container>
            <AddNote/>
        </Container>
    )

}