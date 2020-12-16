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
      font-size: 4rem;
      line-height: 4.5rem;
    }
    @media ${theme.device.md} {
      font-size: 6rem;
      line-height: 6.5rem;
    }
  `}
`

const Id = styled.span`
  color: #616161;
  margin-left: 0.25em;
  font-size: 1rem;
  line-height: 1.5rem;

  ${({ theme }) => css`
    @media ${theme.device.sm} {
      font-size: 1.5rem;
      line-height: 2rem;
    }
    @media ${theme.device.md} {
      font-size: 2.5rem;
      line-height: 3rem;
    }
    @media ${theme.device.md} {
      font-size: 4rem;
      line-height: 4.5rem;
    }
  `}
`
// Create the keyframes
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
  max-width: 70%;
  margin-bottom: 10%;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${float} infinite 3s ease-in-out;
  }
`

// image section

export { Name, Id, ImageContainer, Image }
