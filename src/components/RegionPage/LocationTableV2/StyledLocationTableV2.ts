import { styled } from '@mui/material/styles';
import { TableCell, Stack } from '@mui/material';
import type { GameValue } from '@/helpers';

interface GamePillProps {
  game: GameValue;
}

const GamePill = styled('span', {
  shouldForwardProp: prop => prop !== 'game',
})<GamePillProps>(({ game, theme }) => {
  const gameColor = theme.palette.games[game] || theme.palette.grey[300];

  return {
    backgroundColor: gameColor,
    color: theme.palette.getContrastText(gameColor),
    borderRadius: theme.shape.borderRadius,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    padding: `${theme.spacing(0.25)} ${theme.spacing(0.5)}`,
    textTransform: 'capitalize',
  };
});

const MethodContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),

  '& img': {
    width: '40px',
  },
}));

const PokemonCell = styled(TableCell)({
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

export { MethodContainer, PokemonCell, GamePill };
