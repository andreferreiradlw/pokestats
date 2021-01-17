import { keyframes } from 'styled-components'

// Create the keyframes for floating img
const float = keyframes`
  0% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(5px)
  }
  100% {
    transform: translateY(-5px)
  }
`

export { float }
