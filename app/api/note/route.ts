import { appDB } from "@/utils/db"
import Note from "@/utils/model/Note"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"


export async function GET(params:NextRequest) {
    const aa = params.nextUrl.searchParams
    console.log(aa)
    const conn = await appDB()
    if(!conn) return Response.json({ok: false})
    const result = await Note.find({})
    const data = {
        ok: true,
        res: result
    }
    console.log(124555)
    return Response.json(data)
}

export async function POST(params:Request) {
    const body = await params.json()
    console.log(123, body)
    await appDB()
    console.log(124)
    const bean = await Note.create(
        {
            content: body.content,
            title: body.title,
            author: 'administrator'
        }
    )
    console.log(125)
    // const id = await bean.save()
    revalidateTag('note')
    const data = {
        ok: true,
        data: 123
    }
    
    return Response.json(data)

}
