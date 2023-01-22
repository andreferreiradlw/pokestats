import styled from 'styled-components';
// components
import Box from '@/components/Box';
import BoxWrapper from '@/components/Box/StyledBox';
// svg
import Arrow from 'public/static/iconLibrary/arrow_right.svg';

const EvolutionContainer = styled(BoxWrapper)`
  flex-basis: 0;
  flex-grow: 1;
  min-width: 0;
`;

const EvoArrow = styled(Arrow)`
  flex-shrink: 0;
  transform: rotateZ(90deg);
  transition: transform 0.2s ease-in-out;
  width: 35px;
`;

const EvoDetailsContainer = styled(Box)`
  flex-grow: 1;

  &:hover ${EvoArrow} {
    transform: translateY(0.75em) rotateZ(90deg);
  }
`;

export { EvolutionContainer, EvoDetailsContainer, EvoArrow };
