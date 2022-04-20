import styled, { css } from 'styled-components'
// components
import BoxWrapper from '../Box/StyledBox'
// styles
import { SectionSubTitle, ellipsis, rotate, riseUp } from '../BaseStyles'
// helpers
import { responsiveProps } from '../../helpers/box'
//svg
import Potion from '../../assets/svg/potion.svg'

const LoadingContainer = styled(BoxWrapper)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 2;
  flex-grow 1;
  // background-color: white;

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
  ${({ $iconWidth }) => $iconWidth && responsiveProps('width', $iconWidth)}
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
