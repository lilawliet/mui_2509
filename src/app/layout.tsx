'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { HelmetProvider } from 'react-helmet-async';
import theme from '@/theme';
import ModeSwitch from '@/components/ModeSwitch';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <HelmetProvider>
              <ThemeProvider theme={theme}>

                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline />
                  <ModeSwitch />
                  {props.children}
              </ThemeProvider>
          </HelmetProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
