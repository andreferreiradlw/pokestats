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

const rotate = keyframes`
  0% { -webkit-transform: translate(0px, 0px) rotate(0deg); }
  2% { -webkit-transform: translate(0px, 0px) rotate(-0.5deg); }
  4% { -webkit-transform: translate(0px, 0px) rotate(-4.5deg); }
  6% { -webkit-transform: translate(0px, 0px) rotate(-2.5deg); }
  8% { -webkit-transform: translate(0px, 0px) rotate(4.5deg); }
  10% { -webkit-transform: translate(0px, 0px) rotate(-2.5deg); }
  12% { -webkit-transform: translate(0px, 0px) rotate(1.5deg); }
  14% { -webkit-transform: translate(0px, 0px) rotate(-3.5deg); }
  16% { -webkit-transform: translate(0px, 0px) rotate(3.5deg); }
  18% { -webkit-transform: translate(0px, 0px) rotate(-0.5deg); }
  20% { -webkit-transform: translate(0px, 0px) rotate(-5.5deg); }
  22% { -webkit-transform: translate(0px, 0px) rotate(0.5deg); }
  24% { -webkit-transform: translate(0px, 0px) rotate(4deg); }
  26% { -webkit-transform: translate(0px, 0px) rotate(-0.5deg); }
  28% { -webkit-transform: translate(0px, 0px) rotate(1.5deg); }
  30% { -webkit-transform: translate(0px, 0px) rotate(3.5deg); }
  32% { -webkit-transform: translate(0px, 0px) rotate(-4.5deg); }
  34% { -webkit-transform: translate(0px, 0px) rotate(-2.5deg); }
  36% { -webkit-transform: translate(0px, 0px) rotate(-5.5deg); }
  38% { -webkit-transform: translate(0px, 0px) rotate(-0.5deg); }
  40% { -webkit-transform: translate(0px, 0px) rotate(0.5deg); }
  42% { -webkit-transform: translate(0px, 0px) rotate(-2.5deg); }
  44% { -webkit-transform: translate(0px, 0px) rotate(2.5deg); }
  46% { -webkit-transform: translate(0px, 0px) rotate(0.5deg); }
  48% { -webkit-transform: translate(0px, 0px) rotate(6.5deg); }
  50% { -webkit-transform: translate(0px, 0px) rotate(5.5deg); }
  52% { -webkit-transform: translate(0px, 0px) rotate(6.5deg); }
  54% { -webkit-transform: translate(0px, 0px) rotate(6.5deg); }
  56% { -webkit-transform: translate(0px, 0px) rotate(-6.5deg); }
  58% { -webkit-transform: translate(0px, 0px) rotate(5.5deg); }
  60% { -webkit-transform: translate(0px, 0px) rotate(1.5deg); }
  62% { -webkit-transform: translate(0px, 0px) rotate(-5.5deg); }
  64% { -webkit-transform: translate(0px, 0px) rotate(0.5deg); }
  66% { -webkit-transform: translate(0px, 0px) rotate(-4.5deg); }
  68% { -webkit-transform: translate(0px, 0px) rotate(-1.5deg); }
  70% { -webkit-transform: translate(0px, 0px) rotate(3.5deg); }
  72% { -webkit-transform: translate(0px, 0px) rotate(1.5deg); }
  74% { -webkit-transform: translate(0px, 0px) rotate(-6.5deg); }
  76% { -webkit-transform: translate(0px, 0px) rotate(0.5deg); }
  78% { -webkit-transform: translate(0px, 0px) rotate(-3.5deg); }
  80% { -webkit-transform: translate(0px, 0px) rotate(5.5deg); }
  82% { -webkit-transform: translate(0px, 0px) rotate(-5.5deg); }
  84% { -webkit-transform: translate(0px, 0px) rotate(-2.5deg); }
  86% { -webkit-transform: translate(0px, 0px) rotate(1.5deg); }
  88% { -webkit-transform: translate(0px, 0px) rotate(-6.5deg); }
  90% { -webkit-transform: translate(0px, 0px) rotate(1.5deg); }
  92% { -webkit-transform: translate(0px, 0px) rotate(-4.5deg); }
  94% { -webkit-transform: translate(0px, 0px) rotate(-2.5deg); }
  96% { -webkit-transform: translate(0px, 0px) rotate(0.5deg); }
  98% { -webkit-transform: translate(0px, 0px) rotate(4.5deg); } 
`

export { float, ellipsis, rotate }
