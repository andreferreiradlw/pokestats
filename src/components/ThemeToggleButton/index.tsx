import { useContext } from 'react';
// helpers
import { usePlausible } from 'next-plausible';
import { ColorModeContext } from '@/context';
// components
import { ThemeSwitch } from './styledThemeToggleButton';
import { Stack, type StackProps } from '@mui/material';

const ThemeToggleButton = (props: StackProps): JSX.Element => {
  // analytics
  const plausible = usePlausible();

  // context
  const colorMode = useContext(ColorModeContext);

  return (
    <Stack {...props}>
      <ThemeSwitch
        value={colorMode}
        checked={colorMode.mode === 'dark'}
        onChange={() => {
          colorMode.toggleColorMode();
          plausible('Toggle Theme Click');
        }}
      />
    </Stack>
  );
};

export default ThemeToggleButton;
