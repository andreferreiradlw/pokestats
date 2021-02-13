import styled from 'styled-components'
import { motion } from 'framer-motion'
// components
import BoxWrapper from '../Box/StyledBox'

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
    width: 65px;
    height: auto;
    border-radius: 30%;
  }
`

export { Container, RepoAnchor }
