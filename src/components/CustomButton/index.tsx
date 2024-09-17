import { forwardRef } from 'react';
// helpers
import { hoverVariant } from '@/animations';
// components
import { Button as MuiButton, type ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...rest }, ref) => (
  <motion.div whileHover="hover" whileTap="tap" variants={hoverVariant} key="custom-button">
    <MuiButton ref={ref} {...rest}>
      {children}
    </MuiButton>
  </motion.div>
));

// Set a display name for debugging purposes
CustomButton.displayName = 'CustomButton';

export default CustomButton;
