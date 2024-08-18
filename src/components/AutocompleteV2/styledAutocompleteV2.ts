import { css, styled, Typography } from '@mui/material';
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

const ListWrapper = styled(motion.ul)(
  ({ theme }) => css`
    background: ${theme.palette.background.paper};
    border: 1px solid ${theme.palette.background.paper};
    border-radius: 0 0 0.25rem 0.25rem;
    border-top: none;
    box-shadow:
      0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
    overflow: hidden;
    position: absolute;
    width: 100%;
    z-index: 2;
  `,
);

const OptionWrapper = styled('li')(
  () => css`
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    font-size: 0.875rem;
    gap: 1em;
    justify-content: space-between;
    min-height: 55px;
    padding: 0.5em 1em;

    svg {
      padding: 5px;
      width: 40px;
    }
  `,
);

const ItemIcon = styled('img')({ width: '40px' });

const Option = styled(Typography)(
  ({ theme }) => css`
    font-weight: ${theme.typography.fontWeightMedium};
    text-transform: capitalize;
  `,
);

const PokeID = styled(Typography)(
  ({ theme }) => css`
    font-weight: ${theme.typography.fontWeightMedium};
    margin-left: auto;
  `,
);

export { Container, ListWrapper, OptionWrapper, ItemIcon, Option, PokeID };
