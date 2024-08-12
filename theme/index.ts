import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import styledMuiPalette from './palette';
import styledMuiComponents from './components';
import customTypography from './typography';
import customBreakpoints from './breakpoints';

// Create a theme instance.
const theme = createTheme({
  ...styledMuiPalette,
  ...customTypography,
  ...styledMuiComponents,
  ...customBreakpoints,
  shape: { borderRadius: 2 },
});

export default responsiveFontSizes(theme);
