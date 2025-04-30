
import { Video } from '../types/api';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5173',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});


export const VideoService = {
  getVideos: async () => {
    const { data } = await api.get<Video[]>('/videos');
    return data;
  },

  getPendingVideos: async () => {
    const { data } = await api.get<Video[]>('/videos/pending');
    return data;
  },

  uploadVideo: async (video: {
    title: string;
    description?: string;
    video_url: string;
    thumbnail_url?: string;
  }) => {
    const { data } = await api.post<Video>('/videos', video);
    return data;
  },

  approveVideo: async (videoId: string) => {
    const { data } = await api.put<Video>(`/videos/${videoId}/approve`);
    return data;
  },

  rejectVideo: async (videoId: string) => {
    const { data } = await api.put<Video>(`/videos/${videoId}/reject`);
    return data;
  }
};