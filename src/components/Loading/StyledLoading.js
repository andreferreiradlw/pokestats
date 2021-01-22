import styled, { css } from 'styled-components'
// components
import Box from '../Box'
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

export { LoadingContainer, PotionIcon }
