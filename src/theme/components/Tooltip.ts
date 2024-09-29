import type { Components, Theme } from '@mui/material';

const Tooltip: {
  MuiTooltip: Components<Theme>['MuiTooltip'];
} = {
  MuiTooltip: {
    defaultProps: {
      disableInteractive: true,
      arrow: true,
      placement: 'left',
    },
  },
};

export default Tooltip;
