import { useContext } from 'react';
import { ColorModeContext } from '@/context';
import { ThemeSwitch } from './styledThemeToggleButton';
import type { StackProps } from '@mui/material';
import { Stack } from '@mui/material';

const ThemeToggleButton = (props: StackProps): JSX.Element => {
  const colorMode = useContext(ColorModeContext);

  return (
    <Stack {...props}>
      <ThemeSwitch
        value={colorMode}
        checked={colorMode.mode === 'dark'}
        onChange={colorMode.toggleColorMode}
      />
    </Stack>
  );
};

export default ThemeToggleButton;
