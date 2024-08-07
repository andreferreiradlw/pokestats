// helpers
import { usePlausible } from 'next-plausible';
import GameVersionContext from '@/components/Layout/gameVersionContext';
import { gameVersions, checkIfEarlierGen, mapGenerationToGame, GameVersions } from '@/helpers';
import { PokemonSpecies } from 'pokenode-ts';
import { useContext, useEffect, useState } from 'react';
import { SelectProps } from '@mui/material';
import DropdownV2 from '../DropdownV2';

interface GameGenSelectProps extends SelectProps {
  pokemon: PokemonSpecies;
}

const GameGenSelect = ({ pokemon, ...rest }: GameGenSelectProps): JSX.Element => {
  // analytics
  const plausible = usePlausible();
  // gen
  const pokemonGen = pokemon?.generation.name;
  // game version
  const { gameVersion, setGameVersion } = useContext(GameVersionContext);
  // state
  const [dropdownOptions, setDropdownOptions] = useState<GameVersions>([]);

  useEffect(() => {
    if (pokemon) {
      const currGame = mapGenerationToGame(pokemonGen, pokemon.id);

      const currPokemonVersions = gameVersions.filter(
        version => !checkIfEarlierGen(currGame, version.value),
      );

      setDropdownOptions(currPokemonVersions);

      if (currPokemonVersions.findIndex(game => game.value === gameVersion) < 0) {
        setGameVersion(currPokemonVersions[0].value);
      }
    }
  }, [pokemon]);

  return (
    <DropdownV2
      label="Game Version"
      value={gameVersion}
      options={dropdownOptions}
      minWidth="170px"
      onChange={e => {
        setGameVersion(e.target.value as string);
        plausible('Game Version Select');
      }}
    />
  );
};

export default GameGenSelect;
