import Box from '@/components/Box';
import styled from 'styled-components';

const ImageContainer = styled(Box)`
  position: relative;

  area {
    cursor: pointer;
  }
`;

const CurrentLocation = styled.span`
  bottom: 5%;
  font-size: 1.2em;
  font-weight: 600;
  position: absolute;
  right: 5%;
  z-index: 2;
`;

export { ImageContainer, CurrentLocation };