import styled, { css } from 'styled-components';
// svg
import Arrow from 'public/static/iconLibrary/arrows.svg';

const EvoArrow = styled(Arrow)`
  flex-shrink: 0;
  transform: rotateZ(90deg);
  width: 15px;

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      transform: none;
    }
  `}
`;

export { EvoArrow };
