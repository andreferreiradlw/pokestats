import styled, { css } from 'styled-components';
// components
import Box from '@/components/Box';
// styles
import { float } from '@/components/BaseStyles';

// image
const ImageContainer = styled(Box)`
  ${({ theme }) => css`
    @media ${theme.device.lg} {
      min-height: 300px;
    }
  `}
`;
const Image = styled.img`
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
      max-width: 60%;
    }
  `}

  @media (prefers-reduced-motion: no-preference) {
    animation: ${float} infinite 3s ease-in-out;
  }
`;

export { ImageContainer, Image };
