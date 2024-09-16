import { styled } from '@mui/material/styles';

// Reusable absolute position styles
const absolutePosition = {
  left: 0,
  position: 'absolute' as const,
  top: 0,
};

// Styled components using MUI's `styled` utility
const ContainerEl = styled('div')({
  position: 'relative',
});

const ImageEl = styled('img')<{ hide?: boolean }>(({ hide }) => ({
  ...absolutePosition,
  userSelect: 'none',
  zIndex: 1,
  display: hide ? 'none' : 'block', // Conditional styling for hiding
}));

const CanvasEl = styled('canvas')({
  ...absolutePosition,
  pointerEvents: 'none',
  zIndex: 2,
});

const MapEl = styled('map')({
  cursor: 'pointer',
});

export { ContainerEl, ImageEl, CanvasEl, MapEl };
