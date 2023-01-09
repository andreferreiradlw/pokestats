import styled from 'styled-components';
// types
import type { BoxProps } from '@/components/Box';
// config
import { boxConfig } from '@/components/Box/config';
// helpers
import { responsiveProps } from '@/helpers/box';
// components
import { motion } from 'framer-motion';
import BoxWrapper from '@/components/Box/StyledBox';

const LayoutContainer = styled(BoxWrapper)`
  gap: 3em;
  min-height: 100vh;
`;

// main container
const MainContainer = styled(motion.main)<{
  flexalign?: BoxProps['flexalign'];
  flexjustify?: BoxProps['flexjustify'];
  constrained?: BoxProps['constrained'];
  flexgutter?: BoxProps['flexgutter'];
}>`
  align-items: ${({ flexalign }) => flexalign || 'center'};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 3em;
  justify-content: ${({ flexjustify }) => flexjustify || 'center'};
  margin: 0 auto;
  width: 100%;

  ${({ constrained }) => constrained && `max-width: ${boxConfig.constrained};`}
  ${({ flexgutter }) => flexgutter && responsiveProps('padding', boxConfig.gutterWidth)}
`;

export { LayoutContainer, MainContainer };
