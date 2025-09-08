'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { HelmetProvider } from 'react-helmet-async';
import theme from '@/theme';
import ModeSwitch from '@/components/ModeSwitch';
import { SettingsProvider } from '@/components/settings';
import { defaultSettings } from '@/settings/config-settings';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <HelmetProvider>
            <SettingsProvider defaultSettings={defaultSettings}>
              <ThemeProvider theme={theme}>

                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline />
                  <ModeSwitch />
                  {props.children}
              </ThemeProvider>
            </SettingsProvider>
          </HelmetProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
