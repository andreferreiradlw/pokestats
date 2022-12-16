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
        justify="flex-start"
        align="flex-start"
        $constrained
        $withGutter
        initial="hidden"
        animate="visible"
        exit="fade"
        variants={pageContainerVariant}
        key={`type-${name}`}
      >
        <Box
          direction={{ xxs: 'column-reverse', lg: 'row' }}
          align="flex-start"
          justify="flex-start"
          margin="1rem 0"
        >
          <Box
            justify={{ xxs: 'center', lg: 'flex-start' }}
            align={{ xxs: 'center', lg: 'flex-start' }}
          >
            <PageHeading>{removeDash(name)}</PageHeading>
            <Box
              direction={{ xxs: 'column', md: 'row' }}
              justify={{ xxs: 'center', md: 'flex-start' }}
              align={{ xxs: 'center', md: 'flex-start' }}
              sizes={{ xxs: 12, lg: 8 }}
            >
              <TypeInfo
                margin={{ xxs: '0 0 2rem', lg: '0' }}
                padding={{ xxs: '0', md: '0 1rem 0 0' }}
                type={typeInfo}
              />
              <TypeRelations
                margin={{ xxs: '0 0 2rem', lg: '0' }}
                padding={{ xxs: '0', md: '0 0 0 1rem', lg: '0 1rem' }}
                relations={damage_relations}
              />
            </Box>
          </Box>
          <TypeIcon sizes={{ xxs: 12, lg: 4 }} typeName={name} otherNames={names} />
        </Box>
        <Box align="flex-start" justify="flex-start" margin="1rem 0">
          <Tabs typeInfo={typeInfo} typeMoves={typeMoves} sizes={12} margin="0 0 2rem" />
        </Box>
      </MainContainer>
    </AnimatePresence>
  );
};

export default TypePage;
