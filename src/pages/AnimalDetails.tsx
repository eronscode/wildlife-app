import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import { Hero } from '@/components/ui/Hero';
import MapPinSVG from '@/assets/map-pin.svg?react';
import StarSVG from '@/assets/star.svg?react';
import ThumbsUpSVG from '@/assets/thumbs-up.svg?react';
import ThumbsDownSVG from '@/assets/thumbs-down.svg?react';
import HeartSVG from '@/assets/heart.svg?react';
import { Button } from '@/components/ui/Button';
import { Routes } from '@/config/routes';
import { useSearchAnimals } from '@/hooks/useSearchAnimals';
import { Preferences } from '@/enums';
import { stringUtils } from '@/utils/formatString';

export const AnimalDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { decodeSlug, convertToTitleCase } = stringUtils;
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

  console.log({ animalDetail });

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
        <div className="mb-4">
          <h1 className="text-3xl font-semibold mb-2">{animalDetail.name}</h1>
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center">
              <MapPinSVG className="w-4" />
              {animalDetail.locations.map((value) => value).join(', ')}
            </div>
            <Rate
              key={animalDetail?.rating}
              defaultValue={animalDetail?.rating ?? 0}
              character="★"
              disabled
            />
            <span className="text-gray-500">({animalDetail?.rating ?? 0} / 5)</span>
          </div>
        </div>

        <div className="mb-8">
          <Button
            label={
              <span className="flex items-center gap-2">
                <HeartSVG
                  className={classNames('w-5', { 'fill-red-600 ': animalDetail.isFavourite })}
                />
                {animalDetail.isFavourite ? 'Remove from favourite' : 'Add to favourite'}
              </span>
            }
            variant={animalDetail.isFavourite ? 'primary' : 'secondary'}
            onClick={toggleFavourites}
          />
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Leave a Rating!</h2>
          <Rate
            onChange={(value) => handleRating(value)}
            allowHalf
            defaultValue={animalDetail?.rating ?? 0}
            character={() => (
              <div
                className={classNames(
                  '[&>svg]:fill-current [&>svg]:stroke-black [&>svg]:stroke-1 w-12 h-12',
                )}
              >
                <StarSVG />
              </div>
            )}
          />
          <div className="flex gap-2 items-center"></div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Taxonomy</h2>
          <ul className="list-none">
            {Object.entries(animalDetail.taxonomy).map(([key, value]) => (
              <li key={key}>
                <span className="font-semibold">{convertToTitleCase(key)}</span>:{' '}
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Characteristics</h2>
          <ul className="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid grid-cols-1 gap-y-8 gap-x-5 3xl:gap-y-10 ">
            {Object.entries(animalDetail.characteristics).map(([key, value]) => (
              <li
                className="flex flex-col justify-between gap-1 min-h-[230px] border border-gray-300 p-4 rounded-md"
                key={key}
              >
                <div>
                  <p className="font-semibold">{convertToTitleCase(key)}</p>
                  <span>
                    <>{value}</>
                  </span>
                </div>
                <span className="w-full flex gap-3">
                  <button
                    className="w-full flex justify-center bg-gray-100 rounded py-3"
                    onClick={() => handlePreference(Preferences.LIKE, animalDetail, key)}
                  >
                    <ThumbsUpSVG
                      className={classNames('w-7', {
                        'fill-secondary': animalDetail?.preferences?.[key] === Preferences.LIKE,
                      })}
                    />
                  </button>
                  <button
                    className="w-full flex justify-center bg-gray-100 rounded py-3"
                    onClick={() => handlePreference(Preferences.DISLIKE, animalDetail, key)}
                  >
                    <ThumbsDownSVG
                      className={classNames('w-7', {
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
