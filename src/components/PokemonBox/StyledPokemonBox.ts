import { styled } from '@mui/material/styles';
import { float } from '@/components/BaseStyles';
import { Paper } from '@mui/material';

const PokeBox = styled(Paper)`
  align-items: center;
  border-radius: 5px;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  font-weight: 500;
  gap: 0.5em;
  justify-content: center;
  max-width: 125px;
  overflow: hidden;
  padding: 1em;
  position: relative;
  text-align: center;
  transition: border 0.1s ease-in-out;
  width: 125px;

  &:hover {
    box-shadow: 1px 1px 3px 0px ${({ theme }) => theme.palette.primary.main};
    cursor: pointer;

    img {
      @media (prefers-reduced-motion: no-preference) {
        animation: ${float} infinite 3s ease-in-out;
      }
    }

    &:active {
      transition: box-shadow 0.01s ease-in-out;
      box-shadow: 1px 1px 2px 0px ${({ theme }) => theme.palette.primary.light} inset;
    }
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    max-width: 175px;
    width: 175px;
  }
`;

const NumberId = styled('span')(({ theme }) => ({
  fontSize: '1.5em',

  [theme.breakpoints.up('md')]: {
    fontSize: '2em',
  },
}));

const PokeName = styled('span')(({ theme }) => ({
  fontSize: '1em',
  textTransform: 'capitalize',

  [theme.breakpoints.up('md')]: {
    fontSize: '1.5em',
  },
}));

const PokeGen = styled('span')(({ theme }) => ({
  fontSize: '0.85em',
  fontWeight: 300,

  [theme.breakpoints.up('md')]: {
    fontSize: '1em',
  },
}));

export { PokeBox, NumberId, PokeName, PokeGen };
