import { Link, useLocation } from 'react-router-dom';
import { Routes } from '@/config/routes';
import classNames from 'classnames';

interface NavLinkProps {
  to: string;
  label: string;
  currentPath: string;
}

const menuItems = [
  {
    label: 'Home',
    path: Routes.public.home,
  },
  {
    label: 'Favourite Animals',
    path: Routes.public.favourites,
  },
];

export const Header = () => {
  const location = useLocation();

  return (
    <header className="text-gray-700 p-4 border border-b shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="text-gray-700">
            NatureNest
          </Link>
        </h1>
        <nav className="space-x-4">
          {menuItems.map((menu, index) => (
            <NavLink
              key={index}
              to={menu.path}
              label={menu.label}
              currentPath={location.pathname}
            />
          ))}
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ to, label, currentPath }: NavLinkProps) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={classNames('text-gray-500 hover:text-gray-800', {
        'text-primary font-bold': isActive,
      })}
    >
      {label}
    </Link>
  );
};
