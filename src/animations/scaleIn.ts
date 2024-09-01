export const scaleInVariant = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5,
      type: 'spring',
      mass: 1,
      damping: 15,
      stiffness: 200,
    },
  },
};
