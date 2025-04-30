import { create } from 'zustand';
// import { api } from '../lib/api';
import { Post, Comment } from '../types/api';
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

export const CATEGORIES = [
  'All Categories',
  'Community and Leadership',
  'Culinary Arts',
  'Family Talent Shows',
  'Hobbies',
  'Innovative Ideas and Inventions',
  'Literary Arts',
  'Mind Games and Puzzles',
  'Performing Arts',
  'Sports and Physical Activities',
  'STEM',
  'Visual Arts'
];

interface PostState {
  posts: Post[];
  comments: Record<string, Comment[]>;
  isLoading: boolean;
  error: string | null;
  selectedCategory: string;
  fetchPosts: () => Promise<void>;
  fetchPostsByUser: (userId: string) => Promise<Post[]>;
  createPost: (content: string, category: string, mediaUrl?: string, mediaType?: string) => Promise<boolean>;
  updatePost: (postId: string, content: string, category: string) => Promise<boolean>;
  deletePost: (postId: string) => Promise<boolean>;
  togglePinPost: (postId: string, pinned: boolean) => Promise<boolean>;
  likePost: (postId: string) => Promise<boolean>;
  unlikePost: (postId: string) => Promise<boolean>;
  fetchComments: (postId: string) => Promise<Comment[]>;
  addComment: (postId: string, content: string) => Promise<boolean>;
  deleteComment: (commentId: string, postId: string) => Promise<boolean>;
  setSelectedCategory: (category: string) => void;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  comments: {},
  isLoading: false,
  error: null,
  selectedCategory: 'All Categories',
  
  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get('/posts');
      set({ posts: data, isLoading: false });
    } catch (error: any) {
      console.error("Failed to fetch posts", error);
      set({ error: error.message, isLoading: false });
    }
  },
  
  fetchPostsByUser: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get(`/posts/user/${userId}`);
      return data;
    } catch (error: any) {
      console.error("Failed to fetch user posts", error);
      set({ error: error.message, isLoading: false });
      return [];
    } finally {
      set({ isLoading: false });
    }
  },
  
  createPost: async (content: string, category: string, mediaUrl?: string, mediaType?: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/posts', {
        content,
        category: category === 'All Categories' ? 'Community and Leadership' : category,
        media_url: mediaUrl,
        media_type: mediaType
      });
      
      if (data) {
        await get().fetchPosts();
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Failed to create post", error);
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
  
  updatePost: async (postId: string, content: string, category: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.put(`/posts/${postId}`, {
        content,
        category: category === 'All Categories' ? 'Community and Leadership' : category
      });
      
      if (data) {
        await get().fetchPosts();
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Failed to update post", error);
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
  
  deletePost: async (postId: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/posts/${postId}`);
      
      set(state => ({
        posts: state.posts.filter(post => post.id !== postId),
        isLoading: false
      }));
      
      return true;
    } catch (error: any) {
      console.error("Failed to delete post", error);
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
  
  togglePinPost: async (postId: string, pinned: boolean) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.put(`/posts/${postId}/pin`, { pinned });
      
      if (data) {
        set(state => ({
          posts: state.posts.map(post => 
            post.id === postId ? { ...post, pinned } : post
          ),
          isLoading: false
        }));
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Failed to toggle pin post", error);
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
  
  likePost: async (postId: string) => {
    try {
      const { data } = await api.post(`/posts/${postId}/like`);
      
      if (data) {
        set(state => ({
          posts: state.posts.map(post => 
            post.id === postId 
              ? { 
                  ...post, 
                  likes_count: (post.likes_count || 0) + 1,
                  isLiked: true
                } 
              : post
          )
        }));
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Failed to like post", error);
      return false;
    }
  },
  
  unlikePost: async (postId: string) => {
    try {
      const { data } = await api.delete(`/posts/${postId}/like`);
      
      if (data) {
        set(state => ({
          posts: state.posts.map(post => 
            post.id === postId 
              ? { 
                  ...post, 
                  likes_count: Math.max((post.likes_count || 1) - 1, 0),
                  isLiked: false
                } 
              : post
          )
        }));
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Failed to unlike post", error);
      return false;
    }
  },
  
  fetchComments: async (postId: string) => {
    try {
      const { data } = await api.get(`/posts/${postId}/comments`);
      
      set(state => ({
        comments: {
          ...state.comments,
          [postId]: data
        }
      }));
      
      return data;
    } catch (error: any) {
      console.error("Failed to fetch comments", error);
      return [];
    }
  },
  
  addComment: async (postId: string, content: string) => {
    try {
      const { data } = await api.post(`/posts/${postId}/comments`, { content });
      
      if (data) {
        await get().fetchComments(postId);
        
        set(state => ({
          posts: state.posts.map(post => 
            post.id === postId 
              ? { ...post, comments_count: (post.comments_count || 0) + 1 } 
              : post
          )
        }));
        
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Failed to add comment", error);
      return false;
    }
  },
  
  deleteComment: async (commentId: string, postId: string) => {
    try {
      await api.delete(`/posts/${postId}/comments/${commentId}`);
      
      set(state => {
        const updatedComments = state.comments[postId]?.filter(
          comment => comment.id !== commentId
        ) || [];
        
        return {
          comments: {
            ...state.comments,
            [postId]: updatedComments
          },
          posts: state.posts.map(post => 
            post.id === postId 
              ? { ...post, comments_count: Math.max((post.comments_count || 1) - 1, 0) } 
              : post
          )
        };
      });
      
      return true;
    } catch (error: any) {
      console.error("Failed to delete comment", error);
      return false;
    }
  },
  
  setSelectedCategory: (category: string) => {
    set({ selectedCategory: category });
  }
}));