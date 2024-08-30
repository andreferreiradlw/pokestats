import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { lightPalette, typeColors } from './palette';
import styledMuiComponents from './components';
import customTypography from './typography';
import customBreakpoints from './breakpoints';

// Create a theme instance.
const theme = createTheme({
  palette: {
    ...lightPalette.palette,
    types: typeColors, // Dynamically add typeColors to the palette
  },
  ...customTypography,
  ...styledMuiComponents,
  ...customBreakpoints,
  shape: { borderRadius: 2 },
});

export default responsiveFontSizes(theme);
