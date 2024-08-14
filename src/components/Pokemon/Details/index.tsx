import { useContext, useMemo, useState, useEffect } from 'react';
// types
import type { BoxProps } from '@/components/Box';
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
import type { Ability } from 'pokenode-ts';
// helpers
import GameVersionContext from '@/components/Layout/gameVersionContext';
import { AnimatePresence } from 'framer-motion';
import {
  removeDash,
  fadeInUpVariant,
  mapGeneration,
  formatFlavorText,
  findEnglishName,
} from '@/helpers';
// components
import Box from '@/components/Box';
import BoxWrapper from '@/components/Box/StyledBox';
import TypeBadge from '@/components/TypeBadge';
// styles
import { PageHeading, Table, Numbered, UppercasedTd } from '@/components/BaseStyles';
import {
  TypeContainer,
  IconContainer,
  CriesIcon,
  AbilityName,
  Genera,
  Flavor,
} from './StyledDetails';

interface PokemonDetailsProps extends BoxProps {
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
  const { types, abilities: pokemonAbilities, id, name, weight, height } = pokemon;
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
  const [cry, setCry] = useState(null);
  useEffect(() => {
    if (id <= 802) {
      setCry(
        new Audio(
          `https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/cries/${id}.${
            id >= 722 ? 'wav' : 'mp3'
          }`,
        ),
      );
    }
  }, [id]);
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
          <AbilityName as="p">
            {`${i + 1}. ${removeDash(ability.name)}`}
            {is_hidden && ' (Hidden Ability)'}
          </AbilityName>
          <span>{abilities[i].effect_entries[0]?.short_effect}</span>
        </Numbered>
      )),
    [pokemonAbilities, abilities],
  );

  return (
    <AnimatePresence mode="wait">
      <BoxWrapper
        flexdirection="column"
        flexalign={{ xxs: 'center', lg: 'flex-start' }}
        flexgap="1em"
        width="100%"
        initial="hidden"
        animate="show"
        variants={fadeInUpVariant}
        key={`pokemon-details-${name}`}
        {...rest}
      >
        <Box
          flexalign={{ xxs: 'center', lg: 'flex-start' }}
          flexdirection={{ xxs: 'column-reverse', lg: 'column' }}
          flexgap={{ xxs: '0.5em', lg: '0.3em' }}
        >
          {!!types?.length && (
            <TypeContainer flexdirection="row" flexwrap="wrap" width="auto">
              {types.map(({ type }) => (
                <TypeBadge $typename={type.name} key={`${type.name}-detail-${id}`} />
              ))}
            </TypeContainer>
          )}
          <Box
            flexdirection="row"
            flexjustify="flex-start"
            flexalign="center"
            flexgap="0.5em"
            width="auto"
          >
            <PageHeading>{findEnglishName(names)}</PageHeading>
            {id <= 802 && (
              <IconContainer
                whileHover="hover"
                whileTap="tap"
                variants={fadeInUpVariant}
                key="cries-icon-container-pokemon"
                onClick={() => cry?.play()}
              >
                <CriesIcon />
              </IconContainer>
            )}
          </Box>
        </Box>
        {(is_baby || is_legendary || is_mythical) && (
          <Genera>
            {is_baby && 'Baby '}
            {is_legendary && 'Legendary '}
            {is_mythical && 'Mythical '}
            Pokemon
          </Genera>
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
              <UppercasedTd>{shape ? removeDash(shape.name) : 'No shape'}</UppercasedTd>
            </tr>
            <tr>
              <th>Color</th>
              <UppercasedTd>{color.name}</UppercasedTd>
            </tr>
          </tbody>
        </Table>
      </BoxWrapper>
    </AnimatePresence>
  );
};

export default PokemonDetails;
