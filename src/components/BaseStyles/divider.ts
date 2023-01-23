import styled, { css } from 'styled-components';
// helpers
import { responsiveProps } from '@/helpers';
// components
import { motion } from 'framer-motion';

const Divider = styled(motion.hr)`
  height: 5px;
  width: 100%;

  ${({ theme }) =>
    css`
      background: ${theme.colors.secondary.main};
      ${responsiveProps('max-width', theme.layout.contained)}
      ${responsiveProps('padding', theme.layout.gutterWidth)}
    `};
`;

export { Divider };
