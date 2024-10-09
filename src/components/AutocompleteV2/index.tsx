'use client';

import type { CSSProperties } from 'react';
// types
import type { HTMLMotionProps } from '@/client';
// hooks
import { useRouter } from 'next/navigation';
import { useAutocompleteOptions, useUmami, type AutocompleteListOption } from '@/hooks';
// helpers
import { capitalise, formatPokemonId, mapGeneration, removeDash } from '@/helpers';
import { fadeInDownVariant } from '@/animations';
// components
import type { AutocompleteProps, Theme } from '@mui/material';
import { Autocomplete, Box, createFilterOptions, Stack, TextField } from '@mui/material';
import Loading from '@/components/Loading';
// styles
import {
  Container,
  EggIcon,
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
  assetType: AutocompleteListOption['assetType'];
  name: string;
  id: number;
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
          alt={`${name} pokémon`}
          src={
            id > 905
              ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
              : `https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${formatPokemonId(
                  id,
                )}.png`
          }
        />
      ) : undefined;
    case 'type':
      return <TypeIcon type={name as keyof Theme['palette']['types']} />;
    case 'move':
      return (
        <ItemIcon
          alt={`${name} pokémon move`}
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
    case 'tool':
      switch (name) {
        case 'headbutt-tree-finder':
          return (
            <ItemIcon
              alt="Headbutt tree finder"
              src="https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-ii/headbutt.png"
            />
          );
        default:
          return undefined;
      }
    case 'item':
      return id > 846 ? (
        <Box width={40} height={40} />
      ) : (
        <ItemIcon
          alt={`${name} pokémon item`}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}.png`}
        />
      );
    case 'eggGroup':
      return <EggIcon />;
    default:
      return undefined;
  }
};

const AutocompleteV2 = ({
  placeholder,
  autocompleteOptions,
  ...rest
}: AutocompleteV2Props): JSX.Element => {
  // hooks
  const router = useRouter();
  const { track } = useUmami();
  // fetch data
  const { data, isLoading } = useAutocompleteOptions();

  const filterOptions = createFilterOptions<AutocompleteListOption>({
    matchFrom: 'any',
    stringify: ({ name, id, assetType }) =>
      assetType === 'pokemon' ? `${removeDash(name)} ${id}` : removeDash(name),
    limit: 8,
    ignoreCase: true,
  });

  return (
    <Container {...rest}>
      <Autocomplete<AutocompleteListOption, false, true, false, 'div'>
        fullWidth
        autoHighlight
        disableClearable
        clearOnBlur
        loading={isLoading}
        options={data || []}
        getOptionLabel={({ name }) => capitalise(removeDash(name))}
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
                          flexGrow={0}
                          alignItems="flex-end"
                          $iconWidth={autocompleteOptions?.size === 'small' ? 3 : 4}
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
          // @ts-expect-error: ListWrapper is a motion element
          initial: 'hidden',
          animate: 'show',
          whileTap: 'tap',
          exit: 'exit',
          variants: fadeInDownVariant,
        }}
        onChange={(_, option) => {
          track('Autocomplete Selection', { assetType: option.assetType, name: option.name });

          if (option.assetType === 'region') {
            router.push(`/regions/${option.generation}/${option.name}`);
          } else if (option.assetType === 'tool') {
            router.push(`/${option.name}`);
          } else if (option.assetType === 'eggGroup') {
            router.push(`/egg-group/${option.name}`);
          } else {
            router.push(`/${option.assetType}/${option.name}`);
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
