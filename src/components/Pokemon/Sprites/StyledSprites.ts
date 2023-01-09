import styled, { css } from 'styled-components';
// components
import Box from '@/components/Box';
import Image from '@/components/Image';
import { SectionSubTitle } from '@/components/BaseStyles';

const SpriteContainer = styled(Box)`
  text-align: center;
`;

const Sprite = styled(Image)``;

const SpriteSubtitle = styled(SectionSubTitle)`
  text-align: center;
`;

const NoSprites = styled(Box)`
  font-size: 2rem;
  line-height: 2.5rem;
  text-align: center;
`;

export { SpriteContainer, Sprite, SpriteSubtitle, NoSprites };
