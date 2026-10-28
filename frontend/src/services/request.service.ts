import api, { buildPagingHeaders } from '@/lib/api';
import { RequestHeader, CreateRequestDto } from '@/types/request';
import { PaginationParams } from '@/types/api';

export const requestService = {
  getPaged: async (params: PaginationParams) => {
    const headers = buildPagingHeaders(params);
    const endpoint = params.include || params.exclude ? '/api/v1/feature/requests/paging/advance' : '/api/v1/feature/requests/paging';
    const response = await api.get(endpoint, { headers });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/v1/feature/requests/${id}`);
    return response.data;
  },

  create: async (data: CreateRequestDto) => {
    const response = await api.post('/api/v1/feature/requests', data);
    return response.data;
  },

  getTrackingsByRequestId: async (requestId: string) => {
    const response = await api.get(`/api/v1/feature/trackings/request-id/${requestId}`);
    return response.data;
  },
};