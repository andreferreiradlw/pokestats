import { styled } from '@mui/material/styles';
import { TableCell, Stack } from '@mui/material';

interface GamePillProps {
  game: string;
}

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
