// helpers
import { riseUp } from '@/animations';
import { styled } from '@mui/material/styles';
// components
import { Grid2, Paper } from '@mui/material';
import Link from 'next/link';
// svg
import Potion from 'public/static/iconLibrary/potion.svg';

const FooterContainer = styled(Paper)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  paddingBottom: theme.spacing(6),
  paddingTop: theme.spacing(6),
  width: '100%',
}));

const FooterContent = styled(Grid2)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',

  [theme.breakpoints.up('md')]: {
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const Anchor = styled(Link)({
  whiteSpace: 'nowrap',

  '&:hover': {
    textDecoration: 'underline',
  },
});

const PokestatsIcon = styled(Potion)`
  height: auto;
  width: 100px;
  // rise up
  circle {
    animation: ${riseUp} 2s infinite linear;
  }
  .potion_svg__bubble-1 {
    animation-delay: 0.5s;
  }
  .potion_svg__bubble-2 {
    animation-delay: 0.3s;
  }
  .potion_svg__bubble-3 {
    animation-delay: 0.8s;
  }
  .potion_svg__bubble-4 {
    animation-delay: 1s;
  }
  .potion_svg__bubble-5 {
    animation-delay: 0.1s;
  }
`;

export { FooterContainer, FooterContent, PokestatsIcon, Anchor };
