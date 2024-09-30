import { useState, useMemo } from 'react';
// types
import type { PokestatsMovesPageProps } from '@/pages/moves';
// helpers
import { type GenerationOption, generationOptions } from '@/helpers';
// components
import { Grid2, Stack, Typography } from '@mui/material';
import CustomButton from '../CustomButton';
import DropdownV2 from '../DropdownV2';
import CustomInput from '../CustomInput';
import MovesTableV2 from '../MovesTableV2';

const categoryMoveOptions = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Physical',
    value: 'physical',
  },
  {
    label: 'Special',
    value: 'special',
  },
  {
    label: 'Status',
    value: 'status',
  },
];

const MovesListPage = ({ moves, typeOptions }: PokestatsMovesPageProps): JSX.Element => {
  // states
  const [nameSearch, setNameSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedGen, setSelectedGen] = useState<GenerationOption['value']>('all');

  // moves
  const filteredMoves = useMemo(() => {
    const search = nameSearch.trim().replace(/-/g, ' ').toLowerCase();

    return moves.filter(move => {
      // Combine all filter conditions
      return (
        (!search || move.name.replace(/-/g, ' ').toLowerCase().includes(search)) &&
        (selectedGen === 'all' || move.generation.name === selectedGen) &&
        (selectedCategory === 'all' || move.damage_class?.name === selectedCategory) &&
        (selectedType === 'all' || move.type.name === selectedType)
      );
    });
  }, [nameSearch, selectedGen, selectedCategory, selectedType]);

  return (
    <Stack gap={4} width="100%">
      <Typography variant="pageHeading">Pokémon Moves List</Typography>
      <Grid2 direction="column" gap={2}>
        <CustomInput
          label="Move Name"
          value={nameSearch}
          onChange={event => setNameSearch(event.target.value.toLowerCase())}
        />
        <DropdownV2
          label="Category"
          options={categoryMoveOptions}
          value={selectedCategory}
          onChange={newCategory => setSelectedCategory(newCategory)}
        />
        <DropdownV2
          label="Type"
          options={typeOptions}
          value={selectedType}
          onChange={newType => setSelectedType(newType)}
        />
        <DropdownV2<GenerationOption['value']>
          label="Generation"
          options={generationOptions.slice(0, 8)}
          value={selectedGen}
          onChange={newGen => setSelectedGen(newGen)}
        />
        <CustomButton
          variant="contained"
          disabled={
            !nameSearch &&
            selectedGen === 'all' &&
            selectedCategory === 'all' &&
            selectedType === 'all'
          }
          onClick={() => {
            setNameSearch('');
            setSelectedGen('all');
            setSelectedCategory('all');
            setSelectedType('all');
          }}
        >
          Reset Filters
        </CustomButton>
      </Grid2>
      <MovesTableV2
        paginated
        moves={filteredMoves}
        noMovesText="No moves found for current criteria."
      />
    </Stack>
  );
};

export default MovesListPage;
