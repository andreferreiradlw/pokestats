import styled from 'styled-components';
import { motion } from 'framer-motion';
// components
import BoxWrapper from '@/components/Box/StyledBox';
// styles
import { mouseScroll } from '@/components/BaseStyles';

const Container = styled(BoxWrapper)`
  align-items: center;
  flex-direction: column;
  gap: 1em;
  height: 100vh;
  justify-content: center;
  margin: auto;
  min-height: 100vh;
  position: relative;
  z-index: 1;
`;

const RepoAnchor = styled(motion.a)`
  position: absolute;
  right: 20px;
  top: 20px;

  &:hover svg {
    background: black;
    fill: white;
  }

  svg {
    border-radius: 30%;
    height: auto;
    width: 50px;
  }
`;

const ScrollDown = styled(motion.span)`
  border: 2px solid black;
  border-radius: 25px;
  bottom: 20px;
  height: 45px;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  right: 0;
  width: 30px;

  &:before {
    animation: ${mouseScroll} 2s linear infinite;
    background-color: black;
    border-radius: 100%;
    content: '';
    height: 6px;
    left: 50%;
    margin-left: -3px;
    position: absolute;
    top: 8px;
    width: 6px;
  }
`;

export { Container, RepoAnchor, ScrollDown };
