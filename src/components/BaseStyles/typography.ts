import { default as styledSC } from 'styled-components';
import { motion } from 'framer-motion';

import { Link, styled, css } from '@mui/material';

const SectionTitle = styledSC(motion.h2)`
  font-size: 1.5em;
  font-weight: 600;

  ${({ theme }) => css`
    @media ${theme.device.sm} {
      font-size: 2em;
    }
  `}
`;

const SectionSubTitle = styledSC(motion.h3)`
  font-size: 1.2em;
  font-weight: 600;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 1.5em;
    }
  `}
`;

const SectionMessage = styledSC(motion.p)`
  font-size: 1em;
  text-align: center;
  width: 100%;
`;

const JpnName = styledSC(motion.span)`
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

  ${({ theme }) => css`
    color: ${theme.colors.secondary.main};

    @media ${theme.device.xxs} {
      display: none;
    }
    @media ${theme.device.md} {
      display: inline-block;
    }
  `}
`;

const BoldSpan = styledSC.span`
  font-weight: 600 !important;
`;

const Anchor = styled(Link)(
  ({ theme }) => css`
    color: ${theme.palette.primary.dark};
    cursor: pointer;
    font-weight: 700;
  `,
);

export { SectionTitle, SectionSubTitle, SectionMessage, JpnName, BoldSpan, Anchor };
