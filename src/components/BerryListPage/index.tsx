import { useMemo, useState } from 'react';
// types
import type { PokestatsBerriesPageProps } from '@/pages/berries';
// components
import { Grid2, Stack, Typography } from '@mui/material';
import BerryTable from './BerryTable';
import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput';
import DropdownV2 from '../DropdownV2';

const firmOptions = [
  { label: 'All', value: 'all' },
  { label: 'Very Soft', value: 'very-soft' },
  { label: 'Soft', value: 'soft' },
  { label: 'Hard', value: 'hard' },
  { label: 'Very Hard', value: 'very-hard' },
  { label: 'Super Hard', value: 'super-hard' },
];

const categoryOptions = [
  { label: 'All', value: 'all' },
  { label: 'Medicine', value: 'medicine' },
  { label: 'Picky Healing', value: 'picky-healing' },
  { label: 'Baking Only', value: 'baking-only' },
  { label: 'Effort Drop', value: 'effort-drop' },
  { label: 'Type Protection', value: 'type-protection' },
  { label: 'In a Pinch', value: 'in-a-pinch' },
  { label: 'Other', value: 'other' },
];

const BerryListPage = ({ berryData }: PokestatsBerriesPageProps): JSX.Element => {
  // states
  const [nameSearch, setNameSearch] = useState('');
  const [selectedFirmness, setSelectedFirmness] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // filtered berries
  const filteredBerries = useMemo(() => {
    const search = nameSearch.trim().replace(/-/g, ' ').toLowerCase();

    return berryData.filter(berry => {
      // Combine all filter conditions
      return (
        (!search || berry.name.replace(/-/g, ' ').toLowerCase().includes(search)) &&
        (selectedFirmness === 'all' || berry.firmness.name === selectedFirmness) &&
        (selectedCategory === 'all' || berry.category === selectedCategory)
      );
    });
  }, [nameSearch, selectedFirmness, selectedCategory]);

  return (
    <Stack gap={4} width="100%">
      <Typography variant="pageHeading">Pokémon Berry List</Typography>
      <Grid2 direction="column" gap={2}>
        <CustomInput
          label="Item Name"
          value={nameSearch}
          onChange={event => setNameSearch(event.target.value.toLowerCase())}
        />
        <DropdownV2
          label="Firmness"
          options={firmOptions}
          value={selectedFirmness}
          onChange={event => setSelectedFirmness(event.target.value)}
        />
        <DropdownV2
          label="Category"
          minWidth="175px"
          options={categoryOptions}
          value={selectedCategory}
          onChange={event => setSelectedCategory(event.target.value)}
        />
        <CustomButton
          variant="contained"
          disabled={!nameSearch.trim() && selectedFirmness === 'all' && selectedCategory === 'all'}
          onClick={() => {
            // reset input states
            setNameSearch('');
            setSelectedFirmness('all');
            setSelectedCategory('all');
          }}
        >
          Reset Filters
        </CustomButton>
      </Grid2>
      <BerryTable items={filteredBerries} />
    </Stack>
  );
};

export default BerryListPage;
