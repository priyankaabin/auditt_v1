
import { HomeRequest} from '../types/api';
import axios from 'axios';


const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
  });


export const HomeService = {
  getInviteRequests: async () => {
    const { data } = await api.get<HomeRequest[]>('/invite-requests');
    return data;
  },

  getAllPosts: async (userId?: number) => {
    const token = localStorage.getItem('authToken'); // Retrieve the authToken from localStorage
  
    if (!token) {
      throw new Error('Authentication token is missing');
    }
  
  
  
    if (userId) {
      url += `?user_id=${userId}`; 
    }
  
    try {
      const response = await api.get<any[]>(url, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the auth token in the header
          'Content-Type': 'application/json', // Set the content type
        },
      });
  
      return response.data; // Return the response data (posts)
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  },
  

  createInviteRequest: async (request: {
    email: string;
    name: string;
    reason?: string;
  }) => {
    const { data } = await api.post<HomeRequest>('/invite-requests', request);
    return data;
  },

  approveInviteRequest: async (requestId: string) => {
    const { data } = await api.put<HomeRequest>(`/invite-requests/${requestId}/approve`);
    return data;
  },

  rejectInviteRequest: async (requestId: string, notes?: string) => {
    const { data } = await api.put<HomeRequest>(`/invite-requests/${requestId}/reject`, { notes });
    return data;
  },



createPost: async (userId: number, formData: FormData, categoryId: number) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
      window.location.href = "/signin";
      return null;
  }

  try {
      const response = await api.post(
          `/auth/post/${userId}?category_id=${categoryId}`, 
          formData,
          {
              headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
              },
          }
      );

      return response.data;
  } catch (error) {
      console.error("Error creating post:", error);
      throw error;
  }
};



  
};