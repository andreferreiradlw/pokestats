import styled, { css } from 'styled-components';
import Box from '@/components/Box';

const HeaderContainer = styled(Box)`
  margin-top: 2em;
`;

const Heading = styled.h2`
  color: ${({ theme }) => theme.colors.white};
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

const SelectContainer = styled(Box)``;

export { HeaderContainer, Heading, SelectContainer };
