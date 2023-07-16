// types
import type { SingleCardPageProps } from '@/pages/card/[cardName]/[cardSetId]';
// helpers
import { pageContainerVariant } from '@/helpers';
// components
import { AnimatePresence } from 'framer-motion';
import { MainContainer } from '@/components/Layout';
import { Divider } from '@/BaseStyles';
import Box, { BoxProps } from '@/components/Box';
import CardDetails from './CardDetails';
import CardImage from './CardImage';

interface CardPageProps extends Omit<SingleCardPageProps, 'autocompleteList'>, BoxProps {}

const CardPage = ({ card, ...rest }: CardPageProps): JSX.Element => {
  console.log('card', card);
  // data
  const { name, id, images } = card;

  return (
    <AnimatePresence mode="wait">
      <MainContainer
        flexjustify="flex-start"
        flexalign="flex-start"
        $contained
        $withGutter
        initial="hidden"
        animate="visible"
        exit="fade"
        variants={pageContainerVariant}
        key={`card-page-${id}`}
      >
        <Divider />
        <Box
          flexdirection={{ xxs: 'column-reverse', lg: 'row' }}
          flexalign="flex-start"
          flexjustify="flex-start"
          flexgap="2em"
        >
          <CardDetails screensizes={{ xxs: 12, lg: 6 }} key={`card-details-${id}`} card={card} />
          <CardImage screensizes={{ xxs: 12, lg: 6 }} imageUrl={images.large} />
        </Box>
      </MainContainer>
    </AnimatePresence>
  );
};

export default CardPage;
