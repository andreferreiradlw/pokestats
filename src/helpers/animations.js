export const staggerExitVariant = {
  exit: {
    transition: {
      delay: 0.5,
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
}

export const loadingChild = {
  initial: {
    y: 0,
    opacity: 0,
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
      duration: 0.2,
    },
  },
}

export const pageVariant = {
  pageInitial: {
    opacity: 1,
    scale: 1,
  },
  pageAnimate: {
    opacity: 1,
    scale: 1,
  },
  pageExit: {
    opacity: 0,
    scale: 0,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
}

export const pageContainerVariant = {
  hidden: {
    opacity: 0,
    x: '100vw',
    transition: { delay: 0.2 },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5,
      type: 'spring',
      mass: 1,
      damping: 25,
      stiffness: 350,
    },
  },
  exit: {
    opacity: 0,
    x: '-100vw',
    transition: { duration: 0.2, ease: 'easeOut' },
  },
}

export const staggerInitialVariant = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.5,
    },
  },
}

export const scaleInVariant = {
  hidden: {
    scale: 0.1,
    opacity: 0,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      mass: 1,
      damping: 15,
      stiffness: 200,
    },
  },
}

export const fadeInUpVariant = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}

export const placeholderVariant = {
  initial: {
    opacity: 1,
    scale: 1,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
}

export const imageVariant = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      type: 'spring',
      mass: 1,
      damping: 15,
      stiffness: 200,
    },
  },
}
