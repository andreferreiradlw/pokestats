'use client';

// helpers
import { styled } from '@mui/material/styles';
// components
import { motion } from '@/client';
import { Stack } from '@mui/material';

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
  left: '20px',
  top: '20px',
  zIndex: 3,

  svg: {
    background: theme.palette.background.default,
    borderRadius: '25%',
    fill: theme.palette.text.primary,
    height: 'auto',
    width: '30px',

    [theme.breakpoints.up('sm')]: {
      width: '50px',
    },

    '&:hover': {
      background: theme.palette.text.primary,
      fill: theme.palette.background.default,
    },
  },
}));

export { FirstSection, SecondSection, GithubLink };
