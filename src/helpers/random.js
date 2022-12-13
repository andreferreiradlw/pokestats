const getRandomInt = (min, max) => {
  const minFormat = Math.ceil(min);
  const maxFormat = Math.floor(max);
  return Math.floor(Math.random() * (maxFormat - minFormat + 1)) + minFormat;
};

export { getRandomInt };
