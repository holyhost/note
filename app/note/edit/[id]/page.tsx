import AddNote from "@/components/Note/AddNote";
import { getMediaDetails } from "@/utils/action/file.action";
import { getNoteDetail } from "@/utils/action/note.action";
import { NOTE_TYPES } from "@/utils/base";
import { FileConfigModel } from "@/utils/model/FileConfig";
import { Container } from "@mantine/core";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: '编辑笔记',
    description: '更新笔记，保存笔记',
  }


  
export default async function EditNotePage({params}: {params: {id: string}}) {
    const note = await getNoteDetail(params.id)
    const medias: string[] | null = (note?.medias) as never as string[] || null
    const tags = note?.tags?.split(',') || []
    const ntype = NOTE_TYPES.find(n => n.value === note?.type)?.label || NOTE_TYPES[0].label
    let fileList:FileConfigModel[] = []
    if(medias){
        fileList = await getMediaDetails(medias)

    }
    return (
        <Container>
            <AddNote id={note?._id} title={note?.title} content={note?.content} tags={tags} noteType={ntype} medias={fileList}/>
        </Container>
    )

}