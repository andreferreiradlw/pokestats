import styled, { css } from 'styled-components'
// components
import Box from '../Box'
// styles
import { SectionSubTitle } from '../BaseStyles'
// helpers
import { ellipsis, rotate, riseUp } from '../BaseStyles'
//svg
import Potion from '../../assets/svg/potion.svg'

const LoadingContainer = styled(Box)`
  ${({ height }) =>
    height
      ? css`
          height: ${height};
          max-height: ${height};
        `
      : css`
          height: auto;
        `}
`

const PotionIcon = styled(Potion)`
  ${({ iconwidth }) =>
    css`
      width: ${iconwidth};
    `}
  height: auto;
  // rotation
  animation: 20s ${rotate} 0ms infinite ease-in-out;
  // rise up
  circle {
    animation: ${riseUp} 2s infinite linear;
  }
  .potion_svg__bubble-1 {
    animation-delay: 0.5s;
  }
  .potion_svg__bubble-2 {
    animation-delay: 0.3s;
  }
  .potion_svg__bubble-3 {
    animation-delay: 0.8s;
  }
  .potion_svg__bubble-4 {
    animation-delay: 1s;
  }
  .potion_svg__bubble-5 {
    animation-delay: 0.1s;
  }
`

const Text = styled(SectionSubTitle)`
  margin-top: 2rem;

  &:after {
    display: inline-block;
    animation: ${ellipsis} 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
`

export { LoadingContainer, PotionIcon, Text }
