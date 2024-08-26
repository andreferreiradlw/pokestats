import { hoverVariant } from '@/helpers';
import { ButtonProps, Button as MuiButton } from '@mui/material';
import { motion } from 'framer-motion';

const Button = ({ children, ...rest }: ButtonProps): JSX.Element => (
  <motion.div whileHover="hover" whileTap="tap" variants={hoverVariant} key="custom-button">
    <MuiButton {...rest}>{children}</MuiButton>
  </motion.div>
);

export default Button;
