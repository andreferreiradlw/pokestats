import styled, { css } from 'styled-components'
// components
import Box from '../Box'
// styles
import { SectionSubTitle } from '../BaseStyles'
// helpers
import { ellipsis, rotate } from '../BaseStyles'
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
  width: ${({ iconwidth }) => (iconwidth ? iconwidth : '200px')};
  height: auto;

  animation: 15s ${rotate} 0ms infinite ease-in-out;
  /** 
  -webkit-animation-name: shake-rotate;
  -ms-animation-name: shake-rotate;
  -webkit-animation-name: shake-rotate;
  -webkit-animation-duration: 100ms;
  -ms-animation-duration: 100ms;
  -webkit-animation-duration: 100ms;
  -webkit-animation-iteration-count: infinite;
  -ms-animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: ease-in-out;
  -ms-animation-timing-function: ease-in-out;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-delay: 0s;
  -ms-animation-delay: 0s;
  -webkit-animation-delay: 0s;
  */
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
