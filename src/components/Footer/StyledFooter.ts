// helpers
import { riseUp } from '@/animations';
import { styled } from '@mui/material/styles';
// components
import { Container, Stack } from '@mui/material';
import Link from 'next/link';
// svg
import Potion from 'public/static/iconLibrary/potion.svg';

const FooterContainer = styled('footer')(({ theme }) => ({
  background: theme.palette.background.default,
  fontWeight: theme.typography.fontWeightMedium,
  paddingBottom: theme.spacing(2),
  paddingTop: theme.spacing(2),
  width: '100%',
}));

const FooterContainerInner = styled(Container)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  justifyContent: 'center',
}));

const FooterContent = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  flexDirection: 'column',
  gap: theme.spacing(2),
  justifyContent: 'center',
  textAlign: 'center',
  width: '100%',

  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'left',
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
  width: 30px;
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

export { FooterContainer, FooterContainerInner, FooterContent, PokestatsIcon, Anchor };
