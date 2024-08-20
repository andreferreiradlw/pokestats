// styles
import { riseUp } from '@/components/BaseStyles';
// components
import BoxWrapper from '../Box/StyledBox';
// icons
import Potion from 'public/static/iconLibrary/potion.svg';
import { Box, Container, css, Stack, styled } from '@mui/material';

const FooterContainer = styled(Box)(
  ({ theme }) => css`
    background: ${theme.palette.background.default};
    font-weight: ${theme.typography.fontWeightMedium};
    padding-bottom: ${theme.spacing(2)};
    padding-top: ${theme.spacing(2)};
    width: 100%;
  `,
);

const FooterContainerInner = styled(Container)(
  ({ theme }) => css`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(2)};
    justify-content: center;
  `,
);

const FooterContent = styled(Stack)(
  ({ theme }) => css`
    align-items: center;
    flex-direction: column;
    gap: ${theme.spacing(2)};
    justify-content: center;
    text-align: center;
    width: 100%;

    ${theme.breakpoints.up('md')} {
      align-items: flex-start;
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }
  `,
);

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

export { FooterContainer, FooterContainerInner, FooterContent, PokestatsIcon, Anchor };
