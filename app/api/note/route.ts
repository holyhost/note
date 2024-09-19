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
    const result = await Note.find({type: {$gte: 1}}).sort({utime: -1}).limit(count).skip((page-1) * count)
    const data = {
        ok: true,
        res: result.map(item => ({...item._doc, content: item._doc.content.slice(0, 399)}))
    }
    return Response.json(data)
}

export async function POST(params:Request) {
    const body = await params.json()
    await connectDB()
    const bean = new Note()
    bean.content = body.content
    bean.title = body.title
    bean.tags = body.tags || ''
    bean.type = body.type || 1
    const medias = body.medias || []
    console.log(medias)
    medias.length && (bean.medias = medias)
    // const bean = await Note.create(
    //     {
    //         content: body.content,
    //         title: body.title,
    //         tags: body.tags || '',
    //         type: body.type || 1,
    //         author: 'administrator'
    //     }
    // )
    const result = await bean.save()
    revalidateTag('note')
    const data = {
        ok: true,
        data: result.title
    }
    
    return Response.json(data)

}
