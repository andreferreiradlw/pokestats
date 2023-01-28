import { useMemo } from 'react';
// types
import type { NamedAPIResource, MoveTarget as PokenodeMoveTarget } from 'pokenode-ts';
// styles
import { SectionTitle } from '@/BaseStyles';
import {
  BattleContainer,
  PokemonContainer,
  Badge,
  ImageContainer,
  FoeImg,
  AllyImg,
  Description,
  BattleGround,
} from './StyledMoveTarget';
// components
import Box, { BoxProps } from '@/components/Box';

interface MoveTargetProps extends BoxProps {
  target: PokenodeMoveTarget;
  moveType: NamedAPIResource;
}

const mapTypeToPokemonId = (typeName: string): number => {
  switch (typeName) {
    case 'fire':
      return 392; // Infernape
    case 'dragon':
      return 149; // Dragonite
    case 'water':
      return 131; // Lapras
    case 'electric':
      return 26; // Raichu
    case 'normal':
      return 493; // Arceus
    case 'fighting':
      return 257; // Blaziken
    case 'flying':
      return 249; // Lugia
    case 'poison':
      return 110; // Weezing
    case 'ground':
      return 95; // Onyx
    case 'rock':
      return 377; // Regirock
    case 'bug':
      return 212; // Scizor
    case 'ghost':
      return 92; // Gasly
    case 'steel':
      return 208; // Steelix
    case 'grass':
      return 154; // Meganium
    case 'psychic':
      return 65; // Alakazam
    case 'ice':
      return 144; // Articuno
    case 'dark':
      return 491; // Darkrai
    case 'fairy':
      return 36; // Clefable
  }
};

const foes = [
  {
    name: 'Gardevoir',
    id: 282,
  },
  {
    name: 'Gengar',
    id: 94,
  },
  {
    name: 'Moltres',
    id: 146,
  },
];

const allies = [
  {
    name: 'Charizard',
    id: 6,
  },
  {
    name: 'Electrivire',
    id: 466,
  },
];

const MoveTarget = ({ target, moveType, ...rest }: MoveTargetProps): JSX.Element => {
  // data
  const { descriptions, name } = target;
  // memo
  const targetDescription = useMemo(
    () => descriptions.find(flavor => flavor.language.name === 'en').description,
    [descriptions],
  );
  // foes
  const isFoeAffected =
    name === 'all-other-pokemon' ||
    name === 'all-opponents' ||
    name === 'entire-field' ||
    name === 'opponents-field';
  const isFoeSelected = name === 'selected-pokemon' || name === 'selected-pokemon-me-first';
  // allies
  const isAllyAffected =
    name === 'all-other-pokemon' ||
    name === 'entire-field' ||
    name === 'users-field' ||
    name === 'user-and-allies';
  const isAllySelected = name === 'selected-pokemon' || name === 'ally';
  // self
  const isSelfAffected =
    name === 'entire-field' || name === 'user-and-allies' || name === 'users-field';
  const isSelfSelected = name === 'user';

  return (
    <Box flexalign="flex-start" flexjustify="flex-start" flexgap="1em" {...rest}>
      <SectionTitle>Target</SectionTitle>
      <Description as="p">{`This move targets ${
        targetDescription.charAt(0).toLowerCase() + targetDescription.slice(1)
      }`}</Description>
      <BattleContainer flexgap="3.5em">
        <Box
          width={{ xxs: '100%', sm: '65%' }}
          flexdirection="row"
          flexalign="stretch"
          flexjustify="space-around"
          flexgap="0.5em"
          flexalignself="flex-end"
        >
          {foes.map(({ name, id }, i) => (
            <PokemonContainer key={`target-foe-${i}`}>
              <Badge $isAffected={isFoeAffected} $isSelected={isFoeSelected}>
                Foe
              </Badge>
              <FoeImg
                alt={`front view of ${name}`}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              />
            </PokemonContainer>
          ))}
        </Box>
        <Box
          width={{ xxs: '100%', sm: '85%' }}
          flexdirection="row"
          flexjustify="space-around"
          flexgap="0.5em"
          flexalignself="flex-start"
        >
          <PokemonContainer>
            <ImageContainer>
              <AllyImg
                alt="Back view of Current Pokemon"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${mapTypeToPokemonId(
                  moveType.name,
                )}.png`}
              />
            </ImageContainer>

            <Badge $isAffected={isSelfAffected} $isSelected={isSelfSelected}>
              User
            </Badge>
          </PokemonContainer>
          {allies.map(({ name, id }, i) => (
            <PokemonContainer key={`target-ally-${i}`}>
              <ImageContainer>
                <AllyImg
                  alt={`front view of ${name}`}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`}
                />
              </ImageContainer>

              <Badge $isAffected={isAllyAffected} $isSelected={isAllySelected}>
                Ally
              </Badge>
            </PokemonContainer>
          ))}
        </Box>
        <BattleGround />
      </BattleContainer>
    </Box>
  );
};

export default MoveTarget;
