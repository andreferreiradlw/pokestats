import styled, { css } from 'styled-components';
// components
import Box from '@/components/Box';

const ImageContainer = styled(Box)`
  height: 100%;

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      min-height: 500px;
    }
  `}

  & img {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin: 1.5em 0;
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
        max-width: 69%;
      }
    `}
  }
`;

export { ImageContainer };
