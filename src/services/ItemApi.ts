import MainClient from './MainClient';

export const ItemApi = {
  getByName: async (name: string) => await MainClient.item.getItemByName(name),

  getByNames: async (names: Array<string>) =>
    await Promise.all(names.map(name => MainClient.item.getItemByName(name))),

  getAllItemPockets: async () =>
    (await MainClient.item.listItemPockets()).results.map(resource => resource.name),

  getItemPocketByName: async (name: string) => await MainClient.item.getItemPocketByName(name),

  getItemPocketByNames: async (names: string[]) =>
    await Promise.all(names.map(name => MainClient.item.getItemPocketByName(name))),

  getItemCategoriesByNames: async (names: Array<string>) =>
    await Promise.all(names.map(name => MainClient.item.getItemCategoryByName(name))),

  getAllItems: async () =>
    (await MainClient.item.listItems(0, 1137)).results.map(item => item.name),
};
