import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

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
  color: theme.palette.text.primary,

  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

export { JpnName };
