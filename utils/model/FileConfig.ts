import { models, model, Schema } from "mongoose";

export type FileDisplay  = 'center' | 'start' | 'end' | 'inline'


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
    size?: number,
    tags?: string,
    display?: string
}

const FileConfigSchema = new Schema<FileConfigModel>({
    author: String,
    title: String,
    content: String,
    ctime: {type: Date, default: Date.now},
    utime: {type: Date, default: Date.now},
    type: String,
    view: Number,
    size: Number,
    heart: Number,
    tags: String,
    display: String
}, {autoCreate: true})

const FileConfig = models.FileConfig ||  model('FileConfig', FileConfigSchema)

export default FileConfig