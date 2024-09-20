export const hoverVariant = {
  hover: {
    zIndex: 1,
    scale: [1, 1.05, 1.02],
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 0.2,
    },
  },
  rest: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: { scale: 0.99 },
};
