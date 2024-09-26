import { useMemo, useCallback } from 'react';
// hooks
import { useRouter } from 'next/router';
import { usePlausible } from 'next-plausible';
// types
import type { Move, MoveLearnMethod } from 'pokenode-ts';
// helpers
import type { FilteredMove, GameGenValue } from '@/helpers';
import { removeDash, mapGeneration } from '@/helpers';
import { fadeInUpVariant } from '@/animations';
// styles
import type { TableProps, Theme } from '@mui/material';
import { Stack, Typography } from '@mui/material';
// components
import { AnimatePresence, motion } from 'framer-motion';
import TypeBadge from '@/components/TypeBadge';
import CustomTable, { type CustomTableProps } from '@/components/CustomTable';
import Loading from '@/components/Loading';

interface TypeMovesProps extends TableProps {
  moves?: (FilteredMove | Move)[];
  learnMethod?: MoveLearnMethod['name'];
  machineNames?: string[];
  isLoading?: boolean;
  noMovesText?: string;
}

const MovesTableV2 = ({
  moves,
  learnMethod,
  machineNames,
  isLoading,
  noMovesText,
  ...rest
}: TypeMovesProps): JSX.Element => {
  // hooks
  const router = useRouter();
  const plausible = usePlausible();

  const mapMethodName = useMemo(() => {
    switch (learnMethod) {
      case 'level-up':
        return 'Level';
      case 'machine':
        return 'Machine';
      default:
        return '-';
    }
  }, [learnMethod]);

  const onCellClick = useCallback(
    (moveName: Move['name'], id: Move['id']) => {
      if (id <= 850) {
        plausible('Move Table Click');
        router.push(`/move/${moveName}`);
      }
    },
    [plausible, router],
  );

  // Define the columns for CustomTable
  const columns = useMemo(() => {
    const baseColumns = [
      { field: 'name', headerName: 'Name' },
      { field: 'type', headerName: 'Type' },
      { field: 'category', headerName: 'Category' },
      { field: 'power', headerName: 'Power' },
      { field: 'pp', headerName: 'PP' },
      { field: 'accuracy', headerName: 'Accuracy' },
      { field: 'priority', headerName: 'Priority' },
      { field: 'generation', headerName: 'Generation' },
    ];

    if (learnMethod) {
      return [{ field: 'method', headerName: mapMethodName }, ...baseColumns];
    }
    return baseColumns;
  }, [learnMethod, mapMethodName]);

  // Transform data for CustomTable
  const tableData: CustomTableProps['data'] = useMemo(() => {
    if (!moves) return [];

    return moves.map((move, index) => {
      const methodCellContent = (() => {
        if (!learnMethod) return '-';

        switch (learnMethod) {
          case 'level-up':
            // @ts-expect-error: incorrect types
            return move?.level_learned_at || '-';
          case 'machine':
            return machineNames && machineNames[index] ? (
              <Stack flexDirection="row" justifyContent="center" alignItems="center" gap={1}>
                <span>{machineNames[index].toUpperCase()}</span>
                <img
                  src={`https://raw.githubusercontent.com/msikma/pokesprite/master/items/${machineNames[index].includes('hm') ? 'hm' : 'tm'}/${move.type.name}.png`}
                  alt={move.type.name}
                  width="30"
                />
              </Stack>
            ) : (
              '-'
            );
          default:
            return '-';
        }
      })();

      return {
        method: {
          render: methodCellContent,
          onClick: () => onCellClick(move.name, move.id),
        },
        name: {
          render: <Typography textTransform="capitalize">{removeDash(move.name)}</Typography>,
          onClick: () => onCellClick(move.name, move.id),
        },
        type: {
          render: (
            <TypeBadge $iconOnly $typename={move.type.name as keyof Theme['palette']['types']} />
          ),
        },
        category: {
          render: <Typography textTransform="capitalize">{move.damage_class?.name}</Typography>,
          onClick: () => onCellClick(move.name, move.id),
        },
        power: { render: move.power || '-', onClick: () => onCellClick(move.name, move.id) },
        pp: { render: move.pp || '-', onClick: () => onCellClick(move.name, move.id) },
        accuracy: {
          render: move.accuracy || '-',
          onClick: () => onCellClick(move.name, move.id),
        },
        priority: { render: move.priority, onClick: () => onCellClick(move.name, move.id) },
        generation: {
          render: mapGeneration(move.generation.name as GameGenValue) || '-',
          onClick: () => onCellClick(move.name, move.id),
        },
      };
    });
  }, [moves, learnMethod, machineNames, onCellClick]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Loading
          height="100%"
          $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
          py={12}
        />
      ) : tableData.length > 0 ? (
        <CustomTable
          columns={columns}
          data={tableData}
          customKey={`moves-table-container-${learnMethod}`}
          {...rest}
        />
      ) : (
        <Typography
          variant="sectionSubTitle"
          py={4}
          component={motion.p}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={fadeInUpVariant}
          key="type-nomoves-message"
        >
          {noMovesText || 'No moves for current type.'}
        </Typography>
      )}
    </AnimatePresence>
  );
};

export default MovesTableV2;
