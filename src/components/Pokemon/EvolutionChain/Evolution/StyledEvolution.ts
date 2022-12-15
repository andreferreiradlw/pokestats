import styled, { css } from 'styled-components';
// svg
import Arrow from '@/assets/svg/arrows.svg';

const EvoArrow = styled(Arrow)`
  margin: 0.5rem 0 1rem;
  transform: rotateZ(90deg);
  width: 50px;

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      transform: none;
    }
  `}
`;

const PokeGen = styled.span`
  font-size: 1rem;
  font-weight: 300;
`;

export { EvoArrow, PokeGen };
