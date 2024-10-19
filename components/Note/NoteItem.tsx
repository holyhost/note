
import React from 'react'
import classes from './item.module.css'
import { Anchor, Group, Menu, Text } from '@mantine/core'
import { IconAlertCircle, IconCalendar, IconDetails, IconDots, IconDotsVertical, IconEdit, IconEye, IconFish, IconGrowth, IconLeaf, IconPlant, IconSeeding, IconTrash } from '@tabler/icons-react'
import { NoteModel } from '@/utils/model/Note'

type PropType = {
  data: NoteModel,
  theme?: string,
  onDelete?: (id: string)=> void
}

const NoteItem = ({data, theme, onDelete}: PropType) => {
  data.utime = new Date(data.utime + '')
  const updateTime = data.utime?.toLocaleDateString() || ''
  // const updateTime = ''
  return (
    <div className={classes.container + (theme === 'dark' ? ' bg-dark' : '')}>
        <div className={classes.anchor}><IconFish/></div>
        <div className={classes.moreAction + ' myhover'}>
        <Menu shadow="md" width={120} trigger="hover" openDelay={100} closeDelay={300}>
          <Menu.Target>
            <IconSeeding/>
          </Menu.Target>
          <Menu.Dropdown>
            {/* <Menu.Label>Application</Menu.Label> */}
            <Menu.Item leftSection={<IconDetails size={14} />}>
              <Anchor href={'/note/' + data._id} underline="hover">
                详情
              </Anchor>
            </Menu.Item>
            <Menu.Item leftSection={<IconEdit size={14} />}>
              <Anchor href={'/note/edit/' + data._id} underline="hover">
                编辑
              </Anchor>
            </Menu.Item>
            <Menu.Item c={'red'}
              leftSection={<IconTrash size={14}/>}
              onClick={()=> data._id && onDelete !== undefined && onDelete(data._id)}>
              删除
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
          
        </div>
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