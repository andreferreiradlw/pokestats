import { useMemo, useCallback } from 'react';
// hooks
import { useRouter } from 'next/router';
import { usePlausible } from 'next-plausible';
// types
import type { Move, MoveLearnMethod } from 'pokenode-ts';
// helpers
import type { FilteredMove, GameGenValue } from '@/helpers';
import { removeDash, mapGeneration, findEnglishVerboseEffect } from '@/helpers';
import { fadeInUpVariant } from '@/animations';
// styles
import type { Theme } from '@mui/material';
import { Stack, Typography } from '@mui/material';
// components
import { AnimatePresence, motion } from 'framer-motion';
import TypeBadge from '@/components/TypeBadge';
import CustomTable, {
  type Row,
  type Column,
  type CustomTableProps,
} from '@/components/CustomTable';
import Loading from '@/components/Loading';

interface MovesTableV2Props extends Partial<CustomTableProps> {
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
}: MovesTableV2Props): JSX.Element => {
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
  const columns: Column[] = useMemo(() => {
    const baseColumns = [
      { field: 'name', headerName: 'Name', sortable: true, defaultSort: !learnMethod },
      { field: 'type', headerName: 'Type' },
      { field: 'effect', headerName: 'Effect Entry' },
      {
        field: 'category',
        headerName: 'Category',
        tooltipText: 'The type of damage the move inflicts on the target.',
      },
      {
        field: 'power',
        headerName: 'Power',
        sortable: true,
        tooltipText:
          'The base power of this move with a value of 0 if it does not have a base power.',
      },
      {
        field: 'pp',
        headerName: 'PP',
        sortable: true,
        tooltipText: 'Power points. The number of times this move can be used.',
      },
      {
        field: 'accuracy',
        headerName: 'Accuracy',
        sortable: true,
        tooltipText: 'How likely this move is to be successful when used.',
      },
      {
        field: 'priority',
        headerName: 'Priority',
        sortable: true,
        tooltipText:
          'A value between -8 and 8. Sets the order in which moves are executed during battle.',
      },
      { field: 'generation', headerName: 'Introduced' },
    ];

    if (learnMethod) {
      return [
        {
          field: 'method',
          headerName: mapMethodName,
          sortable: learnMethod === 'level-up',
          defaultSort: true,
        },
        ...baseColumns,
      ];
    }
    return baseColumns;
  }, [learnMethod, mapMethodName]);

  // Transform data for CustomTable
  const tableData: Row[] = useMemo(() => {
    if (!moves) return [];

    return moves.map(
      (
        {
          name,
          id,
          type,
          damage_class,
          pp,
          power,
          accuracy,
          generation,
          // @ts-expect-error: incorrect types
          level_learned_at,
          priority,
          effect_entries,
        },
        index,
      ) => {
        const methodCellContent: JSX.Element | string = (() => {
          if (!learnMethod) return '-';

          switch (learnMethod) {
            case 'level-up':
              return level_learned_at || '-';
            case 'machine':
              return machineNames?.[index] ? (
                <Stack flexDirection="row" justifyContent="center" alignItems="center" gap={1}>
                  <span>{machineNames[index].toUpperCase()}</span>
                  <img
                    src={`https://raw.githubusercontent.com/msikma/pokesprite/master/items/${machineNames[index].includes('hm') ? 'hm' : 'tm'}/${type.name}.png`}
                    alt={type.name}
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
            onClick: () => onCellClick(name, id),
            sortBy: level_learned_at,
          },
          name: {
            render: <Typography textTransform="capitalize">{removeDash(name)}</Typography>,
            onClick: () => onCellClick(name, id),
            sortBy: name,
            sx: { whiteSpace: 'nowrap' },
          },
          type: {
            render: (
              <TypeBadge $iconOnly $typename={type.name as keyof Theme['palette']['types']} />
            ),
            align: 'center',
          },
          effect: {
            render: <Typography>{findEnglishVerboseEffect(effect_entries)}</Typography>,
            onClick: () => onCellClick(name, id),
          },
          category: {
            render: <Typography textTransform="capitalize">{damage_class?.name}</Typography>,
            onClick: () => onCellClick(name, id),
            align: 'center',
          },
          power: {
            render: power || '-',
            onClick: () => onCellClick(name, id),
            sortBy: power,
            align: 'center',
          },
          pp: {
            render: pp || '-',
            onClick: () => onCellClick(name, id),
            sortBy: pp,
            align: 'center',
          },
          accuracy: {
            render: accuracy ? `${accuracy}%` : '-',
            onClick: () => onCellClick(name, id),
            sortBy: accuracy,
            align: 'center',
          },
          priority: {
            render: priority,
            onClick: () => onCellClick(name, id),
            sortBy: priority,
            align: 'center',
          },
          generation: {
            render: mapGeneration(generation.name as GameGenValue) || '-',
            onClick: () => onCellClick(name, id),
            sx: { whiteSpace: 'nowrap' },
          },
        };
      },
    );
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
