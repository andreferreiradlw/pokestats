import styled, { css } from 'styled-components'
// svg
import Egg from '../../assets/svg/egg.svg'

const Image = styled.img`
  transition: all 0.05s ease-in-out;

  ${({ width }) =>
    width &&
    css`
      width: ${width || 'auto'};
    `}

  ${({ height }) =>
    css`
      height: ${height || 'auto'};
      ${height && `min-height: ${height};`}
    `}

  ${({ loaded }) =>
    !loaded &&
    css`
      display: none;
    `}

  ${({ pixelated }) =>
    pixelated &&
    css`
      image-rendering: pixelated;
    `}
`

const Placeholder = styled(Egg)`
  ${({ width }) =>
    width &&
    css`
      width: ${width || 'auto'};
    `}

  ${({ height }) =>
    height &&
    css`
      height: ${height || 'auto'};
    `}
`

export { Image, Placeholder }
