import { useMemo } from 'react';
// types
import type { NamedAPIResource, MoveTarget as PokenodeMoveTarget } from 'pokenode-ts';
// styles
import { SectionTitle } from '@/BaseStyles';
import {
  BattleContainer,
  PokemonContainer,
  Badge,
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

const MoveTarget = ({ target, moveType, ...rest }: MoveTargetProps): JSX.Element => {
  // data
  const { descriptions } = target;
  // memo
  const targetDescription = useMemo(
    () => descriptions.find(flavor => flavor.language.name === 'en').description,
    [descriptions],
  );

  return (
    <Box flexalign="flex-start" flexjustify="flex-start" flexgap="1.5em" {...rest}>
      <SectionTitle>Target</SectionTitle>
      <BattleContainer flexgap="4em">
        <Box
          width="70%"
          flexdirection="row"
          flexalign="stretch"
          flexjustify="space-around"
          flexgap="0.5em"
          flexalignself="flex-end"
        >
          <PokemonContainer>
            <Badge>Foe</Badge>
            <FoeImg src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/250.png" />
          </PokemonContainer>
          <PokemonContainer>
            <Badge>Foe</Badge>
            <FoeImg src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png" />
          </PokemonContainer>
          <PokemonContainer>
            <Badge>Foe</Badge>
            <FoeImg src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" />
          </PokemonContainer>
        </Box>
        <Box
          width="85%"
          flexdirection="row"
          flexjustify="space-around"
          flexgap="0.5em"
          flexalignself="flex-start"
        >
          <PokemonContainer>
            <AllyImg
              alt="Back view of Current Pokemon"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${mapTypeToPokemonId(
                moveType.name,
              )}.png`}
            />
            <Badge>Self</Badge>
          </PokemonContainer>
          <PokemonContainer>
            <AllyImg
              alt="Back view of Gardevoir"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/384.png"
            />
            <Badge $isAffected>Ally</Badge>
          </PokemonContainer>
          <PokemonContainer>
            <AllyImg
              alt="Back view of Garchomp"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/245.png"
            />
            <Badge>Ally</Badge>
          </PokemonContainer>
        </Box>
        <BattleGround />
      </BattleContainer>
      <Description as="p">{targetDescription}</Description>
    </Box>
  );
};

export default MoveTarget;
