import { models, model, now, Schema } from "mongoose";




const Note = models.Note ||  model('note', new Schema({
    author: String,
    title: String,
    content: String,
    ctime: {type: Date, default: Date,now},
    utime: {type: Date, default: Date,now},
    type: {type: Number, default: 1},
    view: Number
}))

export default Note