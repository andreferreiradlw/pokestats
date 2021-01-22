import styled, { css } from 'styled-components'
// components
import Box from '../Box'
// styles
import { SectionSubTitle } from '../BaseStyles'
// helpers
import { ellipsis } from '../BaseStyles'
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
