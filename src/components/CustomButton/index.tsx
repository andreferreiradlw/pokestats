import { hoverVariant } from '@/animations';
import type { ButtonProps } from '@mui/material';
import { Button as MuiButton } from '@mui/material';
import { motion } from 'framer-motion';

const CustomButton = ({ children, ...rest }: ButtonProps): JSX.Element => (
  <motion.div whileHover="hover" whileTap="tap" variants={hoverVariant} key="custom-button">
    <MuiButton {...rest}>{children}</MuiButton>
  </motion.div>
);

export default CustomButton;
