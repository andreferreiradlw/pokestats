import styled, { css } from 'styled-components';
// components
import Box from '../../Box';
// styles
import { float } from '../../BaseStyles';

const ImageContainer = styled(Box)`
  height: 100%;
  position: relative;

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      min-height: 500px;
    }
  `}

  & img {
    margin: 1.5rem 0;
    max-width: 80%;

    ${({ theme }) => css`
      @media ${theme.device.xs} {
        max-width: 65%;
      }
      @media ${theme.device.sm} {
        max-width: 60%;
      }
      @media ${theme.device.md} {
        max-width: 55%;
      }
      @media ${theme.device.lg} {
        max-width: 65%;
      }
    `}

    @media (prefers-reduced-motion: no-preference) {
      animation: ${float} infinite 3s ease-in-out;
    }
  }
`;

export { ImageContainer };
