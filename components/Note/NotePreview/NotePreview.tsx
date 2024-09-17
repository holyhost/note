import { Text } from '@mantine/core'
import React from 'react'
import classes from './NotePreview.module.css'
import Code from './Code/Code'

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

const NotePreview = ({data}: {data: string}) => {

    const parseData = ()=> {
        if(!data) return
        const arr = data.split('\n')
        const elements: React.JSX.Element[] = []
        for (let ind = 0; ind < arr.length; ind++) {
            const a = arr[ind]
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
                        console.log(codes.length)
                        elements.push(<Code key={'cc-' + ind} codes={codes} name={"cd-" + ind}/>)
                        continue
                    }
                }
                // common text
                const hlArr = checkKeyCharacter(a)
                if(hlArr.length){
                    elements.push(
                        <Text c={'grape'} key={'txt-default-' + ind} className={classes.txtPre}>{hlArr.map(hl => hl)}</Text>
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
    const keyIndex = str.indexOf(MD_HIGHT_LIGHT)
    let result: React.JSX.Element[] = []
    if(keyIndex !== -1){
        const arr = str.split(MD_HIGHT_LIGHT)
        if(arr.length > 2){
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i];
                if(i % 2 === 0){
                    result.push(<Text component='span' className={classes.textPre}>{item}</Text>)
                }else if(i + 1 === arr.length){
                    result.push(<Text component='span' className={classes.textPre}>=={item}</Text>)
                } else{
                    result.push(<Text component='span' bg={'yellow'} className={classes.textPre}>{item}</Text>)
                }
            }
        }
    }
    return result

}


export default NotePreview
