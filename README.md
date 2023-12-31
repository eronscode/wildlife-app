# Wildlife App - NatureNest

### Background

Welcome to NatureNest, a miniature project enabling users to explore and learn about various animals. NatureNest enables users to search for animals, view detailed information, create a favorites list, and express preferences by liking or disliking animals. Utilizing local storage, NatureNest ensures data persistence without a backend infrastructure.

### Technical Background

This project integrates the persistQueryClient plugin from React Query for fetching and storing data in local storage. For more details, refer to the documentation on persistent storage [HERE](https://tanstack.com/query/v5/docs/react/plugins/persistQueryClient). The configuration of this plugin is found in `main.tsx` file.

When searching for animals on the home page, the search term serves as a query key for the search results. This approach ensures that when the same search term is used again, the data is fetched from the cache (local storage). Clicking on an animal within the displayed search results navigates the user to the animal details page. On this page, the actual name of the animal is used as a query key. This methodology ensures that upon revisiting the page, the data is loaded from the cache. It's important to note that with each new key, an API call is made and the results are saved to the cache.

To manage adding animals to favorites, a boolean property named `isFavourite` is introduced in the cache, where name is equals name of animal (recall that the name is used as the cache key). Similarly, rating an animal involves the addition of a numeric property named `rating` in the cache, where the name matches the animal's name.

Regarding liking and disliking animals, an object called `preferences` is included in the cache. This object contains characteristic key names associated with values indicating 'like' or 'dislike' for the corresponding animal's name.

To view all selected favorites, the entire cache is examined to identify animals where the `isFavourite` property is set to `true`. This data is then extracted and formatted for display in the user interface.


## Requirements

- [Node.js](https://nodejs.org/en/download/package-manager) ^20.8.1


## Libraries/Dependencies

- React
- Typescript
- Tailwind CSS - for implementing designs.
- React Query - for data fectching with caching

- Husky - for precommit and prepush hooks. Used to run scripts before commiting or pushing to repo
- Vitest
- Resct Testing Library
- Jest dom
- Cypress for e2e


## Environment Variables

The following environment variables are needed to run the app successfully.

```sh
VITE_API_NINJA_KEY= ## Api key gotten from https://api-ninjas.com/api/animals 
```


## How to run

```bash
# install deps
$ npm i

# development mode
$ npm run dev

# production mode
$ npm build
$ npm preview ## preview the production build
```

**Having issues running the project due to node version?** - You can delete the package-lock.json, delete node_modules folder and re install packages. **NOTE:** Deleting package-lock is not advisable for production projects. This is just a hack to run the project since this project is a mini-project.


## Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run e2e
```


## Features

1. **Search**: This app offers a user-friendly interface allowing users to explore information about various animals. The search functionality is accessible on the home page of the app, illustrated in the accompanying screenshot. Users input their desired search term into the provided text field, and upon clicking the search button, a request is triggered to the 'api-ninjas' API. Subsequently, the retrieved results are showcased on the screen, corresponding to the search query. Additionally, the application adeptly handles scenarios where no results are found, ensuring a seamless user experience.

![Home Page Screen - Initial](src/assets/docs/screen-1.png)


![Home Page Screen - Showing Results](src/assets/docs/screen-1.1.png)


![Home Page Screen - Empty Results](src/assets/docs/screen-1.2.png)


2. **Animal Details View**: Following a search and the presentation of search results, clicking on an animal redirects users to a dedicated page showcasing detailed information about that specific animal. Referencing the provided screenshot below, this page offers an in-depth exploration of the selected animal's characteristics and details

![Animal Details Screen](src/assets/docs/screen-2.png)


3. **Adding Animals to favourites**: From the details view, users can add animals to their favorites list. A simple click on the button adds the selected animal to the favorites list, as illustrated in the accompanying screenshot.

![Animal Details Screen](src/assets/docs/screen-2.1.png)


4. **Rating Animals**: In the details view, users can assign a rating to animals using the large rating icon in the 'Leave your rating' section. This allows users to rate the animal on a scale of 1 to 5.

![Animal Details Screen - Rating Animals](src/assets/docs/screen-2.2.png)


5. **Like/Dislike Animal Characteristics**: In the details view, users can also like and dislike animal characteristics

![Animal Details Screen - Like/Dislike Animal Characteristics](src/assets/docs/screen-2.3.png)


6. **View Favorites**: Users can navigate to the Favorites Animals page and view all the animals they have previously selected as favorites. If no favorites have been selected yet, a message will be displayed o the page prompting the user to search and select their favorite animals.

![View Favorites - Initial](src/assets/docs/screen-3.png)


![View Favorites - Favourite animals](src/assets/docs/screen-3.1.png)

7. **Testing**: Although there wasn't enough time to implement proper test, the following test were implemented:

- **E2E test**: Basic e2e test was implemented to perform search and adding animals to favourites. Cypress was utilized for the e2e test.

![E2E Test](src/assets/docs/e2e.png)


- **Unit test**: Very basic unit test was implemented for some functions while some where not completed due to time constraints. Vitest was utilized for testing because it's highly effective for testing due to its seamless integration with React. I've also experience migration of jest to vitest in a very large codebase and utilizing vitest made the test run extremely faster by 70%.

![Unit Test](src/assets/docs/unit-test.png)


## Improvements

### Technical Improvements
The following are some technical things i'd do if i had more time on the project:

1. **UI Improvements:**

- **Retaining search query** : At present, the search query gets cleared when navigating back to the search page from the details page. In certain scenarios, retaining the search term in the search box and displaying the results upon returning to the search page from the details view could offer a more seamless user experience. To achieve this enhancement, I'd aim to utilize URL query parameters to persist the search term value. By storing the search term within the URL, it ensures that the query remains intact even after navigating away and returning to the search page from the details view. This implementation could provide a more consistent and user-friendly search experience.


- **Mobile/Tablet Responsiveness** - Making the product responsive wasn't a mojor requirement for the product but it would have been nice to have this feature.


- **Utilize a proper design system**: Currently the project uses custom colors, tailwind default colors and sizes for displaying UI elements. The colors utilized was coined to represent nature:

  Primary Color: Green - Representing vegetation
  
  Secondary Color: Yellow - Representing sunlight

  While the existing design system served its purpose in this mini-app, leveraging a comprehensive design system would significantly enhance the visual appeal of the application. Given more time, I would utilize tools like Figma to create prototypes of layouts, colors, and components, including their various states, before implementing the design with Tailwind CSS.

- **Adding Pagination for Search Results**: If i had more time, i'd implement client side pagination for results more than 50 items since the api doesn't support server side pagination.

- **Images** - Images are quite important in any application as it gives more life and description to an entity. Currently the API doesn't include pictures of the animal. Maybe calling an external service based on the name of the animal to display a picture can be done.


2. **Writing Tests** - Unfortunately there was no much time to write more unit tests and e2e test in the project. Writing test is very important as it as it helps to validate that all visible aspects of the product is functional and ready for production. If i had more time, i'd ensure all test cases are covered.


3. **SEO** - Implementing SEO (Search Engine Optimization) is crucial to enhance visibility across search engines, ensuring that users can easily discover and access information about various animals. By optimizing content with relevant keywords, meta tags, and structured data, the app can rank higher in search results, attracting more organic traffic and increasing its online presence. I'd use the `react-helmet` as it allows for dynamic management of the document head in React applications.


4. **Accessibilty** - Improving accessibility in the app will enhance inclusivity by ensuring that users with disabilities or diverse needs can easily navigate, interact, and comprehend the content. Incorporating accessible design elements, such as alt text for images or keyboard navigation, not only complies with standards but also broadens the app's reach, making it usable by a wider audience.


5. **Documentation** - Documentation is very important in projects as it helps others understand what has been done in the project. I'd write a very organized documentation if i had more time in the project.


6. **API connection** - Integrating with a live API enhances the application's interactivity and scalability. Presently, our data caching relies on local storage, which has a limited capacity of approximately 5MB. This limitation hinders scalability in the long term. Transitioning to a backend service for managing tasks such as adding/listing animals to/from favorites, rating, and expressing preference in liking/disliking animals offers improved scalability and maintainability.


7. **Deployment:** Implementing CI/CD pipeline and continously deploy to a hosting server. CI/CD pipelines is important because it helps to minimize human error and maintain a consistent process for how software is released.


### Business Improvements
Although this is a mini app but being that i'm not just only an Engineer but also business oriented, here are some proposed features that could elevate this application:

1. **Enhanced User Engagement**: Implementing a rewards system to incentivize user interaction—granting free coins for actions like liking, disliking, or rating animals. Accumulated coins could be exchanged for a complimentary zoo visit, fostering continuous user engagement and loyalty to the application. This strategic feature aims to sustain user interest and interaction with the app over time.


## Limitations

1. **Local Storage Capacity**: Relying solely on local storage for caching data could become restrictive due to its limited capacity, typically around 5MB. This limitation might hinder the app's ability to efficiently manage larger datasets or more complex functionalities.


2. **Scalability Issues**: As the application grows and handles increased user traffic, scaling with local storage might pose challenges. It might struggle to manage larger volumes of data or concurrent user interactions, impacting performance.


3. **SEO and Metadata Management**: Lack of proper metadata handling or SEO strategies within the app could affect its visibility in search engines, potentially reducing discoverability and traffic.


4. **Limited Backend Functionality**: If the app operates without a robust backend, it might be limited in functionalities such as user authentication, real-time data updates, or handling complex business logic, thus impacting its capabilities.


5. **Security Concerns**: Not having comprehensive security measures or proper validation mechanisms in place might expose the app to vulnerabilities like data breaches or unauthorized access.