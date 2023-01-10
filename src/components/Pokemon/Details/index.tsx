import { useContext, useMemo } from 'react';
// types
import type { BoxProps } from '@/components/Box';
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
import type { Ability } from 'pokenode-ts';
// helpers
import GameVersionContext from '@/components/Layout/gameVersionContext';
import { AnimatePresence } from 'framer-motion';
import { capitalize, removeDash } from '@/helpers/typography';
import { fadeInUpVariant } from '@/helpers/animations';
// components
import BoxWrapper from '@/components/Box/StyledBox';
import TypeBadge from '@/components/TypeBadge';
// styles
import { PageHeading, Table, Numbered } from '@/components/BaseStyles';
import { TypeContainer, Genera, Flavor } from './StyledDetails';

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
  const { genera, flavor_text_entries, shape, color, is_baby, is_legendary, is_mythical } = species;
  // memo
  const flavorText = useMemo(() => {
    // @ts-ignore
    const versionEntry = flavor_text_entries.filter(entry => entry.version.name === gameVersion);
    // return formatted text
    // page breaks are treated just like newlines
    // soft hyphens followed by newlines vanish
    // letter-hyphen-newline becomes letter-hyphen, to preserve real hyphenation
    // any other newline becomes a space
    return versionEntry.length
      ? versionEntry[0].flavor_text
          .replace(/\u00AD/g, '')
          .replace(/\u000C/g, ' ')
          .replace(/u' -\n'/, ' - ')
          .replace(/u'-\n'/, '-')
          .replace(/(\r\n|\n|\r)/gm, ' ')
      : 'No description available for currently selected generation.';
  }, [gameVersion, flavor_text_entries]);

  const pokemonWeight = useMemo(
    () => `${weight / 10} kg ( ${Math.round(weight * 2.2046) / 10} lbs )`,
    [weight],
  );

  const pokemonHeight = useMemo(() => {
    // calculate height in feet
    const heightInFeet = Math.round(height * 3.2808) / 10;
    // split number
    const numbers = heightInFeet.toString().split('.');
    // return string
    return `${height / 10} m ( ${numbers[0] || '0'}'${numbers[1] || '0'}" )`;
  }, [height]);

  const renderAbilities = useMemo(
    () =>
      pokemonAbilities.map(({ ability, is_hidden }, i) => (
        <Numbered key={`${ability}-${i}`}>
          {`${i + 1}. ${removeDash(ability.name)}`}
          {is_hidden && ' ( Hidden Ability )'}
          <br />
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
        flexgap="0.5em"
        width="100%"
        initial="hidden"
        animate="show"
        variants={fadeInUpVariant}
        key={`pokemon-details-${name}`}
        {...rest}
      >
        {types?.length > 0 && (
          <TypeContainer flexdirection="row" flexjustify="flex-start" flexwrap="wrap">
            {types.map(({ type }, i) => (
              <TypeBadge $typename={type.name} key={`${type.name}-${i}-detail-${id}`} />
            ))}
          </TypeContainer>
        )}
        <PageHeading>{removeDash(name)}</PageHeading>
        {(is_baby || is_legendary || is_mythical) && (
          <Genera>
            {is_baby && `Baby `}
            {is_legendary && `Legendary `}
            {is_mythical && `Mythical `}
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
              <td>{shape ? capitalize(shape.name) : 'No shape'}</td>
            </tr>
            <tr>
              <th>Color</th>
              <td>{capitalize(color.name)}</td>
            </tr>
          </tbody>
        </Table>
      </BoxWrapper>
    </AnimatePresence>
  );
};

export default PokemonDetails;
