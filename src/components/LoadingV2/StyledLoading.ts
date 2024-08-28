import Potion from 'public/static/iconLibrary/potion.svg';
import Pokeball from 'public/static/iconLibrary/pokeball.svg';
import Record from 'public/static/iconLibrary/record.svg';
import { ellipsis, pokeballShake, riseUp, rotate, shake } from '@/BaseStyles';
import { Stack, StackProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const IconContainer = styled(Stack)<StackProps & { $iconWidth: number }>(
  ({ $iconWidth, theme }) => ({
    ...(!!$iconWidth && {
      '& svg': {
        width: theme.spacing($iconWidth),
      },
    }),
  }),
);

const PotionIcon = styled(Potion)`
  animation: 20s ${shake} 0ms infinite ease-in-out;
  height: auto;

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

const PokeballIcon = styled(Pokeball)`
  animation: 2.5s ${pokeballShake} 0ms infinite ease-in-out;
  height: auto;
`;

const RecordIcon = styled(Record)`
  height: auto;

  .record_svg__roll {
    animation: 2s linear 0ms infinite ${rotate};
    transform-box: fill-box;
    transform-origin: center center;
  }
`;

const Description = styled(Typography)`
  text-transform: capitalize;

  &:after {
    animation: ${ellipsis} 1.25s infinite;
    content: '.';
    display: inline-block;
    text-align: left;
    width: 1em;
  }
`;

export { IconContainer, PotionIcon, RecordIcon, PokeballIcon, Description };
