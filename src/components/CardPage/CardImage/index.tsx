import React from 'react';
// types
import type { BoxProps } from '@/components/Box';
// styles
import { ImageContainer } from './StyledCardImage';
// components
import ImageNext from '@/components/ImageNext';

interface CardImageProps extends BoxProps {
  imageUrl: string;
}

const CardImage = ({ imageUrl, ...rest }: CardImageProps): JSX.Element => {
  return (
    <ImageContainer {...rest}>
      <ImageNext priority loading="eager" placeholderwidth="20%" alt="" src={imageUrl} />
    </ImageContainer>
  );
};

export default CardImage;
