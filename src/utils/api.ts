import { API_URL } from '@/config/constants';

const XAPIKEY = import.meta.env.VITE_API_NINJA_KEY;

class ApiClient {
  readonly baseUrl: string;

  constructor() {
    this.baseUrl = API_URL;
  }

  async request<T>(options: ApiClientOptions): Promise<T> {
    const { url, method, body, headers = {} } = options;
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': `${XAPIKEY}`,
          ...headers,
        },
      });
      if (!response.ok) throw response;
      return response.json();
    } catch (error) {
      if (error instanceof Response) {
        //handleApiError(error, this.scope);
      }
      throw new Error(`Something went wrong`);
    }
  }

  async get<T>(url: string) {
    return this.request<T>({ url, method: 'GET' });
  }

  async put<T>(url: string, body: ApiMeta) {
    return this.request<T>({ url, method: 'PUT', body });
  }

  async post<T>(url: string, body: ApiMeta) {
    return this.request<T>({ url, method: 'POST', body });
  }

  async delete<T>(url: string) {
    return this.request<T>({ url, method: 'DELETE' });
  }

  async patch<T>(url: string, body: ApiMeta) {
    return this.request<T>({ url, method: 'PATCH', body });
  }
}

interface ApiClientOptions {
  url: string;
  method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';
  body?: ApiMeta;
  headers?: ApiMeta;
}

type ApiMeta = Record<string, unknown>;

export const apiClient = new ApiClient();
