import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.5rem;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 2.5rem;
      line-height: 3rem;
    }
    @media ${theme.device.md} {
      font-size: 3rem;
      line-height: 3.5rem;
    }
  `}
`;

const SectionSubTitle = styled(motion.h3)`
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1rem;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 1.6rem;
      line-height: 2rem;
    }
    @media ${theme.device.md} {
      font-size: 2rem;
      line-height: 2.5rem;
    }
  `}
`;

const SectionMessage = styled(motion.p)`
  font-size: 0.8rem;
  line-height: 1.1rem;
  text-align: center;
  width: 100%;

  ${({ theme }) => css`
    @media ${theme.device.md} {
      font-size: 1rem;
      line-height: 1.5rem;
    }
    @media ${theme.device.lg} {
      font-size: 1.2rem;
      line-height: 1.7rem;
    }
  `}
`;

const JpnName = styled(motion.span)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  // text
  writing-mode: vertical-rl; // show text horizontally
  line-height: 1;
  text-transform: uppercase;
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  user-select: none;
  width: 1em;

  ${({ theme }) => css`
    color: ${theme.colors.black};

    @media ${theme.device.xxs} {
      display: none;
    }
    @media ${theme.device.md} {
      display: inline-block;
    }
  `}
`;

export { SectionTitle, SectionSubTitle, SectionMessage, JpnName };
