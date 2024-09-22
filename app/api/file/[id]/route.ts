import { connectDB } from "@/utils/db"
import FileConfig from "@/utils/model/FileConfig"
import { revalidateTag } from "next/cache"


export async function GET(req: Request, {params}: {params: {id: string}}) {
    const id = params.id
    if(!id) return Response.json({ok: false})
    try {
        await connectDB()
        const result = await FileConfig.findOne({_id: id})
        const data = {
            ok: true,
            res: result
        }
        return Response.json(data)
        
    } catch (error) {
        return Response.json({ok: false})
    }
    
}

