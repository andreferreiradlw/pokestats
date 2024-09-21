export const calculateTreeIndex = (x: number, y: number): number => {
  const index = Math.floor((x * y + x + y) / 5);
  return index % 10;
};

export const getEncounterRate = (treeIndex: number, trainerIdLastDigit: number): number => {
  // Encounter matrix could be verified against the correct source
  const encounterMatrix = [
    [80, 10, 10, 10, 10, 10, 50, 50, 50, 50],
    [50, 80, 10, 10, 10, 10, 10, 50, 50, 50],
    [50, 50, 80, 10, 10, 10, 10, 10, 50, 50],
    [50, 50, 50, 80, 10, 10, 10, 10, 10, 50],
    [50, 50, 50, 50, 80, 10, 10, 10, 10, 10],
    [10, 50, 50, 50, 50, 80, 10, 10, 10, 10],
    [10, 10, 50, 50, 50, 50, 80, 10, 10, 10],
    [10, 10, 10, 50, 50, 50, 50, 80, 10, 10],
    [10, 10, 10, 10, 50, 50, 50, 50, 80, 10],
    [10, 10, 10, 10, 10, 50, 50, 50, 50, 80],
  ];
  return encounterMatrix[treeIndex][trainerIdLastDigit];
};
