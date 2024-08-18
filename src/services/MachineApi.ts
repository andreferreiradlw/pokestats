import type { MachineVersionDetail } from 'pokenode-ts';
import MainClient from './MainClient';
import { getResourceId, listGamesByGroup, listMoveGroupsByGroup } from '@/helpers';

export interface MoveMachinesData {
  [key: string]: { machine: string; groups: string[][] };
}

export const MachineApi = {
  getByIds: async (ids: Array<number>) =>
    await Promise.all(ids.map(id => MainClient.machine.getMachineById(id))),

  getById: async (id: number) => await MainClient.machine.getMachineById(id),

  getMoveMachinesData: async (machines: MachineVersionDetail[]) => {
    if (!machines?.length) return null;

    const moveMachinesData: MoveMachinesData = {};

    for (const { version_group, machine } of machines) {
      const currGenGroups = listMoveGroupsByGroup(version_group.name);

      if (
        currGenGroups &&
        !moveMachinesData[version_group.name] &&
        !moveMachinesData[currGenGroups[0]] &&
        version_group.name === currGenGroups[0]
      ) {
        const currMachineData = await MachineApi.getById(getResourceId(machine.url));
        moveMachinesData[version_group.name] = {
          machine: currMachineData.item.name.toUpperCase(),
          groups: currGenGroups.map(group => listGamesByGroup(group)),
        };
      }
    }
    return moveMachinesData;
  },
};
