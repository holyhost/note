"use client"
import React, { useState } from 'react'
import classes from './AppHeader.module.css'
import { Avatar, Text, Container, Group, Title, Burger, Menu, MenuLabel, rem, useMantineColorScheme } from '@mantine/core'
import { IconHome, IconPencil, IconPlus, IconAlertCircle, IconPhoto, IconLighter, IconSun, IconSunFilled, IconMoon } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks';
import { usePathname, useRouter } from 'next/navigation'

const links = [
  { link: '/', label: '主页' },
  { link: '/note', label: '笔记' },
  { link: '/note/add', label: '新增' },
  { link: '/about', label: '关于' },
];

const AppHeader = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const router = useRouter()
  const pathName = usePathname()
  const [active, setActive] = useState(pathName);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || (active.includes(link.link) && !active.includes('/note/add') && link.link.includes('/note')) || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        router.push(link.link)
      }}
    >
      {link.label}
    </a>
  ))
  return (
    <header className={classes.header} >
        <Container className={classes.inner}>
            <Avatar src={'/avatar.png'}/>
            <Title fw={900} fs={'italic'} lts={4} ff={'cursive'}>小石潭
              <Text inherit variant="gradient" fs={'34px'} component="span" gradient={{ from: 'pink', to: 'yellow' }}>
                记
              </Text>
            </Title>
            <Group justify='center' visibleFrom='md'>
              {items}
            </Group>
            <Menu onClose={toggle}>
              <Menu.Target>
                <Burger hiddenFrom='md' opened={opened} onClick={toggle} aria-label="Toggle navigation"/>
              </Menu.Target>
              <Menu.Dropdown>
                <MenuLabel>导航</MenuLabel>
                <Menu.Item leftSection={<IconHome style={{ width: rem(14), height: rem(14) }} />} onClick={()=> router.push('/')}>
                  主页
                </Menu.Item>
                <Menu.Item leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />} onClick={()=> router.push('/note')}>
                  笔记
                </Menu.Item>
                <Menu.Item leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />} onClick={()=> router.push('/note/add')}>
                  新增
                </Menu.Item>
                <Menu.Item leftSection={<IconAlertCircle style={{ width: rem(14), height: rem(14) }}/>} onClick={()=> router.push('/about')}>
                  关于
                </Menu.Item>
                <MenuLabel>系统</MenuLabel>
                {colorScheme === 'light' ? <Menu.Item leftSection={<IconMoon color='gray' style={{ width: rem(14), height: rem(14) }} />} onClick={() => toggleColorScheme()}>
                  夜间模式
                </Menu.Item> : <Menu.Item leftSection={<IconSun color='#fab005' style={{ width: rem(14), height: rem(14) }} />} onClick={() => toggleColorScheme()}>
                  日间模式
                </Menu.Item>}
                
              </Menu.Dropdown>
            </Menu>
            
            
        </Container>
    </header>
  )
}

export default AppHeader