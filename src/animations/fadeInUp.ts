export const fadeInUpVariant = {
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
    y: 0,
    opacity: 0,
  },
  hover: {
    // zIndex: 1,
    scale: [1, 1.05, 1.02],
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 0.2,
    },
  },
  tap: { scale: 0.99 },
};
