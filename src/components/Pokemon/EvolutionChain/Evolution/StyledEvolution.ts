import styled, { css } from 'styled-components';
// svg
import Arrow from 'public/static/iconLibrary/arrows.svg';

const EvoArrow = styled(Arrow)`
  transform: rotateZ(90deg);
  width: 50px;

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      transform: none;
    }
  `}
`;

export { EvoArrow };
