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

const PokeImg = styled.img`
  min-height: 105px;
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

export { PokeBox, PokeImg }
