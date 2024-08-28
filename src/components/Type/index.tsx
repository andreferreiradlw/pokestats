// types
import type { PokestatsTypePageProps } from '@/pages/type/[typeId]';
// helpers
import { findEnglishName } from '@/helpers';
// components
import Box from '@/components/Box';
import TypeInfo from './Info';
import TypeRelations from './Relations';
import TypeIcon from './TypeIcon';
import Tabs from './Tabs';
// styles
import { PageHeading } from '@/components/BaseStyles';
import { Divider, Stack } from '@mui/material';

export type TypePageProps = Omit<PokestatsTypePageProps, 'autocompleteList'>;

const TypePage = ({ typeData }: TypePageProps): JSX.Element => {
  // data
  const { name, names, damage_relations } = typeData;

  const typeName = findEnglishName(names);

  return (
    <Stack divider={<Divider />} gap={4} py={2}>
      <Stack flexDirection={{ xxs: 'column-reverse', lg: 'row' }} gap="2em">
        <Stack
          justifyContent={{ xxs: 'center', lg: 'flex-start' }}
          alignItems={{ xxs: 'center', lg: 'flex-start' }}
          gap="2em"
        >
          <PageHeading>{typeName}</PageHeading>
          <Box
            flexdirection={{ xxs: 'column', md: 'row' }}
            flexjustify={{ xxs: 'center', md: 'flex-start' }}
            flexalign={{ xxs: 'center', md: 'flex-start' }}
            screensizes={{ xxs: 12, lg: 8 }}
            flexgap="2em"
          >
            <TypeInfo type={typeData} />
            <TypeRelations relations={damage_relations} />
          </Box>
        </Stack>
        <TypeIcon screensizes={{ xxs: 12, lg: 4 }} typeName={name} otherNames={names} />
      </Stack>
      <Stack>
        <Tabs typeData={typeData} typeName={typeName} screensizes={12} />
      </Stack>
    </Stack>
  );
};

export default TypePage;
