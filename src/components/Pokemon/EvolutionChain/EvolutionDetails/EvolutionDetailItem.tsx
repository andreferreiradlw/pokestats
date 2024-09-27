import React, { useMemo, memo } from 'react';
// types
import type { EvolutionDetail, NamedAPIResource } from 'pokenode-ts';
// helpers
import { removeDash, getResourceId } from '@/helpers';
// components
import Link from 'next/link';
import { Container, Details, ItemImage } from './StyledEvolutionDetails';
import { capitalize, Stack, Link as MuiLink } from '@mui/material';
// svg icons
import LoopIcon from '@mui/icons-material/Loop';
import SignpostIcon from '@mui/icons-material/Signpost';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';

type TriggerNameProps =
  | 'level-up'
  | 'use-item'
  | 'trade'
  | 'shed'
  | 'three-critical-hits'
  | 'other';

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

const triggerNameMap: Record<
  TriggerNameProps,
  string | JSX.Element | ((hasTrade: boolean) => string)
> = {
  'level-up': '',
  'use-item': 'use ',
  trade: (hasTrade: boolean) => `trade ${!hasTrade ? 'for any Pokémon' : ''}`,
  shed: (
    <>
      <ItemImage
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png"
        alt="Rare Candy"
      />
      <br />
      Level 20 with{' '}
      <Link href="/item/poke-ball" legacyBehavior passHref>
        <MuiLink>Poké Ball</MuiLink>
      </Link>{' '}
      in bag and open slot in party
    </>
  ),
  'three-critical-hits': 'perform three critical hits',
  other: 'Other',
};

const ConditionalLinkText = memo(
  ({
    item,
    prefix,
    suffix,
    transform,
    path,
  }: {
    item?: NamedAPIResource | null;
    prefix?: string;
    suffix?: string;
    transform: (text: string) => string;
    path: string;
  }) => {
    if (!item) return null;
    return (
      <>
        {prefix}
        <MuiLink href={`${path}${item.name}`} component={Link}>
          {capitalize(transform(item.name))}
        </MuiLink>
        {suffix}
      </>
    );
  },
);

const EvolutionImages = memo(
  ({
    min_level,
    trigger,
    trade_species,
    held_item,
    item,
    time_of_day,
    location,
  }: {
    min_level: EvolutionDetail['min_level'];
    trigger: EvolutionDetail['trigger'];
    trade_species: EvolutionDetail['trade_species'];
    held_item: EvolutionDetail['held_item'];
    item: EvolutionDetail['item'];
    time_of_day: EvolutionDetail['time_of_day'];
    location: EvolutionDetail['location'];
  }) => (
    <>
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
      {/** @ts-expect-error: correct key of */}
      {!!time_of_day && timeOfDayIcons[time_of_day]}
      {location && <SignpostIcon fontSize="large" />}
    </>
  ),
);

const EvolutionDetailsText = memo(
  ({
    min_level,
    triggerDisplay,
    location,
    trade_species,
    held_item,
    item,
    known_move,
    min_happiness,
    min_affection,
    min_beauty,
    time_of_day,
    needs_overworld_rain,
    gender,
    relative_physical_stats,
    known_move_type,
    party_type,
    party_species,
    turn_upside_down,
  }: {
    min_level: EvolutionDetail['min_level'];
    triggerDisplay: string | JSX.Element;
    location: EvolutionDetail['location'];
    trade_species: EvolutionDetail['trade_species'];
    held_item: EvolutionDetail['held_item'];
    item: EvolutionDetail['item'];
    known_move: EvolutionDetail['known_move'];
    min_happiness: EvolutionDetail['min_happiness'];
    min_affection: EvolutionDetail['min_affection'];
    min_beauty: EvolutionDetail['min_beauty'];
    time_of_day: EvolutionDetail['time_of_day'];
    needs_overworld_rain: EvolutionDetail['needs_overworld_rain'];
    gender: EvolutionDetail['gender'];
    relative_physical_stats: EvolutionDetail['relative_physical_stats'];
    known_move_type: EvolutionDetail['known_move_type'];
    party_type: EvolutionDetail['party_type'];
    party_species: EvolutionDetail['party_species'];
    turn_upside_down: EvolutionDetail['turn_upside_down'];
  }) => (
    <>
      {min_level ? `reach level ${min_level}` : triggerDisplay}
      {location && ` at ${capitalize(removeDash(location.name))}`}
      <ConditionalLinkText
        item={trade_species}
        prefix=" for "
        transform={removeDash}
        path="/pokemon/"
      />
      <ConditionalLinkText
        item={known_move}
        prefix=" by learning "
        suffix=" move"
        transform={removeDash}
        path="/move/"
      />
      <ConditionalLinkText
        item={known_move_type}
        prefix=" by learning a "
        suffix="-type move"
        transform={removeDash}
        path="/type/"
      />
      <ConditionalLinkText
        item={held_item}
        prefix=" while holding "
        transform={removeDash}
        path="/item/"
      />
      <ConditionalLinkText item={item} transform={removeDash} path="/item/" />
      {min_happiness && ` if it has over ${min_happiness} Happiness`}
      {min_affection && ` if it has over ${min_affection} Affection`}
      {min_beauty && ` if it has over ${min_beauty} beauty`}
      {time_of_day && ` during the ${time_of_day}`}
      {needs_overworld_rain && ' in the rain'}
      {gender !== null && ` (${gender === 1 ? 'female' : 'male'} only)`}
      {relative_physical_stats !== null && ` having ${physicalStatsMap[relative_physical_stats]}`}
      <ConditionalLinkText
        item={party_type}
        prefix=" with a Pokémon of type "
        suffix=" in the party"
        transform={removeDash}
        path="/type/"
      />
      <ConditionalLinkText
        item={party_species}
        prefix=" if there is a "
        suffix=" in the party"
        transform={removeDash}
        path="/pokemon/"
      />
      {turn_upside_down && ' by turning the console upside-down'}
    </>
  ),
);

const EvolutionDetailItem = memo(({ triggers }: { triggers: EvolutionDetail }): JSX.Element => {
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
        <EvolutionImages
          min_level={min_level}
          trigger={trigger}
          trade_species={trade_species}
          held_item={held_item}
          item={item}
          time_of_day={time_of_day}
          location={location}
        />
      </Stack>
      <Details>
        <EvolutionDetailsText
          min_level={min_level}
          triggerDisplay={triggerDisplay}
          location={location}
          trade_species={trade_species}
          held_item={held_item}
          item={item}
          known_move={known_move}
          min_happiness={min_happiness}
          min_affection={min_affection}
          min_beauty={min_beauty}
          time_of_day={time_of_day}
          needs_overworld_rain={needs_overworld_rain}
          gender={gender}
          relative_physical_stats={relative_physical_stats}
          known_move_type={known_move_type}
          party_type={party_type}
          party_species={party_species}
          turn_upside_down={turn_upside_down}
        />
      </Details>
    </Container>
  );
});

export default EvolutionDetailItem;
