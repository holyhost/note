import { connectDB } from "@/utils/db"
import Note, { NoteModel } from "@/utils/model/Note"
import { revalidateTag } from "next/cache"


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

