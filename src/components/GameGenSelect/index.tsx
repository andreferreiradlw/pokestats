// helpers
import { usePlausible } from 'next-plausible';
import GameVersionContext from '@/components/Layout/gameVersionContext';
import { gameVersions, checkIfEarlierGen, mapGenerationToGame } from '@/helpers';
import { PokemonSpecies } from 'pokenode-ts';
import { useContext, useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';

interface GameGenSelectProps extends SelectProps {
  currPokemon?: PokemonSpecies;
}

type GameVersions = typeof gameVersions;

const GameGenSelect = ({ currPokemon, ...rest }: GameGenSelectProps): JSX.Element => {
  // analytics
  const plausible = usePlausible();
  // gen
  const pokemonGen = currPokemon?.generation.name;
  // game version
  const { gameVersion, setGameVersion } = useContext(GameVersionContext);
  // state
  const [dropdownOptions, setDropdownOptions] = useState<GameVersions>([]);

  useEffect(() => {
    if (currPokemon) {
      const currGame = mapGenerationToGame(pokemonGen, currPokemon.id);

      const currPokemonVersions = gameVersions.filter(
        version => !checkIfEarlierGen(currGame, version.value),
      );

      setDropdownOptions(currPokemonVersions);

      if (currPokemonVersions.findIndex(game => game.value === gameVersion) < 0) {
        setGameVersion(currPokemonVersions[0].value);
      }
    }
  }, [currPokemon]);

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Game Version Select</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={gameVersion}
        label="Age"
        onChange={e => {
          setGameVersion(e.target.value);
          plausible('Game Version Select');
        }}
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
