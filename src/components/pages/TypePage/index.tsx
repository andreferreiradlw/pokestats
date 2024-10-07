'use client';

// types
import type { PokestatsTypePageProps } from '@/app/type/[typeName]/page';
// helpers
import { findEnglishName } from '@/helpers';
import { useBreakpoint } from '@/hooks';
// components
import TypeInfo from './Info';
import TypeRelations from './Relations';
import TypeIcon from './TypeIcon';
import Tabs from './Tabs';
import { Divider, Grid2, Stack, Typography, type Theme } from '@mui/material';

const TypePage = ({ typeData }: PokestatsTypePageProps): JSX.Element => {
  // breakpoint
  const isLargeUp = useBreakpoint({ breakpoint: 'lg' });

  // data
  const { name, names, damage_relations } = typeData;

  const typeName = findEnglishName(names);

  return (
    <Stack divider={<Divider />} gap={4}>
      <Grid2 container spacing={4} direction="column">
        <Grid2>
          <Typography variant="pageHeading">{typeName} Type</Typography>
        </Grid2>
        <Grid2 container spacing={4} direction={{ xxs: 'column', lg: 'row' }} size={12}>
          <Grid2 size={{ xxs: 12, lg: 3 }}>
            <TypeInfo type={typeData} />
          </Grid2>
          <Grid2 size={{ xxs: 12, lg: 6 }}>
            <TypeRelations relations={damage_relations} />
          </Grid2>
          {isLargeUp && (
            <Grid2 size={3}>
              <TypeIcon
                typeName={name as keyof Theme['palette']['types']}
                otherNames={names}
                minHeight="auto"
              />
            </Grid2>
          )}
        </Grid2>
      </Grid2>
      <Tabs typeData={typeData} typeName={typeName as keyof Theme['palette']['types']} />
    </Stack>
  );
};

export default TypePage;
