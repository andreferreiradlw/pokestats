import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled(Stack)(({ theme }) => ({
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    paddingBottom: '0.5em',
  },
}));

const Details = styled(Typography)({
  fontWeight: 500,
  textAlign: 'center',
  whiteSpace: 'normal',
  wordBreak: 'break-word',

  '&:first-letter': {
    textTransform: 'uppercase',
  },
});

const ItemImage = styled('img')({
  width: '50px',
});

export { Container, Details, ItemImage };
