// components
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import type { NavigationButtonProps } from './NavigationButton';

const BtnContainer = styled(motion.div)(({ theme }) => ({
  transition: 'box-shadow 0.05s ease-in-out',

  '&:hover': {
    boxShadow: theme.palette.mode === 'dark' ? theme.shadows[5] : theme.shadows[3],
  },

  '&:active': {
    boxShadow: theme.shadows[1],
  },
}));

const BtnSpan = styled('span')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '90px',
  padding: '0 0.5rem',
});

const Arrow = styled(BtnSpan, {
  shouldForwardProp: prop => prop !== 'direction',
})<{ direction: NavigationButtonProps['direction'] }>(({ direction, theme }) => {
  const primaryMainColor = theme.palette.primary.main;

  return {
    position: 'relative',

    '&:after': {
      content: "''",
      position: 'absolute',
      borderTop: '45px solid transparent',
      borderBottom: '45px solid transparent',
      transition: 'all 0.15s ease-in-out',
      ...(direction === 'left' && {
        borderRight: `10px solid ${primaryMainColor}`,
        boxShadow: `10px 0 0 0 ${primaryMainColor}, 10px 3px 0 0 ${primaryMainColor}`,
        right: 0,
      }),
      ...(direction === 'right' && {
        borderLeft: `10px solid ${primaryMainColor}`,
        boxShadow: `-10px 0 0 0 ${primaryMainColor}, -10px 3px 0 0 ${primaryMainColor}`,
        left: 0,
      }),
    },
  };
});

const Title = styled(BtnSpan)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  maxWidth: '130px',
  textAlign: 'center',
  width: '130px',
  transition: 'all 0.15s ease-in-out',
}));

const BtnAnchor = styled(Link, {
  shouldForwardProp: prop => prop !== 'direction',
})<{ direction: NavigationButtonProps['direction'] }>(({ direction, theme }) => ({
  display: 'flex',
  fontWeight: 600,
  border: `1px solid ${theme.palette.primary.main}`,
  overflow: 'hidden',

  ...(direction === 'left' && {
    borderRadius: '4px 0 0 4px',
    borderRight: 'none',
    flexDirection: 'row',

    '& span': {
      float: 'left',
    },
  }),

  ...(direction === 'right' && {
    borderRadius: '0 4px 4px 0',
    borderLeft: 'none',
    flexDirection: 'row-reverse',

    '& span': {
      float: 'right',
    },
  }),

  '& img': {
    padding: '10px',
    transition: 'all 0.15s ease-in-out',
  },

  '&:hover': {
    cursor: 'pointer',

    '& img': {
      transform: 'scale(1.2)',
    },

    '& span:after': {
      left: direction === 'right' ? '10px' : undefined,
      right: direction === 'left' ? '10px' : undefined,
    },
  },
}));

export { BtnContainer, BtnAnchor, Title, Arrow };
