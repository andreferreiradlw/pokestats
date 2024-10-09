'use client';

import { useState, useContext, useMemo, useEffect } from 'react';
// types
import type { MoveLearnMethod, Pokemon } from 'pokenode-ts';
// helpers
import { GameVersionContext } from '@/context';
import {
  mapVersionToGroup,
  filterMoves,
  removeDash,
  MoveLearnMethod as MoveLearnMethodEnum,
  MoveLearnMethodLabel,
} from '@/helpers';
// hooks
import { useMachines, usePokemonMoves, useUmami } from '@/hooks';
// components
import { Grid2, Typography, type Grid2Props } from '@mui/material';
import DropdownV2 from '@/components/DropdownV2';
import GameGenSelect from '@/components/GameGenSelect';
import MovesTableV2 from '@/components/MovesTableV2';
import Link from 'next/link';
import CustomButton from '@/components/CustomButton';

interface PokemonMovesProps extends Grid2Props {
  pokemon: Pokemon;
}

const learnMethodOptions = [
  {
    value: MoveLearnMethodEnum.LevelUp,
    label: MoveLearnMethodLabel.LevelUp,
  },
  {
    value: MoveLearnMethodEnum.Egg,
    label: MoveLearnMethodLabel.Breeding,
  },
  {
    value: MoveLearnMethodEnum.Tutor,
    label: MoveLearnMethodLabel.Tutor,
  },
  {
    value: MoveLearnMethodEnum.Machine,
    label: MoveLearnMethodLabel.Machines,
  },
];

const PokemonMoves = ({ pokemon, ...rest }: PokemonMovesProps): JSX.Element => {
  // analytics
  const { track } = useUmami();

  // States
  const { gameVersion, gameDetails } = useContext(GameVersionContext);
  const [learnMethod, setLearnMethod] = useState<MoveLearnMethod['name']>('level-up');

  const { data: allMoves, isLoading: movesLoading } = usePokemonMoves(pokemon);

  const filteredMoves = useMemo(() => {
    if (!allMoves || !gameVersion) return [];

    const gameGroup = mapVersionToGroup(gameVersion);

    return filterMoves(allMoves, learnMethod, gameGroup);
  }, [allMoves, gameVersion, learnMethod]);

  const filteredMethodOptions = useMemo(() => {
    if (!gameDetails) return [];

    return learnMethodOptions.filter(({ value: methodValue }) =>
      gameDetails.moveLearnMethods.some(({ value }) => value === methodValue),
    );
  }, [gameDetails]);

  useEffect(() => {
    if (
      filteredMethodOptions.length > 0 &&
      !filteredMethodOptions.some(({ value }) => value === learnMethod)
    ) {
      setLearnMethod(filteredMethodOptions[0].value);
    }
  }, [filteredMethodOptions, learnMethod]);

  const { data: machines, isLoading: machinesLoading } = useMachines(filteredMoves, pokemon.name, {
    enabled: learnMethod === 'machine' && filteredMoves.length > 0,
  });

  return (
    <Grid2 container direction="column" gap={4} size={12} {...rest}>
      <Grid2 size={12}>
        <Typography variant="sectionTitle">Move Pool</Typography>
      </Grid2>
      <Grid2 size={12} gap={4}>
        <DropdownV2
          label="Learn Method"
          options={filteredMethodOptions} // Use filtered options here
          onChange={newMethod => setLearnMethod(newMethod)}
          value={learnMethod}
        />
        <GameGenSelect />
      </Grid2>
      <Grid2 size={12}>
        <MovesTableV2
          customKey={`moves-table-container-${learnMethod}-${gameVersion}`}
          moves={filteredMoves}
          machineNames={machines}
          learnMethod={learnMethod}
          isLoading={movesLoading || machinesLoading}
          noMovesText={`No ${removeDash(learnMethod)} moves for currently selected game version.`}
        />
      </Grid2>
      <Grid2 size={12}>
        <Link href="/moves" passHref legacyBehavior>
          <CustomButton
            variant="contained"
            size="large"
            onClick={() => track('Pokemon Page - See All Moves Click')}
          >
            See all moves
          </CustomButton>
        </Link>
      </Grid2>
    </Grid2>
  );
};

export default PokemonMoves;
