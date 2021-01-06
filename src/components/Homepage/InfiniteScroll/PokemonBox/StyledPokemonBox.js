import styled, { css, keyframes } from 'styled-components'
import Box from '../../../Box'

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

const NumberId = styled.span`
  font-size: 2rem;
`

const PokeImg = styled.img`
  min-height: 105px;
  transition: all 0.05s ease-in-out;
`

const PokeName = styled.span`
  font-size: 1.2rem;
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
    box-shadow: 2px 2px 10px 1px rgba(255, 255, 255, 0.9);
    transform: scale(1.01);

    & ${PokeImg} {
      transform: scale(1.01);
      @media (prefers-reduced-motion: no-preference) {
        animation: ${float} infinite 3s ease-in-out;
      }
    }
  }

  &:active {
    box-shadow: none;
    transform: scale(1);
  }
`

export { PokeBox, PokeImg, NumberId, PokeName }
