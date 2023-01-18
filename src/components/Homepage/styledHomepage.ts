import styled, { css } from 'styled-components';
// helpers
import { bounce } from '@/components/BaseStyles';
// components
import { motion } from 'framer-motion';
import Box from '@/components/Box';
import BoxWrapper from '@/components/Box/StyledBox';
// icons
import ArrowDownIcon from 'public/static/iconLibrary/arrow_down.svg';

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

const GithubLink = styled(motion.a)`
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

const ScrollDown = styled(ArrowDownIcon)`
  animation: ${bounce} 1.5s ease-in-out 0s infinite;
  bottom: 10px;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 40px;
`;

const ListContainer = styled(Box)`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
  `}
`;

export { Container, GithubLink, ScrollDown, ListContainer };
