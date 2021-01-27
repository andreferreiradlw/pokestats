import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
// helpers
import { tumble } from '../BaseStyles/keyframes'
// svg
import Egg from '../../assets/svg/egg.svg'

const ImageWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${({ height }) =>
    css`
      min-height: ${height ? `${height}px` : '135px'};
    `}
`

const Image = styled(motion.img)`
  will-change: opacity;

  ${({ width }) =>
    width &&
    css`
      width: ${width ? `${width}px` : 'auto'};
    `}

  ${({ height }) =>
    css`
      height: ${height ? `${height}px` : 'auto'};
      ${height && `min-height: ${height}px;`}
    `}

  ${({ pixelated }) =>
    pixelated &&
    css`
      image-rendering: pixelated;
    `}
`

const Placeholder = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;

  ${({ width }) =>
    css`
      width: ${width ? `${width}px` : '100%'};
    `}

  ${({ height }) =>
    css`
      height: ${height ? `${height}px` : '100%'};
    `}
`

const EggIcon = styled(Egg)`
  animation: ${tumble} 5s ease-in-out 0s infinite;

  ${({ placeholderWidth }) =>
    css`
      width: ${placeholderWidth ? `${placeholderWidth}` : 'auto'};
    `}
`

export { ImageWrapper, Image, Placeholder, EggIcon }
