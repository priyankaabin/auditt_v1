
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',  // Ensure this matches the backend URL
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// export default api;



import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    // Only add token if it exists
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Get original request
    const originalRequest = error.config;

    // Check if error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Only handle auth redirect for non-public routes
      const publicRoutes = ['/signin', '/signup', '/forgot-password'];
      const isPublicRoute = publicRoutes.some(route => 
        window.location.pathname.includes(route)
      );

      if (!isPublicRoute) {
        try {
          // Try to refresh token here if you have a refresh token mechanism
          // const refreshToken = localStorage.getItem('refreshToken');
          // const response = await api.post('/auth/refresh', { refreshToken });
          // const newToken = response.data.token;
          // localStorage.setItem('authToken', newToken);
          // originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          // return api(originalRequest);

          // If no refresh mechanism, clear auth data
          localStorage.removeItem('authToken');
          localStorage.removeItem('userId');
          localStorage.removeItem('username');
          localStorage.removeItem('isAdmin');
          
          // Reset stores
          const resetAuth = useAuthStore.getState().logout;
          const resetTheme = useThemeStore.getState().resetToDefaults;
          
          await resetAuth();
          resetTheme();

          // Redirect to signin only if explicitly unauthorized
          if (error.response?.status === 401) {
            window.location.href = '/signin';
          }
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
