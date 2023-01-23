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
  height: 50vh;
  justify-content: center;
  margin: auto;
  min-height: 50vh;
  position: relative;
  width: 100%;
  z-index: 1;
`;

const GithubLink = styled(motion.a)`
  position: absolute;
  right: 20px;
  top: 20px;

  &:hover svg {
    ${({ theme }) => css`
      background: ${theme.colors.secondary.main};
      fill: ${theme.colors.primary.main};
    `}
  }

  svg {
    border-radius: 30%;
    height: auto;
    width: 50px;
  }
`;

const ScrollContainer = styled(motion.div)`
  bottom: 10px;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
`;

const ScrollDown = styled(ArrowDownIcon)`
  animation: ${bounce} 1.5s ease-in-out 0s infinite;

  width: 40px;
`;

const ListContainer = styled(Box)`
  ${({ theme }) => css`
    background: ${theme.colors.primary.main};
    color: ${theme.colors.primary.contrastText};
  `}
`;

export { Container, GithubLink, ScrollContainer, ScrollDown, ListContainer };
