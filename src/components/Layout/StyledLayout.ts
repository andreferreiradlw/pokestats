import styled from 'styled-components';
// types
import type { BoxProps } from '@/components/Box';
// helpers
import { responsiveProps } from '@/helpers/box';
// components
import { motion } from 'framer-motion';
import BoxWrapper from '@/components/Box/StyledBox';

const LayoutContainer = styled(BoxWrapper)`
  min-height: 100vh;
`;

// main container
const MainContainer = styled(motion.main)<{
  flexalign?: BoxProps['flexalign'];
  flexjustify?: BoxProps['flexjustify'];
  $contained?: BoxProps['$contained'];
  $withGutter?: BoxProps['$withGutter'];
}>`
  align-items: ${({ flexalign }) => flexalign || 'center'};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: ${({ theme }) => theme.layout.gap};
  justify-content: ${({ flexjustify }) => flexjustify || 'center'};
  margin: 0 auto;
  width: 100%;

  ${({ $contained, theme }) => $contained && responsiveProps('max-width', theme.layout.contained)}
  ${({ $withGutter, theme }) => $withGutter && responsiveProps('padding', theme.layout.gutterWidth)}
`;

export { LayoutContainer, MainContainer };
