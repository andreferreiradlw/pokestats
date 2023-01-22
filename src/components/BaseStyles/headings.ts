import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const MainHeading = styled(motion.h1)`
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Josefin Sans', sans-serif;
  font-size: 3.5em;
  font-weight: 700;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  user-select: none;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 5rem;
    }
    @media ${theme.device.md} {
      font-size: 10em;
    }
  `}
`;

const PageHeading = styled.h1`
  font-size: 2.5em;
  font-weight: 600;
  text-align: center;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 3em;
    }
    @media ${theme.device.sm} {
      font-size: 4em;
    }
    @media ${theme.device.md} {
      font-size: 6em;
    }
    @media ${theme.device.lg} {
      text-align: left;
      font-size: 4.5em;
    }
  `}
`;

export { MainHeading, PageHeading };
