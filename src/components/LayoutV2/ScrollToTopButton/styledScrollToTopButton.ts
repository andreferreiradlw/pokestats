import { styled } from '@mui/material';
import { motion } from '@/client';

export const ScrollButton = styled(motion.div)`
  bottom: 30px;
  cursor: pointer;
  position: fixed;
  right: 30px;
  width: fit-content;
  z-index: 100;
`;
