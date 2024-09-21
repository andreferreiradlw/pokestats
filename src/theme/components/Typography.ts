import type { Components, Theme } from '@mui/material';

const Typography: {
  MuiTypography: Components<Theme>['MuiTypography'];
  MuiLink: Components<Theme>['MuiLink'];
} = {
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        pageHeading: 'h1',
        sectionTitle: 'h2',
        sectionSubTitle: 'h3',
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: 'inherit',
        fontWeight: theme.typography.fontWeightMedium,
      }),
    },
  },
};

export default Typography;
