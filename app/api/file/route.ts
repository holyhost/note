import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { connectDB } from '@/utils/db'
import FileConfig from '@/utils/model/FileConfig'
import { existsSync, mkdirSync, stat, unlinkSync } from 'fs'



export async function GET(request: NextRequest) {
    const conn = await connectDB()
    if(!conn) return Response.json({ok: false})
    const result = await FileConfig.find({})
    const data = {
        ok: true,
        res: result.map(item => ({...item._doc}))
    }
    return Response.json(data)
}

export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    const title = data.get('title') || ''
    const display = data.get('display') || 'start'
    const tags = data.get('tags') || ''
    if (!file || !file.name) {
        return NextResponse.json({ ok: false })
    }
    const splits = file.name.split('.')
    if(splits.length < 2){
        return NextResponse.json({ ok: false })
    }
    await connectDB()

    const fileName = randomUUID() + "." + splits[splits.length -1]
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const parentPath = process.env.FILE_UPLOAD_FOLDER || 'files'
    const cwd = process.cwd()
    const uploadFolder = `${cwd}/public/${parentPath}`
    // create files folder if not exist
    if(!existsSync(uploadFolder)) {
        mkdirSync(uploadFolder)
    }
    const path = uploadFolder + `/${fileName}`
    console.log('filepath:', path)
    await writeFile(path, buffer)
    console.log(`open ${fileName} to see the uploaded file`)
    const bean = new FileConfig()
    bean.title = title
    bean.content = fileName
    bean.author = 'administrator'
    bean.type = file.type
    bean.size = file.size
    bean.tags = tags
    bean.display = display
    const result = await bean.save()

    return NextResponse.json({ ok: true, res: {_id: result._id, fileName} })

}


export async function PUT(request: NextRequest) {
    const data = await request.formData()
    const fid = data.get('_id') || ''
    const display = data.get('display') || ''
    const tags = data.get('tags') || ''
    // todo need get origin view first and do adding
    const view = (data.get('view') || 0) as number
     // todo need get origin view first and do adding
    const heart = (data.get('heart') || 0) as number
    const title = data.get('title') || ''
    const utime = new Date()
    const state: any = {}
    state['utime'] = utime
    display && (state['display'] = display)
    tags && (state['tags'] = tags)
    view && (state['view'] = view)
    heart && (state['heart'] = heart)
    title && (state['title'] = title)
    
    try {
        if(fid){
            const conn = await connectDB()
            if(!conn) return Response.json({ok: false})
            const result = FileConfig.findByIdAndUpdate(fid,state)
            console.log(result)
            return NextResponse.json({ ok: true, res: result})
        }

        return NextResponse.json({ ok: false})
    } catch (error) {
        return NextResponse.json({ ok: false})
    }

}


export async function DELETE(request: NextRequest) {
    const data = await request.json()
    const fid = data._id || ''
    console.log(fid)
    try {
        if(fid){
            const conn = await connectDB()
            if(!conn) return Response.json({ok: false})
            const result = await FileConfig.findById(fid)
            console.log(result)
            if(result){
                const fileName = result.content
                await FileConfig.findByIdAndDelete(fid)
                const filepath = process.cwd() + '/public/' + (process.env.FILE_UPLOAD_FOLDER || 'files') + "/" + fileName
                if(existsSync(filepath)) {
                    console.log(filepath)
                    unlinkSync(filepath)
                }
            }
            
            return NextResponse.json({ ok: true, res: result})
        }

        return NextResponse.json({ ok: false})
    } catch (error) {
        return NextResponse.json({ ok: false})
    }

}