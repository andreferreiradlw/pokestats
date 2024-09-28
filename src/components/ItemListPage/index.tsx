import { useCallback, useEffect, useMemo, useState } from 'react';
// types
import type { PokestatsItemsPageProps } from '@/pages/items';
// helpers
import { capitalise, type ExtractedItem, removeDash } from '@/helpers';
import { useDebouncedValue } from '@/hooks';
import { fadeInUpVariant } from '@/animations';
// components
import { Grid2, Stack, Typography } from '@mui/material';
import CustomInput from '@/components/CustomInput';
import DropdownV2 from '@/components/DropdownV2';
import CustomButton from '@/components/CustomButton';
import ItemTable from './ItemTable.tsx';
import { motion } from 'framer-motion';

const ItemListPage = ({
  itemData,
  itemPocketNames,
  itemPocketData,
  allItemAttributes,
}: PokestatsItemsPageProps): JSX.Element => {
  // States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAttribute, setSelectedAttribute] = useState('all');
  const [nameSearch, setNameSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState<ExtractedItem[]>([]);

  // Debounce search input to reduce unnecessary filtering
  const debouncedName = useDebouncedValue(nameSearch, 150);

  const categoryOptions = useMemo(() => {
    const options = itemPocketNames.map(name => ({
      label: capitalise(name),
      value: name,
    }));

    return [{ label: 'All', value: 'all' }, ...options];
  }, [itemPocketNames]);

  const attributeOptions = useMemo(() => {
    const options = allItemAttributes.map(({ name }) => ({
      label: capitalise(removeDash(name)),
      value: name,
    }));

    return [{ label: 'All', value: 'all' }, ...options];
  }, [allItemAttributes]);

  // Callback to filter items based on search input and selected category
  const filterItems = useCallback(() => {
    const search = debouncedName.trim().replace(/-/g, ' ').toLowerCase();
    const selectedCategories =
      selectedCategory !== 'all'
        ? itemPocketData.find(pocket => pocket.name === selectedCategory.toLowerCase())
            ?.categories || []
        : null;

    const filtered = itemData.filter(item => {
      // Combine all filter conditions
      return (
        (!search || item.name.replace(/-/g, ' ').toLowerCase().includes(search)) &&
        (!selectedCategories || selectedCategories.includes(item.category)) &&
        (selectedAttribute === 'all' || item.attributes.includes(selectedAttribute))
      );
    });

    setFilteredItems(filtered);
  }, [debouncedName, selectedCategory, selectedAttribute, itemData, itemPocketData]);

  useEffect(() => {
    if (debouncedName === nameSearch) filterItems();
  }, [filterItems, debouncedName, nameSearch]);

  return (
    <Stack gap={4} width="100%">
      <Typography variant="pageHeading">Pokémon Item List</Typography>
      <Grid2 direction="column" gap={2}>
        <CustomInput
          label="Item Name"
          value={nameSearch}
          onChange={event => setNameSearch(event.target.value.toLowerCase())}
        />
        <DropdownV2
          label="Category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={event => setSelectedCategory(event.target.value)}
        />
        <DropdownV2
          label="Attibute"
          minWidth="200px"
          options={attributeOptions}
          value={selectedAttribute}
          onChange={event => setSelectedAttribute(event.target.value)}
        />
        <CustomButton
          variant="contained"
          disabled={!nameSearch.trim() && selectedCategory === 'all' && selectedAttribute === 'all'}
          onClick={() => {
            // reset input states
            setNameSearch('');
            setSelectedCategory('all');
            setSelectedAttribute('all');
          }}
        >
          Reset Filters
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
