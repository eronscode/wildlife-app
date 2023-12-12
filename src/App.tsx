import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { AnimalDetails } from './pages/AnimalDetails';
import { Layout } from './components/layout/Layout';
import { Routes } from './config/routes';
import { Favourites } from './pages/Favourites';
import { NotFound } from './components/errors/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: Routes.public.animalDetails(':name'),
        element: <AnimalDetails />,
      },
      {
        path: Routes.public.favourites,
        element: <Favourites />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
