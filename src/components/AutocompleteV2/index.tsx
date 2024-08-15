import { HTMLMotionProps } from 'framer-motion';
import { Container, ListWrapper } from './styledAutocompleteV2';
import { CSSProperties } from '@mui/styled-engine-sc';
import { AutocompleteListOption, useAutocompleteOptions } from '@/hooks';
import { useEffect } from 'react';
import { Autocomplete, Box, capitalize, createFilterOptions, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { usePlausible } from 'next-plausible';
import { fadeInDownVariant } from '@/helpers';

export interface AutocompleteV2Props extends HTMLMotionProps<'div'> {
  width?: CSSProperties['width'];
  placeholder?: string;
}

const AutocompleteV2 = ({ placeholder, ...rest }: AutocompleteV2Props): JSX.Element => {
  // router
  const router = useRouter();
  // analytics
  const plausible = usePlausible();
  // fetch data
  const { data, isLoading } = useAutocompleteOptions();

  const filterOptions = createFilterOptions<AutocompleteListOption>({
    matchFrom: 'start',
    limit: 6,
  });

  useEffect(() => {
    console.log('options', data);
  }, [data]);

  return (
    <Container {...rest}>
      <Autocomplete<AutocompleteListOption, false, true, false, 'div'>
        fullWidth
        autoHighlight
        disableClearable
        loading={isLoading}
        options={data || []}
        getOptionLabel={({ name }) => capitalize(name)}
        getOptionKey={({ id, assetType }) => `${assetType}-${id}`}
        filterOptions={filterOptions}
        groupBy={({ assetType }) => assetType}
        isOptionEqualToValue={(option, value) =>
          option.id === value.id && option.assetType === value.assetType
        }
        renderInput={params => {
          const { inputProps, ...fieldProps } = params;

          return (
            <TextField
              placeholder={placeholder || 'Search Pokestats'}
              autoComplete="off"
              inputProps={inputProps}
              {...fieldProps}
            />
          );
        }}
        renderOption={({ key, ...optionProps }, option) => (
          <Box component="li" role="option" key={key} {...optionProps}>
            {option.name}
          </Box>
        )}
        ListboxComponent={ListWrapper}
        ListboxProps={{
          // @ts-expect-error: cannot set custom props for ListboxComponent
          initial: 'hidden',
          animate: 'show',
          whileTap: 'tap',
          exit: 'exit',
          variants: fadeInDownVariant,
          key: 'autocomplete-list-wrapper',
        }}
        onHighlightChange={async (_, option) => {
          if (option) await router.prefetch(`/${option.assetType}/${option.name}`);
        }}
        onChange={async (_, optionSelected) => {
          plausible('Autocomplete Selection');
          await router.push(`/${optionSelected.assetType}/${optionSelected.name}`);
        }}
      />
    </Container>
  );
};

export default AutocompleteV2;
