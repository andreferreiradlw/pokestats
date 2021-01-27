import styled, { css } from 'styled-components'
// components
import Box from '../../Box'

const ImageContainer = styled(Box)`
  ${({ theme }) => css`
    @media ${theme.device.lg} {
      min-height: 300px;
    }
  `}

  & img {
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

export { ImageContainer }
