import styled from 'styled-components';
// components
import Box from '@/components/Box';
import ImageNext from '@/components/ImageNext';
import { motion } from 'framer-motion';
// icon
import StartIcon from 'public/static/iconLibrary/play.svg';
import PausedIcon from 'public/static/iconLibrary/pause.svg';

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

const MapImage = styled(ImageNext)``;

const PlayIcon = styled(StartIcon)``;

const PauseIcon = styled(PausedIcon)``;

const PlayIconContainer = styled(motion.div)`
  ${PlayIcon}, ${PauseIcon} {
    display: block;
    height: auto;
    width: 2.5em;

    &:hover {
      cursor: pointer;

      &:hover {
        path:first-of-type {
          stroke: white;
        }
      }
    }
  }
`;

export { ImageContainer, CurrentLocation, MapImage, PlayIconContainer, PlayIcon, PauseIcon };
