import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
// helpers
import { useUmami } from '@/hooks';
import { mapLocationMusic, type GameGenValue } from '@/helpers';
// components
import { Slider, Typography, Stack, IconButton, Tooltip } from '@mui/material';
import { MusicPlayerContainer } from './StyledLocationMusic';
// icons
import { PlayArrow, Pause, Repeat, RepeatOn, Download } from '@mui/icons-material';

interface LocationMusicProps {
  generation: GameGenValue;
  locationName: string;
}

// Helper function to format time in "minutes:seconds"
const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const LocationMusic = ({ generation, locationName }: LocationMusicProps): JSX.Element => {
  // analytics
  const { track } = useUmami();

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Ref to store the audio element
  const audioRef = useRef<HTMLAudioElement>();

  // Memoize the audio object and assign it to ref
  const locationMusic = useMemo(() => {
    const audio = mapLocationMusic(generation, locationName);
    audioRef.current = audio;
    return audio;
  }, [generation, locationName]);

  // Effect to handle playing/pausing the music
  useEffect(() => {
    if (!locationMusic) return;

    const handleMetadataLoaded = () => {
      setDuration(locationMusic.duration);
    };

    const updateTime = () => {
      setCurrentTime(locationMusic.currentTime);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      if (isLooping) {
        locationMusic.currentTime = 0; // Reset the track to the beginning
        locationMusic.play(); // Play again if looping is enabled
      } else {
        setIsPlaying(false); // Pause the playback when it ends
        setCurrentTime(0); // Reset the track to the beginning
      }
    };

    // Add event listeners
    locationMusic.addEventListener('loadedmetadata', handleMetadataLoaded);
    locationMusic.addEventListener('timeupdate', updateTime);
    locationMusic.addEventListener('play', handlePlay);
    locationMusic.addEventListener('pause', handlePause);
    locationMusic.addEventListener('ended', handleEnded);

    // Cleanup function to remove event listeners when the component is unmounted
    return () => {
      locationMusic.pause(); // Stop the audio
      locationMusic.currentTime = 0; // Reset the audio to the beginning
      locationMusic.removeEventListener('loadedmetadata', handleMetadataLoaded);
      locationMusic.removeEventListener('timeupdate', updateTime);
      locationMusic.removeEventListener('play', handlePlay);
      locationMusic.removeEventListener('pause', handlePause);
      locationMusic.removeEventListener('ended', handleEnded);
    };
  }, [locationMusic]);

  // Effect to handle play/pause state based on `isPlaying`
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Effect to handle loop state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping; // Set the loop property based on isLooping state
    }
  }, [isLooping]);

  // Function to handle slider change
  const handleSliderChange = useCallback((_: Event, newValue: number | number[]) => {
    if (!audioRef.current) return;

    const newTime = Array.isArray(newValue) ? newValue[0] : newValue;

    audioRef.current.currentTime = newTime;

    setCurrentTime(newTime);
  }, []);

  // Function to handle downloading the audio file
  const handleDownload = useCallback(() => {
    if (audioRef.current) {
      const link = document.createElement('a');
      link.href = audioRef.current.src; // Use the audio source URL for downloading
      link.download = `${locationName}.mp3`; // Set the default file name for the download
      link.click();
      track('Download Area Music');
    }
  }, [locationName]);

  return (
    <MusicPlayerContainer>
      <Stack direction="row" gap={1} alignItems="center">
        <Tooltip title="Download" placement="left" disableInteractive>
          <IconButton onClick={handleDownload} color="primary" size="small">
            <Download fontSize="small" />
          </IconButton>
        </Tooltip>
        <IconButton
          onClick={() => {
            setIsPlaying(prev => !prev);
            track('Play Area Music');
          }}
          color="primary"
          size="large"
        >
          {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
        </IconButton>
        <Tooltip title="Loop" placement="right" disableInteractive>
          <IconButton onClick={() => setIsLooping(prev => !prev)} color="primary" size="small">
            {isLooping ? <RepeatOn fontSize="small" /> : <Repeat fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack direction="row" gap={2} alignItems="center" sx={{ width: '100%' }}>
        <Typography variant="caption">{formatTime(currentTime)}</Typography>
        <Slider
          value={currentTime}
          max={duration}
          onChange={handleSliderChange}
          size="small"
          aria-labelledby="track-duration"
          sx={{ flexGrow: 1 }}
        />
        <Typography variant="caption">{formatTime(duration)}</Typography>
      </Stack>
    </MusicPlayerContainer>
  );
};

export default LocationMusic;
