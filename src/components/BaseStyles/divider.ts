import styled, { css } from 'styled-components';
import { responsiveProps } from '@/helpers';

const Divider = styled.hr`
  height: 5px;
  width: 100%;

  ${({ theme }) =>
    css`
      background: ${theme.colors.secondary.main};
      ${responsiveProps('max-width', theme.layout.constrained)}
      ${responsiveProps('padding', theme.layout.gutterWidth)}
    `};
`;

export { Divider };
