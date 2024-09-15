import AddNote from "@/components/Note/AddNote";
import { Container } from "@mantine/core";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: '新增笔记',
    description: '创建笔记，保存笔记',
  }

export default function AddNotePage() {

    return (
        <Container>
            <AddNote/>
        </Container>
    )

}