// types
import type { LoadingProps } from './index';
// styles
import { ellipsis, shake, riseUp, pokeballShake, rotate } from '@/animations';
// helpers
import { responsivePropsV2 } from '@/helpers';
// components
import { styled, Typography } from '@mui/material';
import { motion } from '@/client';
// svg
import Potion from 'public/static/iconLibrary/potion.svg';
import Pokeball from 'public/static/iconLibrary/pokeball.svg';
import Record from 'public/static/iconLibrary/record.svg';

const LoadingContainer = styled(motion.div)`
  flex-direction: column;
  z-index: 2;
`;

const PotionIcon = styled(Potion, {
  shouldForwardProp: prop => prop !== '$iconWidth',
})<{ $iconWidth?: LoadingProps['$iconWidth'] }>`
  height: auto;

  ${({ $iconWidth }) => $iconWidth && responsivePropsV2('width', $iconWidth)}

  // shake
  animation: 20s ${shake} 0ms infinite ease-in-out;

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

const PokeballIcon = styled(Pokeball, {
  shouldForwardProp: prop => prop !== '$iconWidth',
})<{ $iconWidth?: LoadingProps['$iconWidth'] }>`
  animation: 2.5s ${pokeballShake} 0ms infinite ease-in-out;
  height: auto;

  ${({ $iconWidth }) => $iconWidth && responsivePropsV2('width', $iconWidth)}
`;

const RecordIcon = styled(Record, {
  shouldForwardProp: prop => prop !== '$iconWidth',
})<{ $iconWidth?: LoadingProps['$iconWidth'] }>`
  height: auto;

  ${({ $iconWidth }) => $iconWidth && responsivePropsV2('width', $iconWidth)}

  .record_svg__roll {
    animation: 2s linear 0ms infinite ${rotate};
    transform-box: fill-box;
    transform-origin: center center;
  }
`;

const Text = styled(Typography)`
  &:after {
    animation: ${ellipsis} 1.25s infinite;
    content: '.';
    display: inline-block;
    text-align: left;
    width: 1em;
  }
`;

export { LoadingContainer, PotionIcon, Text, PokeballIcon, RecordIcon };
