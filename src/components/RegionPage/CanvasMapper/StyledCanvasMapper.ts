import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

// Reusable absolute position styles
const absolutePosition = {
  left: 0,
  position: 'absolute' as const,
  top: 0,
};

// Styled components using MUI's `styled` utility
const ContainerEl = styled(Paper)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
}));

const ImageEl = styled('img')({
  ...absolutePosition,
  userSelect: 'none',
  zIndex: 1,
});

const CanvasEl = styled('canvas')({
  ...absolutePosition,
  pointerEvents: 'none',
  zIndex: 2,
});

const MapEl = styled('map')({
  cursor: 'pointer',
});

const LocationLabel = styled('div')(({ theme }) => ({
  bottom: 0,
  fontSize: '1.2em',
  fontWeight: '600',
  position: 'absolute',
  right: 0,
  zIndex: 2,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
}));

export { ContainerEl, ImageEl, CanvasEl, MapEl, LocationLabel };
