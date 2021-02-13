// STAGGER
export const staggerExitVariant = {
  exit: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
      delayChildren: 0.5,
    },
  },
}
export const staggerExitLoadingVariant = {
  exit: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
      delayChildren: 0.2,
      when: 'afterChildren',
    },
  },
}

export const staggerInitialVariant = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
  exit: {
    opacity: 0,
  },
}

export const staggerTableVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
}

// PAGES
export const pageVariant = {
  pageInitial: {
    opacity: 1,
  },
  pageAnimate: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.1,
      ease: 'easeInOut',
      when: 'beforeChildren',
    },
  },
  pageExit: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
}

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
}

// LOADING
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
}

// IMAGE PLACEHOLDER
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

// ENTER ANIMATIONS
export const footerVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delay: 1.5,
    },
  },
}

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
    zIndex: 1,
    scale: [1, 1.05, 1.02],
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 0.2,
    },
  },
  tap: { scale: 0.99 },
}

export const fadeInRightVariant = {
  hidden: {
    x: 60,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 1,
      damping: 15,
      stiffness: 200,
    },
  },
  exit: {
    x: 0,
    opacity: 0,
  },
}

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
}

// HOVER ANIMATIONS
export const hoverVariant = {
  hover: {
    zIndex: 1,
    scale: [1, 1.05, 1.02],
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 0.2,
    },
  },
  tap: { scale: 0.99 },
}

export const scaleHoverVariant = {
  initial: { scale: 1 },
  animate: { scale: 1 },
  hover: { scale: 1.5 },
  tap: { scale: 1 },
}
