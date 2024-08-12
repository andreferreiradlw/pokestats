import MainClient from './MainClient';

export const MachineApi = {
  getByIds: async (ids: Array<number>) =>
    await Promise.all(ids.map(id => MainClient.machine.getMachineById(id))),
};
