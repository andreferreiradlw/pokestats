import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
// types
import type { ImageProps } from './index';
// helpers
import { tumble } from '../BaseStyles/keyframes';
// components
import Box from '@/components/Box';
// assets
import Egg from '@/assets/svg/egg.svg';

const ImageWrapper = styled(Box)`
  align-items: center;
  display: flex;
  justify-content: center;

  ${({ width }) =>
    css`
      width: ${width ? `${width}px` : '100%'};
    `}

  ${({ height }) =>
    css`
      height: ${height ? `${height}px` : 'auto'};
    `}
`;

const Image = styled(motion.img)<
  { $pixelateImg: ImageProps['pixelateImg'] } & React.ImgHTMLAttributes<HTMLImageElement>
>`
  will-change: opacity;
  // adjust to wrapper
  ${({ height }) =>
    css`
      height: ${height ? `${height}px` : 'auto'};
      min-height: ${height ? `${height}px` : 'auto'};
      width: ${height ? `auto` : '100%'};
    `}

  ${({ $pixelateImg }) =>
    $pixelateImg &&
    css`
      image-rendering: pixelated;
    `}
`;

const Placeholder = styled(motion.div)`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 15px 0;
  width: 100%;
`;

const EggIcon = styled(Egg)`
  animation: ${tumble} 5s ease-in-out 0s infinite;
  ${({ height }) =>
    css`
      height: ${height ? `${height}px` : 'auto'};
    `}
  // width relative to container
  ${({ placeholderwidth }) =>
    css`
      width: ${placeholderwidth ? `${placeholderwidth}` : 'auto'};
    `}
`;

export { ImageWrapper, Image, Placeholder, EggIcon };
