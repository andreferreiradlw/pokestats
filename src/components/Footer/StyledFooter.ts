import styled from 'styled-components';
// styles
import { riseUp } from '@/components/BaseStyles';
// components
import BoxWrapper from '../Box/StyledBox';
// icons
import Potion from 'public/static/iconLibrary/potion.svg';

const FooterContainer = styled.footer`
  align-items: center;
  background: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  flex-direction: column;
  font-weight: 500;
  gap: ${({ theme }) => theme.layout.gap};
  justify-content: center;
  padding-bottom: ${({ theme }) => theme.layout.gap};
  width: 100%;
`;

const Anchor = styled(BoxWrapper)`
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

const PokestatsIcon = styled(Potion)`
  height: auto;
  width: 30px;
  // rise up
  circle {
    animation: ${riseUp} 2s infinite linear;
  }
  .potion_svg__bubble-1 {
    animation-delay: 0.5s;
  }
  .potion_svg__bubble-2 {
    animation-delay: 0.3s;
  }
  .potion_svg__bubble-3 {
    animation-delay: 0.8s;
  }
  .potion_svg__bubble-4 {
    animation-delay: 1s;
  }
  .potion_svg__bubble-5 {
    animation-delay: 0.1s;
  }
`;

export { FooterContainer, PokestatsIcon, Anchor };
