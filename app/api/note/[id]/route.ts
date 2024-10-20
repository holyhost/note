import { getDomain } from "@/utils/base"
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
        const data: any = await req.json()
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
            const n = await Note.findById(id)
            if(n){
                const ms:string[] = n.medias
                if(ms && ms.length > 0){
                    // check removed medias
                    const removedIds = ms.filter(m => !medias.includes(m))
                    for (let index = 0; index < removedIds.length; index++) {
                        const id = removedIds[index];
                        await fetch(getDomain() + '/api/file', {
                            method: 'DELETE',
                            body: JSON.stringify({_id: id})
                        })
                    }
                }
                const result = await Note.findByIdAndUpdate(id, state)
                revalidateTag('note')
                return NextResponse.json({ ok: true, res: result})
            }else{
                return Response.json({ok: false})
            }
            
        }

        return NextResponse.json({ ok: false})
    } catch (error) {
        console.log(error)
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
                    await fetch(getDomain() + '/api/file', {
                        method: 'DELETE',
                        body: JSON.stringify({_id: m})
                    })
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

