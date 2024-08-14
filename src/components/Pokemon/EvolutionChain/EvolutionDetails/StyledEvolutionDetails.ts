import { css, Stack, styled, Typography } from '@mui/material';

const Container = styled(Stack)(
  ({ theme }) => css`
    &:not(:last-child) {
      border-bottom: 1px solid ${theme.palette.primary.light};
      padding-bottom: 0.5em;
    }
  `,
);

const Details = styled(Typography)`
  font-weight: 500;
  text-align: center;
  white-space: normal;
  word-break: break-word;

  &:first-letter {
    text-transform: uppercase;
  }
`;

const ItemImage = styled('img')`
  width: 50px;
`;

export { Container, Details, ItemImage };
