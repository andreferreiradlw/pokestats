export const loadingContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
      when: 'afterChildren',
    },
  },
}

export const loadingChild = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  exit: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
}

export const pageContainer = {
  hidden: {
    opacity: 0,
    x: '50vw',
    transition: { delay: 0.5 },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.5 },
  },
  exit: {
    opacity: 0,
    x: '-50vw',
    transition: { duration: 0.2, ease: 'easeOut' },
  },
}
