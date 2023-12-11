export const Routes = {
  public: {
    home: '/',
    animalDetails: (name: string) => `/animal/${name}`,
    favourites: '/my-favourites',
  },
};
