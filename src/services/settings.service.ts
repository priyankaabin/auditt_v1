import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:5173',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

export const SettingsService = {
  getSettings: async (userId: number) => {
    const { data } = await api.get(`/settings/${userId}`);
    return data;
  },
};
