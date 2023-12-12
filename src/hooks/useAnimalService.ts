import { produce } from 'immer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/config/api-endpoints';
import { AnimalProfile } from '@/types';
import { apiClient } from '@/utils/api';
import { animalKeys } from '@/config/query-keys';
import { Preferences } from '@/enums';

const searchAnimal = (name: string): Promise<AnimalProfile[]> =>
  apiClient.get(API_ENDPOINTS.SERACH_ANIMAL(name));

export const useAnimalService = (name = '') => {
  const queryClient = useQueryClient();

  const searchQuery = useQuery({
    queryKey: animalKeys.detail(name),
    queryFn: () => searchAnimal(name),
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    enabled: !!name,
  });

  const updateAnimalData = <K extends keyof AnimalProfile>(
    key: K,
    setValue: (values: AnimalProfile) => AnimalProfile[K],
  ) => {
    queryClient.setQueryData<AnimalProfile[]>(animalKeys.detail(name), (oldData) => {
      if (!oldData) return;

      return produce(oldData, (draft) => {
        draft.forEach((obj) => {
          if (obj.name === name) {
            obj[key] = setValue(obj);
          }
        });
      });
    });
  };

  const toggleFavourites = () => {
    updateAnimalData('isFavourite', (value) => !value.isFavourite);
  };

  const handleRating = (rate: number) => {
    updateAnimalData('rating', () => rate);
  };

  const handlePreference = (type: Preferences, data: AnimalProfile, key: string) => {
    const updatedPreference = { ...data?.preferences };

    if (
      (type === Preferences.LIKE && updatedPreference[key] === 'like') ||
      (type === Preferences.DISLIKE && updatedPreference[key] === 'dislike')
    ) {
      delete updatedPreference[key];
    } else {
      updatedPreference[key] = type;
    }

    updateAnimalData('preferences', () => updatedPreference);
  };

  const getFavouriteAnimals = () => {
    const cacheData = queryClient.getQueriesData<AnimalProfile[]>({ queryKey: animalKeys.all() });

    const favourites: AnimalProfile[] = cacheData
      ? cacheData.reduce((acc: AnimalProfile[], current) => {
          const innerArray = current[1];
          if (innerArray && Array.isArray(innerArray)) {
            const filteredObjects = innerArray.filter((obj) => obj.isFavourite);
            acc = [...acc, ...filteredObjects];
          }
          return acc;
        }, [])
      : [];
    return favourites;
  };

  return { searchQuery, toggleFavourites, getFavouriteAnimals, handleRating, handlePreference };
};
