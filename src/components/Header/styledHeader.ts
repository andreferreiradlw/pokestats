import styled, { css } from 'styled-components';
import Box from '@/components/Box';

const Heading = styled.h2`
  color: ${({ theme }) => theme.homepage.heading.color};
  font-family: 'Josefin Sans', sans-serif;
  font-size: 3.26rem;
  font-weight: 700;
  line-height: 4rem;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

const SelectContainer = styled(Box)`
  margin-bottom: 1rem;

  & label {
    margin-right: 0.5rem;
  }

  ${({ theme }) => css`
    @media ${theme.device.md} {
      margin-bottom: 0;
  `}
`;

export { Heading, SelectContainer };
