// hooks
import { useIsClient, useWindowSize } from 'usehooks-ts';
// helpers
import { scrollToTop } from '@/helpers';
import { fadeInUpVariant, pageContainerVariant } from '@/animations';
// components
import { type ContainerProps, useScrollTrigger } from '@mui/material';
import type { HTMLMotionProps } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '../Footer';
import type { HeaderV2Props } from '../HeaderV2';
import HeaderV2 from '../HeaderV2';
// styles
import { ChildrenContainer, LayoutContainer, ScrollButton } from './StyledLayoutV2';
// icons
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

interface LayoutV2Props
  extends Omit<HTMLMotionProps<'main'>, keyof ContainerProps>,
    ContainerProps {
  withHeader?: boolean;
  showGenSelect?: HeaderV2Props['showGenSelect'];
  customKey: string;
}

const LayoutV2 = ({
  children,
  withHeader,
  showGenSelect,
  customKey,
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
        <ChildrenContainer
          maxWidth="xl"
          component={motion.main}
          initial="hidden"
          animate="visible"
          exit="fade"
          variants={pageContainerVariant}
          key={customKey || 'layout-grid-container'}
          {...rest}
        >
          {children}
        </ChildrenContainer>
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
            <ArrowCircleUpIcon sx={{ fontSize: '40px' }} />
          </ScrollButton>
        )}
      </AnimatePresence>
    </LayoutContainer>
  );
};

export default LayoutV2;
