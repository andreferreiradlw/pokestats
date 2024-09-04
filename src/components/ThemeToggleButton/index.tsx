import { useContext } from 'react';
import { ColorModeContext } from '@/context';
import { ThemeSwitch } from './styledThemeToggleButton';
import { Stack, StackProps } from '@mui/material';

const ThemeToggleButton = (props: StackProps): JSX.Element => {
  const colorMode = useContext(ColorModeContext);

  return (
    <Stack
      component={ThemeSwitch}
      checked={colorMode.mode === 'dark'}
      onChange={colorMode.toggleColorMode}
      {...props}
    />
  );
};

export default ThemeToggleButton;
