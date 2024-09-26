import MainClient from './MainClient';

export const ItemApi = {
  getAllItems: async (offset?: number, limit?: number) =>
    await MainClient.item.listItems(offset, limit),

  getAllItemNames: async () =>
    await MainClient.item.listItems(0, 1137).then(({ results }) => results.map(({ name }) => name)),

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
};
