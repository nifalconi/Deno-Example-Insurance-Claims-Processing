interface IdBasedEmptyArrayObject {
  [id: number]: [];
}

export const mapIdsToEmptyArrays = <T extends { id: number }>(
  items: T[],
): IdBasedEmptyArrayObject => {
  return items.reduce<IdBasedEmptyArrayObject>((acc, item) => {
    acc[item.id] = [];
    return acc;
  }, {});
};
