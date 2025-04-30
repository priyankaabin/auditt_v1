import { create } from 'zustand';
// import { api } from '../lib/api';
import { InviteRequest } from '../types/api';
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

interface InviteState {
  inviteRequests: InviteRequest[];
  isLoading: boolean;
  error: string | null;
  fetchInviteRequests: () => Promise<void>;
  createInviteRequest: (request: { 
    email: string; 
    name: string; 
    reason?: string;
  }) => Promise<boolean>;
  approveInviteRequest: (requestId: string) => Promise<boolean>;
  rejectInviteRequest: (requestId: string, notes?: string) => Promise<boolean>;
}

export const useInviteStore = create<InviteState>((set) => ({
  inviteRequests: [],
  isLoading: false,
  error: null,
  
  fetchInviteRequests: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get('/invite-requests');
      set({ inviteRequests: data, isLoading: false });
    } catch (error: any) {
      console.error("Failed to fetch invite requests", error);
      set({ error: error.message, isLoading: false });
    }
  },
  
  createInviteRequest: async (request) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/invite-requests', request);
      
      if (data) {
        set({ isLoading: false });
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Failed to create invite request", error);
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
  
  approveInviteRequest: async (requestId) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.put(`/invite-requests/${requestId}/approve`);
      
      if (data) {
        set(state => ({
          inviteRequests: state.inviteRequests.map(request => 
            request.id === requestId 
              ? { ...request, status: 'approved' } 
              : request
          ),
          isLoading: false
        }));
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Failed to approve invite request", error);
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
  
  rejectInviteRequest: async (requestId, notes) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.put(`/invite-requests/${requestId}/reject`, { notes });
      
      if (data) {
        set(state => ({
          inviteRequests: state.inviteRequests.map(request => 
            request.id === requestId 
              ? { ...request, status: 'rejected', admin_notes: notes } 
              : request
          ),
          isLoading: false
        }));
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Failed to reject invite request", error);
      set({ error: error.message, isLoading: false });
      return false;
    }
  }
}));