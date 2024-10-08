import { Anchor, Avatar, Button, Group, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';
import { IconAlertCircle, IconHome, IconPaint, IconPencil, IconPlus } from '@tabler/icons-react';

export function Welcome() {
  return (
    <>
      <Text className={classes.title} ta="center" mt={30}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Note
        </Text>
      </Text>
      <Group justify='center' mt={'lg'}>
          <Button size='sm' bg={'red'} c='white' leftSection={<IconHome/>} className='bdr-20' component='a' href='/'>主页</Button>
          <Button size='sm' bg={'teal'} c='white' leftSection={<IconPencil/>} className='bdr-20' component='a' href='/note'>笔记</Button>
          <Button size='sm' bg={'pink'} c='white' leftSection={<IconPlus/>} className='bdr-20' component='a' href='/note/add'>新增</Button>
          <Button size='sm' bg={'yellow'} c='white' leftSection={<IconAlertCircle/>} className='bdr-20' component='a' href='/about'>关于</Button>
      </Group>
      <Text c="teal" ta="center" size="lg" maw={580} mx="auto" mt="md">
        潭中鱼可百许头，皆若空游无所依。
      </Text>
    </>
  );
}
