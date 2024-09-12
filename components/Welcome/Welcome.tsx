import { Anchor, Avatar, Button, Group, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';
import { IconAlertCircle, IconHome, IconPaint, IconPencil, IconPlus } from '@tabler/icons-react';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Note
        </Text>
      </Title>
      <Group justify='center' mt={'lg'}>
          <Button size='md' bg={'red'} c='white' leftSection={<IconHome/>} className='bdr-20' component='a' href='/'>主页</Button>
          <Button size='md' bg={'teal'} c='white' leftSection={<IconPencil/>} className='bdr-20' component='a' href='/note'>笔记</Button>
          <Button size='md' bg={'pink'} c='white' leftSection={<IconPlus/>} className='bdr-20' component='a' href='/note/add'>新增</Button>
          <Button size='md' bg={'yellow'} c='white' leftSection={<IconAlertCircle/>} className='bdr-20' component='a' href='/about'>关于</Button>
      </Group>
      <Text c="teal" ta="center" size="lg" maw={580} mx="auto" mt="md">
        欲买桂花同载酒，终不似，少年游。
      </Text>
    </>
  );
}
