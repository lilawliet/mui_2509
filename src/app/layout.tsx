'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { HelmetProvider } from 'react-helmet-async';
import { SettingsProvider } from '@/components/settings/context/settings-provider';
import { SettingsDrawer } from '@/components/settings';
import SettingsButton from '@/components/settings-button';
import ThemeProvider from '../theme';
export default function RootLayout(props: { children: React.ReactNode }) {



  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <HelmetProvider>
          <SettingsProvider
            defaultSettings={{
              themeMode: 'light', // 'light' | 'dark' | 'system'
              themeDirection: 'ltr', //  'rtl' | 'ltr'
              themeContrast: 'default', // 'default' | 'bold'
              themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
              themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
              themeStretch: false,
              dashboardLayout: '',
              dashboardId: '',
              showBorder: false,
              // dashboardLayout: JSON.stringify(defaultDashboardLayout),
            }}
          >
            <ThemeProvider >
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '8px 16px' }}>
                    <SettingsButton />
                  </div>
                  {props.children}
                  <SettingsDrawer />
              </ThemeProvider>
            </SettingsProvider>
          </HelmetProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
