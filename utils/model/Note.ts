import mongoose, { now } from "mongoose";


const Schema = mongoose.Schema

const NoteSchema = new Schema({
    author: String,
    title: String,
    content: String,
    ctime: {type: Date, default: Date,now},
    utime: {type: Date, default: Date,now},
    type: {type: Number, default: 1},
    view: Number
})

const Note = mongoose.models.Note ||  mongoose.model('note', NoteSchema)

export default Note