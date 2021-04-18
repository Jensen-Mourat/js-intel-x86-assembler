export const mergeSets = <V>(...iterables: Set<V>[]): Set<V> => {
  const set = new Set<V>();
  iterables.forEach((iterable) => {
    iterable.forEach((v) => {
      set.add(v);
    });
  });
  return set;
};
