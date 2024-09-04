import { useContext } from 'react';
import { ColorModeContext } from '@/context';
import { ThemeSwitch } from './styledThemeToggleButton';

const ThemeToggleButton = (): JSX.Element => {
  const colorMode = useContext(ColorModeContext);

  return <ThemeSwitch checked={colorMode.mode === 'dark'} onChange={colorMode.toggleColorMode} />;
};

export default ThemeToggleButton;
