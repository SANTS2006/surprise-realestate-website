import { apiClient } from './client.js';

export const listingsApi = {
  list: ({ page, pageSize, neighborhood, type, maxPrice, minBeds, sort } = {}) =>
    apiClient.get('/listings', { page, pageSize, neighborhood, type, maxPrice, minBeds, sort }),
  get: (id) => apiClient.get(`/listings/${id}`),
  filterOptions: () => apiClient.get('/listings/filter-options'),
  agents: () => apiClient.get('/agents'),
  stats: () => apiClient.get('/stats'),
  inquire: (listingId, body) => apiClient.post(`/listings/${listingId}/inquiries`, body),
  contact: (body) => apiClient.post('/contact', body),
};
