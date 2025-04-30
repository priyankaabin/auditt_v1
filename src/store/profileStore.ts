import { create } from 'zustand';
// import { api } from '../lib/api';
import { Profile } from '../types/api';
import { useAuthStore } from './authStore';
import { USER_TIERS } from '../config/constants';
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

interface ProfileState {
  displayName: string;
  bio: string;
  bannerColor: string;
  avatarUrl: string;
  avatarType: string;
  points: number;
  tier: string;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (profile: {
    displayName?: string;
    bio?: string;
    bannerColor?: string;
    avatarUrl?: string;
    avatarType?: string;
  }) => Promise<boolean>;
  uploadAvatar: (file: File) => Promise<string | null>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  displayName: '',
  bio: '',
  bannerColor: 'from-purple-500 via-blue-500 to-orange-500',
  avatarUrl: '',
  avatarType: 'initials',
  points: 0,
  tier: 'bronze',
  isLoading: false,
  error: null,
  
  fetchProfile: async () => {
    const { user } = useAuthStore.getState();
    if (!user) return;
    
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get(`/profiles/${user.id}`);
      
      if (data) {
        // Determine avatar type and URL
        let avatarType = 'initials';
        let avatarUrl = '';
        
        if (data.avatar_url) {
          if (data.avatar_url.includes('dicebear')) {
            // Extract avatar type from dicebear URL
            const match = data.avatar_url.match(/\/([^/]+)\/svg/);
            if (match && match[1]) {
              avatarType = match[1];
            }
            avatarUrl = data.avatar_url;
          } else {
            // Custom uploaded avatar
            avatarType = 'custom';
            avatarUrl = data.avatar_url;
          }
        } else {
          // Default avatar
          avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`;
        }
        
        // Determine tier based on points
        const points = data.points || 0;
        let tier = 'bronze';
        
        if (points >= USER_TIERS.diamond.pointsRequired) {
          tier = 'diamond';
        } else if (points >= USER_TIERS.gold.pointsRequired) {
          tier = 'gold';
        } else if (points >= USER_TIERS.silver.pointsRequired) {
          tier = 'silver';
        }
        
        set({
          displayName: data.display_name || '',
          bio: data.bio || '',
          bannerColor: data.banner_color || 'from-purple-500 via-blue-500 to-orange-500',
          avatarUrl,
          avatarType: data.avatar_type || avatarType,
          points,
          tier,
          isLoading: false
        });
      }
    } catch (error: any) {
      console.error("Failed to fetch profile", error);
      set({ error: error.message, isLoading: false });
    }
  },
  
  updateProfile: async (profile) => {
    const { user } = useAuthStore.getState();
    if (!user) return false;
    
    set({ isLoading: true, error: null });
    try {
      // Prepare avatar URL based on type
      let avatarUrl = get().avatarUrl;
      
      if (profile.avatarType && profile.avatarType !== 'custom') {
        // Generate new dicebear avatar URL
        avatarUrl = `https://api.dicebear.com/7.x/${profile.avatarType}/svg?seed=${user.email}`;
      } else if (profile.avatarUrl) {
        // Use provided custom avatar URL
        avatarUrl = profile.avatarUrl;
      }
      
      const { data } = await api.put(`/profiles/${user.id}`, {
        display_name: profile.displayName,
        bio: profile.bio,
        banner_color: profile.bannerColor,
        avatar_url: avatarUrl,
        avatar_type: profile.avatarType
      });
      
      if (data) {
        set({
          displayName: profile.displayName || get().displayName,
          bio: profile.bio || get().bio,
          bannerColor: profile.bannerColor || get().bannerColor,
          avatarUrl: avatarUrl,
          avatarType: profile.avatarType || get().avatarType,
          isLoading: false
        });
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Failed to update profile", error);
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
  
  uploadAvatar: async (file: File) => {
    const { user } = useAuthStore.getState();
    if (!user) return null;
    
    set({ isLoading: true, error: null });
    try {
      // Create form data
      const formData = new FormData();
      formData.append('avatar', file);
      
      const { data } = await api.post('/profiles/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (data?.url) {
        await get().updateProfile({
          avatarUrl: data.url,
          avatarType: 'custom'
        });
        
        set({ isLoading: false });
        return data.url;
      }
      return null;
    } catch (error: any) {
      console.error("Avatar upload failed", error);
      set({ error: error.message, isLoading: false });
      return null;
    }
  }
}));