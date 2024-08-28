import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { AutocompleteV2Props } from '.';

const Container = styled(motion.div, {
  shouldForwardProp: prop => prop !== 'width',
})<{ width?: AutocompleteV2Props['width'] }>(({ theme, width }) => ({
  maxWidth: '100%',
  position: 'relative',
  width: width || '90%',
  ...(width
    ? {}
    : {
        [theme.breakpoints.up('sm')]: {
          maxWidth: '650px',
          width: '55%',
        },
        [theme.breakpoints.up('md')]: {
          width: '40%',
        },
        [theme.breakpoints.up('lg')]: {
          width: '30%',
        },
      }),
}));

const ListWrapper = styled(motion.ul)(({ theme }) => ({
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.background.paper}`,
  borderRadius: '0 0 0.25rem 0.25rem',
  borderTop: 'none',
  boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)',
  overflow: 'hidden',
  position: 'absolute',
  width: '100%',
  zIndex: 2,
}));

const OptionWrapper = styled('li')({
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  fontSize: '0.875rem',
  gap: '1em',
  justifyContent: 'space-between',
  minHeight: '55px',
  padding: '0.5em 1em',

  svg: {
    padding: '5px',
    width: '40px',
  },
});

const ItemIcon = styled('img')({ width: '40px' });

const Option = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  textTransform: 'capitalize',
}));

const PokeID = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  marginLeft: 'auto',
}));

export { Container, ListWrapper, OptionWrapper, ItemIcon, Option, PokeID };
