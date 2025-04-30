
import { User } from '../types/api';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5173',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});


export const AuthService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post<User>('/auth/signin', { email, password });
    return data;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },

  checkAdminStatus: async () => {
    const { data } = await api.get<{ isAdmin: boolean }>('/auth/check-admin');
    return data.isAdmin;
  }
};