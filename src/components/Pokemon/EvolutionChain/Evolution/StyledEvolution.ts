import { default as styledSC } from 'styled-components';
import { styled } from '@mui/material';
// components
import { motion } from 'framer-motion';
// svg
import Arrow from 'public/static/iconLibrary/arrow_right.svg';

const EvolutionContainer = styled(motion.div)`
  align-items: center;
  display: flex;
  flex-basis: 0;
  flex-direction: column;
  flex-grow: 1;
  gap: 1em;
  justify-content: space-between;
  min-width: 0;
`;

const EvoArrow = styledSC(Arrow)`
  flex-shrink: 0;
  transform: rotateZ(90deg);
  transition: transform 0.2s ease-in-out;
  width: 35px;
`;

const EvoDetailsContainer = styled(motion.div)`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1em;
  justify-content: space-between;
  width: auto;

  &:hover ${EvoArrow} {
    transform: translateY(0.75em) rotateZ(90deg);
  }
`;

export { EvolutionContainer, EvoDetailsContainer, EvoArrow };
