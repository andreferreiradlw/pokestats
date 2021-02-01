import styled from 'styled-components'
import { motion } from 'framer-motion'
// components
import BoxWrapper from '../Box/StyledBox'

const FooterContainer = styled(motion.footer)`
  display: flex;
  flex-basis: auto;
  width: 100%;
  background-color: black;
  color: white;
  font-weight: 300;

  & span {
    margin: 1rem 0;
  }
`

const FooterA = styled.a`
  color: inherit;
  font-weight: 500;
  padding: 0 0 5px;
  position: relative;
  transition: ease-out 0.3s 0.1s;

  &:after {
    height: 2px;
    width: 100%;
    background: white;
    content: '';
    position: absolute;
    left: 0px;
    bottom: 0;
    transform: scaleX(0);
    transition: 0.3s;
  }

  &:hover:after {
    transform: scaleX(1);
  }

  & img {
    vertical-align: middle;
    height: 25px;
  }

  & svg {
    width: 20px;
    margin-left: 10px;
    vertical-align: bottom;
  }
`

export { FooterContainer, FooterA }
