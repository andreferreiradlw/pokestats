import { styled } from '@mui/material/styles';
// animations
// import { blink } from '@/animations';
// components
import { Stack } from '@mui/material';

// Define types for the Badge component props
interface BadgeProps {
  $isAffected?: boolean;
  $isSelected?: boolean;
}

const BattleContainer = styled(Stack)({
  position: 'relative',
  width: '100%',
});

const PokemonContainer = styled('div')({
  alignItems: 'center',
  display: 'flex',
  flexBasis: '33%',
  flexDirection: 'column',
  flexShrink: 0,
  justifyContent: 'center',
  overflow: 'hidden',
});

const Badge = styled('div', {
  shouldForwardProp: prop => prop !== '$isAffected' && prop !== '$isSelected',
})<BadgeProps>(({ theme, $isAffected, $isSelected }) => ({
  alignItems: 'center',
  border: '2px solid transparent',
  borderRadius: '5px',
  display: 'flex',
  fontWeight: 600,
  gap: '0.25em',
  minWidth: '50%',
  padding: '0.2em 0.5em',
  textAlign: 'center',

  ...($isAffected && {
    border: `2px dotted ${theme.palette.text.primary}`,
  }),

  ...(($isSelected || $isAffected) && {
    '&:before': {
      backgroundImage: 'url("/static/iconLibrary/arrow_right.svg")',
    },

    '&:after': {
      backgroundImage: 'url("/static/iconLibrary/arrow_left.svg")',
    },

    '&:before, &:after': {
      // animation: `${blink(theme.palette.background.default, 'background')} 2s infinite ease-in-out 1s`,
      backgroundSize: '20px 20px',
      content: '""',
      display: 'inline-flex',
      height: '20px',
      width: '20px',
    },
  }),
}));

const ImageContainer = styled('div')({
  width: '80%',
});

const AllyImg = styled('img')({
  transform: 'translateY(1em)',
  width: '100%',
});

const FoeImg = styled('img')({
  width: '85%',
});

const BattleGround = styled('div')(({ theme }) => ({
  background: `radial-gradient(ellipse at center, ${theme.palette.background.default} 19%, ${theme.palette.primary.dark} 57%, ${theme.palette.background.default} 67%)`,
  display: 'none',
  filter: `progid:DXImageTransform.Microsoft.gradient( startColorstr='${theme.palette.background.default}', endColorstr='${theme.palette.background.default}', GradientType=1 )`,
  height: '30%',
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%) matrix(2.9, 0.1, -1.5, 2.1, 50, 35)',
  width: '30%',
  zIndex: -2,

  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

export { BattleContainer, PokemonContainer, Badge, ImageContainer, FoeImg, AllyImg, BattleGround };
