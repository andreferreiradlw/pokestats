'use client';

import { useContext } from 'react';
// helpers
import { useUmami } from '@/hooks';
import { ColorModeContext } from '@/context';
// components
import { ThemeSwitch } from './styledThemeToggleButton';
import { Stack, type StackProps } from '@mui/material';

const ThemeToggleButton = (props: StackProps): JSX.Element => {
  // context
  const colorMode = useContext(ColorModeContext);

  // analytics
  const { track } = useUmami();

  return (
    <Stack {...props}>
      <ThemeSwitch
        value={colorMode}
        checked={colorMode.mode === 'dark'}
        onChange={() => {
          colorMode.toggleColorMode();
          track('Toggle Theme Click');
        }}
      />
    </Stack>
  );
};

export default ThemeToggleButton;
