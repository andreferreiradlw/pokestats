import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const Table = styled(motion.table)`
  border-spacing: 0;
  display: table;
  font-size: 1em;
  line-height: 1.2em;
  width: 100%;
  word-break: keep-all;

  tbody {
    flex-grow: 1;
  }

  tr span {
    font-weight: 400;
  }

  tr:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary.light};
    width: 100%;
  }

  th {
    font-size: 1em;
    font-weight: 600;
    min-height: 45px;
    text-align: left;
    white-space: nowrap;
  }

  td {
    font-weight: normal;
    min-height: 45px;
    padding: 8px 16px;
    white-space: pre-line;

    p {
      line-height: 1.5em;
    }
  }

  ${({ theme }) => css`
    @media ${theme.device.md} {
      width: 50%;
    }
    @media ${theme.device.lg} {
      width: 100%;
      overflow-x: hidden;
    }
  `}
`;

const Numbered = styled.div<{ light?: boolean }>`
  display: block;
  width: 100%;

  span {
    font-weight: 300;
  }

  &:not(:last-of-type) {
    padding-bottom: 6px;
  }

  ${({ light }) =>
    light &&
    css`
      font-weight: 300;
    `}
`;

const TypesCell = styled.td`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const UppercasedTd = styled.td`
  text-transform: capitalize;
`;

export { Table, Numbered, TypesCell, UppercasedTd };
