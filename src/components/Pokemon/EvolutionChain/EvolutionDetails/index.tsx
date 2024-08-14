import React, { useMemo, useCallback } from 'react';
import type { EvolutionDetail, EvolutionTrigger } from 'pokenode-ts';
import { removeDash, getResourceId } from '@/helpers';
import { Anchor } from '@/BaseStyles';
import { Container, Details, ItemImage } from './StyledEvolutionDetails';
import { capitalize, Stack, StackProps } from '@mui/material';
// svg icons
import Moon from 'public/static/iconLibrary/moon.svg';
import Sun from 'public/static/iconLibrary/sun.svg';
import Sunset from 'public/static/iconLibrary/sunset.svg';
import Swap from 'public/static/iconLibrary/swap.svg';
import Link from 'next/link';

type TriggerNameProps = EvolutionTrigger['name'] | 'three-critical-hits';

interface EvolutionDetailsProps extends StackProps {
  details: EvolutionDetail[];
}

const timeOfDayIcons = {
  day: <Sun width="35px" />,
  night: <Moon width="30px" />,
  dusk: <Sunset width="40px" />,
};

const physicalStatsMap = {
  1: 'more Attack than Defense',
  0: 'the same as Attack and Defense',
  '-1': 'less Attack than Defense',
};

const triggerNameMap = {
  'level-up': 'level up',
  'use-item': 'use',
  trade: (hasTrade: boolean) => `trade ${!hasTrade ? 'for any Pokémon' : ''}`,
  shed: (
    <>
      <ItemImage
        src="https://raw.githubusercontent.com/msikma/pokesprite/master/items/medicine/rare-candy.png"
        alt="Rare Candy"
      />
      <br />
      Level 20 with PokéBall in bag and open slot in party
    </>
  ),
  'three-critical-hits': 'perform three critical hits',
  other: 'Other',
};

const EvolutionDetailItem = React.memo(
  ({ triggers }: { triggers: EvolutionDetail }): JSX.Element => {
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

    const triggerDisplay = useMemo(() => {
      if (trigger?.name) {
        const triggerName = triggerNameMap[trigger.name as TriggerNameProps];
        return typeof triggerName === 'function' ? triggerName(!!trade_species) : triggerName;
      }
      return '';
    }, [trigger, trade_species]);

    return (
      <Container gap="0.3em" alignItems="center">
        <Stack flexDirection="row" gap="0.5em" width="auto">
          {min_level && (
            <ItemImage
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png"
              alt="Rare Candy"
            />
          )}
          {trigger?.name === 'trade' && <Swap width="35px" />}
          {trade_species && (
            <img
              loading="lazy"
              width="40px"
              alt={`trade-${trade_species.name}`}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getResourceId(
                trade_species.url,
              )}.png`}
            />
          )}
          {held_item && (
            <ItemImage
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${held_item.name}.png`}
              alt={`held-item-${held_item.name}`}
            />
          )}
          {item && (
            <ItemImage
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
              alt={`using-item-${item.name}`}
            />
          )}
          {!!time_of_day && timeOfDayIcons[time_of_day]}
        </Stack>
        <Details>
          {min_level ? `reach level ${min_level}` : triggerDisplay}
          {location && ` at ${capitalize(removeDash(location.name))}`}
          {trade_species && (
            <>
              {' for '}
              <Link href={`/pokemon/${trade_species.name}`} legacyBehavior passHref>
                <Anchor>{capitalize(removeDash(trade_species.name))}</Anchor>
              </Link>
            </>
          )}
          {held_item && ` while holding ${capitalize(removeDash(held_item.name))}`}
          {item && ` ${capitalize(removeDash(item.name))}`}
          {known_move && ` learn move ${capitalize(removeDash(known_move.name))}`}
          {min_happiness && ` has over ${min_happiness} Happiness`}
          {min_affection && ` has over ${min_affection} Affection`}
          {min_beauty && ` has over ${min_beauty} beauty`}
          {time_of_day && ` during the ${time_of_day}`}
          {needs_overworld_rain && ' in the rain'}
          {gender !== null && ` (${gender === 1 ? 'female' : 'male'} only)`}
          {relative_physical_stats !== null &&
            ` having ${physicalStatsMap[relative_physical_stats]}`}
          {known_move_type && (
            <>
              {' learn move from '}
              <Link href={`/type/${known_move_type.name}`} legacyBehavior passHref>
                <Anchor>{capitalize(removeDash(known_move_type.name))}</Anchor>
              </Link>

              {' type'}
            </>
          )}
          {party_type && (
            <>
              {' with a Pokémon of type '}
              <Link href={`/type/${party_type.name}`} legacyBehavior passHref>
                <Anchor>{capitalize(removeDash(party_type.name))}</Anchor>
              </Link>

              {' in party'}
            </>
          )}
          {party_species && (
            <>
              {' if there is a '}
              <Link href={`/pokemon/${party_species.name}`} legacyBehavior passHref>
                <Anchor>{capitalize(removeDash(party_species.name))}</Anchor>
              </Link>

              {' in party'}
            </>
          )}
          {turn_upside_down && ' by turning console upside-down'}
        </Details>
      </Container>
    );
  },
);

const EvolutionDetails = React.memo(
  ({ details, ...rest }: EvolutionDetailsProps): JSX.Element | null => {
    const sortedDetails = useMemo(() => {
      if (!details?.length) return [];
      return [...details].sort((a, b) => {
        const triggerOrder = { 'use-item': 1, trade: 2 };
        return (triggerOrder[b.trigger?.name] || 0) - (triggerOrder[a.trigger?.name] || 0);
      });
    }, [details]);

    const shouldRenderDetails = useCallback((evolution: EvolutionDetail): boolean => {
      const { trigger, ...rest } = evolution;
      if (trigger?.name === 'level-up') return !Object.values(rest).every(x => !x);
      return true;
    }, []);

    if (!sortedDetails.length) return null;

    return (
      <Stack gap="0.5em" width="auto" {...rest}>
        {sortedDetails.map((detail, i) =>
          shouldRenderDetails(detail) ? (
            <EvolutionDetailItem
              key={getResourceId(detail.trigger?.url || `${i}`)}
              triggers={detail}
            />
          ) : null,
        )}
      </Stack>
    );
  },
);

export default EvolutionDetails;
