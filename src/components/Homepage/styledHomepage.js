import styled from 'styled-components'
import { motion } from 'framer-motion'
// components
import BoxWrapper from '../Box/StyledBox'
// styles
import { mouseScroll } from '../BaseStyles'

const Container = styled(BoxWrapper)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: auto;
  height: 100vh;
  min-height: 100vh;
  z-index: 1;
`

const RepoAnchor = styled(motion.a)`
  position: absolute;
  top: 20px;
  right: 20px;

  &:hover svg {
    fill: white;
    background: black;
  }

  svg {
    width: 50px;
    height: auto;
    border-radius: 30%;
  }
`

const ScrollDown = styled(motion.span)`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 20px;
  height: 45px;
  width: 30px;
  border: 2px solid black;
  border-radius: 25px;

  &:before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    width: 6px;
    height: 6px;
    margin-left: -3px;
    background-color: black;
    border-radius: 100%;
    animation: ${mouseScroll} 2s linear infinite;
  }
`

export { Container, RepoAnchor, ScrollDown }
