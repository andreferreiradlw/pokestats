import { motion } from '@/client';
import { styled } from '@mui/material/styles';
// fonts
import { oriFont } from '@/components/Fonts';

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
  wordBreak: 'keep-all',

  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

const PokeCurrency = styled('span')({
  fontFamily: oriFont.style.fontFamily,
  fontSize: 'inherit',
  color: 'inherit',
});

export { JpnName, PokeCurrency };
