import styled from 'styled-components';
// types
import type { EvolutionDetail, EvolutionTrigger } from 'pokenode-ts';
// helpers
import { capitalise, removeDash, getIdFromSpecies } from '@/helpers';
// styles
import { Anchor } from '@/BaseStyles';
// components
import Box, { BoxProps } from '@/components/Box';
// icons
import Moon from 'public/static/iconLibrary/moon.svg';
import Sun from 'public/static/iconLibrary/sun.svg';
import Sunset from 'public/static/iconLibrary/sunset.svg';
import Swap from 'public/static/iconLibrary/swap.svg';

const Container = styled(Box)`
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary.light};
    padding-bottom: 0.5em;
  }
`;

const Details = styled.p`
  font-weight: 500;
  text-align: center;
  white-space: normal;
  word-break: break-word;

  &:first-letter {
    text-transform: uppercase;
  }
`;

const ItemImage = styled.img`
  width: 50px;
`;

type TriggerNameProps = EvolutionTrigger['name'] | 'three-critical-hits';

interface EvolutionDetailsProps extends BoxProps {
  details: EvolutionDetail[];
}

const checkNullTriggers = (evolution: EvolutionDetail): boolean => {
  // shallow copy
  const currEvo = { ...evolution };
  if (currEvo['trigger']?.name === 'level-up') delete currEvo['trigger'];
  // check if all other triggers are falsy
  return Object.values(currEvo).every(x => x === null || x === false || x === '');
};

const mapTimeOfDayIcon = (timeOfDay: string): JSX.Element => {
  switch (timeOfDay) {
    case 'day':
      return <Sun width="35px" />;
    case 'night':
      return <Moon width="30px" />;
    case 'dusk':
      return <Sunset width="40px" />;
  }
};

const mapPhysicalStats = (physical: EvolutionDetail['relative_physical_stats']): string => {
  switch (physical) {
    case 1:
      return 'more Attack than Defense';
    case 0:
      return 'the same as Attack and Defense';
    case -1:
      return 'less Attack than Defense';
    default:
      return '';
  }
};

const mapTriggerName = (triggerName: TriggerNameProps, hasTrade: boolean): string | JSX.Element => {
  switch (triggerName) {
    case 'level-up':
      return 'level up';
    case 'use-item':
      return 'use';
    case 'trade':
      return `trade ${!hasTrade ? 'for any Pokémon' : ''}`;
    case 'shed':
      return (
        <>
          <ItemImage
            src="https://raw.githubusercontent.com/msikma/pokesprite/master/items/medicine/rare-candy.png"
            alt="Rare Candy"
          />
          <br />
          Level 20 with PokéBall in bag and open slot in party
        </>
      );
    case 'three-critical-hits':
      return 'perform three critical hits';
    case 'other':
      return 'Other';
    default:
      return '';
  }
};

/* eslint-disable complexity */
const ConstructPhrase = ({ triggers }: { triggers: EvolutionDetail }): JSX.Element => {
  // data
  const {
    gender,
    held_item,
    item,
    known_move,
    known_move_type,
    location,
    min_affection,
    min_beauty,
    min_happiness,
    min_level,
    needs_overworld_rain,
    party_species,
    party_type,
    relative_physical_stats,
    time_of_day,
    trade_species,
    trigger,
    turn_upside_down,
  } = triggers;

  return (
    <Container flexgap="0.3em">
      {(held_item ||
        min_level ||
        item ||
        !!time_of_day ||
        trigger?.name === 'trade' ||
        trade_species) && (
        <Box flexdirection="row" flexgap="0.5em" width="auto">
          {min_level && (
            <ItemImage
              src="https://raw.githubusercontent.com/msikma/pokesprite/master/items/medicine/rare-candy.png"
              alt="Rare Candy"
            />
          )}
          {trigger?.name === 'trade' && <Swap width="35px" />}
          {trade_species && (
            <img
              width="40px"
              alt={trade_species.name}
              src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${getIdFromSpecies(
                trade_species.url,
              )}.png`}
            />
          )}
          {held_item && (
            <ItemImage
              src={`https://raw.githubusercontent.com/msikma/pokesprite/master/items/evo-item/${held_item.name}.png`}
              alt={held_item.name}
            />
          )}
          {item && (
            <ItemImage
              src={`https://raw.githubusercontent.com/msikma/pokesprite/master/items/evo-item/${item.name}.png`}
              alt={item.name}
            />
          )}
          {!!time_of_day && mapTimeOfDayIcon(time_of_day)}
        </Box>
      )}
      <Details>
        {min_level
          ? `reach level ${min_level}`
          : trigger?.name !== 'level-up' &&
            mapTriggerName(trigger?.name as TriggerNameProps, !!trade_species)}
        {location &&
          `${
            trigger?.name && mapTriggerName(trigger?.name as TriggerNameProps, !!trade_species)
          } at ${capitalise(removeDash(location.name))}`}
        {trade_species && (
          <>
            {` for `}
            <Anchor href={`/pokemon/${trade_species.name}`}>
              {capitalise(removeDash(trade_species.name))}
            </Anchor>
          </>
        )}
        {held_item && ` while holding ${capitalise(removeDash(held_item.name))}`}
        {item && ` ${capitalise(removeDash(item.name))}`}
        {known_move && ` learn move ${capitalise(removeDash(known_move.name))}`}
        {min_happiness && ` has over ${min_happiness} Happiness`}
        {min_affection && ` has over ${min_affection} Affection`}
        {min_beauty && ` has over ${min_beauty} beauty`}
        {time_of_day !== '' && ` during the ${time_of_day}`}
        {needs_overworld_rain && ` in the rain`}
        {gender && `  (${gender === 1 ? 'female' : 'male'} only)`}
        {relative_physical_stats !== null && ` having ${mapPhysicalStats(relative_physical_stats)}`}
        {known_move_type && (
          <>
            {` learn move from `}
            <Anchor href={`/type/${known_move_type.name}`}>
              {capitalise(removeDash(known_move_type.name))}
            </Anchor>
            {` type`}
          </>
        )}
        {party_type && (
          <>
            {` with a Pokémon of type `}
            <Anchor href={`/type/${party_type.name}`}>
              {capitalise(removeDash(party_type.name))}
            </Anchor>
            {` in party`}
          </>
        )}
        {party_species && (
          <>
            {` if there is a `}
            <Anchor href={`/pokemon/${party_species.name}`}>
              {capitalise(removeDash(party_species.name))}
            </Anchor>
            {` in party`}
          </>
        )}
        {turn_upside_down && ` by turning console upside-down`}
      </Details>
    </Container>
  );
};

const EvolutionDetails = ({ details, ...rest }: EvolutionDetailsProps): JSX.Element => {
  if (!details?.length) return null;
  // put item triggers at the top of details object
  details.forEach((detail, i) => {
    const triggerName = detail['trigger']?.name;
    if (triggerName === 'use-item' || triggerName === 'trade') {
      details.splice(i, 1);
      details.unshift(detail);
    }
  });

  return (
    <Box flexgap="0.5em" width="auto" {...rest}>
      {details.map((currTriggers, i) => {
        if (checkNullTriggers(currTriggers)) return null;

        return <ConstructPhrase key={`evo-detail-${i}`} triggers={currTriggers} />;
      })}
    </Box>
  );
};

export default EvolutionDetails;
