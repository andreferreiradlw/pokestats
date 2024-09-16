import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Typography, Box, Link } from '@mui/material';

interface GamePillProps {
  game: string;
}

// Refactored MethodContainer using MUI Box
const MethodContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5em',
  '& img': {
    width: '40px',
  },
});

// Refactored PokemonCell using MUI styled with framer-motion
const PokemonCell = styled(motion.td)({
  cursor: 'pointer',
  height: '40px',
  overflow: 'hidden',
  padding: '0.5em',
  textAlign: 'center',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '&:hover': {
    textDecoration: 'underline',
  },
});

// Refactored LocationAnchor using MUI Link
const LocationAnchor = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  gap: '2em',
  textTransform: 'capitalize',
  height: 'auto !important',
});

// Refactored PokeImg using MUI styled
const PokeImg = styled('img')({
  imageRendering: 'pixelated',
  margin: '-10px',
  width: '60px',
});

// Refactored MethodName using MUI Typography
const MethodName = styled(Typography)({});

// Refactored GamesContainer using MUI Box
const GamesContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5em',
});

// Refactored GamePill using MUI styled with TypeScript
const GamePill = styled('span')<GamePillProps>(({ game, theme }) => {
  let backgroundColor: string;
  let color: string | undefined;

  switch (game) {
    case 'yellow':
      backgroundColor = theme.palette.games.yellow;
      color = theme.palette.getContrastText(theme.palette.games.yellow);
      break;
    case 'red':
      backgroundColor = theme.palette.games.red;
      color = theme.palette.getContrastText(theme.palette.games.red);
      break;
    case 'blue':
      backgroundColor = theme.palette.games.blue;
      color = theme.palette.getContrastText(theme.palette.games.blue);
      break;
    default:
      backgroundColor = theme.palette.grey[300];
  }

  return {
    borderRadius: '4px',
    fontSize: '0.75em',
    fontWeight: 600,
    padding: '0.25em',
    textTransform: 'capitalize',
    backgroundColor,
    color,
  };
});

export {
  MethodContainer,
  MethodName,
  PokemonCell,
  LocationAnchor,
  PokeImg,
  GamesContainer,
  GamePill,
};
