import { AppBar, css, Stack, styled } from '@mui/material';
import { motion } from 'framer-motion';

const HeaderContainer = styled(AppBar)(
  ({ theme }) => css`
    margin-bottom: ${theme.spacing(4)};
    padding-bottom: ${theme.spacing(2)};
    padding-top: ${theme.spacing(2)};
  `,
);

const ContentContainer = styled(Stack)(
  ({ theme }) => css`
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
    max-width: ${theme.breakpoints.values.xl}px;
    width: 100%;

    ${theme.breakpoints.up('md')} {
      align-items: flex-start;
      flex-direction: row;
    }
  `,
);

const Logo = styled(motion.a)(
  ({ theme }) => css`
    ${{ ...theme.typography.mainHeading }}

    &:hover {
      cursor: pointer;
    }

    ${theme.breakpoints.up('xxs')} {
      font-size: 4.2em;
      line-height: 1;
    }
  `,
);

export { HeaderContainer, ContentContainer, Logo };
