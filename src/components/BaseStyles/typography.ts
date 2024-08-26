import { motion } from 'framer-motion';
import { styled, css } from '@mui/material/styles';
import { Link } from '@mui/material';

const SectionTitle = styled(motion.h2)(
  ({ theme }) => css`
    font-size: 1.5em;
    font-weight: 600;

    ${theme.breakpoints.up('sm')} {
      font-size: 2em;
    }
  `,
);

const SectionSubTitle = styled(motion.h3)(
  ({ theme }) => css`
    font-size: 1.2em;
    font-weight: 600;

    ${theme.breakpoints.up('xs')} {
      font-size: 1.5em;
    }
  `,
);

const SectionMessage = styled(motion.p)({
  fontSize: '1em',
  textAlign: 'center',
  width: '100%',
});

const JpnName = styled(motion.span)(
  ({ theme }) => css`
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    writing-mode: vertical-rl; // show text vertically
    line-height: 1;
    text-transform: uppercase;
    text-align: center;
    font-size: 2.5em;
    font-weight: bold;
    user-select: none;
    width: 1em;
    color: ${theme.palette.secondary.main};

    ${theme.breakpoints.down('lg')} {
      display: none;
    }
  `,
);

const BoldSpan = styled('span')(
  () => css`
    font-weight: 600 !important;
  `,
);

const Anchor = styled(Link)(
  ({ theme }) => css`
    color: ${theme.palette.primary.dark};
    cursor: pointer;
    font-weight: 700;
  `,
);

export { SectionTitle, SectionSubTitle, SectionMessage, JpnName, BoldSpan, Anchor };
