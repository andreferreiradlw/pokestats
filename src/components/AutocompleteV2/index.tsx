import type { CSSProperties } from 'react';
// types
import type { HTMLMotionProps } from 'framer-motion';
import type { MoveType, Pokemon, PokemonType } from '@/types';
// hooks
import { useRouter } from 'next/router';
import { usePlausible } from 'next-plausible';
import type { AutocompleteListOption, PokestatsRegion } from '@/hooks';
import { useAutocompleteOptions } from '@/hooks';
// helpers
import { formatPokemonId, mapGeneration, removeDash } from '@/helpers';
import { fadeInDownVariant } from '@/animations';
// components
import type { AutocompleteProps, Theme } from '@mui/material';
import { Autocomplete, capitalize, createFilterOptions, Stack, TextField } from '@mui/material';
import Loading from '@/components/Loading';
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
  assetType:
    | PokemonType['assetType']
    | Pokemon['assetType']
    | MoveType['assetType']
    | PokestatsRegion['assetType'];
  name: string;
  id?: number;
}

const AutocompleteIcon = ({
  assetType,
  name,
  id,
}: AutocompleteIconProps): JSX.Element | undefined => {
  switch (assetType) {
    case 'pokemon':
      return id ? (
        <ItemIcon
          alt={`${name} pokemon`}
          src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${formatPokemonId(
            id,
          )}.png`}
        />
      ) : undefined;
    case 'type':
      return <TypeIcon type={name as keyof Theme['palette']['types']} />;
    case 'move':
      return (
        <ItemIcon
          alt={`${name} pokemon move`}
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/grass-memory.png"
        />
      );
    case 'region':
      return (
        <ItemIcon
          alt={`${name} region`}
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/old-sea-map.png"
        />
      );
    default:
      return undefined;
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
              slotProps={{
                input: {
                  ...InputProps,
                  endAdornment: (
                    <>
                      {isLoading && (
                        <Loading
                          width="auto"
                          alignItems="flex-end"
                          $iconWidth={autocompleteOptions?.size === 'small' ? 3 : 5}
                          py={0}
                        />
                      )}
                      {InputProps.endAdornment}
                    </>
                  ),
                },
              }}
              {...fieldProps}
            />
          );
        }}
        // @ts-expect-error: generation not inherited from type
        renderOption={({ key, ...optionProps }, { assetType, id, name, generation }) => (
          <OptionWrapper role="option" key={key} {...optionProps}>
            <Stack flexDirection="row" justifyContent="flex-start" alignItems="center" gap="1em">
              <AutocompleteIcon assetType={assetType} name={name} id={id} />
              <Option variant="subtitle1">{removeDash(name)}</Option>
            </Stack>
            {assetType === 'pokemon' && <PokeID variant="h5">{`#${id}`}</PokeID>}
            {assetType === 'region' && (
              <PokeID variant="caption">{mapGeneration(generation)}</PokeID>
            )}
          </OptionWrapper>
        )}
        // @ts-expect-error
        ListboxComponent={ListWrapper}
        ListboxProps={{
          // @ts-expect-error: cannot set custom props for ListboxComponent
          initial: 'hidden',
          animate: 'show',
          whileTap: 'tap',
          exit: 'exit',
          variants: fadeInDownVariant,
        }}
        onHighlightChange={async (_, option) => {
          if (option) {
            if (option.assetType === 'region') {
              await router.prefetch(`/regions/${option.generation}/${option.name}`);
            } else {
              await router.prefetch(`/${option.assetType}/${option.name}`);
            }
          }
        }}
        onChange={async (_, optionSelected) => {
          plausible('Autocomplete Selection');
          if (optionSelected.assetType === 'region') {
            await router.push(`/regions/${optionSelected.generation}/${optionSelected.name}`);
          } else {
            await router.push(`/${optionSelected.assetType}/${optionSelected.name}`);
          }
        }}
        noOptionsText="Nothing was found!"
        loadingText="Rummaging..."
        {...autocompleteOptions}
      />
    </Container>
  );
};

export default AutocompleteV2;
