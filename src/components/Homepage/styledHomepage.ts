import styled, { css } from 'styled-components';
// helpers
import { rotate } from '@/BaseStyles';
// components
import { motion } from 'framer-motion';
import BoxWrapper from '@/components/Box/StyledBox';
// icons
import PokeballIcon from 'public/static/iconLibrary/pokeball.svg';

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
    border-radius: 25%;
    height: auto;
    width: 30px;

    ${({ theme }) => css`
      @media ${theme.device.sm} {
        width: 50px;
      }
    `}
  }
`;

const ListContainer = styled(BoxWrapper)`
  ${({ theme }) => css`
    background: ${theme.colors.primary.main};
    color: ${theme.colors.primary.contrastText};
  `}
`;

const Pokeball = styled(PokeballIcon)`
  width: 1em;
  // rotation
  animation: 3s ${rotate} 0ms infinite linear;
`;

export { Container, GithubLink, ListContainer, Pokeball };
