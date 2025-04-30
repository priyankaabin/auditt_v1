
import { Notification } from '../types/api';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5173',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});


export const NotificationService = {
  getNotifications: async () => {
    const { data } = await api.get<Notification[]>('/notifications');
    return data;
  },

  markAsRead: async (notificationId: string) => {
    const { data } = await api.put<Notification>(`/notifications/${notificationId}/read`);
    return data;
  },

  markAllAsRead: async () => {
    await api.put('/notifications/read-all');
  }
};