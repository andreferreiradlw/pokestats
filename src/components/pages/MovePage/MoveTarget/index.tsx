'use client';

import { useMemo } from 'react';
// types
import type { NamedAPIResource, MoveTarget as PokenodeMoveTarget } from 'pokenode-ts';
// styles
import {
  BattleContainer,
  PokemonContainer,
  Badge,
  ImageContainer,
  FoeImg,
  AllyImg,
  BattleGround,
} from './StyledMoveTarget';
// components
import { Grid2, Stack, Typography, type Grid2Props } from '@mui/material';
// utilities
import {
  mapTypeToPokemonId,
  isFoeAffected,
  isFoeSelected,
  isAllyAffected,
  isAllySelected,
  isSelfAffected,
  isSelfSelected,
  formatPokemonId,
} from '@/helpers';

interface MoveTargetProps extends Grid2Props {
  target: PokenodeMoveTarget;
  moveType: NamedAPIResource;
}

const foes = [
  { name: 'Gardevoir', id: 282 },
  { name: 'Gengar', id: 94 },
  { name: 'Moltres', id: 146 },
];

const allies = [
  { name: 'Charizard', id: 6 },
  { name: 'Electrivire', id: 466 },
];

const TargetList = ({
  items,
  affected,
  selected,
  label,
}: {
  items: { name: string; id: number }[];
  affected: boolean;
  selected: boolean;
  label: string;
}) => (
  <Stack
    width={{ xxs: '100%', sm: '65%' }}
    flexDirection="row"
    alignItems="stretch"
    justifyContent="space-around"
    gap={1}
    alignSelf="flex-end"
  >
    {items.map(({ name, id }) => (
      <PokemonContainer key={`${label.toLowerCase()}-${id}`}>
        <Badge $isAffected={affected} $isSelected={selected}>
          {label}
        </Badge>
        <FoeImg
          alt={`front view of ${name}`}
          src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${formatPokemonId(
            id,
          )}.png`}
        />
      </PokemonContainer>
    ))}
  </Stack>
);

const UserAndAllies = ({
  moveType,
  affectedSelf,
  selectedSelf,
  affectedAlly,
  selectedAlly,
}: {
  moveType: NamedAPIResource;
  affectedSelf: boolean;
  selectedSelf: boolean;
  affectedAlly: boolean;
  selectedAlly: boolean;
}) => (
  <Stack
    width={{ xxs: '100%', sm: '85%' }}
    flexDirection="row"
    justifyContent="space-around"
    gap={1}
    alignSelf="flex-start"
  >
    <PokemonContainer>
      <ImageContainer>
        <AllyImg
          alt="Back view of Current Pokémon"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${mapTypeToPokemonId(
            moveType.name,
          )}.png`}
        />
      </ImageContainer>
      <Badge $isAffected={affectedSelf} $isSelected={selectedSelf}>
        User
      </Badge>
    </PokemonContainer>
    {allies.map(({ name, id }) => (
      <PokemonContainer key={`target-ally-${id}`}>
        <ImageContainer>
          <AllyImg
            alt={`front view of ${name}`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`}
          />
        </ImageContainer>
        <Badge $isAffected={affectedAlly} $isSelected={selectedAlly}>
          Ally
        </Badge>
      </PokemonContainer>
    ))}
  </Stack>
);

const MoveTarget = ({ target, moveType, ...rest }: MoveTargetProps): JSX.Element => {
  // data
  const { descriptions, name } = target;

  const targetDescription = useMemo(
    () => descriptions.find(flavor => flavor.language.name === 'en')?.description || '',
    [descriptions],
  );

  return (
    <Grid2
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      gap={2}
      {...rest}
    >
      <Typography variant="sectionTitle">Target</Typography>
      <Typography variant="sectionSubTitle">
        {`This move targets ${targetDescription.charAt(0).toLowerCase() + targetDescription.slice(1)}`}
      </Typography>
      <BattleContainer gap={6}>
        <TargetList
          items={foes}
          affected={isFoeAffected(name)}
          selected={isFoeSelected(name)}
          label="Foe"
        />
        <UserAndAllies
          moveType={moveType}
          affectedSelf={isSelfAffected(name)}
          selectedSelf={isSelfSelected(name)}
          affectedAlly={isAllyAffected(name)}
          selectedAlly={isAllySelected(name)}
        />
        <BattleGround />
      </BattleContainer>
    </Grid2>
  );
};

export default MoveTarget;
