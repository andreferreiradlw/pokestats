import { useCallback } from 'react';
import styled from 'styled-components';
// types
import type { EvolutionDetail, EvolutionTrigger } from 'pokenode-ts';
// helpers
import { removeDash, itemMapUrl } from '@/helpers';
// components
import Box, { BoxProps } from '@/components/Box';

const Details = styled.p`
  font-weight: 600;
  text-align: center;
  text-transform: capitalize;
  word-break: break-word;
`;

const ItemImage = styled.img`
  margin-left: 2px;
  vertical-align: middle;
  width: 35px;
`;

type TriggerNameProps = EvolutionTrigger['name'] | 'three-critical-hits';

interface EvolutionDetailsProps extends BoxProps {
  details: EvolutionDetail[];
}

const EvolutionDetails = ({ details, ...rest }: EvolutionDetailsProps): JSX.Element => {
  // memo
  const checkNullTriggers = useCallback((evolution: EvolutionDetail): boolean => {
    if (evolution['trigger']?.name === 'level-up') delete evolution['trigger'];
    // check if all triggers are falsy
    return Object.values(evolution).every(x => !x);
  }, []);
  const mapPhysicalStats = useCallback(
    (physical: EvolutionDetail['relative_physical_stats']): string => {
      switch (physical) {
        case 1:
          return 'Attack > Defense';
        case 0:
          return 'Attack = Defense';
        case -1:
          return 'Attack < Defense';
        default:
          return '';
      }
    },
    [],
  );
  const mapTriggerName = useCallback((triggerName: TriggerNameProps): string => {
    switch (triggerName) {
      case 'level-up':
        return 'Level up';
      case 'use-item':
        return 'Using';
      case 'trade':
        return 'Trade';
      case 'shed':
        return 'Level 20, with empty PokéBall and an open slot in party';
      case 'three-critical-hits':
        return 'Perform three critical hits';
      case 'other':
        return 'Other';
      default:
        return '';
    }
  }, []);

  const evoItemUrl = useCallback((slug: string) => itemMapUrl(slug), []);

  if (!details?.length) return null;

  return (
    <Box flexgap="0.5em" width="auto" {...rest}>
      {details.map((currTriggers, i) => {
        if (checkNullTriggers(currTriggers)) return null;
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
        } = currTriggers;

        return (
          <Details key={`evo-detail-${i}`}>
            {min_level ? (
              <>
                {`Level ${min_level}`}
                <ItemImage
                  src="https://raw.githubusercontent.com/msikma/pokesprite/master/items/medicine/rare-candy.png"
                  alt="Rare Candy"
                />
              </>
            ) : (
              mapTriggerName(trigger?.name as TriggerNameProps)
            )}
            {location && ` at ${removeDash(location.name)}`}
            {held_item && (
              <>
                {` holding ${removeDash(held_item.name)}`}
                <ItemImage
                  src={`https://raw.githubusercontent.com/msikma/pokesprite/master/items/${evoItemUrl(
                    held_item.name,
                  )}`}
                  alt={held_item.name}
                />
              </>
            )}
            {item && (
              <>
                {` ${removeDash(item.name)}`}
                <ItemImage
                  src={`https://raw.githubusercontent.com/msikma/pokesprite/master/items/${evoItemUrl(
                    item.name,
                  )}`}
                  alt={item.name}
                />
              </>
            )}
            {known_move && ` by learning ${removeDash(known_move.name)}`}
            {min_happiness && ` with ${min_happiness}+ happiness`}
            {min_affection && ` with ${min_affection}+ affection`}
            {min_beauty && ` with ${min_beauty}+ beauty`}
            {time_of_day && ` during the ${time_of_day}`}
            {needs_overworld_rain && ` in the rain`}
            {gender && ` if ${gender === 1 ? 'female' : 'male'}`}
            {relative_physical_stats !== null &&
              ` with ${mapPhysicalStats(relative_physical_stats)}`}
            {trade_species && ` with ${removeDash(trade_species.name)}`}
            {known_move_type && ` knowing a move of type ${removeDash(known_move_type.name)}`}
            {party_type && ` with a Pokemon of type ${removeDash(party_type.name)} in party`}
            {party_species && ` if there is a ${removeDash(party_species.name)} in party`}
            {turn_upside_down && ` by turning console upside-down`}
          </Details>
        );
      })}
    </Box>
  );
};

export default EvolutionDetails;
