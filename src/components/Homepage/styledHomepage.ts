import { rotate } from '@/BaseStyles';
import { motion } from 'framer-motion';
import PokeballIcon from 'public/static/iconLibrary/pokeball.svg';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const FirstSection = styled(Stack)({
  alignItems: 'center',
  gap: '1em',
  height: '50vh',
  justifyContent: 'center',
  margin: 'auto',
  minHeight: '50vh',
  position: 'relative',
  width: '100%',
});

const SecondSection = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  justifyContent: 'center',
  width: '100%',
}));

const GithubLink = styled(motion.a)(({ theme }) => ({
  position: 'absolute',
  right: '20px',
  top: '20px',
  zIndex: 3,

  svg: {
    background: theme.palette.background.default,
    borderRadius: '25%',
    fill: theme.palette.secondary.main,
    height: 'auto',
    width: '30px',

    [theme.breakpoints.up('sm')]: {
      width: '50px',
    },

    '&:hover': {
      background: theme.palette.secondary.main,
      fill: theme.palette.background.default,
    },
  },
}));

const Pokeball = styled(PokeballIcon)`
  animation: 3s ${rotate} 0ms infinite linear;
  width: 1em;
`;

export { FirstSection, SecondSection, GithubLink, Pokeball };
