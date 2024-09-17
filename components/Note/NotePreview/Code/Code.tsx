import React from 'react'
import classes from './Code.module.css'
import { Text } from '@mantine/core'



const Code = ({codes, name}: {codes: string[], name: string}) => {
  return (
    <div className={classes.container}>
        {codes.length && codes.map((code, index) => {
            if(code) {
                return <Text key={`code-${name}-${index}`} className={classes.txtPre}>{code}</Text>
            }else{
                return <Text  component='div' h={'1rem'} key={`code-${name}-${index}`} className={classes.txtPre}></Text>
            }
            
        })}
    </div>
  )
}

export default Code