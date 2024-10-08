'use client';

import { useCallback, useEffect, useMemo } from 'react';
// types
import type { PokestatsItemsPageProps } from '@/app/items/page.jsx';
// helpers
import { capitalise, removeDash } from '@/helpers';
import { useDebouncedValue } from '@/hooks';
import { fadeInUpVariant } from '@/animations';
import { useFormik } from 'formik';
// components
import { Stack, Typography } from '@mui/material';
import CustomInput from '@/components/CustomInput';
import DropdownV2 from '@/components/DropdownV2';
import CustomButton from '@/components/CustomButton';
import ItemTable from './ItemTable';
import { motion } from '@/client';

const ItemListPage = ({
  itemData,
  itemPocketNames,
  itemPocketData,
  allItemAttributes,
}: PokestatsItemsPageProps): JSX.Element => {
  // Formik setup
  const { values, resetForm, setFieldValue, handleChange } = useFormik({
    initialValues: {
      nameSearch: '',
      selectedCategory: 'all',
      selectedAttribute: 'all',
    },
    onSubmit: () => {},
    validateOnChange: false, // skip validation on change
    validateOnBlur: false, // skip validation on blur
  });

  // Debounce search input
  const debouncedName = useDebouncedValue(values.nameSearch, 100);

  // Memoized category options
  const categoryOptions = useMemo(() => {
    const options = itemPocketNames.map(name => ({
      label: capitalise(name),
      value: name,
    }));
    return [{ label: 'All', value: 'all' }, ...options];
  }, [itemPocketNames]);

  // Memoized attribute options
  const attributeOptions = useMemo(() => {
    const options = allItemAttributes.map(({ name }) => ({
      label: capitalise(removeDash(name)),
      value: name,
    }));
    return [{ label: 'All', value: 'all' }, ...options];
  }, [allItemAttributes]);

  // Memoized item filtering
  const filteredItems = useMemo(() => {
    const search = debouncedName.trim().replace(/-/g, ' ').toLowerCase();
    const selectedCategories =
      values.selectedCategory !== 'all'
        ? itemPocketData.find(pocket => pocket.name === values.selectedCategory.toLowerCase())
            ?.categories || []
        : null;

    return itemData.filter(item => {
      return (
        (!search || item.name.replace(/-/g, ' ').toLowerCase().includes(search)) &&
        (!selectedCategories || selectedCategories.includes(item.category)) &&
        (values.selectedAttribute === 'all' || item.attributes.includes(values.selectedAttribute))
      );
    });
  }, [debouncedName, values.selectedCategory, values.selectedAttribute, itemData, itemPocketData]);

  // Effect to trigger filtering on debounced input
  useEffect(() => {
    if (debouncedName === values.nameSearch) {
      // Trigger filtering if debounced search matches current value
    }
  }, [debouncedName, values.nameSearch]);

  // Memoized reset function
  const handleReset = useCallback(() => {
    resetForm();
  }, [resetForm]);

  return (
    <Stack gap={4} width="100%">
      <Typography variant="pageHeading">Pokémon Item List</Typography>
      <Stack flexDirection="row" flexWrap="wrap" gap={2} component="form">
        <CustomInput
          label="Item Name"
          value={values.nameSearch}
          onChange={handleChange}
          name="nameSearch"
        />
        <DropdownV2
          label="Category"
          options={categoryOptions}
          value={values.selectedCategory}
          onChange={value => setFieldValue('selectedCategory', value)}
        />
        <DropdownV2
          label="Attribute"
          minWidth="200px"
          options={attributeOptions}
          value={values.selectedAttribute}
          onChange={value => setFieldValue('selectedAttribute', value)}
        />
        <CustomButton
          variant="contained"
          disabled={
            !values.nameSearch.trim() &&
            values.selectedCategory === 'all' &&
            values.selectedAttribute === 'all'
          }
          onClick={handleReset}
        >
          Reset Filters
        </CustomButton>
      </Stack>
      {filteredItems.length > 0 ? (
        <ItemTable
          items={filteredItems}
          customKey={`item-table-${values.selectedCategory}-${values.nameSearch}-${values.selectedAttribute}`}
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
