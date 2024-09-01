export const loadingChild = {
  initial: {
    y: 0,
    opacity: 1,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.1 },
  },
  exit: {
    y: 60,
    opacity: 0,
    transition: {
      delay: 0.5,
      duration: 0.2,
    },
  },
};
