import classNames from 'classnames';
import { ListingCard } from './ListingCard';
import { Routes } from '@/config/routes';
import { AnimalProfile } from '@/types';

interface ListingGridProps {
  listings: AnimalProfile[];
  itemsPerRow?: GridColumns;
}

type GridColumns = 2 | 3 | 4;

export const ListingGrid = ({ listings, itemsPerRow = 4 }: ListingGridProps) => {
  return (
    <div
      className={classNames(
        gridColumsClasses[itemsPerRow],
        'grid grid-cols-1 gap-y-8 gap-x-5 3xl:gap-y-10',
      )}
    >
      {listings.map((item, index) => (
        <ListingCard
          href={Routes.public.animalDetails(item.name)}
          key={`listings-grid-${index}`}
          name={item.name}
          locations={item.locations}
        />
      ))}
    </div>
  );
};

const gridColumsClasses: Record<GridColumns, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};
