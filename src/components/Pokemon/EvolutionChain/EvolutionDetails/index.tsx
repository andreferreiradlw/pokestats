import React, { useMemo, useCallback } from 'react';
// types
import type { EvolutionDetail, EvolutionTrigger } from 'pokenode-ts';
// helpers
import { removeDash, getResourceId } from '@/helpers';
// components
import Link from 'next/link';
import { Container, Details, ItemImage } from './StyledEvolutionDetails';
import { capitalize, Stack, StackProps, Link as MuiLink } from '@mui/material';
// svg icons
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import LoopIcon from '@mui/icons-material/Loop';
import SignpostIcon from '@mui/icons-material/Signpost';

type TriggerNameProps = EvolutionTrigger['name'] | 'three-critical-hits';

interface EvolutionDetailsProps extends StackProps {
  details: EvolutionDetail[];
}

const timeOfDayIcons = {
  day: <WbSunnyIcon fontSize="large" />,
  night: <BedtimeIcon fontSize="large" />,
  dusk: <WbTwilightIcon fontSize="large" />,
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
        <Stack flexDirection="row" alignItems="center" gap={1}>
          {min_level && (
            <ItemImage
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png"
              alt="Rare Candy"
            />
          )}
          {trigger?.name === 'trade' && <LoopIcon fontSize="large" />}
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
          {location && <SignpostIcon fontSize="large" />}
        </Stack>
        <Details>
          {min_level ? `reach level ${min_level}` : triggerDisplay}
          {location && ` at ${capitalize(removeDash(location.name))}`}
          {trade_species && (
            <>
              {' for '}
              <MuiLink href={`/pokemon/${trade_species.name}`} component={Link}>
                {capitalize(removeDash(trade_species.name))}
              </MuiLink>
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
              <MuiLink href={`/type/${known_move_type.name}`} component={Link}>
                {capitalize(removeDash(known_move_type.name))}
              </MuiLink>

              {' type'}
            </>
          )}
          {party_type && (
            <>
              {' with a Pokémon of type '}
              <MuiLink href={`/type/${party_type.name}`} component={Link}>
                {capitalize(removeDash(party_type.name))}
              </MuiLink>

              {' in party'}
            </>
          )}
          {party_species && (
            <>
              {' if there is a '}
              <MuiLink href={`/pokemon/${party_species.name}`} component={Link}>
                {capitalize(removeDash(party_species.name))}
              </MuiLink>

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
