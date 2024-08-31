import { styled, alpha } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

const Container = styled(Stack)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.black, 0.7),
  color: theme.palette.common.white,
  height: '100vh',
  margin: 'auto',
  minHeight: '100vh',
  width: '100%',
  zIndex: 1,
}));

const Title = styled(Typography)({
  fontStyle: 'italic',
  marginBottom: 0,
});

const Message = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  margin: '0 auto 1.5rem',
  maxWidth: '90%',
  wordBreak: 'break-word',

  '& span': {
    backgroundColor: theme.palette.common.black,
    borderRadius: '4px',
    fontWeight: 700,
    padding: '3px 5px',
  },

  [theme.breakpoints.up('md')]: {
    maxWidth: '75%',
    margin: '0 auto 2rem',
  },
}));

const Image = styled('img')(({ theme }) => ({
  imageRendering: 'pixelated',
  marginBottom: '2rem',
  width: '150px',

  [theme.breakpoints.up('md')]: {
    width: '200px',
  },
}));

export { Container, Title, Message, Image };
