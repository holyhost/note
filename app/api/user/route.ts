import { connectDB } from "@/utils/db"
import Note, { NoteModel } from "@/utils/model/Note"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"


export async function GET(params:NextRequest) {
    const sp = params.nextUrl.searchParams
    const page = (sp.get('page') || 1) as number
    const count = (sp.get('count')  || 6) as number
    const conn = await connectDB()
    if(!conn) return Response.json({ok: false})
    const result = await Note.find({type: {$gte: 1}}).sort({utime: -1}).limit(count).skip(page * count)
    const data = {
        ok: true,
        res: result.map(item => ({...item._doc, content: item._doc.content.slice(0, 399)}))
    }
    return Response.json(data)
}

export async function POST(params:Request) {
    const body = await params.json()
    await connectDB()
    const bean = await Note.create(
        {
            content: body.content,
            title: body.title,
            author: 'administrator'
        }
    )
    // const id = await bean.save()
    revalidateTag('note')
    const data = {
        ok: true,
        data: bean
    }
    
    return Response.json(data)

}
