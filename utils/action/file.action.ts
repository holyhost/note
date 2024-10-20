import { getDomain } from "../base"
import { FileConfigModel } from "../model/FileConfig"
import { ResType } from "../model/global"

export const uploadFileAction = async (file: File, title = '', display = '', tags = '') => {

    const form = new FormData()
    form.set('file', file)
    form.set('title', title)
    form.set('display', display)
    form.set('tags', tags)
    try {
        const res = await fetch('/api/file', {
            method: 'POST',
            body: form
        })
        const jsonData: ResType<{ _id: string, fileName: string }> = await res.json()
        if (res.ok) {
            return jsonData.res
        }
        return null

    } catch (error) {
        console.log(error)
        return null
    }
}
export const updateFileAction = async (id: string | null, title = '', display = '', tags = '', view =0, heart=0) => {
    if(!id) return null
    const form = new FormData()
    form.set('_id', id)
    title && form.set('title', title)
    display && form.set('display', display)
    tags && form.set('tags', tags)
    view && form.set('view', view + '')
    heart && form.set('heart', heart + '')
    try {
        const res = await fetch('/api/file', {
            method: 'PUT',
            body: form
        })
        const jsonData: ResType<FileConfigModel> = await res.json()
        if (res.ok) {
            return jsonData.res
        }
        return null

    } catch (error) {
        console.log(error)
        return null
    }
}

export const getFileListAction = async()=>{
    const res = await fetch(getDomain() + '/api/file')
    const jsonData = await res.json()
    if(jsonData.ok){
        return jsonData.res
    }
    return []
}


export async function getMediaDetails(ids:string[]) {
    const fileConfigs: FileConfigModel[] = []
    const domain = getDomain()
    if(ids && ids.length){
        for (let index = 0; index < ids.length; index++) {
            const id = ids[index];
            const res = await fetch(domain + "/api/file/"+id)
            const data: ResType<FileConfigModel> = await res.json()
            fileConfigs.push(data.res)
            
        }
    }
    return fileConfigs
}