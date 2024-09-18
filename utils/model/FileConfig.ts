// import { models, model, Schema } from "mongoose";

export type FileDisplay  = 'center' | 'start' | 'end' | 'inline'

export const FILE_DISPLAY_TYPES = [
    {
        label: '居中',
        value: 'center'
    },
    {
        label: '靠左',
        value: 'start'
    },
    {
        label: '靠右',
        value: 'end'
    },
    {
        label: '一行',
        value: 'inline'
    },
]

export interface FileConfigModel {
    _id?: string,
    author: string,
    title?: string,
    content: string,
    ctime?: Date,
    utime?: Date,
    type: string,
    view?: number,
    heart?: number,
    tags?: string,
    display?: string
}

// const FileConfigSchema = new Schema<FileConfigModel>({
//     author: String,
//     title: String,
//     content: String,
//     ctime: {type: Date, default: Date.now},
//     utime: {type: Date, default: Date.now},
//     type: String,
//     view: Number,
//     heart: Number,
//     tags: String
// })

// const FileConfig = models.FileConfig ||  model('FileConfig', FileConfigSchema)

// export default FileConfig