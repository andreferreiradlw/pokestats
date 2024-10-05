import { forwardRef } from 'react';
// helpers
import { hoverVariant } from '@/animations';
// components
import { Box, Button as MuiButton, type ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, fullWidth, ...rest }, ref) => (
    <Box
      width={fullWidth ? '100%' : 'fit-content'} // do not remove
      component={motion.div}
      initial="rest"
      animate="rest"
      whileHover={!disabled ? 'hover' : undefined} // Only apply hover if not disabled
      whileTap={!disabled ? 'tap' : undefined} // Only apply tap if not disabled
      variants={hoverVariant}
      key="custom-button"
    >
      <MuiButton ref={ref} disabled={disabled} fullWidth={fullWidth} {...rest}>
        {children}
      </MuiButton>
    </Box>
  ),
);

// Set a display name for debugging purposes
CustomButton.displayName = 'CustomButton';

export default CustomButton;
