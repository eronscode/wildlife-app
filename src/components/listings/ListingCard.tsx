import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import MapPinSVG from '@/assets/map-pin.svg?react';

export interface ListingCardProps {
  href: string;
  name: string;
  locations: string[];
}

export const ListingCard: FunctionComponent<ListingCardProps> = ({ name, href, locations }) => {
  return (
    <Link to={href}>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <MapPinSVG className="w-4" />
          <p className="text-gray-600">{locations[0]}</p>
          {locations.length > 1 && (
            <p className="text-xs text-gray-500">+ {locations.length - 1} more locations</p>
          )}
        </div>
      </div>
    </Link>
  );
};
