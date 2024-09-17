import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const MusicPlayerContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  width: '100%',
}));

export { MusicPlayerContainer };
