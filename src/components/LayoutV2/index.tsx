// hooks
import { useIsClient, useWindowSize } from 'usehooks-ts';
// helpers
import { fadeInOutUpVariant, pageContainerVariant, scrollToTop } from '@/helpers';
// components
import { Stack, StackProps, useScrollTrigger } from '@mui/material';
import { AnimatePresence, motion, HTMLMotionProps } from 'framer-motion';
import Footer from '../Footer';
import HeaderV2, { HeaderV2Props } from '../HeaderV2';
// styles
import { LayoutContainer, ScrollButton } from './StyledLayoutV2';
// icons
import ChevronTop from 'public/static/iconLibrary/chevron_top.svg';

interface LayoutV2Props extends Omit<HTMLMotionProps<'main'>, keyof StackProps>, StackProps {
  withHeader?: boolean;
  showGenSelect?: HeaderV2Props['showGenSelect'];
}

const LayoutV2 = ({ children, withHeader, showGenSelect, ...rest }: LayoutV2Props): JSX.Element => {
  // hooks
  const isClient = useIsClient();
  const { width } = useWindowSize();
  const scrollPosition = useScrollTrigger({
    disableHysteresis: true,
    threshold: 1000,
  });

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
          {withHeader && <HeaderV2 showGenSelect={showGenSelect} />}
          {children}
          <Footer />
        </Stack>
        {width > 768 && scrollPosition && (
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
