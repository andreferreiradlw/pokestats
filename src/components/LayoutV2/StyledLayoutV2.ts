import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const LayoutContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const ChildrenContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  flex-grow: 1;

  ${({ theme }) => `
  padding-top: ${theme.spacing(4)};
  padding-bottom: ${theme.spacing(4)};
  `}
`;

const ScrollButton = styled(motion.div)`
  bottom: 30px;
  cursor: pointer;
  position: fixed;
  right: 30px;
  width: fit-content;
  z-index: 100;
`;

export { LayoutContainer, ChildrenContainer, ScrollButton };
