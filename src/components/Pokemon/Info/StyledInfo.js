import styled, { css, keyframes } from 'styled-components'
import Box from '../../Box'
import pokemonBackground from '../../../assets/pokemonBackground.png'

const Name = styled.h1`
  font-size: 2.5rem;
  line-height: 3rem;
  font-weight: 700;
  margin: 1.5rem 0;

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
  min-height: 400px;
  padding: 0;
  background-image: url(${pokemonBackground});
  background-size: cover;
  box-shadow: inset 0px 0px 36px 50px rgba(255, 255, 255, 1);
`
const Image = styled.img`
  max-width: 80%;
  margin-bottom: 20%;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      max-width: 55%;
    }
    @media ${theme.device.sm} {
      max-width: 50%;
      margin-bottom: 10%;
    }
    @media ${theme.device.md} {
      max-width: 40%;
      margin-bottom: 2%;
    }
    @media ${theme.device.lg} {
      margin-bottom: 15%;
      max-width: 60%;
    }
  `}

  @media (prefers-reduced-motion: no-preference) {
    animation: ${float} infinite 3s ease-in-out;
  }
`

const Genera = styled.p`
  font-size: 1.6rem;
  line-height: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`
const Flavor = styled.p`
  font-size: 1.2rem;
  line-height: 1.5rem;
  margin-bottom: 1.5rem;
`

const DescriptionList = styled(Box)`
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.2rem;
  word-break: break-all;

  & dt,
  & dd {
    padding: 0.5rem 4px 2px;
    margin-bottom: 0.5rem;
  }

  & dt:not(:last-of-type),
  & dd:not(:last-of-type) {
    border-bottom: 1px solid red;
  }

  & dt {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
    font-weight: 600;
  }

  & dd {
    flex: 0 0 66.66667%;
    max-width: 66.66667%;
    font-weight: 400;

    & span:not(:last-of-type) {
      margin-right: 0.5rem;
    }
  }
`

// image section

export { Name, ImageContainer, Image, Genera, Flavor, DescriptionList }
