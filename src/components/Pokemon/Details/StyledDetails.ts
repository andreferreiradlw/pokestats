import type { TypographyProps } from '@mui/material';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Flavor = styled(Typography)<TypographyProps>(({ theme }) => ({
  textAlign: 'center',

  [theme.breakpoints.up('lg')]: {
    textAlign: 'left',
  },
}));

export { Flavor };
