import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import '@/styles/global.css'
import { Welcome } from '@/components/Welcome/Welcome';
import AppHeader from '@/components/AppHeader/AppHeader';
import Go2Top from '@/components/Go2Top/Go2Top';

export const metadata = {
  title: 'Note',
  description: 'Writing a note, personally blog, based on nextjs framework.',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className='bodyBg'>
        <MantineProvider theme={theme}>
          <AppHeader/>
          <div style={{paddingTop: '80px'}}>
            {children}   
          </div>
          <Go2Top/>
        </MantineProvider>
      </body>
    </html>
  );
}
