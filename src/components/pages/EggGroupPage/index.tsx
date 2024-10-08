'use client';

import { useCallback, useMemo } from 'react';
// types
import type { PokestatsEggGroupPageProps } from '@/app/egg-group/[eggGroupName]/page';
// helpers
import { useFormik } from 'formik';
import { capitalise, findEnglishName } from '@/helpers';
// components
import { Grid2, Stack, Typography } from '@mui/material';
import EggGroupTable from './EggGroupTable';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import CustomMultiSelect from '@/components/CustomMultiSelect';
import CustomSlider from '@/components/CustomSlider';

const EggGroupPage = ({
  eggGroupData,
  tableData,
  eggGroups,
}: PokestatsEggGroupPageProps): JSX.Element => {
  // Options
  const habitatOptions = useMemo(
    () => [
      { label: 'All', value: 'all' },
      { label: 'Forest', value: 'forest' },
      { label: 'Grassland', value: 'grassland' },
      { label: 'Mountain', value: 'mountain' },
      { label: 'Waters Edge', value: 'waters-edge' },
      { label: 'Rough Terrain', value: 'rough-terrain' },
      { label: 'Sea', value: 'sea' },
      { label: 'Urban', value: 'urban' },
      { label: 'Cave', value: 'cave' },
    ],
    [],
  );

  const eggGroupOptions = useMemo(
    () =>
      eggGroups
        .filter(group => group !== eggGroupData.name)
        .map(group => ({ label: capitalise(group), value: group })),
    [eggGroups, eggGroupData],
  );

  // Formik setup
  const formik = useFormik({
    initialValues: {
      nameSearch: '',
      selectedOtherGroups: [] as string[],
      selectedHabitats: [] as string[],
      selectedHatching: [5, 40],
    },
    onSubmit: () => {},
    validateOnChange: false, // skip validation on change
    validateOnBlur: false, // skip validation on blur
  });

  const { handleSubmit, values, resetForm, handleChange } = formik;

  const groupName = useMemo(() => findEnglishName(eggGroupData.names), [eggGroupData]);

  const handleReset = useCallback(() => resetForm(), [resetForm]);

  // Memoized filtered egg groups with hatching steps filter
  const filteredEggGroups = useMemo(() => {
    const search = values.nameSearch.trim().replace(/-/g, ' ').toLowerCase();

    return tableData.filter(({ name, egg_groups, habitat, hatch_counter }) => {
      const matchesSearch = !search || name?.replace(/-/g, ' ').toLowerCase().includes(search);

      const matchesEggGroups =
        values.selectedOtherGroups.length === 0 ||
        egg_groups?.some(({ name }) => values.selectedOtherGroups.includes(name));

      const matchesHabitats =
        values.selectedHabitats.length === 0 ||
        (habitat && values.selectedHabitats.includes(habitat.name));

      const matchesHatchingSteps =
        hatch_counter &&
        hatch_counter >= values.selectedHatching[0] &&
        hatch_counter <= values.selectedHatching[1];

      return matchesSearch && matchesEggGroups && matchesHabitats && matchesHatchingSteps;
    });
  }, [values, tableData]);

  return (
    <Stack gap={4} width="100%">
      <Typography variant="pageHeading">{`${groupName} Egg Group`}</Typography>
      <Grid2 container direction="row" spacing={2} component="form" onSubmit={handleSubmit}>
        <Grid2 size={12} flexDirection="row" gap={2} flexWrap="wrap" alignItems="flex-start">
          <CustomInput
            label="Pokémon Name"
            value={values.nameSearch}
            onChange={handleChange}
            name="nameSearch"
          />
          <CustomMultiSelect
            formik={formik}
            label="Other Groups"
            name="selectedOtherGroups"
            options={eggGroupOptions}
          />
          <CustomMultiSelect
            formik={formik}
            label="Habitat"
            name="selectedHabitats"
            options={habitatOptions}
          />
          <CustomSlider
            getAriaLabel={() => 'Hatching Cycles'}
            name="selectedHatching"
            label="Hatch Cycles"
            formik={formik}
            valueLabelDisplay="auto"
            disableSwap
            min={5}
            max={40}
            step={5}
            marks
            maxWidth={300}
          />
        </Grid2>
        <Grid2 size={12}>
          <CustomButton
            variant="contained"
            disabled={
              !values.nameSearch &&
              values.selectedOtherGroups.length === 0 &&
              values.selectedHabitats.length === 0
            }
            onClick={handleReset}
          >
            Reset Filters
          </CustomButton>
        </Grid2>
      </Grid2>
      <EggGroupTable
        pokemon={filteredEggGroups}
        eggGroup={eggGroupData.name}
        customKey={`group-${eggGroupData.name}-${values.nameSearch.trim()}-${values.selectedOtherGroups.join('-')}-${values.selectedHabitats.join('-')}`}
      />
    </Stack>
  );
};

export default EggGroupPage;
