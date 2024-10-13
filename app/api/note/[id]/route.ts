import { connectDB } from "@/utils/db"
import FileConfig from "@/utils/model/FileConfig"
import Note, { NoteModel } from "@/utils/model/Note"
import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"


export async function GET(req: Request, {params}: {params: {id: string}}) {
    const id = params.id
    try {
        await connectDB()
        const result = await Note.findOne({_id: id})
        const data = {
            ok: true,
            res: result
        }
        return Response.json(data)
        
    } catch (error) {
        return Response.json({ok: false})
    }
    
}

export async function PUT(req: Request, {params}: {params: {id: string}}) {
    try {
        const id = params.id
        const data: any = await req.formData()
        const {content, title, tags, type, medias} = data
        const utime = new Date()
        const state: any = {}
        state['utime'] = utime
        content && (state.content = content)
        title && (state.title = title)
        tags && (state.tags = tags)
        type !== undefined && (state.type = type)
        medias && (state.medias=medias)
        if(id){
            const conn = await connectDB()
            if(!conn) return Response.json({ok: false})
            const result = await Note.findByIdAndUpdate(id, state)
            revalidateTag('note')
            return NextResponse.json({ ok: true, res: result})
        }

        return NextResponse.json({ ok: false})
    } catch (error) {
        return NextResponse.json({ ok: false})
    }

}

export async function DELETE(req: Request, {params}: {params: {id: string}}) {
    try {
        const id = params.id
        if(id){
            const conn = await connectDB()
            if(!conn) return Response.json({ok: false})
            const note = await Note.findById(id)
            if(note){
                // check medias and delete them
                const medias = note.medias
                for (let index = 0; index < medias.length; index++) {
                    const m = medias[index];
                    await FileConfig.findByIdAndDelete(m)
                }
                // medias && medias.map(async(m:string) => (await FileConfig.findByIdAndDelete(m)))
                await Note.findByIdAndDelete(id)
                revalidateTag('note')
            }
            
            return NextResponse.json({ ok: true, res: id})
        }

        return NextResponse.json({ ok: false})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ ok: false})
    }

}

