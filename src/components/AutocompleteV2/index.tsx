// types
import type { HTMLMotionProps } from 'framer-motion';
import type { CSSProperties } from '@mui/styled-engine-sc';
import type { MoveType, Pokemon, PokemonType } from '@/types';
// hooks
import { useRouter } from 'next/router';
import { usePlausible } from 'next-plausible';
import { AutocompleteListOption, useAutocompleteOptions } from '@/hooks';
// helpers
import { fadeInDownVariant, removeDash } from '@/helpers';
// components
import {
  Autocomplete,
  AutocompleteProps,
  capitalize,
  createFilterOptions,
  Stack,
  TextField,
} from '@mui/material';
import LoadingV2 from '../LoadingV2';
// styles
import {
  Container,
  ItemIcon,
  ListWrapper,
  Option,
  OptionWrapper,
  PokeID,
} from './styledAutocompleteV2';
// icons
import TypeIcon from '../TypeIcon';

export interface AutocompleteV2Props extends HTMLMotionProps<'div'> {
  width?: CSSProperties['width'];
  placeholder?: string;
  autocompleteOptions?: Partial<
    AutocompleteProps<AutocompleteListOption, false, true, false, 'div'>
  >;
}

interface AutocompleteIconProps {
  assetType: PokemonType['assetType'] | Pokemon['assetType'] | MoveType['assetType'];
  name: string;
  id?: number;
}

const AutocompleteIcon = ({ assetType, name, id }: AutocompleteIconProps): JSX.Element => {
  switch (assetType) {
    case 'pokemon':
      return (
        <ItemIcon
          alt={`${name} pokemon`}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        />
      );
    case 'type':
      return <TypeIcon type={name} />;
    case 'move':
      return (
        <ItemIcon
          alt={`${name} pokemon move`}
          src="https://raw.githubusercontent.com/msikma/pokesprite/master/items/hm/normal.png"
        />
      );
    default:
      return null;
  }
};

const AutocompleteV2 = ({
  placeholder,
  autocompleteOptions,
  ...rest
}: AutocompleteV2Props): JSX.Element => {
  // router
  const router = useRouter();
  // analytics
  const plausible = usePlausible();
  // fetch data
  const { data, isLoading } = useAutocompleteOptions();

  const filterOptions = createFilterOptions<AutocompleteListOption>({
    matchFrom: 'any',
    // match by both name and id if option is a pokemon
    stringify: ({ name, id, assetType }) => (assetType === 'pokemon' ? name + id : name),
    limit: 8,
  });

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
          const { InputProps, ...fieldProps } = params;

          return (
            <TextField
              placeholder={placeholder || 'Search Pokestats'}
              autoComplete="off"
              InputProps={{
                ...InputProps,
                endAdornment: (
                  <>
                    {isLoading && <LoadingV2 $iconWidth={5} py={0} />}
                    {InputProps.endAdornment}
                  </>
                ),
              }}
              {...fieldProps}
            />
          );
        }}
        renderOption={({ key, ...optionProps }, { assetType, id, name }) => (
          <OptionWrapper role="option" key={key} {...optionProps}>
            <Stack flexDirection="row" justifyContent="flex-start" alignItems="center" gap="1em">
              <AutocompleteIcon assetType={assetType} name={name} id={id} />
              <Option variant="subtitle1">{removeDash(name)}</Option>
            </Stack>
            {assetType === 'pokemon' && <PokeID variant="h5">{`#${id}`}</PokeID>}
          </OptionWrapper>
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
        noOptionsText="Nothing was found!"
        loadingText="Rummaging..."
        {...autocompleteOptions}
      />
    </Container>
  );
};

export default AutocompleteV2;
