import { useState, useContext, useMemo } from 'react';
// types
import type { MoveLearnMethod, Pokemon } from 'pokenode-ts';
// helpers
import { GameVersionContext } from '@/context';
import { mapVersionToGroup, filterMoves } from '@/helpers';
// hooks
import { useMachines, usePokemonMoves } from '@/hooks';
// components
import type { Grid2Props } from '@mui/material';
import { Grid2, Typography } from '@mui/material';
import DropdownV2 from '@/components/DropdownV2';
import GameGenSelect from '@/components/GameGenSelect';
import MovesTableV2 from '@/components/MovesTableV2';

interface PokemonMovesProps extends Grid2Props {
  pokemon: Pokemon;
}

const PokemonMoves = ({ pokemon, ...rest }: PokemonMovesProps): JSX.Element => {
  // states
  const { gameVersion } = useContext(GameVersionContext);
  const [learnMethod, setLearnMethod] = useState<MoveLearnMethod['name']>('level-up');

  // fetch all moves
  const { data: allMoves, isLoading: movesLoading } = usePokemonMoves(pokemon);

  const filteredMoves = useMemo(() => {
    if (!allMoves) return [];
    // currently selected game group
    const gameGroup = mapVersionToGroup(gameVersion);
    // filter moves
    return filterMoves(allMoves, learnMethod, gameGroup);
  }, [allMoves, gameVersion, learnMethod]);

  // Process moves based on the selected game version
  const { data: machines, isLoading: machinesLoading } = useMachines(filteredMoves, pokemon.name, {
    enabled: learnMethod === 'machine' && filterMoves.length > 0,
  });

  return (
    <Grid2
      container
      direction="column"
      alignItems={{ xxs: 'center', lg: 'flex-start' }}
      gap={4}
      width="100%"
      {...rest}
    >
      <Grid2 size={12}>
        <Typography variant="sectionTitle">Move Pool</Typography>
      </Grid2>
      <Grid2 size={12} gap={4}>
        <DropdownV2
          label="Type"
          options={[
            { label: 'Level Up', value: 'level-up' },
            { label: 'Machines', value: 'machine' },
            { label: 'Egg', value: 'egg' },
            { label: 'Tutor', value: 'tutor' },
          ]}
          onChange={e => setLearnMethod(e.target.value)}
          value={learnMethod}
        />
        <GameGenSelect />
      </Grid2>
      <Grid2 size={12}>
        <MovesTableV2
          moves={filteredMoves}
          machineNames={machines}
          learnMethod={learnMethod}
          isLoading={movesLoading || machinesLoading}
          noMovesText={`No ${learnMethod} moves for currently selected game version.`}
        />
      </Grid2>
    </Grid2>
  );
};

export default PokemonMoves;
