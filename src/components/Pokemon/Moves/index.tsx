import { useState, useContext, useMemo } from 'react';
// types
import type { MoveLearnMethod, Pokemon } from 'pokenode-ts';
// helpers
import { fadeInUpVariant } from '@/animations';
import { GameVersionContext } from '@/context';
import { mapVersionToGroup, filterMoves } from '@/helpers';
// hooks
import { useMachines, usePokemonMoves } from '@/hooks';
// components
import { AnimatePresence, motion } from 'framer-motion';
import Loading from '@/components/Loading';
import { Grid2, Grid2Props, Typography } from '@mui/material';
import DropdownV2 from '@/components/DropdownV2';
import GameGenSelect from '@/components/GameGenSelect';
import MovesTableV2 from '@/components/MovesTableV2';

const LearnMethodOptions = [
  { label: 'Level Up', value: 'level-up' },
  { label: 'Machines', value: 'machine' },
  { label: 'Egg', value: 'egg' },
  { label: 'Tutor', value: 'tutor' },
];

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
      <Typography variant="sectionTitle">Move Pool</Typography>
      <Grid2 gap={4}>
        <DropdownV2
          label="Type"
          options={LearnMethodOptions}
          onChange={e => setLearnMethod(e.target.value)}
          value={learnMethod}
        />
        <GameGenSelect />
      </Grid2>
      {movesLoading || machinesLoading ? (
        <Loading height="100%" $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }} />
      ) : (
        <AnimatePresence mode="wait">
          {filteredMoves.length ? (
            <MovesTableV2 moves={filteredMoves} machineNames={machines} learnMethod={learnMethod} />
          ) : (
            <Typography
              variant="sectionMessage"
              component={motion.p}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={fadeInUpVariant}
              key={`moves-${learnMethod}-nomoves-message`}
            >
              {`No ${learnMethod} moves for currently selected game version.`}
            </Typography>
          )}
        </AnimatePresence>
      )}
    </Grid2>
  );
};

export default PokemonMoves;
