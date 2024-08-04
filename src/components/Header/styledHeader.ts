import styled from 'styled-components';
import Box from '@/components/Box';

const HeaderContainer = styled(Box)`
  margin-top: 2em;
`;

const PokestatsLogo = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Josefin Sans', sans-serif;
  font-size: 4.2rem;
  font-weight: 700;
  line-height: 4.2rem;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

export { HeaderContainer, PokestatsLogo };
