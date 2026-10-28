import api, { buildPagingHeaders } from '@/lib/api';
import { Tracker, CreateTrackerDto, UpdateTrackerDto } from '@/types/tracker';
import { PaginationParams } from '@/types/api';

export const trackerService = {
  getPaged: async (params: PaginationParams) => {
    const headers = buildPagingHeaders(params);
    const endpoint = params.include || params.exclude ? '/api/v1/feature/trackers/paging/advance' : '/api/v1/feature/trackers/paging';
    const response = await api.get(endpoint, { headers });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/v1/feature/trackers/${id}`);
    return response.data;
  },

  create: async (data: CreateTrackerDto) => {
    const response = await api.post('/api/v1/feature/trackers', data);
    return response.data;
  },

  update: async (data: UpdateTrackerDto) => {
    const response = await api.put('/api/v1/feature/trackers', data);
    return response.data;
  },

  delete: async (id: string, deletedBy: string = 'assessment.it', doHardDelete: boolean = false) => {
    const response = await api.delete('/api/v1/feature/trackers', {
      data: { id, deletedBy, doHardDelete },
    });
    return response.data;
  },
};