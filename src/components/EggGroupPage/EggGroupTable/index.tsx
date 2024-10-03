import { useCallback, useMemo } from 'react';
// hooks
import { useRouter } from 'next/router';
import { usePlausible } from 'next-plausible';
// types
import type { EggGroupTableData } from '@/pages/egg-group/[eggGroupName]';
import type { Pokemon } from 'pokenode-ts';
// helpers
import { capitalise, removeDash } from '@/helpers';
import { fadeInUpVariant } from '@/animations';
// styles
import { Chip, Stack, type Theme, Tooltip, Typography } from '@mui/material';
// components
import { AnimatePresence, motion } from 'framer-motion';
import TypeBadge from '@/components/TypeBadge';
import CustomTable, {
  type Row,
  type Column,
  type CustomTableProps,
} from '@/components/CustomTable';
import Image from 'next/image';
import Link from 'next/link';
// icons
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

interface EggGroupTableProps extends Partial<CustomTableProps> {
  pokemon: EggGroupTableData[];
  eggGroup: string;
  noMovesText?: string;
}

const EggGroupTable = ({
  pokemon,
  eggGroup,
  noMovesText,
  ...rest
}: EggGroupTableProps): JSX.Element => {
  // hooks
  const router = useRouter();
  const plausible = usePlausible();

  const onCellClick = useCallback(
    (name: Pokemon['name'], id: Pokemon['id']) => {
      if (id <= 905) {
        plausible('Egg Group Table Click');
        router.push(`/pokemon/${name}`);
      }
    },
    [plausible, router],
  );

  // Define the columns for CustomTable
  const columns: Column[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', sortable: true, defaultSort: true },
      { field: 'name', headerName: 'Name', sortable: true },
      { field: 'type', headerName: 'Type' },
      { field: 'eggGroups', headerName: 'Other Groups' },
      { field: 'abilities', headerName: 'Abilities' },
      {
        field: 'cycles',
        headerName: 'Hatch Cycles',
        sortable: true,
      },
      {
        field: 'growthRate',
        headerName: 'Growth Rate',
      },
      {
        field: 'genderRatio',
        headerName: 'Gender Ratio',
        sortable: true,
      },
      {
        field: 'habitat',
        headerName: 'Habitat',
        sortable: true,
      },
    ],
    [],
  );

  // Transform data for CustomTable
  const tableData: Row[] = useMemo(() => {
    if (!pokemon) return [];

    return pokemon.map(
      ({
        id = 1,
        name = '',
        sprites,
        types,
        egg_groups,
        abilities,
        hatch_counter,
        growth_rate,
        gender_rate,
        habitat,
      }) => ({
        id: {
          render: <Typography>{`#${id}`}</Typography>,
          onClick: () => onCellClick(name, id),
          sortBy: id,
          align: 'center',
        },
        name: {
          render: (
            <Stack flexDirection="row" gap={2} alignItems="center">
              <Image src={sprites?.front_default ?? ''} alt={name} height={40} width={40} />
              <Typography textTransform="capitalize">{removeDash(name)}</Typography>
            </Stack>
          ),
          onClick: () => onCellClick(name, id),
          sortBy: removeDash(name),
        },
        type: {
          render: (
            <Stack flexDirection="row" gap={2} alignItems="center" justifyContent="center">
              {types?.map(({ type }) => (
                <TypeBadge
                  key={`${id}-${type.name}`}
                  $iconOnly
                  $typename={type.name as keyof Theme['palette']['types']}
                />
              ))}
            </Stack>
          ),
        },
        eggGroups: {
          render: (
            <Stack flexDirection="row" gap={1} alignItems="center" justifyContent="center">
              {egg_groups
                ?.filter(({ name }) => name !== eggGroup)
                .map(({ name }) => (
                  <Link
                    key={`${id}-group-${name}`}
                    href={`/egg-group/${name}`}
                    passHref
                    legacyBehavior
                  >
                    <Chip
                      label={capitalise(name)}
                      variant="filled"
                      clickable
                      component="a"
                      size="small"
                    />
                  </Link>
                ))}
            </Stack>
          ),
        },
        abilities: {
          render:
            abilities && abilities?.length > 0 ? (
              <Stack
                flexDirection="row"
                gap={1}
                alignItems="center"
                width="fit-content"
                flexWrap="wrap"
              >
                {abilities?.map(({ ability, is_hidden }) => (
                  <Tooltip
                    key={`${id}-ability-${ability.name}`}
                    title={is_hidden ? 'Hidden Ability' : ''}
                    placement="top"
                  >
                    <Chip
                      size="small"
                      label={capitalise(removeDash(ability.name))}
                      variant={is_hidden ? 'outlined' : 'filled'}
                    />
                  </Tooltip>
                ))}
              </Stack>
            ) : (
              ' - '
            ),
          onClick: () => onCellClick(name, id),
        },
        cycles: {
          render: hatch_counter ? (
            <>
              <Typography>{`${hatch_counter} cycles`}</Typography>
              <Typography
                variant="body2"
                component="span"
              >{`(${(255 * (hatch_counter + 1)).toLocaleString()} steps)`}</Typography>
            </>
          ) : (
            'Unavailable'
          ),
          onClick: () => onCellClick(name, id),
          sortBy: hatch_counter,
        },
        growthRate: {
          render: capitalise(removeDash(growth_rate?.name)),
          onClick: () => onCellClick(name, id),
        },
        genderRatio: {
          render:
            gender_rate === -1 ? (
              'Genderless'
            ) : (
              <Typography
                display="flex"
                alignItems="center"
                justifyContent="center"
                whiteSpace="nowrap"
              >
                {`${12.5 * (8 - gender_rate!)}%`} <MaleIcon />, {`${12.5 * gender_rate!}%`}{' '}
                <FemaleIcon />
              </Typography>
            ),
          onClick: () => onCellClick(name, id),
          sortBy: gender_rate,
          align: 'center',
        },
        habitat: {
          render: habitat ? capitalise(removeDash(habitat?.name)) : 'None',
          onClick: () => onCellClick(name, id),
          sortBy: habitat?.name ?? '',
        },
      }),
    );
  }, [pokemon]);

  return (
    <AnimatePresence mode="wait">
      {tableData.length > 0 ? (
        <CustomTable
          paginated
          columns={columns}
          data={tableData}
          customKey={`egg-group-table-container-${eggGroup}`}
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
          {noMovesText || 'No Pokemon found to match current criteria.'}
        </Typography>
      )}
    </AnimatePresence>
  );
};

export default EggGroupTable;
