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
  max-width: 150px;
  width: 150px;
  background-color: white;
  color: black;
  padding: 1rem;
  margin: 0.5rem;
  border: 1px solid transparent;
  border-radius: 4px;
  text-align: center;
  font-weight: 600;
  transition: border 0.1s ease-in-out;
  transition: box-shadow 0.15s ease-in-out;
  // overflow: hidden;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    border: 1px solid black;
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.75);

    &:active {
      transition: box-shadow 0.01s ease-in-out;
      box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.75) inset;
    }

    & ${PokeImg} {
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
  margin: 0.5rem 0 1rem;
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
