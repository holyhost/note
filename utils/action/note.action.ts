"use server"

import { getDomain } from "../base"
import { ResType } from "../model/global"
import { NoteModel } from "../model/Note"

export const getNoteList = async (page=1, count=6)=> {
    try {
        const url = getDomain()
        const data = await fetch(url + '/api/note' + `?page=${page}&count=${count}`, {next: {tags: ['note']}})
        const j = (await data.json()) as ResType<NoteModel[]>
        let notes: NoteModel[] = []
        if(j.ok){
            notes = j.res
        }
        return notes
    } catch (error) {
        console.log(error)
        throw new Error(`An error happened: ${error}`)
    }
    
}