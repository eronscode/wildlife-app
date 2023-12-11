import { Header } from '../ui/Header';
import { Footer } from '../ui/Footer';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};
