'use client';

// helpers
import { useIsClient, useWindowSize } from 'usehooks-ts';
import { scrollToTop } from '@/helpers';
import { fadeInUpVariant } from '@/animations';
// components
import { ScrollButton } from './styledScrollToTopButton';
import { useScrollTrigger } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const ScrollToTopButton = (): JSX.Element | null => {
  // hooks
  const isClient = useIsClient();
  const { width } = useWindowSize();
  const scrollPosition = useScrollTrigger({
    disableHysteresis: true,
    threshold: 1000,
  });

  // Only show button when on client, window width > 768px, and scrollPosition is true
  if (width <= 768 || !scrollPosition) return null;

  return (
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
  );
};

export default ScrollToTopButton;
