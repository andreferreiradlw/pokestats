import { useMemo, useCallback } from 'react';
// types
import type { PokestatsBerriesPageProps } from '@/pages/berries';
// helpers
import { fadeInUpVariant } from '@/animations';
import { useFormik } from 'formik';
// components
import { Stack, Typography } from '@mui/material';
import BerryTable from './BerryTable';
import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput';
import DropdownV2 from '../DropdownV2';
import { motion } from 'framer-motion';

const BerryListPage = ({ berryData }: PokestatsBerriesPageProps): JSX.Element => {
  // Options
  const firmOptions = useMemo(
    () => [
      { label: 'All', value: 'all' },
      { label: 'Very Soft', value: 'very-soft' },
      { label: 'Soft', value: 'soft' },
      { label: 'Hard', value: 'hard' },
      { label: 'Very Hard', value: 'very-hard' },
      { label: 'Super Hard', value: 'super-hard' },
    ],
    [],
  );

  const categoryOptions = useMemo(
    () => [
      { label: 'All', value: 'all' },
      { label: 'Medicine', value: 'medicine' },
      { label: 'Picky Healing', value: 'picky-healing' },
      { label: 'Baking Only', value: 'baking-only' },
      { label: 'Effort Drop', value: 'effort-drop' },
      { label: 'Type Protection', value: 'type-protection' },
      { label: 'In a Pinch', value: 'in-a-pinch' },
      { label: 'Other', value: 'other' },
    ],
    [],
  );

  // Formik setup
  const { values, resetForm, setFieldValue, handleChange } = useFormik({
    initialValues: {
      nameSearch: '',
      selectedFirmness: 'all',
      selectedCategory: 'all',
    },
    onSubmit: () => {},
    validateOnChange: false, // skip validation on change
    validateOnBlur: false, // skip validation on blur
  });

  const filteredBerries = useMemo(() => {
    const search = values.nameSearch.trim().replace(/-/g, ' ').toLowerCase();

    return berryData.filter(berry => {
      // Combine all filter conditions
      return (
        (!search || berry.name.replace(/-/g, ' ').toLowerCase().includes(search)) &&
        (values.selectedFirmness === 'all' || berry.firmness.name === values.selectedFirmness) &&
        (values.selectedCategory === 'all' || berry.category === values.selectedCategory)
      );
    });
  }, [values, berryData]);

  const handleFirmnessChange = useCallback(
    (value: string) => {
      setFieldValue('selectedFirmness', value);
    },
    [setFieldValue],
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      setFieldValue('selectedCategory', value);
    },
    [setFieldValue],
  );

  const handleReset = useCallback(() => resetForm(), [resetForm]);

  return (
    <Stack gap={4} width="100%">
      <Typography variant="pageHeading">Pokémon Berry List</Typography>
      <Stack flexDirection="row" flexWrap="wrap" gap={2} component="form">
        <CustomInput
          label="Item Name"
          value={values.nameSearch}
          onChange={handleChange}
          name="nameSearch"
        />
        <DropdownV2
          label="Firmness"
          options={firmOptions}
          value={values.selectedFirmness}
          onChange={handleFirmnessChange}
        />
        <DropdownV2
          label="Category"
          minWidth="175px"
          options={categoryOptions}
          value={values.selectedCategory}
          onChange={handleCategoryChange}
        />
        <CustomButton
          variant="contained"
          disabled={
            !values.nameSearch.trim() &&
            values.selectedFirmness === 'all' &&
            values.selectedCategory === 'all'
          }
          onClick={handleReset}
        >
          Reset Filters
        </CustomButton>
      </Stack>
      {filteredBerries.length > 0 ? (
        <BerryTable items={filteredBerries} />
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
          No berries found for current criteria.
        </Typography>
      )}
    </Stack>
  );
};

export default BerryListPage;
