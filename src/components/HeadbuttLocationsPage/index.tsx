import { useContext, useEffect, useState } from 'react';
// types
import type { PokestatsHeadbuttLocationsPageProps } from '@/pages/headbutt-tree-finder';
// data
import { type HeadbuttLocation, headbuttLocations } from './headbuttData';
// helpers
import { useBreakpoint, useDebouncedValue } from '@/hooks';
import type { GameValue } from '@/helpers';
// ctx
import { GameVersionContext } from '@/context';
// components
import {
  Grid2,
  Stack,
  Typography,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import DropdownV2 from '../DropdownV2';
import HeadbuttIndices from './HeadbuttIndices';
import HeadbuttMap from './HeadbuttMap';
import ImageNextV2 from '../ImageNextV2';
import HeadbuttEncounters from './HeadbuttEncounters';

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

const HeadbuttLocationsPage = ({
  defaultLocation,
}: PokestatsHeadbuttLocationsPageProps): JSX.Element => {
  // context
  const { gameVersion, gameGeneration } = useContext(GameVersionContext);

  // breakpoint
  const isMdUp = useBreakpoint({ breakpoint: 'md' });

  // states
  const [trainerId, setTrainerId] = useState<number | ''>('');
  const [areaDetails, setAreaDetails] = useState<HeadbuttLocation>();
  const [scale, setScale] = useState<number>(1.5);
  const [gameVersionInput, setGameVersionInput] = useState<GameValue>('gold');

  // Use the debounced values to avoid lag
  const debouncedTrainerId = useDebouncedValue(trainerId, 1000);
  const debouncedScale = useDebouncedValue(scale, 1000);

  const handleTrainerIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTrainerId(value === '' ? '' : Number(value));
    localStorage.setItem('pokemonTrainerId', value);
  };

  const handleAreaChange = (newValue: string) => {
    const selectedArea = headbuttLocations.find(({ value }) => value === newValue);
    setAreaDetails(selectedArea);
  };

  const handleScaleChange = (_: Event, newValue: number | number[]) => {
    setScale(newValue as number);
  };

  const handleGameChange = (newValue: GameValue) => {
    const selectedVersion = newValue;
    setGameVersionInput(selectedVersion);
  };

  useEffect(() => {
    if (defaultLocation) {
      const location = headbuttLocations.find(({ value }) => value === defaultLocation);
      if (location) setAreaDetails(location);
    }
  }, [defaultLocation]);

  useEffect(() => {
    if (gameVersion && gameGeneration === 'generation-ii') {
      setGameVersionInput(gameVersion);
    }
  }, [gameVersion, gameGeneration]);

  useEffect(() => {
    const storedPokemonTrainerId = localStorage.getItem('pokemonTrainerId');
    if (storedPokemonTrainerId) {
      setTrainerId(Number(storedPokemonTrainerId));
    }
  }, []);

  return (
    <Stack gap={4} width="100%">
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
            <FormControl fullWidth disabled={!debouncedTrainerId || !areaDetails}>
              <InputLabel>Map Scale</InputLabel>
              <Slider
                disabled={!debouncedTrainerId || !areaDetails}
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
              label="Generation"
              options={[{ value: 'generation-ii', label: 'Generation II' }]}
              value="generation-ii"
            />
            <DropdownV2<GameValue>
              formcontrolProps={{ fullWidth: true }}
              fullWidth
              label="Game Version"
              options={[
                { value: 'gold', label: 'Gold' },
                { value: 'silver', label: 'Silver' },
                { value: 'crystal', label: 'Crystal' },
              ]}
              value={gameVersionInput}
              onChange={handleGameChange}
            />
          </Grid2>
          {debouncedTrainerId && areaDetails && (
            <>
              <Grid2 size={12} component={Divider} />
              <HeadbuttIndices size={12} trainerId={debouncedTrainerId} />
            </>
          )}
          {isMdUp && (
            <>
              <Grid2 size={12} component={Divider} />
              <Grid2 size={12}>
                <Accordion>
                  <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                    Headbutting a tree in Generation II
                  </AccordionSummary>
                  <AccordionDetails>
                    <ImageNextV2
                      customKey="headbutt-tree-demo"
                      imageUrl="https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/misc/generation-ii/headbutt-generation-ii.gif"
                      alt="Headbutting a tree in Generation II"
                    />
                  </AccordionDetails>
                </Accordion>
              </Grid2>
            </>
          )}
        </Grid2>
        <Grid2
          container
          direction="column"
          spacing={2}
          size={{ xxs: 12, md: 9 }}
          minHeight={areaDetails ? areaDetails.imageHeight * debouncedScale : 'auto'}
          sx={{ overflowY: 'hidden', overflowX: 'auto' }}
        >
          {debouncedTrainerId && areaDetails ? (
            <>
              <HeadbuttEncounters gameVersion={gameVersionInput} areaKey={areaDetails.value} />
              <HeadbuttMap
                size={12}
                areaDetails={areaDetails}
                scale={debouncedScale}
                trainerId={debouncedTrainerId}
                key={`${areaDetails.value}-${debouncedTrainerId}-${debouncedScale}`}
              />
            </>
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
