// components
import { Stack, styled } from '@mui/material';
import ImageNext from '@/components/ImageNext';
import { motion } from 'framer-motion';
// icon
import StartIcon from 'public/static/iconLibrary/play.svg';
import PausedIcon from 'public/static/iconLibrary/pause.svg';

const ImageContainer = styled(Stack)`
  position: relative;

  area {
    cursor: pointer;
  }
`;

const CurrentLocation = styled('span')`
  bottom: 5%;
  font-size: 1.2em;
  font-weight: 600;
  position: absolute;
  right: 5%;
  z-index: 2;
`;

const MapImage = styled(ImageNext)``;

const PlayIcon = styled(StartIcon)`
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
`;

const PauseIcon = styled(PausedIcon)`
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
`;

const PlayIconContainer = styled(motion.div)``;

export { ImageContainer, CurrentLocation, MapImage, PlayIconContainer, PlayIcon, PauseIcon };
