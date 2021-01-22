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

const ellipsis = keyframes`
  0% {
    content: '.';
  }
  33% {
    content: '..';
  }
  66% {
    content: '...';
  }
`

export { float, ellipsis }
