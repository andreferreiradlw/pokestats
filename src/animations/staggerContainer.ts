// Parent variant for staggering children animations
export const staggerContainerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger each child by 0.1 seconds
      delayChildren: 0.5, // Optional: Add a delay before children start animating
    },
  },
};
