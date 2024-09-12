import { MongoClient } from "mongodb";
import mongoose from "mongoose";

// export default async function connectDB (){
//     const mdburl = process.env.MDB_URL ?? ''
//     const client = new MongoClient(mdburl)
//     console.log('...connecting')
//     await client.connect()
//     console.log('...connected')
//     const result = {
//         db : client.db('Notes'),
//         close: ()=> client.close()
//     }
//     return result
// }

var isConnected = false

export async function connectDB(){
    if(isConnected) {
        console.log("db already connected.")
        return isConnected}
    const mdburl = process.env.MDB_URL ?? ''
    try {
        console.log("db will connect...")
        await mongoose.connect(mdburl, {dbName: 'Notes', connectTimeoutMS: 40000})
        console.log('db connected...')
        isConnected = true
    } catch (error) {
        console.log(error)
        console.log('db connect error...')
        isConnected = false
    } finally{
        return isConnected
    }
    
}