import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material/styles';
import { lightPalette, darkPalette, typeColors, gameColors } from './palette';
import styledMuiComponents from './components';
import customTypography from './typography';
import customBreakpoints from './breakpoints';

export type ThemeMode = 'light' | 'dark';

// Static parts of the theme that don't change between modes
const baseThemeOptions: Partial<ThemeOptions> = {
  shape: { borderRadius: 2 },
  ...customTypography,
  ...styledMuiComponents,
  ...customBreakpoints,
  palette: {
    types: typeColors,
    games: gameColors,
  },
};

// Optimized theme generation function
const generateTheme = (mode: ThemeMode) => {
  const currPalette = mode === 'light' ? lightPalette.palette : darkPalette.palette;

  // Use `createTheme` with base options and mode-specific palette
  const theme = createTheme({
    ...baseThemeOptions,
    palette: {
      ...baseThemeOptions.palette, // Include static palette parts
      ...currPalette, // Override with mode-specific palette
    },
  });

  return responsiveFontSizes(theme);
};

export default generateTheme;
