
import { InviteRequest } from '../types/api';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});


export const InviteService = {
  getInviteRequests: async () => {
    const { data } = await api.get<InviteRequest[]>('/invite-requests');
    return data;
  },

  createInviteRequest: async (request: {
    email: string;
    name: string;
    reason?: string;
  }) => {
    const { data } = await api.post<InviteRequest>('/invite-requests', request);
    return data;
  },

  approveInviteRequest: async (requestId: string) => {
    const { data } = await api.put<InviteRequest>(`/invite-requests/${requestId}/approve`);
    return data;
  },

  rejectInviteRequest: async (requestId: string, notes?: string) => {
    const { data } = await api.put<InviteRequest>(`/invite-requests/${requestId}/reject`, { notes });
    return data;
  },


approveRejectVideoPost: async (postId: number, action: 'approve' | 'reject') => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await api.put(
      `/auth/videos/${postId}/approve_reject?action=${action}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error updating video status:`, error);
    throw new Error(`Failed to ${action} the video.`);
  }
},


fetchPendingVideos: async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await api.get('/auth/videos/pending-approval', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.filter((video: any) => !video.isVideoApproved && !video.isVideoRejected);
  } catch (error) {
    console.error('Error fetching pending videos:', error);
    toast.error('Failed to load pending videos.');
    return [];
  }
},

deleteUser: async (userId: number, setUsers: Function) => {
  if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
    return;
  }

  try {
    await api.delete(`/auth/users/${userId}`);
    setUsers((prevUsers: any[]) => prevUsers.filter(user => user.id !== userId));
    toast.success('User deleted successfully');
  } catch (error: any) {
    console.error('Error deleting user:', error);
    toast.error(error.response?.data?.message || 'Failed to delete user');
  }
},
changePassword: async (payload: {
  userId: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  try {
    const token = localStorage.getItem('authToken'); // Ensure token is retrieved
    if (!token) {
      toast.error('Authentication failed. Please log in again.');
      return;
    }

    const response = await api.post('/auth/change-password', payload, {
      headers: {
        Authorization: `Bearer ${token}` // Pass token in headers
      }
    });

    toast.success(response.data.message || 'Password updated successfully');
    return response;
  } catch (error: any) {
    console.error('Error changing password:', error);
    toast.error(error.response?.data?.detail || 'Failed to update password');
    throw error;
  }
},


};