import { styled } from '@mui/material/styles';
// types
import type { ImageNextProps } from './index';
// animations
import { tumble } from '@/animations';
// components
import { motion } from 'framer-motion';
// svg
import EggIcon from 'public/static/iconLibrary/egg.svg';
import Error404Icon from 'public/static/iconLibrary/404_error.svg';

const ImageContainer = styled(motion.div, {
  shouldForwardProp: prop => prop !== 'width' && prop !== 'height' && prop !== '$pixelatedimg',
})<{
  width?: ImageNextProps['width'];
  height?: ImageNextProps['height'];
  $pixelatedimg?: ImageNextProps['pixelatedimg'];
}>(({ width, height, $pixelatedimg }) => ({
  alignItems: 'center',
  display: 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  position: 'relative',

  ...(width && {
    width: `${width}px`,
  }),

  height: height ? `${height}px` : 'auto',

  '& img': {
    height: height ? `${height}px !important` : 'auto !important',
    minHeight: height ? `${height}px` : 'auto',
    objectFit: 'contain',
    position: 'relative !important',
    willChange: 'opacity',

    ...(height && { width: 'auto !important' }),

    ...($pixelatedimg && {
      imageRendering: 'pixelated',
    }),
  },
}));

const ImageWrapper = styled(motion.div)({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
});

const LoadingIcon = styled(EggIcon)`
  animation: ${tumble} 5s ease-in-out 0s infinite;
`;

const ErrorIcon = styled(Error404Icon)({});

const PlaceholderContainer = styled(motion.div, {
  shouldForwardProp: prop => prop !== 'placeholderwidth' && prop !== 'height', // Ensure custom props are not passed to DOM
})<{
  placeholderwidth?: ImageNextProps['placeholderwidth'];
  height?: ImageNextProps['height'];
}>(({ height, placeholderwidth }) => ({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  padding: '15px 0',
  position: 'relative',

  [`& ${LoadingIcon}, & ${ErrorIcon}`]: {
    height: height ? `${height}px` : '100%',
    width: height ? 'auto' : '100%',
  },

  width: placeholderwidth ? `${placeholderwidth}` : '100%',
}));

const LoadingContainer = styled(PlaceholderContainer)({
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%) !important',
});

export {
  ImageContainer,
  LoadingIcon,
  ErrorIcon,
  PlaceholderContainer,
  LoadingContainer,
  ImageWrapper,
};
