import styled, { css } from 'styled-components';
// types
import type { ImageNextProps } from './index';
// helpers
import { tumble } from '@/components/BaseStyles';
// components
import { motion } from 'framer-motion';
import Image from 'next/image';
import Box from '@/components/Box/';
// icons
import EggIcon from 'public/static/iconLibrary/egg.svg';
import Error404Icon from 'public/static/iconLibrary/404_error.svg';

const ImageElement = styled(Image)`
  object-fit: contain;
  position: relative !important;
  will-change: opacity;
`;

const ImageContainer = styled(Box)<{
  width?: ImageNextProps['width'];
  height?: ImageNextProps['height'];
  $pixelatedImg?: ImageNextProps['$pixelatedImg'];
}>`
  position: relative;

  ${({ $pixelatedImg }) =>
    $pixelatedImg &&
    css`
      ${ImageElement} {
        image-rendering: pixelated;
      }
    `}

  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}

  ${({ height }) =>
    css`
      height: ${height ? `${height}px` : 'auto'};

      ${ImageElement} {
        height: ${height ? `${height}px` : 'auto'} !important;
        min-height: ${height ? `${height}px` : 'auto'};
        ${height && `width: auto !important;`}
      }
    `}
`;

const LoadingIcon = styled(EggIcon)`
  animation: ${tumble} 5s ease-in-out 0s infinite;
`;

const ErrorIcon = styled(Error404Icon)``;

const PlaceholderContainer = styled(motion.div)<{
  placeholderwidth?: ImageNextProps['placeholderwidth'];
  height?: ImageNextProps['height'];
}>`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 15px 0;
  position: relative;

  ${LoadingIcon}, ${ErrorIcon} {
    ${({ height }) =>
      css`
        height: ${height ? `${height}px` : '100%'};
        width: ${height ? 'auto' : '100%'};
      `}
  }
  // width relative to container
  ${({ placeholderwidth }) =>
    css`
      width: ${placeholderwidth ? `${placeholderwidth}` : '100%'};
    `}
`;

const LoadingContainer = styled(PlaceholderContainer)`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%) !important;
`;

const ImageWrapper = styled(motion.span)`
  position: relative;
  width: 100%;
`;

export {
  ImageElement,
  ImageContainer,
  LoadingIcon,
  ErrorIcon,
  PlaceholderContainer,
  LoadingContainer,
  ImageWrapper,
};
