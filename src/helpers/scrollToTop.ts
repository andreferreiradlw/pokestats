const scrollToTop = (): void => {
  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
};

export { scrollToTop };
