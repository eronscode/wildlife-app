import { ReactNode } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import {
  PersistQueryClientProvider,
  persistQueryClient,
} from '@tanstack/react-query-persist-client';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { API_ENDPOINTS } from '@/config/api-endpoints';

/**============================================
 **               TO BE IMPLEMENTED
 *=============================================**/

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister,
});

export const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <PersistQueryClientProvider persistOptions={{ persister }} client={queryClient}>
      {children}
    </PersistQueryClientProvider>
  );
};

const server = setupServer(
  http.get(API_ENDPOINTS.SERACH_ANIMAL(':name'), () => {
    return HttpResponse.json([]);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useSearchAnimals', () => {
  it('should fetch animal profiles based on search name', () => {
    /**============================================
     **               TO BE IMPLEMENTED
     *=============================================**/
    return true;
  });
});
