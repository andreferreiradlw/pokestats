import type { Variants } from '@/client';

// Parent variant for staggering children animations
export const staggerContainerVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Stagger each child by 0.1 seconds
      delayChildren: 0.15, // Optional: Add a delay before children start animating
      when: 'beforeChildren',
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.01,
      staggerDirection: -1,
    },
  },
};

export const staggerChildVariant: Variants = {
  hidden: {
    y: 60,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 1,
      damping: 15,
      stiffness: 200,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    y: 20,
  },
};
