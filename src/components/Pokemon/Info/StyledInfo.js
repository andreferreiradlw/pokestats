import styled, { css, keyframes } from 'styled-components'
import Box from '../../Box'

// Create the keyframes for floating img
const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px)
  }
  100% {
    transform: translateY(0px)
  }
`
// image
const ImageContainer = styled(Box)`
  ${({ theme }) => css`
    @media ${theme.device.lg} {
      min-height: 500px;
    }
  `}
`
const Image = styled.img`
  max-width: 80%;
  margin: 1.5rem 0;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      max-width: 70%;
    }
    @media ${theme.device.sm} {
      max-width: 65%;
    }
    @media ${theme.device.md} {
      max-width: 60%;
    }
    @media ${theme.device.lg} {
      max-width: 55%;
    }
  `}

  @media (prefers-reduced-motion: no-preference) {
    animation: ${float} infinite 3s ease-in-out;
  }
`

export { ImageContainer, Image }
