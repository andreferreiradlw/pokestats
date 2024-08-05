import MainClient from './MainClient';

export const LocationApi = {
  getByName: async (name: string) => await MainClient.location.getLocationByName(name),

  getAllNames: async () =>
    (await MainClient.location.listLocations(0, 814)).results.map(location => location.name),
};

export const RegionApi = {
  getByIds: async (ids: Array<number>) =>
    await Promise.all(ids.map(id => MainClient.location.getRegionById(id))),
};

export const LocationAreaApi = {
  getByNames: async (names: Array<string>) =>
    await Promise.all(names.map(name => MainClient.location.getLocationAreaByName(name))),
};
