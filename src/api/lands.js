import { apiClient } from './client.js';

export const landsApi = {
  list: (params = {}) => apiClient.get('/lands', params),
  get: (id) => apiClient.get(`/lands/${id}`),
  filterOptions: () => apiClient.get('/lands/filter-options'),
};
