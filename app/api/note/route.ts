import { appDB } from "@/utils/db"
import Note from "@/utils/model/Note"
import { NextRequest } from "next/server"


export async function GET(params:NextRequest) {
    const aa = params.nextUrl.searchParams
    console.log(aa)
    await appDB()
    const result = await Note.find({})
    const data = {
        ok: true,
        res: result
    }
    return Response.json(data)
}

export async function POST(params:Request) {
    const body = await params.json()
    console.log(123, body)
    await appDB()
    const bean = new Note()
    bean.content = body.content
    bean.title = body.title
    bean.author = 'administrator'
    const id = await bean.save()
    const data = {
        ok: true,
        data: id
    }
    
    return Response.json(data)

}
