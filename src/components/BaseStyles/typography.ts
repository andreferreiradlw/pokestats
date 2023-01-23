import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const SectionTitle = styled(motion.h2)`
  font-size: 1.5em;
  font-weight: 600;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 2em;
    }
  `}
`;

const SectionSubTitle = styled(motion.h3)`
  font-size: 1.2em;
  font-weight: 600;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 1.5em;
    }
  `}
`;

const SectionMessage = styled(motion.p)`
  font-size: 1em;
  text-align: center;
  width: 100%;
`;

const JpnName = styled(motion.span)`
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

export { SectionTitle, SectionSubTitle, SectionMessage, JpnName };
