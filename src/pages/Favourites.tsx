import { Hero } from '@/components/ui/Hero';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { useSearchAnimals } from '@/hooks/useSearchAnimals';

export const Favourites = () => {
  const { getFavouriteAnimals } = useSearchAnimals();
  const favouriteAnimals = getFavouriteAnimals();

  const noData = !favouriteAnimals || favouriteAnimals?.length === 0;

  return (
    <>
      <Hero title="My Favourites" />
      <section className="container mx-auto py-10">
        {noData ? (
          <div className="text-center">
            <h4 className="font-semibold text-2xl">No favourite animals yet.</h4>
            <p className="text-lg mt-2">
              Go to home page to start searching for your favourite animal!
            </p>
          </div>
        ) : null}

        {favouriteAnimals && favouriteAnimals?.length > 0 ? (
          <>
            <div className="mb-6">
              Total: <span className="font-bold"> {favouriteAnimals.length} </span>
            </div>
            <ListingGrid listings={favouriteAnimals} />
          </>
        ) : null}
      </section>
    </>
  );
};
