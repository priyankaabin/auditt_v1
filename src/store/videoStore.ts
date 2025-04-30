import { create } from 'zustand';
// import { api } from '../lib/api';
import { Video } from '../types/api';
import { useAuthStore } from './authStore';
// import api from '../lib/api';
import axios from 'axios';

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

interface VideoState {
  videos: Video[];
  pendingVideos: Video[];
  isLoading: boolean;
  error: string | null;
  fetchVideos: () => Promise<void>;
  fetchPendingVideos: () => Promise<void>;
  uploadVideo: (video: { 
    title: string; 
    description?: string; 
    video_url: string;
    thumbnail_url?: string;
  }) => Promise<boolean>;
  approveVideo: (videoId: string) => Promise<boolean>;
  rejectVideo: (videoId: string) => Promise<boolean>;
}

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: [],
  pendingVideos: [],
  isLoading: false,
  error: null,
  
  fetchVideos: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get('/videos');
      set({ videos: data, isLoading: false });
    } catch (error: any) {
      console.error("Failed to fetch videos", error);
      set({ error: error.message, isLoading: false });
    }
  },
  
  fetchPendingVideos: async () => {
    set({ isLoading: true, error: null });
    try {
      const { isAdmin } = useAuthStore.getState();
      
      if (!isAdmin) {
        throw new Error('Only admins can view pending videos');
      }
      
      const { data } = await api.get('/videos/pending');
      set({ pendingVideos: data, isLoading: false });
    } catch (error: any) {
      console.error("Failed to fetch pending videos", error);
      set({ error: error.message, isLoading: false });
    }
  },
  
  uploadVideo: async (video) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/videos', video);
      
      if (data) {
        set({ isLoading: false });
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Failed to upload video", error);
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
  
  approveVideo: async (videoId) => {
    set({ isLoading: true, error: null });
    try {
      const { isAdmin } = useAuthStore.getState();
      
      if (!isAdmin) {
        throw new Error('Only admins can approve videos');
      }
      
      const { data } = await api.put(`/videos/${videoId}/approve`);
      
      if (data) {
        set(state => ({
          pendingVideos: state.pendingVideos.filter(video => video.id !== videoId),
          isLoading: false
        }));
        
        await get().fetchVideos();
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Failed to approve video", error);
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
  
  rejectVideo: async (videoId) => {
    set({ isLoading: true, error: null });
    try {
      const { isAdmin } = useAuthStore.getState();
      
      if (!isAdmin) {
        throw new Error('Only admins can reject videos');
      }
      
      const { data } = await api.put(`/videos/${videoId}/reject`);
      
      if (data) {
        set(state => ({
          pendingVideos: state.pendingVideos.filter(video => video.id !== videoId),
          isLoading: false
        }));
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Failed to reject video", error);
      set({ error: error.message, isLoading: false });
      return false;
    }
  }
}));