import { useContext, useState, useEffect, useMemo } from 'react';
// types
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
import type { Ability } from 'pokenode-ts';
// helpers
import { GameVersionContext } from '@/context';
import {
  removeDash,
  mapGeneration,
  formatFlavorText,
  findEnglishName,
  type GameGenValue,
} from '@/helpers';
// components
import TypeBadge from '@/components/TypeBadge';
import type { Grid2Props, Theme } from '@mui/material';
import { Badge, capitalize, Chip, Grid2, Stack, Typography } from '@mui/material';
// styles
import { Table, Numbered } from '@/components/BaseStyles';
import { Flavor } from './StyledDetails';
import { motion } from 'framer-motion';
import { hoverVariant } from '@/animations';
// icons
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';

interface PokemonDetailsProps extends Grid2Props {
  pokemon: PokestatsPokemonPageProps['pokemon'];
  abilities: Ability[];
  species: PokestatsPokemonPageProps['species'];
}

const PokemonDetails = ({
  pokemon,
  abilities,
  species,
  ...rest
}: PokemonDetailsProps): JSX.Element => {
  const { gameVersion } = useContext(GameVersionContext);

  // @ts-expect-error: cries is missing in pokemon type
  const { types, abilities: pokemonAbilities, id, weight, height, cries } = pokemon;
  const {
    genera,
    flavor_text_entries,
    shape,
    color,
    is_baby,
    is_legendary,
    is_mythical,
    generation,
    names,
  } = species;

  const [audio, setAudio] = useState<{
    latest: HTMLAudioElement | null;
    legacy: HTMLAudioElement | null;
  }>({
    latest: null,
    legacy: null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && cries) {
      // Ensure this code runs only in the browser
      setAudio({
        latest: new Audio(cries.latest),
        legacy: cries.legacy ? new Audio(cries.legacy) : null,
      });
    }
  }, [cries]);

  const generationName = useMemo(
    () => mapGeneration(generation.name as GameGenValue),
    [generation],
  );

  const flavorText = useMemo(() => {
    // @ts-expect-error: valid text entries
    const versionEntry = flavor_text_entries.find(entry => entry.version.name === gameVersion);
    return versionEntry
      ? formatFlavorText(versionEntry.flavor_text)
      : 'No description available for currently selected generation.';
  }, [gameVersion, flavor_text_entries]);

  const pokemonWeight = `${weight / 10} kg (${Math.round(weight * 2.2046) / 10} lbs)`;

  const pokemonHeight = useMemo(() => {
    const heightInFeet = Math.round(height * 3.2808) / 10;
    const [feet, inches] = heightInFeet.toString().split('.');
    return `${height / 10} m (${feet || '0'}'${inches || '0'}")`;
  }, [height]);

  const renderAbilities = pokemonAbilities.map(({ ability, is_hidden }, i) => (
    <Numbered key={ability.name}>
      <Typography fontWeight="500" textTransform="capitalize">
        {`${i + 1}. ${removeDash(ability.name)}`}
        {is_hidden && ' (Hidden Ability)'}
      </Typography>
      <Typography variant="body2" component="span">
        {abilities[i]?.effect_entries[0]?.short_effect || 'No effect description available.'}
      </Typography>
    </Numbered>
  ));

  return (
    <Grid2
      flexDirection="column"
      alignItems={{ xxs: 'center', lg: 'flex-start' }}
      gap={2}
      {...rest}
    >
      <Stack
        alignItems={{ xxs: 'center', lg: 'flex-start' }}
        flexDirection={{ xxs: 'column-reverse', lg: 'column' }}
        gap={{ xxs: 1, lg: 4 }}
      >
        {types?.length > 0 && (
          <Stack flexDirection="row" flexWrap="wrap" width="auto" gap={2}>
            {types.map(({ type }) => (
              <TypeBadge
                $typename={type.name as keyof Theme['palette']['types']}
                key={`${type.name}-detail-${id}`}
              />
            ))}
          </Stack>
        )}
        <Badge
          color="secondary"
          invisible={!is_baby && !is_legendary && !is_mythical}
          badgeContent={
            <>
              {is_baby && 'Baby'}
              {is_legendary && 'Legendary'}
              {is_mythical && 'Mythical'}
            </>
          }
        >
          <Typography variant="pageHeading" lineHeight={1.25}>
            {findEnglishName(names)}
          </Typography>
        </Badge>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Chip
          label="Latest Cry"
          icon={<VolumeUpIcon />}
          onClick={() => audio.latest?.play()}
          component={motion.div}
          whileHover="hover"
          whileTap="tap"
          variants={hoverVariant}
        />
        {audio.legacy && (
          <Chip
            label="Legacy Cry"
            variant="outlined"
            icon={<VolumeDownIcon />}
            onClick={() => audio.legacy?.play()}
            component={motion.div}
            whileHover="hover"
            whileTap="tap"
            variants={hoverVariant}
          />
        )}
      </Stack>

      <Flavor variant="h5" component="h3">
        {flavorText}
      </Flavor>
      <Table>
        <tbody>
          <tr>
            <th>Pokédex №</th>
            <td>{`#${id}`}</td>
          </tr>
          <tr>
            <th>Introduced</th>
            <td>{generationName}</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>{genera[0].genus}</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>{pokemonWeight}</td>
          </tr>
          <tr>
            <th>Height</th>
            <td>{pokemonHeight}</td>
          </tr>
          <tr>
            <th>Abilities</th>
            <td>{renderAbilities}</td>
          </tr>
          <tr>
            <th>Shape</th>
            <td>{shape ? capitalize(removeDash(shape.name)) : 'No shape'}</td>
          </tr>
          <tr>
            <th>Color</th>
            <td>{capitalize(color.name)}</td>
          </tr>
        </tbody>
      </Table>
    </Grid2>
  );
};

export default PokemonDetails;
