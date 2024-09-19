import { styled } from '@mui/material/styles';
// components
import { Stack } from '@mui/material';
import ImageNextV2 from '@/components/ImageNextV2';

const SpriteContainer = styled(Stack)`
  text-align: center;
  text-transform: capitalize;
`;

const Sprite = styled(ImageNextV2)``;

export { SpriteContainer, Sprite };
