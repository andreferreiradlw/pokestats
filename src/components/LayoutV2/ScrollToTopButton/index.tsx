'use client';

// helpers
import { scrollToTop } from '@/helpers';
import { useBreakpoint } from '@/hooks';
import { fadeInUpVariant } from '@/animations';
// components
import { ScrollButton } from './styledScrollToTopButton';
import { useScrollTrigger } from '@mui/material';
// icons
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const ScrollToTopButton = (): JSX.Element | null => {
  // hooks
  const isMdDown = useBreakpoint({ breakpoint: 'md', queryType: 'down' });

  const scrollPosition = useScrollTrigger({
    disableHysteresis: true,
    threshold: 1000,
  });

  if (isMdDown || !scrollPosition) return null;

  return (
    <ScrollButton
      onClick={scrollToTop}
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
