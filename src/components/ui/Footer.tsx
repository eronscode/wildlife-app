export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">NatureNest &copy; {new Date().getFullYear()} All Rights Reserved</p>
      </div>
    </footer>
  );
};
