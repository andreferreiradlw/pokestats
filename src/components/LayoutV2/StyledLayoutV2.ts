import { Container, styled } from '@mui/material';
import { motion } from 'framer-motion';

const LayoutContainer = styled(Container)`
  min-height: 100vh;
  position: relative;
`;

const ScrollButton = styled(motion.div)`
  bottom: 20px;
  cursor: pointer;
  position: fixed;
  right: 20px;
  width: fit-content;
  z-index: 100;
`;

export { LayoutContainer, ScrollButton };
