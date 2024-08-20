// styles
import { Stack, StackProps } from '@mui/material';
import { LayoutContainer, ScrollButton } from './StyledLayoutV2';
import { AnimatePresence, motion, HTMLMotionProps } from 'framer-motion';
import Footer from '../Footer';
import { fadeInOutUpVariant, pageContainerVariant, scrollToTop } from '@/helpers';
import { useIsClient, useWindowSize } from 'usehooks-ts';
import { useScrollPosition } from '@/hooks';
// icons
import ChevronTop from 'public/static/iconLibrary/chevron_top.svg';

interface LayoutV2Props extends Omit<HTMLMotionProps<'main'>, keyof StackProps>, StackProps {
  withHeader?: boolean;
}

const LayoutV2 = ({ children, withHeader, ...rest }: LayoutV2Props): JSX.Element => {
  // hooks
  const isClient = useIsClient();
  const { width } = useWindowSize();
  const scrollPosition = useScrollPosition();

  return (
    <LayoutContainer maxWidth={false} disableGutters>
      <AnimatePresence>
        <Stack
          direction="column"
          alignItems="center"
          position="relative"
          component={motion.main}
          initial="hidden"
          animate="visible"
          exit="fade"
          variants={pageContainerVariant}
          key="layout-grid-container"
          {...rest}
        >
          {children}
          <Footer />
        </Stack>
        {width > 768 && scrollPosition > 1000 && (
          <ScrollButton
            onClick={isClient && scrollToTop}
            whileHover="hover"
            whileTap="tap"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={fadeInOutUpVariant}
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
