import MainClient from './MainClient';

export const ItemApi = {
  listItems: async (offset = 0, limit = 1137) => await MainClient.item.listItems(offset, limit),

  listItemAttributes: async () => await MainClient.item.listItemAttributes(),

  getAllItemNames: async (offset = 0, limit = 1137) =>
    await MainClient.item
      .listItems(offset, limit)
      .then(({ results }) => results.map(({ name }) => name)),

  getByName: async (name: string) => await MainClient.item.getItemByName(name),

  getByNames: async (names: Array<string>) =>
    await Promise.all(names.map(name => MainClient.item.getItemByName(name))),

  getAllItemPocketNames: async () =>
    await MainClient.item.listItemPockets().then(({ results }) => results.map(({ name }) => name)),

  getItemPocketByName: async (name: string) => await MainClient.item.getItemPocketByName(name),

  getItemPocketByNames: async (names: string[]) =>
    await Promise.all(names.map(name => MainClient.item.getItemPocketByName(name))),

  getItemCategoriesByNames: async (names: Array<string>) =>
    await Promise.all(names.map(name => MainClient.item.getItemCategoryByName(name))),

  getCategoryByName: async (categoryName: string) =>
    await MainClient.item.getItemCategoryByName(categoryName),

  getAttributesByNames: async (names: Array<string>) =>
    await Promise.all(names.map(name => MainClient.item.getItemAttributeByName(name))),

  getFlingEffectByName: async (name: string) =>
    await MainClient.item.getItemFlingEffectByName(name),
};
