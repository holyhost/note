import { models, model, Schema } from "mongoose";


export interface NoteModel {
    _id?: string,
    author: string,
    title: string,
    content: string,
    ctime?: Date,
    utime?: Date,
    type: number,
    view?: number,
    tags?: string
}

const NoteSchema = new Schema<NoteModel>({
    author: String,
    title: String,
    content: String,
    ctime: {type: Date, default: Date.now},
    utime: {type: Date, default: Date.now},
    type: {type: Number, default: 1},
    view: Number,
    tags: String
})

const Note = models.Note ||  model('Note', NoteSchema)

export default Note