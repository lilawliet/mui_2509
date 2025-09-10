import isEqual from 'lodash/isEqual';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { useColorScheme } from '@mui/material/styles';
// hooks
import { useLocalStorage } from 'src/hooks/use-local-storage';
// utils
import { localStorageGetItem } from 'src/utils/storage-available';
//
import type { SettingsValueProps } from '../types';
import { SettingsContext } from './settings-context';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'settings';

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultSettings);
  const { setMode } = useColorScheme();

  const [openDrawer, setOpenDrawer] = useState(false);

  const isArabic = localStorageGetItem('i18nextLng') === 'ar';

  // Direction by lang
  const onChangeDirectionByLang = useCallback(
    (lang: string) => {
      update('themeDirection', lang === 'ar' ? 'rtl' : 'ltr');
    },
    [update]
  );

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang('ar');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArabic, onChangeDirectionByLang]);

  // Sync MUI color scheme with settings
  useEffect(() => {
    setMode(state.themeMode);
  }, [state.themeMode, setMode]);


  // Drawer
  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  // Border
  const toggleBorder = useCallback(() => {
    const newValue = !state.showBorder;
    update('showBorder', newValue);
  }, [state.showBorder, update]);

  const setBorder = useCallback((show: boolean) => {
    update('showBorder', show);
  }, [update]);

  
  // Theme Mode
  const setThemeMode = useCallback((mode: 'light' | 'dark' | 'system') => {
    update('themeMode', mode);
    setMode(mode);
  }, [update, setMode]);

  const canReset = !isEqual(state, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
      // Direction
      onChangeDirectionByLang,
      // Reset
      canReset,
      onReset: reset,
      // Drawer
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
      // Border
      toggleBorder,
      setBorder,
      // Theme Mode
      setThemeMode,
    }),
    [
      reset,
      update,
      state,
      canReset,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
      onChangeDirectionByLang,
      toggleBorder,
      setBorder,
      setThemeMode,
    ]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}
