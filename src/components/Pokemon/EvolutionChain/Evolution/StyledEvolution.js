import styled, { css, keyframes } from 'styled-components'
import Box from '../../../Box'
import Arrow from '../../../../assets/svg/arrows.svg'

// Create the keyframes for floating img
const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px)
  }
  100% {
    transform: translateY(0)
  }
`

const PokeImg = styled.img`
  width: 115px;
  transition: all 0.05s ease-in-out;
`

const PokeBox = styled(Box)`
  background-color: white;
  color: black;
  padding: 1rem;
  margin: 0.5rem;
  text-align: center;
  font-weight: 600;
  transition: all 0.05s ease-in-out;
  overflow: hidden;

  &:hover {
    cursor: pointer;

    & ${PokeImg} {
      transform: scale(2);
      @media (prefers-reduced-motion: no-preference) {
        animation: ${float} infinite 3s ease-in-out;
      }
    }
  }
`

const NumberId = styled.span`
  font-size: 2rem;
`

const PokeName = styled.span`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`

const EvoArrow = styled(Arrow)`
  width: 50px;
  margin-top: 0.5rem;
  transform: rotateZ(90deg);

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      transform: none;
    }
  `}
`

const PokeGen = styled.span`
  font-size: 1rem;
  font-weight: 300;
`

export { PokeBox, PokeImg, NumberId, PokeName, EvoArrow, PokeGen }
