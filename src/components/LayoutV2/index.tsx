// hooks
import { useIsClient, useWindowSize } from 'usehooks-ts';
// helpers
import { scrollToTop } from '@/helpers';
import { fadeInUpVariant, pageContainerVariant } from '@/animations';
// components
import type { StackProps } from '@mui/material';
import { Container, Stack, useScrollTrigger } from '@mui/material';
import type { HTMLMotionProps } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '../Footer';
import type { HeaderV2Props } from '../HeaderV2';
import HeaderV2 from '../HeaderV2';
// styles
import { LayoutContainer, ScrollButton } from './StyledLayoutV2';
// icons
import ChevronTop from 'public/static/iconLibrary/chevron_top.svg';

interface LayoutV2Props extends Omit<HTMLMotionProps<'main'>, keyof StackProps>, StackProps {
  withHeader?: boolean;
  showGenSelect?: HeaderV2Props['showGenSelect'];
  key: string; // make it mandatory for animation purposes
}

const LayoutV2 = ({
  children,
  withHeader,
  showGenSelect,
  key,
  ...rest
}: LayoutV2Props): JSX.Element => {
  // hooks
  const isClient = useIsClient();
  const { width } = useWindowSize();
  const scrollPosition = useScrollTrigger({
    disableHysteresis: true,
    threshold: 1000,
  });

  return (
    <LayoutContainer maxWidth={false} disableGutters>
      {withHeader && <HeaderV2 showGenSelect={showGenSelect} />}
      <AnimatePresence>
        <Stack
          direction="column"
          alignItems="center"
          position="relative"
          width="100%"
          flexGrow={1}
          component={motion.main}
          initial="hidden"
          animate="visible"
          exit="fade"
          variants={pageContainerVariant}
          key={key || 'layout-grid-container'}
          {...rest}
        >
          <Container maxWidth="xl">{children}</Container>
        </Stack>
        <Footer />
        {width > 768 && scrollPosition && (
          <ScrollButton
            onClick={isClient ? scrollToTop : undefined}
            whileHover="hover"
            whileTap="tap"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={fadeInUpVariant}
            key="layout-back-top"
          >
            <ChevronTop width="50px" />
          </ScrollButton>
        )}
      </AnimatePresence>
    </LayoutContainer>
  );
};

export default LayoutV2;
