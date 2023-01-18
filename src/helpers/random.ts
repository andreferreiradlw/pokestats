const getRandomInt = (min: number, max: number): number => {
  const minFormat = Math.ceil(min);
  const maxFormat = Math.floor(max);
  return Math.floor(Math.random() * (maxFormat - minFormat + 1)) + minFormat;
};

export { getRandomInt };
