
import React from 'react'
import classes from './item.module.css'
import { Anchor, Group, Text } from '@mantine/core'
import { IconAlertCircle, IconCalendar, IconEye } from '@tabler/icons-react'
import { NoteModel } from '@/utils/model/Note'

const NoteItem = ({data}: {data: NoteModel}) => {
  console.log(data.utime)
  data.utime = new Date(data.utime + '')
  console.log(typeof data.utime)
  console.log(data.utime.toLocaleDateString())
  const updateTime = data.utime?.toLocaleDateString() || ''
  // const updateTime = ''
  return (
    <div className={classes.container}>
        <div className={classes.anchor}><IconAlertCircle/></div>
        <Text size='lg' fw={700} ff={'fangsong'} fs={'italic'}>{data.title}</Text>
        <div className={classes.content}>
            {data.content}
        </div>
        <Group justify='space-between'>
          <div className={classes.footer}>
              <span className={classes.author}>-- {data.author}</span> 
              {data.view && <span ><IconEye size={'12px'}/>{data.view}</span>}
              <span><IconCalendar color='teal' size={'12px'}/> {updateTime}</span>
          </div>
          <Text><Anchor href={`/note/${data._id}`}>查看详情 {">>"}</Anchor></Text>
        </Group>
        
        {/* <div className={classes.detail}></div> */}
    </div>
  )
}

export default NoteItem