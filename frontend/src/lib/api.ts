import axios from 'axios';
import { PaginationParams } from '@/types/tracker';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_KALBE_BASE_URL,
});

api.interceptors.request.use((config) => {
  // Set Mandatory Headers
  config.headers['app_id'] = process.env.NEXT_PUBLIC_APP_ID;
  config.headers['app_key'] = process.env.NEXT_PUBLIC_APP_KEY;

  // Set Auth Bearer Token dari localStorage/Cookie
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});

// Helper untuk menyusun Custom Pagination Headers Kalbe
export const buildPagingHeaders = (params: PaginationParams) => {
  const headers: Record<string, string> = {
    'X-Paging-Offset': params.offset.toString(),
    'X-Paging-Limit': params.limit.toString(),
  };

  if (params.sortBy) headers['X-Paging-SortBy'] = params.sortBy;
  if (params.sortOrder) headers['X-Paging-SortOrder'] = params.sortOrder;
  if (params.search) headers['X-Paging-Search'] = params.search;
  if (params.operator) headers['X-Paging-Operator'] = params.operator;
  if (params.ignoreCase !== undefined) headers['X-Paging-IgnoreCase'] = params.ignoreCase.toString();

  // Advanced Base64 Encoding untuk Filter Include/Exclude
  if (params.include) {
    const jsonStr = JSON.stringify(params.include);
    headers['X-Paging-Include'] = btoa(jsonStr);
  }
  if (params.exclude) {
    const jsonStr = JSON.stringify(params.exclude);
    headers['X-Paging-Exclude'] = btoa(jsonStr);
  }

  return headers;
};

export default api;