import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import { Hero } from '@/components/ui/Hero';
import MapPinSVG from '@/assets/map-pin.svg?react';
import ThumbsUpSVG from '@/assets/thumbs-up.svg?react';
import ThumbsDownSVG from '@/assets/thumbs-down.svg?react';
import HeartSVG from '@/assets/heart.svg?react';
import { Button } from '@/components/ui/Button';
import { Routes } from '@/config/routes';
import { useSearchAnimals } from '@/hooks/useSearchAnimals';
import { Preferences } from '@/enums';
import { slugUtils } from '@/utils/slug';

export const AnimalDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { decodeSlug } = slugUtils;
  const name = decodeSlug(String(params?.name) ?? '');

  const { searchQuery, toggleFavourites, handleRating, handlePreference } = useSearchAnimals(name);
  const { data, isLoading } = searchQuery;

  const animalDetail = data?.find((animal) => animal.name === name);

  if (isLoading) {
    return <p className="text-center text-5xl mt-10">Loading...</p>;
  }

  if (!animalDetail) {
    return null;
  }

  return (
    <>
      <Hero
        title={animalDetail.name}
        addon={
          <div className="flex justify-center">
            <Button
              label="Back to Search"
              variant="secondary"
              onClick={() => navigate(Routes.public.home)}
            />
          </div>
        }
      />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-semibold mb-6">{animalDetail.name}</h1>
        <div className="mb-8">
          <Button
            label={
              <span className="flex items-center gap-2">
                {animalDetail.isFavourite ? 'Remove from favourite' : 'Add to favourite'}
                <HeartSVG
                  className={classNames('w-5', { 'fill-red-600 ': animalDetail.isFavourite })}
                />
              </span>
            }
            variant={animalDetail.isFavourite ? 'primary' : 'secondary'}
            onClick={toggleFavourites}
          />
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Rating</h2>
          <Rate
            onChange={(value) => handleRating(value)}
            allowHalf
            defaultValue={animalDetail?.rating ?? 0}
            character="★"
          />
          <div className="flex gap-2 items-center"></div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Location</h2>
          <div className="flex gap-2 items-center">
            <MapPinSVG className="w-4" />
            {animalDetail.locations.map((value) => value).join(', ')}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Taxonomy</h2>
          <ul className="list-none">
            {Object.entries(animalDetail.taxonomy).map(([key, value]) => (
              <li key={key}>
                <span className="font-semibold">{key}</span>: <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Characteristics</h2>
          <ul className="flex flex-col gap-4">
            {Object.entries(animalDetail.characteristics).map(([key, value]) => (
              <li className="flex gap-1" key={key}>
                <div>
                  <span className="font-semibold">{key}</span>:{' '}
                  <span>
                    <>{value}</>
                  </span>
                </div>
                <span className="flex gap-3">
                  <button onClick={() => handlePreference(Preferences.LIKE, animalDetail, key)}>
                    <ThumbsUpSVG
                      className={classNames('w-5', {
                        'fill-secondary': animalDetail?.preferences?.[key] === Preferences.LIKE,
                      })}
                    />
                  </button>
                  <button onClick={() => handlePreference(Preferences.DISLIKE, animalDetail, key)}>
                    <ThumbsDownSVG
                      className={classNames('w-5', {
                        'fill-secondary': animalDetail?.preferences?.[key] === Preferences.DISLIKE,
                      })}
                    />
                  </button>
                </span>{' '}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
