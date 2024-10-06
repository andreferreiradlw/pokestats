'use client';

// types
import type { ContainerProps } from '@mui/material';
// helpers
import { pageContainerVariant } from '@/animations';
// components
import HeaderV2, { type HeaderV2Props } from './HeaderV2';
import { ChildrenContainer, LayoutContainer } from './StyledLayoutV2';
import { AnimatePresence, type HTMLMotionProps, motion } from '@/client';
import ScrollToTopButton from './ScrollToTopButton';
import Footer from './Footer';

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
  return (
    <LayoutContainer maxWidth={false} disableGutters>
      {withHeader && <HeaderV2 showGenSelect={showGenSelect} />}
      <AnimatePresence>
        <ChildrenContainer
          maxWidth="xl"
          component={motion.main}
          variants={pageContainerVariant}
          initial="hidden"
          animate="visible"
          exit="fade"
          key={customKey || 'layout-grid-container'}
          {...rest}
        >
          {children}
        </ChildrenContainer>
        <Footer />
        <ScrollToTopButton />
      </AnimatePresence>
    </LayoutContainer>
  );
};

export default LayoutV2;
