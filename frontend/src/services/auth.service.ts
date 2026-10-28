import api from '@/lib/api';
import { LoginResponse } from '@/types/auth';

export const authService = {
  login: async (user: string, password: string) => {
    const payload = {
      appCode: 'ASSESSMENT',
      moduleCode: 'ALL',
      user,
      password,
    };
    const response = await api.post<LoginResponse>('/api/v1/authentication/auth/login', payload);
    return response.data;
  },

  logout: async (user: string) => {
    const payload = {
      appCode: 'ASSESSMENT',
      moduleCode: 'ALL',
      user,
    };
    const response = await api.post('/api/v1/authentication/auth/logout', payload);
    return response.data;
  },

  refreshToken: async () => {
    const response = await api.get('/api/v1/authentication/auth/token/refresh?refreshAuthorization=true');
    return response.data;
  },
};