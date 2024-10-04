import { useMemo, useCallback } from 'react';
// types
import type { PokestatsMovesPageProps } from '@/pages/moves';
// helpers
import { type GenerationOption, generationOptions } from '@/helpers';
// components
import { Stack, Typography } from '@mui/material';
import CustomButton from '../CustomButton';
import DropdownV2 from '../DropdownV2';
import CustomInput from '../CustomInput';
import MovesTableV2 from '../MovesTableV2';
import { useFormik } from 'formik';

const MovesListPage = ({ moves, typeOptions }: PokestatsMovesPageProps): JSX.Element => {
  // Options
  const categoryMoveOptions = useMemo(
    () => [
      { label: 'All', value: 'all' },
      { label: 'Physical', value: 'physical' },
      { label: 'Special', value: 'special' },
      { label: 'Status', value: 'status' },
    ],
    [],
  );

  // Formik setup
  const { values, resetForm, setFieldValue, handleChange } = useFormik({
    initialValues: {
      nameSearch: '',
      selectedCategory: 'all',
      selectedType: 'all',
      selectedGen: 'all',
    },
    onSubmit: () => {},
    validateOnChange: false, // skip validation on change
    validateOnBlur: false, // skip validation on blur
  });

  // Memoized filtered moves
  const filteredMoves = useMemo(() => {
    const search = values.nameSearch.trim().replace(/-/g, ' ').toLowerCase();

    return moves.filter(move => {
      return (
        (!search || move.name.replace(/-/g, ' ').toLowerCase().includes(search)) &&
        (values.selectedGen === 'all' || move.generation.name === values.selectedGen) &&
        (values.selectedCategory === 'all' ||
          move.damage_class?.name === values.selectedCategory) &&
        (values.selectedType === 'all' || move.type.name === values.selectedType)
      );
    });
  }, [values, moves]);

  // Memoized event handlers
  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      setFieldValue('selectedCategory', newCategory);
    },
    [setFieldValue],
  );

  const handleTypeChange = useCallback(
    (newType: string) => {
      setFieldValue('selectedType', newType);
    },
    [setFieldValue],
  );

  const handleGenChange = useCallback(
    (newGen: GenerationOption['value']) => {
      setFieldValue('selectedGen', newGen);
    },
    [setFieldValue],
  );

  const handleReset = useCallback(() => resetForm(), [resetForm]);

  return (
    <Stack gap={4} width="100%">
      <Typography variant="pageHeading">Pokémon Moves List</Typography>
      <Stack flexDirection="row" flexWrap="wrap" gap={2} component="form">
        <CustomInput
          label="Move Name"
          value={values.nameSearch}
          onChange={handleChange}
          name="nameSearch"
        />
        <DropdownV2
          label="Category"
          options={categoryMoveOptions}
          value={values.selectedCategory}
          onChange={handleCategoryChange}
        />
        <DropdownV2
          label="Type"
          options={typeOptions}
          value={values.selectedType}
          onChange={handleTypeChange}
        />
        <DropdownV2<GenerationOption['value']>
          label="Generation"
          options={generationOptions}
          value={values.selectedGen as GenerationOption['value']}
          onChange={handleGenChange}
        />
        <CustomButton
          variant="contained"
          disabled={
            !values.nameSearch &&
            values.selectedGen === 'all' &&
            values.selectedCategory === 'all' &&
            values.selectedType === 'all'
          }
          onClick={handleReset}
        >
          Reset Filters
        </CustomButton>
      </Stack>
      <MovesTableV2
        paginated
        moves={filteredMoves}
        noMovesText="No moves found for current criteria."
      />
    </Stack>
  );
};

export default MovesListPage;
