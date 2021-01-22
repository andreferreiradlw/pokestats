import styled, { css } from 'styled-components'
// svg
import Egg from '../../assets/svg/egg.svg'

const Image = styled.img`
  transition: all 0.05s ease-in-out;

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
      width: ${width ? `${width}px` : 'auto'};
    `}

  ${({ height }) =>
    height &&
    css`
      height: ${height ? `${height}px` : 'auto'};
    `}
`

export { Image, Placeholder }
