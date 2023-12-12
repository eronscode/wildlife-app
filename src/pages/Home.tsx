import { useState } from 'react';
import { Hero } from '@/components/ui/Hero';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { SearchForm } from '@/components/ui/SearchForm';
import { useAnimalService } from '@/hooks/useAnimalService';
import { Spinner } from '@/components/ui/Spinner';

export const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const { searchQuery } = useAnimalService(searchValue);
  const { data, isLoading, isError } = searchQuery;

  const noData = !isLoading && !isError && (!data || data?.length === 0);
  const resultNotFound = !isLoading && !isError && data?.length === 0 && searchValue !== '';

  return (
    <>
      <Hero
        title="Explore the Wildlife"
        subTitle="Discover a world of amazing creatures and their habitats."
        addon={<SearchForm onSearch={(value) => setSearchValue(value)} isLoading={isLoading} />}
      />
      <section className="container mx-auto py-10">
        {isLoading ? (
          <div className="flex justify-center h-40 mt-7">
            <Spinner variant="dot-spin" />
          </div>
        ) : null}

        {isError ? (
          <p className="text-center text-red-500 text-3xl mt-7">
            Some error occured while trying to load data
          </p>
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
          <div className="results-container">
            <div className="mb-6">
              Showing {data.length} search result for <em className="font-bold">{searchValue}</em>
            </div>
            <ListingGrid listings={data} />
          </div>
        ) : null}
      </section>
    </>
  );
};
