import styled, { css } from 'styled-components';
// components
import Box from '@/components/Box';
import { Divider } from '@/BaseStyles';

const CardDivider = styled.hr`
  height: 1px;
  width: 100%;
`;

const CardSetIcon = styled.img`
  width: 2.5em;
`;

const CardHP = styled(Box)`
  font-weight: 500;

  span {
    font-size: 0.75em;
  }

  p {
    font-size: 2em;
    line-height: 0.9em;
  }

  img {
    height: 1.85em;
  }
`;

const CardTitle = styled.h1`
  font-size: 3.25em;
  font-weight: 600;
  line-height: 1em;

  ${({ theme }) => css`
    @media ${theme.device.xl} {
      font-size: 4.5em;
    }
  `}
`;

const CardSubtitle = styled.p`
  font-weight: 700;
`;

const CardEvo = styled.span`
  font-size: 0.85em;
`;

const CardFlavor = styled.p`
  text-align: center;

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      text-align: left;
    }
  `}
`;

const AbilityTypeContainer = styled(Box)`
  img {
    width: 6em;
  }
`;

const AbilityName = styled.h3`
  font-size: 1.5em;
  font-weight: 500;
`;

const AbilityDesc = styled.p``;

const AttackDescRow = styled.tr``;

const AttackTable = styled.table`
  width: 100%;

  ${AttackDescRow}:not(:last-of-type) {
    border-bottom: 1em solid transparent;
  }
`;

const AttackCostContainer = styled.td`
  img {
    height: 1.5em;
  }
`;

const AttackName = styled.h3`
  font-size: 1.5em;
  font-weight: 600;
`;

const AttackDesc = styled.td`
  font-size: 1em;
  padding: 0.5em 0;
`;

export {
  CardDivider,
  CardSetIcon,
  CardHP,
  CardTitle,
  CardSubtitle,
  CardEvo,
  CardFlavor,
  AbilityTypeContainer,
  AbilityName,
  AbilityDesc,
  AttackTable,
  AttackCostContainer,
  AttackName,
  AttackDescRow,
  AttackDesc,
};
