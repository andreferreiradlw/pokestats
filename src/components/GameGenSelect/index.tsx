// helpers
import { usePlausible } from 'next-plausible';
import GameVersionContext from '@/components/Layout/gameVersionContext';
import {
  gameVersions,
  checkIfEarlierGen,
  mapGenerationToGame,
  GameVersions,
  Game,
} from '@/helpers';
import { PokemonSpecies } from 'pokenode-ts';
import { useContext, useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';

interface GameGenSelectProps extends SelectProps {
  pokemon?: PokemonSpecies;
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
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Game Version:</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={gameVersion}
        onChange={e => {
          setGameVersion(e.target.value as string);
          plausible('Game Version Select');
        }}
        {...rest}
      >
        {dropdownOptions.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GameGenSelect;
