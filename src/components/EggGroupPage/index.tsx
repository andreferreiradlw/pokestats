import { useCallback, useMemo } from 'react';
// types
import type { PokestatsEggGroupPageProps } from '@/pages/egg-group/[eggGroupName]';
// helpers
import { useFormik } from 'formik';
import { capitalise, findEnglishName } from '@/helpers';
// components
import { Grid2, Stack, Typography } from '@mui/material';
import EggGroupTable from './EggGroupTable';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import CustomMultiSelect from '../CustomMultiSelect';

const EggGroupPage = ({
  eggGroupData,
  tableData,
  eggGroups,
}: PokestatsEggGroupPageProps): JSX.Element => {
  // Formik setup
  const formik = useFormik({
    initialValues: {
      nameSearch: '',
      selectedOtherGroups: [] as string[],
    },
    onSubmit: () => {},
    validateOnChange: false, // skip validation on change
    validateOnBlur: false, // skip validation on blur
  });

  const { handleSubmit, values, resetForm, handleChange } = formik;

  const groupName = useMemo(() => findEnglishName(eggGroupData.names), [eggGroupData]);

  const eggGroupOptions = useMemo(
    () =>
      eggGroups
        .filter(group => group !== eggGroupData.name)
        .map(group => ({ label: capitalise(group), value: group })),
    [eggGroups],
  );

  const handleReset = useCallback(() => resetForm(), [resetForm]);

  // Memoized filtered egg groups
  const filteredEggGroups = useMemo(() => {
    const search = values.nameSearch.trim().replace(/-/g, ' ').toLowerCase();

    return tableData.filter(({ name, egg_groups }) => {
      const matchesSearch = !search || name?.replace(/-/g, ' ').toLowerCase().includes(search);

      const matchesEggGroups =
        values.selectedOtherGroups.length === 0 ||
        egg_groups?.some(({ name }) => values.selectedOtherGroups.includes(name));

      return matchesSearch && matchesEggGroups;
    });
  }, [values, tableData]);

  return (
    <Stack gap={4} width="100%">
      <Typography variant="pageHeading">{`${groupName} Egg Group`}</Typography>
      <Grid2 direction="column" gap={2} component="form" onSubmit={handleSubmit}>
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
        <CustomButton
          variant="contained"
          disabled={!values.nameSearch && values.selectedOtherGroups.length === 0}
          onClick={handleReset}
        >
          Reset Filters
        </CustomButton>
      </Grid2>
      <EggGroupTable pokemon={filteredEggGroups} eggGroup={eggGroupData.name} />
    </Stack>
  );
};

export default EggGroupPage;
