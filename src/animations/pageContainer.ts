export const pageContainerVariant = {
  hidden: {
    opacity: 1,
    x: '100vw',
    transition: { delay: 0.2 },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2,
      type: 'spring',
      mass: 1,
      damping: 25,
      stiffness: 350,
    },
  },
  fade: {
    opacity: 0,
    transition: { duration: 0.1, ease: 'easeInOut' },
  },
};
