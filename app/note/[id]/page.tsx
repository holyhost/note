import { getDomain } from '@/utils/base'
import { ResType } from '@/utils/model/global'
import { NoteModel } from '@/utils/model/Note'
import { Center, Container, Text } from '@mantine/core'
import React from 'react'
import classes from './NoteDetail.module.css'

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60
 
// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths
 
export async function generateStaticParams() {
  const domain = getDomain()
  console.log(domain)
  const data: ResType<NoteModel[]> = await fetch(domain + "/api/note?page=1&count=10").then((res) => res.json())
  const ids = data.res.map((post) => ({id: post._id}))
  return ids
}

const getNoteDetail = async (id: string) => {
  const domain = getDomain()
  const data: ResType<NoteModel> = await fetch(domain + "/api/note/"+id).then((res) => res.json())
  if(data.ok && data.res){
    console.log(data.res)
    return data.res
  }else{
    return null
  }
}

const DetailPage = async ({params}: {params: {id: string}}) => {
    const note = await getNoteDetail(params.id)
  return (
    <Container>
      {params && params.id && note ? (
        <div className={classes.container}>
          <Text fs={'italic'} fw={'bold'} size='xl' pl={'20px'}>{note.title}</Text>
          <div className={classes.subContainer}>
            {note.content}
          </div>
        </div>
      ) : (
        <Center>
          <Text c={'red'} size='xl' lts={'4px'}>无数据</Text>
        </Center>
        
      )}
    </Container>
  )
}

export default DetailPage