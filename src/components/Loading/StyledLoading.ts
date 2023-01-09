import styled, { css } from 'styled-components';
// types
import type { LoadingProps } from './index';
// components
import BoxWrapper from '@/components/Box/StyledBox';
// styles
import { SectionSubTitle, ellipsis, rotate, riseUp } from '@/components/BaseStyles';
// helpers
import { responsiveProps } from '@/helpers/box';
// svg
import Potion from '@/assets/svg/potion.svg';

const LoadingContainer = styled(BoxWrapper)`
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  width: 100%;
  z-index: 2;

  ${({ flexheight }) =>
    flexheight
      ? css`
          height: ${flexheight};
          max-height: ${flexheight};
        `
      : css`
          height: auto;
        `}
`;

const PotionIcon = styled(Potion)<{ $iconwidth?: LoadingProps['$iconWidth'] }>`
  height: auto;
  ${({ $iconWidth }) => $iconWidth && responsiveProps('width', $iconWidth)}
  // rotation
  animation: 20s ${rotate} 0ms infinite ease-in-out;
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

const Text = styled(SectionSubTitle)`
  margin-top: 2rem;

  &:after {
    animation: ${ellipsis} 1.25s infinite;
    content: '.';
    display: inline-block;
    text-align: left;
    width: 1em;
  }
`;

export { LoadingContainer, PotionIcon, Text };
