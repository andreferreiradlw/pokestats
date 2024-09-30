export const rowVariant = {
  hover: {
    zIndex: 1,
    scale: [1, 1.005],
    transition: {
      duration: 0.2,
    },
  },
  tap: { scale: 0.99 },
  rest: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};
