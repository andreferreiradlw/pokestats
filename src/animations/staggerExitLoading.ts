export const staggerExitLoadingVariant = {
  exit: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
      delayChildren: 0.2,
      when: 'afterChildren',
    },
  },
};
