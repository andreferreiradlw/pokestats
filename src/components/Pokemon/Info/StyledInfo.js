import styled, { css, keyframes } from 'styled-components'
import Box from '../../Box'

const Name = styled.h1`
  font-size: 2.5rem;
  line-height: 3rem;
  font-weight: 700;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 3.5rem;
      line-height: 4rem;
    }
    @media ${theme.device.sm} {
      font-size: 5rem;
      line-height: 5.5rem;
    }
    @media ${theme.device.md} {
      font-size: 8rem;
      line-height: 8.5rem;
    }
    @media ${theme.device.lg} {
      font-size: 5.3rem;
      line-height: 6rem;
    }
  `}
`

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
  min-height: 500px;
`
const Image = styled.img`
  max-width: 80%;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      max-width: 55%;
    }
    @media ${theme.device.sm} {
      max-width: 50%;
    }
    @media ${theme.device.md} {
      max-width: 40%;
    }
    @media ${theme.device.lg} {
      max-width: 50%;
    }
  `}

  @media (prefers-reduced-motion: no-preference) {
    animation: ${float} infinite 3s ease-in-out;
  }
`

const Genera = styled.p`
  font-weight: 700;
  margin-bottom: 0.5rem;
`
const Flavor = styled.p`
  margin-bottom: 1rem;
`

export { Name, ImageContainer, Image, Genera, Flavor }
