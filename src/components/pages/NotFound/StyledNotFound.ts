import { Stack, Typography, styled, alpha } from '@mui/material';
import ImageNextV2 from '@/components/ImageNextV2';

const Container = styled(Stack)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.default, 0.5),
  height: '100vh',
  margin: 'auto',
  minHeight: '100vh',
  width: '100%',
  zIndex: 1,
}));

const Title = styled(Typography)({
  fontStyle: 'italic',
});

const Message = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  maxWidth: '90%',

  '& span': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '4px',
    fontWeight: 700,
    padding: '3px 5px',
  },

  [theme.breakpoints.up('md')]: {
    maxWidth: '75%',
  },
}));

const Image = styled(ImageNextV2)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  width: '150px',

  [theme.breakpoints.up('md')]: {
    width: '200px',
  },
}));

export { Container, Title, Message, Image };
