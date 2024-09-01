export const fadeInDownVariant = {
  hidden: {
    y: -20,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 1,
      damping: 20,
      stiffness: 2000,
    },
  },
  exit: {
    y: 0,
    opacity: 0,
  },
  tap: { scale: 0.99 },
};
