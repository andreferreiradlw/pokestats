import { styled } from '@mui/material/styles';
// types
import type { ImageNextV2Props } from './index';
// animations
import { tumble } from '@/animations';
// components
import { motion } from '@/client';
import Image from 'next/image';
// svg
import EggIcon from 'public/static/iconLibrary/egg.svg';
import Error404Icon from 'public/static/iconLibrary/404_error.svg';

const ImageEl = styled(Image, {
  shouldForwardProp: prop => prop !== 'pixelatedimg',
})<{
  pixelatedimg?: ImageNextV2Props['pixelatedimg'];
}>(({ pixelatedimg }) => ({
  objectFit: 'contain',
  willChange: 'opacity',
  maxHeight: 'inherit',

  ...(pixelatedimg && {
    imageRendering: 'pixelated',
  }),

  '&': {
    position: 'relative !important',
  },
}));

const PlaceholderContainer = styled(motion.div, {
  shouldForwardProp: prop => prop !== 'placeholderwidth',
})<{
  placeholderwidth?: ImageNextV2Props['placeholderwidth'];
}>(({ theme, placeholderwidth }) => ({
  alignItems: 'center',
  width: placeholderwidth ? `${placeholderwidth}` : '100%',
  justifyContent: 'center',
  padding: `${theme.spacing(1)} ${theme.spacing(0.5)}`,
  position: 'relative',
}));

const LoadingIcon = styled(EggIcon)`
  animation: ${tumble} 5s ease-in-out 0s infinite;
  /* width: 50%; */
`;

const ErrorIcon = styled(Error404Icon)(({ theme }) => ({
  width: '50%',
  fill: theme.palette.text.primary,
}));

export { LoadingIcon, ErrorIcon, PlaceholderContainer, ImageEl };
