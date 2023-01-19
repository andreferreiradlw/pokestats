import styled, { css } from 'styled-components';
// compoennts
import Box from '@/components/Box';
// styles
import { UppercasedTd } from '@/components/BaseStyles';

// type
const TypeContainer = styled(Box)`
  gap: 1em;
`;

const AbilityName = styled(UppercasedTd)`
  font-weight: 500;
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

export { TypeContainer, AbilityName, Genera, Flavor };
