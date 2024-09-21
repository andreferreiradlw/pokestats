import { useState } from 'react';
// data
import { type HeadbuttLocation, headbuttLocations } from './headbuttData';
// helpers
import { useDebouncedValue } from '@/hooks';
import type { GameValue } from '@/helpers';
// components
import {
  Grid2,
  Stack,
  Typography,
  TextField,
  type SelectChangeEvent,
  Slider,
  FormControl,
  InputLabel,
  Divider,
  Paper,
  Link as MuiLink,
} from '@mui/material';
import DropdownV2 from '../DropdownV2';
import HeadbuttIndices from './HeadbuttIndices';
import HeadbuttMap from './HeadbuttMap';
import ImageNextV2 from '../ImageNextV2';
import Link from 'next/link';

const mapScaleMarks = [
  {
    value: 1,
    label: '1x',
  },
  {
    value: 1.5,
    label: '1.5x',
  },
  {
    value: 2,
    label: '2x',
  },
  {
    value: 2.5,
    label: '2.5x',
  },
  {
    value: 3,
    label: '3x',
  },
];

const gameVersionOptions = [
  { value: 'gold', label: 'Gold' },
  { value: 'silver', label: 'Silver' },
  { value: 'crystal', label: 'Crystal' },
];

const HeadbuttLocationsPage = (): JSX.Element => {
  // states
  const [trainerId, setTrainerId] = useState<number | ''>('');
  const [areaDetails, setAreaDetails] = useState<HeadbuttLocation>();
  const [scale, setScale] = useState<number>(1.5);
  const [gameVersion, setGameVersion] = useState<GameValue>('gold');

  // Use the debounced values to avoid lag
  const debouncedTrainerId = useDebouncedValue(trainerId, 1000);
  const debouncedScale = useDebouncedValue(scale, 1000);

  const handleTrainerIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTrainerId(value === '' ? '' : Number(value));
  };

  const handleAreaChange = (event: SelectChangeEvent<string>) => {
    const selectedArea = headbuttLocations.find(({ value }) => value === event.target.value);
    setAreaDetails(selectedArea);
  };

  const handleScaleChange = (_: Event, newValue: number | number[]) => {
    setScale(newValue as number);
  };

  const handleGameChange = (event: SelectChangeEvent<string>) => {
    const selectedVersion = event.target.value as GameValue;
    setGameVersion(selectedVersion);
  };

  return (
    <Stack gap={4} py={2} width="100%">
      <Typography variant="pageHeading">Headbutt Tree Finder</Typography>
      <Grid2 container size={12} spacing={4}>
        <Grid2 container size={{ xxs: 12, md: 3 }} direction="column">
          <Grid2 size={12} flexDirection="column" gap={2}>
            <TextField
              label="Trainer ID"
              value={trainerId}
              onChange={handleTrainerIdChange}
              slotProps={{
                input: {
                  inputProps: {
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  },
                },
              }}
              fullWidth
            />
            <DropdownV2
              formcontrolProps={{ fullWidth: true }}
              fullWidth
              label="Location"
              options={headbuttLocations}
              value={areaDetails?.value || ''}
              onChange={handleAreaChange}
            />
            <FormControl fullWidth>
              <InputLabel>Map Scale</InputLabel>
              <Slider
                aria-label="Map Scale"
                size="small"
                value={scale}
                onChange={handleScaleChange}
                getAriaValueText={value => `${value}x`}
                valueLabelDisplay="off"
                marks={mapScaleMarks}
                step={null}
                min={1}
                max={3}
              />
            </FormControl>
            <DropdownV2
              formcontrolProps={{ fullWidth: true }}
              fullWidth
              label="Game Version"
              options={gameVersionOptions}
              value={gameVersion}
              onChange={handleGameChange}
            />
          </Grid2>
          <Grid2 size={12} component={Divider} />
          <HeadbuttIndices size={12} trainerId={debouncedTrainerId} />
          <Grid2 size={12} component={Divider} />
          <Grid2 size={12} component={Paper} flexDirection="column" p={1} gap={1}>
            <ImageNextV2
              customKey="headbutt-tree-demo"
              imageUrl="https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/misc/generation-ii/headbutt-generation-ii.gif"
              alt="Headbutting a tree in Generation II"
            />
            <Typography variant="caption">
              <MuiLink href="/move/headbutt" component={Link} color="inherit">
                Headbutting
              </MuiLink>{' '}
              a tree in Generation II
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2
          container
          size={{ xxs: 12, md: 9 }}
          minHeight={areaDetails ? areaDetails.imageHeight * debouncedScale : 'auto'}
          sx={{ overflowY: 'hidden', overflowX: 'auto' }}
        >
          {debouncedTrainerId && areaDetails ? (
            <HeadbuttMap
              size={12}
              areaDetails={areaDetails}
              scale={debouncedScale}
              trainerId={debouncedTrainerId}
              key={`${areaDetails.value}-${debouncedTrainerId}-${debouncedScale}`}
            />
          ) : (
            <Grid2 size={12} py={12} flexDirection="column" alignItems="center" gap={2}>
              <ImageNextV2
                imageProps={{ priority: true }}
                customKey="headbutt-map-placeholder"
                imageUrl="https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/misc/generation-ii/trainer-card.png"
                alt="Pokémon Trainer Card"
                width={200}
              />
              <Typography variant="sectionSubTitle">
                Please enter a Trainer ID and select a location.
              </Typography>
            </Grid2>
          )}
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default HeadbuttLocationsPage;
