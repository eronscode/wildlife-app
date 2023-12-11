import { useState } from 'react';
import { Hero } from '@/components/ui/Hero';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { SearchForm } from '@/components/ui/SearchForm';
import { useSearchAnimals } from '@/hooks/useSearchAnimals';

export const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const { searchQuery } = useSearchAnimals(searchValue);
  const { data, isLoading, isError } = searchQuery;

  const noData = !isLoading && (!data || data?.length === 0);
  const resultNotFound = !isLoading && data?.length === 0 && searchValue !== '';

  return (
    <>
      <Hero
        title="Explore the Wildlife"
        subTitle="Discover a world of amazing creatures and their habitats."
        addon={<SearchForm onSearch={(value) => setSearchValue(value)} isLoading={isLoading} />}
      />
      <section className="container mx-auto py-10">
        {isLoading ? <p className="text-center text-5xl mt-7">Loading...</p> : null}

        {isError ? (
          <p className="text-center text-5xl mt-7">Some error occured while trying to load data</p>
        ) : null}

        {resultNotFound ? (
          <div className="text-center">
            <h4 className="font-semibold text-2xl">
              No results found for &quot;{searchValue}&quot;
            </h4>
            <p className="text-lg mt-2">Try another search term!</p>
          </div>
        ) : null}

        {noData && !resultNotFound ? (
          <div className="text-center">
            <h4 className="font-semibold text-2xl">Search results will appear here.</h4>
            <p className="text-lg mt-2">Type to start searching!</p>
          </div>
        ) : null}

        {data && data?.length > 0 ? (
          <>
            <div className="mb-6">
              Showing {data.length} serarch result for <em className="font-bold">{searchValue}</em>
            </div>
            <ListingGrid listings={data} />
          </>
        ) : null}
      </section>
    </>
  );
};