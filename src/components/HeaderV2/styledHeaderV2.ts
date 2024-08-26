import { AppBar } from '@mui/material';
import { styled, css } from '@mui/material/styles';
import { motion } from 'framer-motion';

const HeaderContainer = styled(AppBar)(
  ({ theme }) => css`
    margin-bottom: ${theme.spacing(4)};
    padding-bottom: ${theme.spacing(2)};
    padding-top: ${theme.spacing(2)};
  `,
);

const ContentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: 'auto',
  maxWidth: `${theme.breakpoints.values.xl}px`,
  width: '100%',

  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
}));

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
