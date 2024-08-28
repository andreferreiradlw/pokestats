import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';

const SectionTitle = styled(motion.h2)(({ theme }) => ({
  fontSize: '1.5em',
  fontWeight: 600,

  [theme.breakpoints.up('sm')]: {
    fontSize: '2em',
  },
}));

const SectionSubTitle = styled(motion.h3)(({ theme }) => ({
  fontSize: '1.2em',
  fontWeight: 600,

  [theme.breakpoints.up('xs')]: {
    fontSize: '1.5em',
  },
}));

const SectionMessage = styled(motion.p)({
  fontSize: '1em',
  textAlign: 'center',
  width: '100%',
});

const JpnName = styled(motion.span)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: -1,
  writingMode: 'vertical-rl',
  lineHeight: 1,
  textTransform: 'uppercase',
  textAlign: 'center',
  fontSize: '2.5em',
  fontWeight: 'bold',
  userSelect: 'none',
  width: '1em',
  color: theme.palette.secondary.main,

  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

const BoldSpan = styled('span')({
  fontWeight: '600 !important',
});

const Anchor = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.dark,
  cursor: 'pointer',
  fontWeight: 700,
}));

export { SectionTitle, SectionSubTitle, SectionMessage, JpnName, BoldSpan, Anchor };
