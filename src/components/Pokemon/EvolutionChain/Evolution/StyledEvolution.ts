import { styled } from '@mui/material/styles';
// components
import { motion } from 'framer-motion';
// svg
import Arrow from 'public/static/iconLibrary/arrow_right.svg';

const EvolutionContainer = styled(motion.div)({
  alignItems: 'center',
  display: 'flex',
  flexBasis: 0,
  flexDirection: 'column',
  flexGrow: 0,
  gap: '1em',
  justifyContent: 'space-between',
});

const EvoArrow = styled(Arrow)`
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
