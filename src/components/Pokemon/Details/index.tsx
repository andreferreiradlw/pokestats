import { useContext, useMemo, useState, useEffect } from 'react';
// types
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
import type { Ability } from 'pokenode-ts';
// helpers
import { GameVersionContext } from '@/context';
import { removeDash, mapGeneration, formatFlavorText, findEnglishName } from '@/helpers';
// components
import TypeBadge from '@/components/TypeBadge';
import { capitalize, Chip, Grid2, Grid2Props, Stack, Typography } from '@mui/material';
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
  // game version
  const { gameVersion } = useContext(GameVersionContext);
  // data
  // @ts-expect-error: cries not correctly defined
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

  // load pokemon cry sound
  const [latestAudio, setLatestAudio] = useState<HTMLAudioElement>();
  const [legacyAudio, setLegacyAudio] = useState<HTMLAudioElement | null>();

  useEffect(() => {
    setLatestAudio(() => {
      const tempAudio = new Audio(cries.latest);
      tempAudio.volume = 0.5;
      return tempAudio;
    });
    setLegacyAudio(() => {
      const tempAudio = new Audio(cries.legacy);
      tempAudio.volume = 0.5;
      return tempAudio;
    });
  }, [cries]);

  const generationName = useMemo(() => mapGeneration(generation?.name), [generation]);

  const flavorText = useMemo(() => {
    // @ts-expect-error: valid text entries
    const versionEntry = flavor_text_entries.filter(entry => entry.version.name === gameVersion);
    // return formatted text
    // page breaks are treated just like newlines
    // soft hyphens followed by newlines vanish
    // letter-hyphen-newline becomes letter-hyphen, to preserve real hyphenation
    // any other newline becomes a space
    return versionEntry.length
      ? formatFlavorText(versionEntry[0].flavor_text)
      : 'No description available for currently selected generation.';
  }, [gameVersion, flavor_text_entries]);

  const pokemonWeight = useMemo(
    () => `${weight / 10} kg (${Math.round(weight * 2.2046) / 10} lbs)`,
    [weight],
  );

  const pokemonHeight = useMemo(() => {
    // calculate height in feet
    const heightInFeet = Math.round(height * 3.2808) / 10;
    // split number
    const numbers = heightInFeet.toString().split('.');
    // return string
    return `${height / 10} m (${numbers[0] || '0'}'${numbers[1] || '0'}")`;
  }, [height]);

  const renderAbilities = useMemo(
    () =>
      pokemonAbilities.map(({ ability, is_hidden }, i) => (
        <Numbered key={ability.name}>
          <Typography fontWeight="500" textTransform="capitalize">
            {`${i + 1}. ${removeDash(ability.name)}`}
            {is_hidden && ' (Hidden Ability)'}
          </Typography>
          <span>{abilities[i].effect_entries[0]?.short_effect}</span>
        </Numbered>
      )),
    [pokemonAbilities, abilities],
  );

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
        gap={{ xxs: '0.5em', lg: '0.3em' }}
      >
        {!!types?.length && (
          <Stack flexDirection="row" flexWrap="wrap" width="auto" gap={2}>
            {types.map(({ type }) => (
              <TypeBadge $typename={type.name} key={`${type.name}-detail-${id}`} />
            ))}
          </Stack>
        )}
        <Typography variant="pageHeading">{findEnglishName(names)}</Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Chip
          label="Latest Cry"
          icon={<VolumeUpIcon />}
          onClick={() => latestAudio?.play()}
          component={motion.div}
          whileHover="hover"
          whileTap="tap"
          variants={hoverVariant}
        />
        {legacyAudio && (
          <Chip
            label="Legacy Cry"
            variant="outlined"
            icon={<VolumeDownIcon />}
            onClick={() => legacyAudio?.play()}
            component={motion.div}
            whileHover="hover"
            whileTap="tap"
            variants={hoverVariant}
          />
        )}
      </Stack>
      {(is_baby || is_legendary || is_mythical) && (
        <Typography fontWeight="700">
          {is_baby && 'Baby '}
          {is_legendary && 'Legendary '}
          {is_mythical && 'Mythical '}
          Pokemon
        </Typography>
      )}
      <Flavor>{flavorText}</Flavor>
      <Table forwardedAs="table">
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
