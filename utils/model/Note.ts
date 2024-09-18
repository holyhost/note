import { models, model, Schema } from "mongoose";
import { FileConfigModel } from "./FileConfig";


export interface NoteModel {
    _id?: string,
    author: string,
    title: string,
    content: string,
    ctime?: Date,
    utime?: Date,
    type: number,
    view?: number,
    tags?: string,
    medias?: FileConfigModel[]
}

const NoteSchema = new Schema<NoteModel>({
    author: String,
    title: String,
    content: String,
    ctime: {type: Date, default: Date.now},
    utime: {type: Date, default: Date.now},
    type: {type: Number, default: 1},
    view: Number,
    tags: String,
    medias: [{
        author: String,
        title: String,
        content: String,
        ctime: {type: Date, default: Date.now},
        utime: {type: Date, default: Date.now},
        type: String,
        view: Number,
        heart: Number,
        tags: String,
        display: String
    }]
})

const Note = models.Note ||  model('Note', NoteSchema)

export default Note