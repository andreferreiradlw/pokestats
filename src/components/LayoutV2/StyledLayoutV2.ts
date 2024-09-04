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

const ScrollButton = styled(motion.div)`
  bottom: 20px;
  cursor: pointer;
  position: fixed;
  right: 20px;
  width: fit-content;
  z-index: 100;
`;

export { LayoutContainer, ScrollButton };
