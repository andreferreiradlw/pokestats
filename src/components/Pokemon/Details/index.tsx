import { useSelector } from 'react-redux';
// types
import type { BoxProps } from '@/components/Box';
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
import type { PokemonAbility } from 'pokenode-ts';
// helpers
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
  species: PokestatsPokemonPageProps['species'];
}

const PokemonDetails = ({ pokemon, species, ...rest }: PokemonDetailsProps): JSX.Element => {
  // game version
  const gameVersion = useSelector(state => state.game.version);

  // data
  const { types, abilities, id, name, weight, height } = pokemon;
  const { genera, flavor_text_entries, shape, color, is_baby, is_legendary, is_mythical } = species;

  // flavor text
  const flavorText = version => {
    const versionEntry = flavor_text_entries.filter(entry => {
      return entry.version.name === version;
    });
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
  };

  // weight
  const pokemonWeight = (currWeight: number): string =>
    `${currWeight / 10} kg ( ${Math.round(currWeight * 2.2046) / 10} lbs )`;

  // height
  const pokemonHeight = (currHeight: number): string => {
    // calculate height in feet
    const heightInFeet = Math.round(currHeight * 3.2808) / 10;
    // split number
    const numbers = heightInFeet.toString().split('.');
    // return string
    return `${currHeight / 10} m ( ${numbers[0] || '0'}'${numbers[1] || '0'}" )`;
  };

  // abilities
  const pokemonAbilities = (currAbilities: PokemonAbility[]): JSX.Element[] =>
    currAbilities.map(({ ability, is_hidden }, i) => (
      <Numbered light={is_hidden} key={`${ability}-${i}`}>
        {`${i + 1}. ${removeDash(ability.name)} `}
        {is_hidden && '( Hidden Ability )'}
      </Numbered>
    ));

  return (
    <AnimatePresence mode="wait">
      <BoxWrapper
        direction="column"
        align={{ xxs: 'center', lg: 'flex-start' }}
        initial="hidden"
        animate="show"
        variants={fadeInUpVariant}
        key={`pokemon-details-${name}`}
        {...rest}
      >
        <PageHeading>{removeDash(name)}</PageHeading>
        {types.length > 0 && (
          <TypeContainer
            width="auto"
            direction="row"
            justify="flex-start"
            $flexWrap="wrap"
            margin="0 0 0.5rem"
          >
            {types.map(({ type }, i) => {
              return <TypeBadge typename={type.name} key={`${type.name}-${i}-detail-${id}`} />;
            })}
          </TypeContainer>
        )}
        {(is_baby || is_legendary || is_mythical) && (
          <Genera>
            {is_baby && `Baby `}
            {is_legendary && `Legendary `}
            {is_mythical && `Mythical `}
            Pokemon
          </Genera>
        )}
        {gameVersion && <Flavor>{flavorText(gameVersion)}</Flavor>}
        <Table forwardedAs="table">
          <tbody>
            <tr>
              <th>National №</th>
              <td>{`#${id}`}</td>
            </tr>
            <tr>
              <th>Category</th>
              <td>{genera[0].genus}</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>{pokemonWeight(weight)}</td>
            </tr>
            <tr>
              <th>Height</th>
              <td>{pokemonHeight(height)}</td>
            </tr>
            <tr>
              <th>Abilities</th>
              <td>{pokemonAbilities(abilities)}</td>
            </tr>
            <tr>
              <th>Shape</th>
              <td>{capitalize(shape.name)}</td>
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