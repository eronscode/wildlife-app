export const animalKeys = {
  all: () => ['animals'],
  detail: (name: string) => [...animalKeys.all(), name],
};
