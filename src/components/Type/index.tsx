// types
import type { PokestatsTypePageProps } from '@/pages/type/[typeId]';
// helpers
import { removeDash, pageContainerVariant } from '@/helpers';
// components
import { AnimatePresence } from 'framer-motion';
import { MainContainer } from '@/components/Layout';
import Box from '@/components/Box';
import TypeInfo from './Info';
import TypeRelations from './Relations';
import TypeIcon from './TypeIcon';
import Tabs from './Tabs';
// styles
import { PageHeading } from '@/components/BaseStyles';

export type TypePageProps = Omit<PokestatsTypePageProps, 'autocompleteList'>;

const TypePage = ({ typeInfo, typeMoves }: TypePageProps): JSX.Element => {
  // data
  const { name, names, damage_relations } = typeInfo;

  return (
    <AnimatePresence mode="wait">
      <MainContainer
        flexjustify="flex-start"
        flexalign="flex-start"
        constrained
        flexgutter
        initial="hidden"
        animate="visible"
        exit="fade"
        variants={pageContainerVariant}
        key={`type-${name}`}
      >
        <Box
          flexdirection={{ xxs: 'column-reverse', lg: 'row' }}
          flexalign="flex-start"
          flexjustify="flex-start"
          flexgap="2em"
        >
          <Box
            flexjustify={{ xxs: 'center', lg: 'flex-start' }}
            flexalign={{ xxs: 'center', lg: 'flex-start' }}
            flexgap="2em"
          >
            <PageHeading>{removeDash(name)}</PageHeading>
            <Box
              flexdirection={{ xxs: 'column', md: 'row' }}
              flexjustify={{ xxs: 'center', md: 'flex-start' }}
              flexalign={{ xxs: 'center', md: 'flex-start' }}
              screensizes={{ xxs: 12, lg: 8 }}
              flexgap="2em"
            >
              <TypeInfo type={typeInfo} />
              <TypeRelations relations={damage_relations} />
            </Box>
          </Box>
          <TypeIcon screensizes={{ xxs: 12, lg: 4 }} typeName={name} otherNames={names} />
        </Box>
        <Box flexalign="flex-start" flexjustify="flex-start">
          <Tabs typeInfo={typeInfo} typeMoves={typeMoves} screensizes={12} />
        </Box>
      </MainContainer>
    </AnimatePresence>
  );
};

export default TypePage;
