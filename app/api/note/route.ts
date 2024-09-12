import { connectDB } from "@/utils/db"
import Note from "@/utils/model/Note"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"


export async function GET(params:NextRequest) {
    const aa = params.nextUrl.searchParams
    const conn = await connectDB()
    if(!conn) return Response.json({ok: false})
    const result = await Note.find({})
    const data = {
        ok: true,
        res: result
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
