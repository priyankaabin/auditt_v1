import { create } from 'zustand';
// import { api } from '../lib/api';
import { Notification } from '../types/api';
import { useAuthStore } from './authStore';
import axios from 'axios';
// import api from '../lib/api';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Your backend URL
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<boolean>;
  markAllAsRead: () => Promise<boolean>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  
  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get('/auth/notifications');
      
      // Count unread notifications
      const unreadCount = data.filter((notification: Notification) => !notification.read).length;
      
      set({ 
        notifications: data,
        unreadCount,
        isLoading: false 
      });
    } catch (error: any) {
      console.error("Failed to fetch notifications", error);
      set({ error: error.message, isLoading: false });
    }
  },
  
  markAsRead: async (notificationId) => {
    try {
      const { data } = await api.put(`/notifications/${notificationId}/read`);
      
      if (data) {
        set(state => {
          const updatedNotifications = state.notifications.map(notification => 
            notification.id === notificationId 
              ? { ...notification, read: true } 
              : notification
          );
          
          const unreadCount = updatedNotifications.filter(notification => !notification.read).length;
          
          return {
            notifications: updatedNotifications,
            unreadCount
          };
        });
        
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Failed to mark notification as read", error);
      return false;
    }
  },
  
  markAllAsRead: async () => {
    try {
      await api.put('/notifications/read-all');
      
      set(state => ({
        notifications: state.notifications.map(notification => ({ ...notification, read: true })),
        unreadCount: 0
      }));
      
      return true;
    } catch (error: any) {
      console.error("Failed to mark all notifications as read", error);
      return false;
    }
  }
}));