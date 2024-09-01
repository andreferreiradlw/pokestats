/**
 * Retrieves the resource ID from a given URL.
 *
 * @param url - The URL from which to extract the resource ID.
 * @return The extracted resource ID.
 */
const getResourceId = (url: string) => {
  const regex = /\/(\d+)\/$/;
  const matchResult = regex.exec(url);
  return Number(matchResult?.[1]);
};

export { getResourceId };
