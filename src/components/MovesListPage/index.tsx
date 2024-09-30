import { useState } from 'react';
// helpers
import { generationOptions, type GameGenValue } from '@/helpers';
import { Grid2, Stack, Typography } from '@mui/material';
import CustomButton from '../CustomButton';
import DropdownV2 from '../DropdownV2';
import CustomInput from '../CustomInput';

interface MoveGenerationOption {
  value: GameGenValue;
  label: string;
}

const MovesListPage = (): JSX.Element => {
  // states
  const [nameSearch, setNameSearch] = useState('');
  const [selectedGen, setSelectedGen] = useState<GameGenValue>('generation-i');

  return (
    <Stack gap={4} width="100%">
      <Typography variant="pageHeading">Pokémon Moves List</Typography>
      <Grid2 direction="column" gap={2}>
        <CustomInput
          label="Move Name"
          value={nameSearch}
          onChange={event => setNameSearch(event.target.value.toLowerCase())}
        />
        <DropdownV2<GameGenValue>
          label="Generation"
          options={generationOptions.slice(1, 8) as MoveGenerationOption[]}
          value={selectedGen}
          onChange={newGen => setSelectedGen(newGen)}
        />
        <CustomButton
          variant="contained"
          disabled={true}
          onClick={() => {
            // reset input states
          }}
        >
          Reset Filters
        </CustomButton>
      </Grid2>
    </Stack>
  );
};

export default MovesListPage;
