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
export const updateFileAction = async (title = '', display = '', tags = '', view =0, heart=0) => {

    const form = new FormData()
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