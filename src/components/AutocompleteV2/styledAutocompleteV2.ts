import { css, styled } from '@mui/material';
import { motion } from 'framer-motion';
import { AutocompleteV2Props } from '.';

const Container = styled(motion.div, {
  shouldForwardProp: prop => prop !== 'width',
})<{ width?: AutocompleteV2Props['width'] }>(
  ({ theme, width }) => css`
    max-width: 100%;
    position: relative;

    ${width
      ? css`
          width: ${width};
        `
      : css`
          width: 90%;

          ${theme.breakpoints.up('sm')} {
            max-width: 650px;
            width: 55%;
          }
          ${theme.breakpoints.up('md')} {
            width: 40%;
          }
          ${theme.breakpoints.up('lg')} {
            width: 30%;
          }
        `}
  `,
);

export { Container };
