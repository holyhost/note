import { MongoClient } from "mongodb";
import mongoose from "mongoose";

export default async function connectDB (){
    const mdburl = process.env.MDB_URL ?? ''
    const client = new MongoClient(mdburl)
    console.log('...connecting')
    await client.connect()
    console.log('...connected')
    const result = {
        db : client.db('Notes'),
        close: ()=> client.close()
    }
    return result
}


export async function appDB(){
    const mdburl = process.env.MDB_URL ?? ''
    console.log(mdburl)
    console.log("==========================")
    // console.log('before connect db: ', mongoose.connection.readyState())
    try {
        await mongoose.connect(mdburl, {dbName: 'Notes'})
        console.log('db connected...')
    } catch (error) {
        console.log(error)
    }
    
}