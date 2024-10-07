import { styled } from '@mui/material/styles';
// components
import { motion } from '@/client';
// svg
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const EvolutionContainer = styled(motion.div)({
  alignItems: 'center',
  display: 'flex',
  flexBasis: 0,
  flexDirection: 'column',
  flexGrow: 1,
  gap: '1em',
  justifyContent: 'space-between',
});

const EvoArrow = styled(ArrowDownwardIcon)`
  flex-shrink: 0;
  transition: transform 0.2s ease-in-out;
  width: 50px;
`;

const EvoDetailsContainer = styled(motion.div)`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1em;
  justify-content: space-between;
  width: auto;

  &:hover .evo-arrow {
    transform: translateY(0.25em);
  }
`;

export { EvolutionContainer, EvoDetailsContainer, EvoArrow };
