import { createTheme } from '@mui/material/styles';
import styledMuiPalette from './palette';
import styledMuiComponents from './components';

// Create a theme instance.
const theme = createTheme(styledMuiPalette, {
  shape: { borderRadious: 2 },
  components: styledMuiComponents,
});

export default theme;
