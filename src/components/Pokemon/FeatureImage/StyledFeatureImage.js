import styled, { css } from 'styled-components'
// components
import Box from '../../Box'
import Image from '../../Image'
// styles
import { float } from '../../BaseStyles'

// image
const FeatureImage = styled(Image)`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${float} infinite 3s ease-in-out;
  }
`

const ImageContainer = styled(Box)`
  ${({ theme }) => css`
    @media ${theme.device.lg} {
      min-height: 300px;
    }
  `}

  & ${FeatureImage} {
    max-width: 80%;
    margin: 1.5rem 0;

    ${({ theme }) => css`
      @media ${theme.device.xs} {
        max-width: 65%;
      }
      @media ${theme.device.sm} {
        max-width: 60%;
      }
      @media ${theme.device.md} {
        max-width: 55%;
      }
      @media ${theme.device.lg} {
        max-width: 60%;
      }
    `}
  }
`

export { ImageContainer, FeatureImage }
