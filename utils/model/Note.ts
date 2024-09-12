import { models, model, now, Schema } from "mongoose";


const NoteSchema = new Schema({
    author: String,
    title: String,
    content: String,
    ctime: {type: Date, default: Date,now},
    utime: {type: Date, default: Date,now},
    type: {type: Number, default: 1},
    view: Number
})

const Note = models.Note ||  model('Note', NoteSchema)

export default Note