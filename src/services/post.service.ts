
import { Post, Comment } from '../types/api';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});


export const PostService = {
  getPosts: async () => {
    const { data } = await api.get<Post[]>('/posts');
    return data;
  },

  getPostsByUser: async (userId: string) => {
    const { data } = await api.get<Post[]>(`/posts/user/${userId}`);
    return data;
  },

  createPost: async (post: {
    content: string;
    category: string;
    media_url?: string;
    media_type?: string;
  }) => {
    const { data } = await api.post<Post>('/posts', post);
    return data;
  },

  updatePost: async (postId: string, post: {
    content: string;
    category: string;
  }) => {
    const { data } = await api.put<Post>(`/posts/${postId}`, post);
    return data;
  },

  deletePost: async (postId: string) => {
    await api.delete(`/posts/${postId}`);
  },

  togglePinPost: async (postId: string, pinned: boolean) => {
    const { data } = await api.put<Post>(`/posts/${postId}/pin`, { pinned });
    return data;
  },

  likePost: async (postId: string) => {
    const { data } = await api.post<Post>(`/posts/${postId}/like`);
    return data;
  },

  unlikePost: async (postId: string) => {
    const { data } = await api.delete<Post>(`/posts/${postId}/like`);
    return data;
  },

  getComments: async (postId: string) => {
    const { data } = await api.get<Comment[]>(`/posts/${postId}/comments`);
    return data;
  },

  

  deleteComment: async (postId: string, commentId: string) => {
    await api.delete(`/posts/${postId}/comments/${commentId}`);
  },
  

  addComment: async (postId: number, userId: number, text: string) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('User not authenticated');

      const response = await api.post(
        `/auth/posts/${postId}/comments`,
        { user_id: userId, text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },

};