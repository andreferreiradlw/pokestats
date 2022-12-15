import styled from 'styled-components';
// types
import type { EvolutionDetail, EvolutionTrigger } from 'pokenode-ts';
// helpers
import { motion } from 'framer-motion';
import { removeDash } from '@/helpers/typography';

const Details = styled(motion.span)`
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  word-break: break-word;
`;

const mapTriggerName = (triggerName: EvolutionTrigger['name']): string => {
  switch (triggerName) {
    case 'level-up':
      return 'Level up';
    case 'use-item':
      return 'Use';
    case 'trade':
      return 'Trade';
    case 'shed':
      return 'Level 20, with empty PokéBall and an open slot in party';
    case 'other':
      return 'Other';
    default:
      return '';
  }
};

const mapPhysicalStats = (physical: EvolutionDetail['relative_physical_stats']): string => {
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
};

interface EvolutionDetailsProps {
  details: EvolutionDetail;
}

const EvolutionDetails = ({ details }: EvolutionDetailsProps): JSX.Element => {
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
  } = details;

  return (
    <Details>
      {min_level ? `Level ${min_level}` : mapTriggerName(trigger.name as EvolutionTrigger['name'])}
      {held_item && ` holding ${removeDash(held_item.name)}`}
      {item && ` ${removeDash(item.name)}`}
      {known_move && ` by learning ${removeDash(known_move.name)}`}
      {location && ` at ${removeDash(location.name)}`}
      {min_happiness && ` with ${min_happiness}+ happiness`}
      {min_affection && ` with ${min_affection}+ affection`}
      {min_beauty && ` with ${min_beauty}+ beauty`}
      {time_of_day && ` during the ${time_of_day}`}
      {needs_overworld_rain && ` in the rain`}
      {gender && ` if ${gender === 1 ? 'female' : 'male'}`}
      {relative_physical_stats !== null && ` with ${mapPhysicalStats(relative_physical_stats)}`}
      {trade_species && ` with ${removeDash(trade_species.name)}`}
      {known_move_type && ` knowing a move of type ${removeDash(known_move_type.name)}`}
      {party_type && ` with a Pokemon of type ${removeDash(party_type.name)} in party`}
      {party_species && ` if there is a ${removeDash(party_species.name)} in party`}
      {turn_upside_down && ` by turning console upside-down`}
    </Details>
  );
};

export default EvolutionDetails;
