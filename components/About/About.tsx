"use client"
import { Container, useMantineColorScheme, Text } from '@mantine/core'
import React from 'react'

const About = () => {
    const {colorScheme} = useMantineColorScheme()
    return (
      <Container mt={'1.5rem'} fz={'18px'} ta={'center'} ff={'fangsong'} c={'teal.9'} fw={700} className={colorScheme === 'light' ? 'bg-light container' : 'bg-dark container'}>
        <div>
          <Text size="xl" fw={800} lts={'6px'}>《小石潭记》</Text>
          <Text size="sm" pl={'6rem'} mb={'1.8rem'}>柳宗元(唐)</Text>
        </div>
        <p>
          从小丘西行百二十步，隔篁{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(huáng)</Text>}竹，闻水声，如鸣佩{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(pèi)</Text>}环，心乐{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(lè)</Text>}之。
        </p>
        <p>
          伐竹取道，下见小潭，水尤清冽{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(liè)</Text>}。
        </p>
        <p>
          全石以为底，近岸，卷{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(quán )</Text>}石底以出，为坻{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(chí)</Text>}，为屿{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(yǔ)</Text>}，为嵁{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(kān)</Text>}，为岩。
        </p>
        <p>
          青树翠蔓{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(màn)</Text>}，蒙络{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(luò)</Text>}摇缀{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(zhuì)</Text>}，参{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(cēn)</Text>}差{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(cī)</Text>}披拂。
        </p>
        <p>
          潭中鱼可百许头，皆若空游无所依。
        </p>
        <p>
          日光下澈{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(chè)</Text>}，影布石上，佁{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(yǐ)</Text>}然不动；俶{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(chù)</Text>}尔远逝，往来翕{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(xī)</Text>}忽，似与游者相乐。
        </p>
        <p>
          潭西南而望，斗{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(dǒu)</Text>}折{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(zhé)</Text>}蛇行，明灭可见。其岸势犬牙差{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(cī)</Text>}互，不可知其源。
        </p>
        <p>
          坐潭上，四面竹树环合，寂寥{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(liáo)</Text>}无人，凄神寒骨，悄{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(qiǎo)</Text>}怆{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(chuàng)</Text>}幽邃{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(suì )</Text>}。
        </p>
        <p>
          以其境过清，不可久居，乃记之而去。
        </p>
        <p>
          同游者：吴武陵，龚{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(gōng)</Text>}古，余弟宗玄。隶{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(lì)</Text>}而从者，崔氏二小生：曰{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(yuē)</Text>}恕己，曰奉壹{<Text component="span" c={ colorScheme === 'light' ? 'gray.9' : 'gray.1'} size="sm">(yī)</Text>}。
        </p>
      </Container>
    )
}

export default About