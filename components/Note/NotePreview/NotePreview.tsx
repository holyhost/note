import { Anchor, Group, Image, Stack, Text } from '@mantine/core'
import React from 'react'
import classes from './NotePreview.module.css'
import Code from './Code/Code'
import { getDomain, getFileDomain } from '@/utils/base'
import { FileConfigModel } from '@/utils/model/FileConfig'
import { ResType } from '@/utils/model/global'

const MD_H1 = '# '
const MD_H2 = '## '
const MD_H3 = '### '
const MD_H4 = '#### '
const MD_CODE = '```'
const MD_HIGHT_LIGHT = '=='
const MD_ITALIC = '*'
const MD_BOLD = '**'
const MD_HEADERS = [MD_H1, MD_H2, MD_H3, MD_H4]

const MD_TYPES = [MD_CODE, MD_H1, MD_H2, MD_H3, MD_H4, MD_HIGHT_LIGHT, MD_BOLD, MD_ITALIC]
const MD_ROW_TYPES = [MD_HIGHT_LIGHT]
const whiteEle = <div className={classes.ht1}></div>

async function getMediaDetails(ids:string[]) {
    const fileConfigs: FileConfigModel[] = []
    const domain = getDomain()
    if(ids && ids.length){
        for (let index = 0; index < ids.length; index++) {
            const id = ids[index];
            const res = await fetch(domain + "/api/file/"+id)
            const data: ResType<FileConfigModel> = await res.json()
            fileConfigs.push(data.res)
            
        }
    }
    return fileConfigs
}

const NotePreview = async({data, medias}: {data: string, medias?: string[]}) => {
    
    const fileList = await getMediaDetails(medias || [])
    const parseData = ()=> {
        if(!data) return
        const arr = data.split('\n')
        const elements: React.JSX.Element[] = []
        for (let ind = 0; ind < arr.length; ind++) {
            let a = arr[ind]
            let goNext = false
            if(a){
                // header
                for (let index = 0; index < MD_HEADERS.length; index++) {
                    const mdh = MD_HEADERS[index];
                    if(a.startsWith(mdh)){
                        const content = a.replace(mdh, '')
                        const ele =  <Text lh={36 - index * 2 + 'px'} fw={900} size={28 - index * 2 + 'px'} key={'header-' + ind} className={classes.txtPre}>{content}</Text>
                        elements.push(ele)
                        goNext = true
                        continue
                    }
                }
                if(goNext){
                    continue
                }
                // code 
                if(a.startsWith(MD_CODE)){
                    const nextInd = getNextIndex(ind, arr)
                    if(nextInd){
                        const codes = arr.slice(ind+1, nextInd)
                        ind = nextInd
                        elements.push(<Code key={'cc-' + ind} codes={codes} name={"cd-" + ind}/>)
                        continue
                    }
                }
                // image
                const pattern = /!\[(.*?)\]\((.*?)\)/mg
                let matcher
                while((matcher= pattern.exec(a)) !== null) {
                    a = a.replaceAll(matcher[0], '')
                    const title = matcher[1]
                    const fileName = matcher[2]
                    const folder = getFileDomain()
                    const fc = fileList.find(f => f.content.includes(fileName))
                    elements.push(<Group justify={fc?.display || 'start'}>
                        <Stack gap={2}>
                            <Image w={'auto'} h={'6rem'} fit='contain' src={folder + '/' + fileName}/>
                            <Text ta={'center'} size='10px' c={'#3279b7'}>{title}</Text>
                        </Stack>
                        
                    </Group>)
                    
                    
                }
                
                // common text
                const hlArr = checkKeyCharacter(a)
                if(hlArr.length){
                    elements.push(
                        <Text key={'txt-default-' + ind} className={classes.txtPre}>{hlArr.map(hl => hl)}</Text>
                    )
                }else{
                    elements.push(<Text key={'txt-default-' + ind} className={classes.txtPre}>{a}</Text>)
                }
                
            }else{
                elements.push(<p key={'txt-emp-' + ind} className={classes.txtPre}>{''}</p>)
            }
        }
        return elements
    }

    const result = parseData()
  return (
    <div className={classes.container}>
        {result}
    </div>
  )
}

function getNextIndex (cur: number, arr: string[]): number{
    const tp = MD_TYPES.find(t => arr[cur].startsWith(t))
    if(tp){
        for (let index = cur + 1; index < arr.length; index++) {
            const str = arr[index];
            if(str.startsWith(tp)) return index
        }
    }
    return 0
}

function checkKeyCharacter(str: string){
    const elementArr: {
        type: 'str' | 'ele',
        value: string | React.ReactNode
    }[] = []
    // link [name](https://zxyoyo.com/about.html)
    let matcher
    const linkPattern = /\[(.*?)\]\((.*?)\)/mg
    while((matcher= linkPattern.exec(str)) !== null) {
        const title = matcher[1]
        const link = matcher[2]
        const tempArr = str.split(matcher[0])
        elementArr.push({type: 'str', value: tempArr[0]})
        elementArr.push({type: 'ele', value: <Anchor href={link} underline='hover' target='_blank'>{title}</Anchor>})
        // avoid tempArr length is not equal 2
        str = str.slice(tempArr[0].length + matcher[0].length)
    }
    elementArr.push({type: 'str', value: str})
    // hilight ==Hello World==
    const elementArr2:{
        type: 'str' | 'ele',
        value: string | React.ReactNode
    }[] = []
    const hightLightPattern = /==(.*?)==/
    matcher = null
    for (let index = 0; index < elementArr.length; index++) {
        const element = elementArr[index];
        const type = element.type
        let value = element.value
        if(type === 'str' && value){
            while((matcher= hightLightPattern.exec(value as string)) !== null) {
                const title = matcher[1]
                const tempArr = (value as string).split(matcher[0])
                elementArr2.push({type: 'str', value: tempArr[0]})
                elementArr2.push({type: 'ele', value: (<Text component='span' bg={'yellow'} className={classes.textPre}>{title}</Text>)})
                // avoid tempArr length is not equal 2
                value = (value as string).slice(tempArr[0].length + matcher[0].length)
            }
            elementArr2.push({type: 'str', value})
        }else{
            elementArr2.push({type, value})
        }
        
    }
    const result = elementArr2.map(item => item.type === 'str' ? <Text component='span' className={classes.textPre}>{item.value}</Text> : item.value)
    return result

}


export default NotePreview
