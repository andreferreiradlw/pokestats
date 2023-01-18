import styled, { css } from 'styled-components';
import Box from '@/components/Box';

// type
const TypeContainer = styled(Box)`
  gap: 1em;
`;

const Genera = styled.p`
  font-weight: 700;
`;

const Flavor = styled.p`
  text-align: center;

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      text-align: left;
    }
  `}
`;

export { TypeContainer, Genera, Flavor };
