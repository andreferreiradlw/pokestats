import MainClient from './MainClient';

export const LocationApi = {
  getByName: async (name: string) => await MainClient.location.getLocationByName(name),

  getById: async (id: number) => await MainClient.location.getLocationById(id),

  getAllNames: async () =>
    await MainClient.location
      .listLocations(0, 814)
      .then(({ results }) => results.map(({ name }) => name)),
};

export const RegionApi = {
  getById: async (id: number) => await MainClient.location.getLocationById(id),

  getByIds: async (ids: Array<number>) =>
    await Promise.all(ids.map(id => MainClient.location.getRegionById(id))),
};

export const LocationAreaApi = {
  getByName: async (name: string) => await MainClient.location.getLocationAreaByName(name),

  getById: async (id: number) => await MainClient.location.getLocationAreaById(id),

  getByNames: async (names: Array<string>) =>
    await Promise.all(names.map(name => MainClient.location.getLocationAreaByName(name))),
};
