import { type ChangeEvent, useMemo, useState } from 'react';
// types
import type { PokestatsItemsPageProps } from '@/pages/item';
// helpers
import { capitalise } from '@/helpers';
import { useDebouncedValue } from '@/hooks';
import { fadeInUpVariant } from '@/animations';
// components
import { Grid2, type SelectChangeEvent, Stack, Typography } from '@mui/material';
import CustomInput from '@/components/CustomInput';
import DropdownV2 from '@/components/DropdownV2';
import CustomButton from '@/components/CustomButton';
import ItemTable from './ItemTable.tsx';
import { motion } from 'framer-motion';

const ItemListPage = ({
  itemData,
  itemPocketNames,
  itemPocketData,
}: PokestatsItemsPageProps): JSX.Element => {
  // States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [nameSearch, setNameSearch] = useState('');

  // Debounce search input to reduce unnecessary filtering
  const debouncedName = useDebouncedValue(nameSearch, 250);

  // Memoized category options to avoid recalculating on every render
  const categoryOptions = useMemo(() => {
    const options = itemPocketNames.map(name => ({
      label: capitalise(name),
      value: name,
    }));

    return [{ label: 'All', value: 'all' }, ...options];
  }, [itemPocketNames]);

  // Handler for name input change with debounce
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('search', event.target.value.toLowerCase());
    setNameSearch(event.target.value.toLowerCase());
  };

  // Handler for category selection
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  // Filter items based on search input and selected category
  const filteredItems = useMemo(() => {
    let filtered = itemData;

    // Filter by debounced name to reduce frequent updates
    if (debouncedName.trim()) {
      const search = debouncedName.trim();
      filtered = filtered.filter(item => item.name.replaceAll('-', ' ').includes(search));
    }

    // Filter by selected category
    if (selectedCategory !== 'all') {
      const selectedPocketCategories =
        itemPocketData.find(pocket => pocket.name === selectedCategory.toLowerCase())?.categories ||
        [];

      filtered = filtered.filter(({ category }) => selectedPocketCategories.includes(category));
    }

    return filtered;
  }, [debouncedName, selectedCategory, itemData, itemPocketData]);

  return (
    <Stack gap={4} width="100%">
      <Typography variant="pageHeading">Pokémon Item List</Typography>
      <Grid2 direction="column" gap={2}>
        <CustomInput label="Item Name" value={nameSearch} onChange={handleNameChange} />
        <DropdownV2
          label="Category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={handleCategoryChange}
        />
        <CustomButton
          variant="contained"
          disabled={!nameSearch.trim() && selectedCategory === 'all'}
          onClick={() => {
            setNameSearch('');
            setSelectedCategory('all');
          }}
        >
          Reset
        </CustomButton>
      </Grid2>
      {filteredItems.length > 0 ? (
        <ItemTable
          items={filteredItems}
          customKey={`item-table-${selectedCategory}-${nameSearch}`}
        />
      ) : (
        <Typography
          variant="sectionSubTitle"
          py={4}
          component={motion.p}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={fadeInUpVariant}
          key="noitem-message"
        >
          No items found for current criteria.
        </Typography>
      )}
    </Stack>
  );
};

export default ItemListPage;
