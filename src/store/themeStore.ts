// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// // import { api } from '../lib/api';
// // import {api} from '../lib/api'
// import { useAuthStore } from './authStore';

// export type ThemeColor = 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'light';

// import axios from 'axios';

// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000', // Your backend URL
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// interface ThemeState {
//   color: ThemeColor;
//   fontSize: 'small' | 'medium' | 'large';
//   darkMode: boolean;
//   setColor: (color: ThemeColor) => Promise<void>;
//   setFontSize: (size: 'small' | 'medium' | 'large') => Promise<void>;
//   toggleDarkMode: () => Promise<void>;
//   syncThemeWithProfile: () => Promise<void>;
// }

// export const useThemeStore = create<ThemeState>()(
//   persist(
//     (set, get) => ({
//       color: 'blue',
//       fontSize: 'medium',
//       darkMode: false,
      
//       setColor: async (color) => {
//         set({ color });
        
//         // Sync with profile if user is logged in
//         const { user } = useAuthStore.getState();
//         if (user) {
//           try {
//             await api.put(`/profiles/${user.id}/theme`, { color });
//           } catch (error) {
//             console.error("Failed to sync theme color with profile", error);
//           }
//         }
//       },
      
//       setFontSize: async (fontSize) => {
//         set({ fontSize });
        
//         // Sync with profile if user is logged in
//         const { user } = useAuthStore.getState();
//         if (user) {
//           try {
//             await api.put(`/profiles/${user.id}/theme`, { fontSize });
//           } catch (error) {
//             console.error("Failed to sync font size with profile", error);
//           }
//         }
//       },
      
//       toggleDarkMode: async () => {
//         const newDarkMode = !get().darkMode;
//         set({ darkMode: newDarkMode });
        
//         // Apply dark mode to body
//         if (newDarkMode) {
//           document.documentElement.classList.add('dark');
//         } else {
//           document.documentElement.classList.remove('dark');
//         }
        
//         // Sync with profile if user is logged in
//         const { user } = useAuthStore.getState();
//         if (user) {
//           try {
//             await api.put(`/profiles/${user.id}/theme`, { darkMode: newDarkMode });
//           } catch (error) {
//             console.error("Failed to sync dark mode with profile", error);
//           }
//         }
//       },
      
//       syncThemeWithProfile: async () => {
//         const { user } = useAuthStore.getState();
//         if (!user) return;
        
//         try {
//           const { data } = await api.get(`/profiles/${user.id}/theme`);
          
//           if (data) {
//             // Update theme state with profile settings
//             set({
//               color: data.color || 'blue',
//               fontSize: data.fontSize || 'medium',
//               darkMode: data.darkMode || false
//             });
            
//             // Apply dark mode
//             if (data.darkMode) {
//               document.documentElement.classList.add('dark');
//             } else {
//               document.documentElement.classList.remove('dark');
//             }
//           }
//         } catch (error) {
//           console.error("Failed to sync theme with profile", error);
//         }
//       }
//     }),
//     {
//       name: 'theme-storage',
//     }
//   )
// );

// export const getThemeColors = (color: ThemeColor) => {
//   const themes = {
//     blue: {
//       primary: '#1877f2',
//       hover: '#166fe5',
//       light: '#e7f3ff',
//     },
//     purple: {
//       primary: '#8e44ad',
//       hover: '#7d3c98',
//       light: '#f5eeff',
//     },
//     green: {
//       primary: '#27ae60',
//       hover: '#219955',
//       light: '#e6f7ef',
//     },
//     orange: {
//       primary: '#e67e22',
//       hover: '#d35400',
//       light: '#fff5eb',
//     },
//     pink: {
//       primary: '#e84393',
//       hover: '#d63384',
//       light: '#ffeef8',
//     },
//     light: {
//       primary: '#ffffff',
//       hover: '#f8f9fa',
//       light: '#ffffff',
//       outline: '#1877f2'
//     }
//   };
  
//   return themes[color];
// };



// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import axios from 'axios';
// import { useAuthStore } from './authStore';

// export type ThemeColor = 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'light';

// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000', // Your FastAPI backend URL
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// interface ThemeState {
//   color: ThemeColor;
//   fontSize: 'small' | 'medium' | 'large';
//   darkMode: boolean;
//   setColor: (color: ThemeColor) => Promise<void>;
//   setFontSize: (size: 'small' | 'medium' | 'large') => Promise<void>;
//   toggleDarkMode: () => Promise<void>;
//   syncThemeWithProfile: () => Promise<void>;
// }

// export const useThemeStore = create<ThemeState>()(
//   persist(
//     (set, get) => ({
//       color: 'blue',
//       fontSize: 'medium',
//       darkMode: false,

//       setColor: async (color) => {
//         set({ color });
//         try {
//           await api.post(`/auth/theme`, { toolbar_background: color });
//         } catch (error) {
//           console.error("Failed to update theme color in backend", error);
//         }
//       },

//       setFontSize: async (fontSize) => {
//         set({ fontSize });
//         try {
//           await api.post(`/auth/theme`, { font_size: fontSize });
//         } catch (error) {
//           console.error("Failed to update font size in backend", error);
//         }
//       },

//       // toggleDarkMode: async () => {
//       //   const newDarkMode = !get().darkMode;
//       //   set({ darkMode: newDarkMode });

//       //   if (newDarkMode) {
//       //     document.documentElement.classList.add('dark');
//       //   } else {
//       //     document.documentElement.classList.remove('dark');
//       //   }

//       //   try {
//       //     await api.post(`/auth/theme`, { dark_mode: newDarkMode });
//       //   } catch (error) {
//       //     console.error("Failed to update dark mode in backend", error);
//       //   }
//       // },

//       // toggleDarkMode: async () => { 
//       //   try {
//       //     const newDarkMode = !get().darkMode;
//       //     set({ darkMode: newDarkMode });
      
//       //     // Apply dark mode class to document
//       //     if (newDarkMode) {
//       //       document.documentElement.classList.add('dark');
//       //     } else {
//       //       document.documentElement.classList.remove('dark');
//       //     }
      
//       //     // Ensure correct API endpoint
//       //     await api.post(`/auth/theme`, { dark_mode: newDarkMode });
      
//       //   } catch (error) {
//       //     console.error("Failed to update dark mode in backend", error);
//       //     // Revert state in case of failure
//       //     set({ darkMode: !get().darkMode });
//       //   }
//       // },

//       toggleDarkMode: async () => { 
//         try {
//           const newDarkMode = !get().darkMode;
//           set({ darkMode: newDarkMode });
      
//           // Apply dark mode class to document
//           if (newDarkMode) {
//             document.documentElement.classList.add('dark');
//           } else {
//             document.documentElement.classList.remove('dark');
//           }
      
//           // Ensure correct API endpoint
//           await api.post(`/auth/theme`, { dark_mode: newDarkMode });
      
//         } catch (error) {
//           console.error("Failed to update dark mode in backend", error);
//           // Revert state in case of failure
//           set({ darkMode: !get().darkMode });
//         }
//       },
      
      
//     })
//   )
// );


// export const useThemeStore = create<ThemeState>()(
//   persist(
//     (set, get) => ({
//       color: 'blue',
//       fontSize: 'medium',
//       darkMode: false,
      
//       setColor: async (color) => {
//         set({ color });

//         try {
//           await api.post(`/auth/theme`, { toolbar_background: color });
//         } catch (error) {
//           console.error("Failed to update theme color in backend", error);
//         }
//       },
      
//       setFontSize: async (fontSize) => {
//         set({ fontSize });

//         try {
//           await api.post(`/auth/theme`, { font_size: fontSize });
//         } catch (error) {
//           console.error("Failed to update font size in backend", error);
//         }
//       },
      
//       toggleDarkMode: async () => {
//         const newDarkMode = !get().darkMode;
//         set({ darkMode: newDarkMode });

//         if (newDarkMode) {
//           document.documentElement.classList.add('dark');
//         } else {
//           document.documentElement.classList.remove('dark');
//         }

//         try {
//           await api.post(`/theme`, { dark_mode: newDarkMode });
//         } catch (error) {
//           console.error("Failed to update dark mode in backend", error);
//         }
//       },
      
//       syncThemeWithProfile: async () => {
//         try {
//           const { data } = await api.get(`/theme`);

//           if (data) {
//             set({
//               color: data.toolbar_background || 'blue',
//               fontSize: data.font_size || 'medium',
//               darkMode: data.dark_mode || false
//             });

//             if (data.dark_mode) {
//               document.documentElement.classList.add('dark');
//             } else {
//               document.documentElement.classList.remove('dark');
//             }
//           }
//         } catch (error) {
//           console.error("Failed to sync theme settings with backend", error);
//         }
//       }
//     }),
//     {
//       name: 'theme-storage',
//     }
//   )
// );

// export const getThemeColors = (color: ThemeColor) => {
//   const themes = {
//     blue: { primary: '#1877f2', hover: '#166fe5', light: '#e7f3ff' },
//     purple: { primary: '#8e44ad', hover: '#7d3c98', light: '#f5eeff' },
//     green: { primary: '#27ae60', hover: '#219955', light: '#e6f7ef' },
//     orange: { primary: '#e67e22', hover: '#d35400', light: '#fff5eb' },
//     pink: { primary: '#e84393', hover: '#d63384', light: '#ffeef8' },
//     light: { primary: '#ffffff', hover: '#f8f9fa', light: '#ffffff', outline: '#1877f2' },
//   };
  
//   return themes[color];
// };



// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import axios from 'axios';

// export type ThemeColor = 'blue' | 'purple' | 'green' | 'orange' | 'pink';

// // Create axios instance with base configuration
// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken'); // Retrieves token dynamically
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// interface ThemeState {
//   color: ThemeColor;
//   fontSize: 'small' | 'medium' | 'large';
//   darkMode: boolean;
//   isLoading: boolean;
//   error: string | null;
//   setColor: (color: ThemeColor) => Promise<void>;
//   setFontSize: (size: 'small' | 'medium' | 'large') => Promise<void>;
//   toggleDarkMode: () => Promise<void>;
//   initializeSettings: () => Promise<void>;
// }

// const DEFAULT_SETTINGS = {
//   color: 'blue' as ThemeColor,
//   fontSize: 'medium' as const,
//   darkMode: false,
//   isLoading: false,
//   error: null,
// };

// export const getThemeColors = (color: ThemeColor) => {
//   const colors = {
//     blue: {
//       primary: '#3B82F6',
//       light: '#EFF6FF',
//     },
//     purple: {
//       primary: '#8B5CF6',
//       light: '#F5F3FF',
//     },
//     green: {
//       primary: '#10B981',
//       light: '#ECFDF5',
//     },
//     orange: {
//       primary: '#F97316',
//       light: '#FFF7ED',
//     },
//     pink: {
//       primary: '#EC4899',
//       light: '#FDF2F8',
//     },
//   };
//   return colors[color];
// };

// export const useThemeStore = create<ThemeState>()(
//   persist(
//     (set, get) => ({
//       ...DEFAULT_SETTINGS,

//       initializeSettings: async () => {
//         set({ isLoading: true, error: null });
//         try {
//           const response = await api.get('/auth/theme');
//           const { toolbar_background: color, font_size: fontSize, dark_mode: darkMode } = response.data;
          
//           // Validate and set received settings, fallback to defaults if invalid
//           set({
//             color: color && ['blue', 'purple', 'green', 'orange', 'pink'].includes(color) 
//               ? color 
//               : DEFAULT_SETTINGS.color,
//             fontSize: fontSize && ['small', 'medium', 'large'].includes(fontSize) 
//               ? fontSize 
//               : DEFAULT_SETTINGS.fontSize,
//             darkMode: typeof darkMode === 'boolean' ? darkMode : DEFAULT_SETTINGS.darkMode,
//             isLoading: false,
//             error: null,
//           });

//           // Apply dark mode to document if needed
//           if (darkMode) {
//             document.documentElement.classList.add('dark');
//           } else {
//             document.documentElement.classList.remove('dark');
//           }
//         } catch (error) {
//           console.error('Failed to fetch theme settings:', error);
//           // On API failure, use defaults but don't show error to user
//           set({ 
//             ...DEFAULT_SETTINGS,
//             isLoading: false,
//             error: null
//           });
//         }
//       },

//       setColor: async (color: ThemeColor) => {
//         const previousColor = get().color;
//         set({ color, isLoading: true, error: null });
        
//         try {
//           await api.post('/auth/theme', { toolbar_background: color });
//           set({ isLoading: false });
//         } catch (error) {
//           console.error('Failed to update theme color:', error);
//           // Revert to previous color on error
//           set({ 
//             color: previousColor,
//             error: 'Failed to update theme color. Please try again.',
//             isLoading: false 
//           });
//         }
//       },

//       setFontSize: async (fontSize) => {
//         const previousSize = get().fontSize;
//         set({ fontSize, isLoading: true, error: null });
        
//         try {
//           await api.post('/auth/theme', { font_size: fontSize });
//           set({ isLoading: false });
//         } catch (error) {
//           console.error('Failed to update font size:', error);
//           // Revert to previous size on error
//           set({ 
//             fontSize: previousSize,
//             error: 'Failed to update font size. Please try again.',
//             isLoading: false 
//           });
//         }
//       },

//       toggleDarkMode: async () => {
//         const newMode = !get().darkMode;
//         const previousMode = get().darkMode;
        
//         set({ darkMode: newMode, isLoading: true, error: null });
        
//         // Update document class immediately for smooth transition
//         if (newMode) {
//           document.documentElement.classList.add('dark');
//         } else {
//           document.documentElement.classList.remove('dark');
//         }

//         try {
//           await api.post('/auth/theme', { dark_mode: newMode });
//           set({ isLoading: false });
//         } catch (error) {
//           console.error('Failed to update dark mode:', error);
//           // Revert to previous mode on error
//           set({ 
//             darkMode: previousMode,
//             error: 'Failed to update dark mode. Please try again.',
//             isLoading: false 
//           });
          
//           // Revert document class
//           if (previousMode) {
//             document.documentElement.classList.add('dark');
//           } else {
//             document.documentElement.classList.remove('dark');
//           }
//         }
//       },
//     }),
//     {
//       name: 'theme-storage',
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({
//         color: state.color,
//         fontSize: state.fontSize,
//         darkMode: state.darkMode,
//       }),
//     }
//   )
// );


// import { create } from 'zustand'; 
// import { persist, createJSONStorage } from 'zustand/middleware';
// import axios from 'axios';

// export type ThemeColor = 'blue' | 'purple' | 'green' | 'orange' | 'pink';

// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     const userId = localStorage.getItem('userId');

//     if (!token || !userId) {
//       window.location.href = '/login';
//       return Promise.reject('Authentication failed: Missing token or userId');
//     }

//     config.headers['Authorization'] = `Bearer ${token}`;

//     if (config.method === 'get') {
//       config.params = { ...config.params, user_id: userId };
//     } else if (config.method === 'post' || config.method === 'put') {
//       config.data = { ...(config.data || {}), user_id: userId }; // Ensure data exists before spreading
//     }

//     console.log('Final request payload:', config.data); // Debugging
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// interface ThemeState {
//   color: ThemeColor;
//   fontSize: 'small' | 'medium' | 'large';
//   darkMode: boolean;
//   isLoading: boolean;
//   error: string | null;
//   setColor: (color: ThemeColor) => Promise<void>;
//   setFontSize: (size: 'small' | 'medium' | 'large') => Promise<void>;
//   toggleDarkMode: () => Promise<void>;
//   initializeSettings: () => Promise<void>;
// }

// const DEFAULT_SETTINGS = {
//   color: 'blue' as ThemeColor,
//   fontSize: 'medium' as const,
//   darkMode: false,
//   isLoading: false,
//   error: null,
// };

// export const useThemeStore = create<ThemeState>()(
//   persist(
//     (set, get) => ({
//       ...DEFAULT_SETTINGS,

//       initializeSettings: async () => {
//         set({ isLoading: true, error: null });
//         const userId = localStorage.getItem('userId');
//         try {
//           const response = await api.get(`/auth/theme?user_id=${userId}`);
//           const { toolbar_background: color, font_size: fontSize, dark_mode: darkMode } = response.data;
          
//           set({
//             color: ['blue', 'purple', 'green', 'orange', 'pink'].includes(color) ? color : DEFAULT_SETTINGS.color,
//             fontSize: ['small', 'medium', 'large'].includes(fontSize) ? fontSize : DEFAULT_SETTINGS.fontSize,
//             darkMode: typeof darkMode === 'boolean' ? darkMode : DEFAULT_SETTINGS.darkMode,
//             isLoading: false,
//             error: null,
//           });

//           if (darkMode) {
//             document.documentElement.classList.add('dark');
//           } else {
//             document.documentElement.classList.remove('dark');
//           }
//         } catch (error) {
//           console.error('Failed to fetch theme settings:', error);
//           set({ ...DEFAULT_SETTINGS, isLoading: false, error: null });
//         }
//       },

//       setColor: async (color: ThemeColor) => {
//         const previousColor = get().color;
//         const userId = localStorage.getItem('userId');
        
//         console.log('Sending userId:', userId); // Debugging
        
//         set({ color, isLoading: true, error: null });
      
//         try {
//           await api.post('/auth/theme', { user_id: userId, toolbar_background: color });
//           set({ isLoading: false });
//         } catch (error) {
//           console.error('Failed to update theme color:', error);
//           set({ color: previousColor, error: 'Failed to update theme color. Please try again.', isLoading: false });
//         }
//       },
      

//       // setColor: async (color: ThemeColor) => {
//       //   const previousColor = get().color;
//       //   const userId = localStorage.getItem('userId');
//       //   set({ color, isLoading: true, error: null });
        
//       //   try {
//       //     await api.post('/auth/theme', { user_id: userId, toolbar_background: color });
//       //     set({ isLoading: false });
//       //   } catch (error) {
//       //     console.error('Failed to update theme color:', error);
//       //     set({ color: previousColor, error: 'Failed to update theme color. Please try again.', isLoading: false });
//       //   }
//       // },

//       setFontSize: async (fontSize) => {
//         const previousSize = get().fontSize;
//         const userId = localStorage.getItem('userId');
//         set({ fontSize, isLoading: true, error: null });
        
//         try {
//           await api.post('/auth/theme', { user_id: userId, font_size: fontSize });
//           set({ isLoading: false });
//         } catch (error) {
//           console.error('Failed to update font size:', error);
//           set({ fontSize: previousSize, error: 'Failed to update font size. Please try again.', isLoading: false });
//         }
//       },

//       toggleDarkMode: async () => {
//         const newMode = !get().darkMode;
//         const previousMode = get().darkMode;
//         const userId = localStorage.getItem('userId');
//         set({ darkMode: newMode, isLoading: true, error: null });

//         if (newMode) {
//           document.documentElement.classList.add('dark');
//         } else {
//           document.documentElement.classList.remove('dark');
//         }

//         try {
//           await api.post('/auth/theme', { user_id: userId, dark_mode: newMode });
//           set({ isLoading: false });
//         } catch (error) {
//           console.error('Failed to update dark mode:', error);
//           set({ darkMode: previousMode, error: 'Failed to update dark mode. Please try again.', isLoading: false });
          
//           if (previousMode) {
//             document.documentElement.classList.add('dark');
//           } else {
//             document.documentElement.classList.remove('dark');
//           }
//         }
//       },
//     }),
//     {
//       name: 'theme-storage',
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({
//         color: state.color,
//         fontSize: state.fontSize,
//         darkMode: state.darkMode,
//       }),
//     }
//   )
// );


// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import axios from 'axios';

// export type ThemeColor = 'blue' | 'purple' | 'green' | 'orange' | 'pink';

// // Create axios instance with base configuration
// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     const userId = localStorage.getItem('userId');

//     if (!token || !userId) {
//       window.location.href = '/login';
//       return Promise.reject('Authentication failed: Missing token or userId');
//     }

//     config.headers['Authorization'] = `Bearer ${token}`;

//     if (config.method === 'get') {
//       config.params = { ...config.params, user_id: userId };
//     } else if (config.method === 'post' || config.method === 'put') {
//       config.data = { ...(config.data || {}), user_id: userId };
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// interface ThemeState {
//   color: ThemeColor;
//   fontSize: 'small' | 'medium' | 'large';
//   darkMode: boolean;
//   isLoading: boolean;
//   error: string | null;
//   setColor: (color: ThemeColor) => Promise<void>;
//   setFontSize: (size: 'small' | 'medium' | 'large') => Promise<void>;
//   toggleDarkMode: () => Promise<void>;
//   initializeSettings: () => Promise<void>;
// }

// const DEFAULT_SETTINGS = {
//   color: 'blue' as ThemeColor,
//   fontSize: 'medium' as const,
//   darkMode: false,
//   isLoading: false,
//   error: null,
// };

// export const getThemeColors = (color: ThemeColor) => {
//   const colors = {
//     blue: {
//       primary: '#3B82F6',
//       light: '#EFF6FF',
//     },
//     purple: {
//       primary: '#8B5CF6',
//       light: '#F5F3FF',
//     },
//     green: {
//       primary: '#10B981',
//       light: '#ECFDF5',
//     },
//     orange: {
//       primary: '#F97316',
//       light: '#FFF7ED',
//     },
//     pink: {
//       primary: '#EC4899',
//       light: '#FDF2F8',
//     },
//   };
//   return colors[color];
// };

// export const useThemeStore = create<ThemeState>()(
//   persist(
//     (set, get) => ({
//       ...DEFAULT_SETTINGS,

//       initializeSettings: async () => {
//         set({ isLoading: true, error: null });
//         const userId = localStorage.getItem('userId');
//         try {
//           const response = await api.get(`/auth/theme/${userId}`);
//           const { toolbar_background: color, font_size: fontSize, dark_mode: darkMode } = response.data;
          
//           set({
//             color: ['blue', 'purple', 'green', 'orange', 'pink'].includes(color) ? color : DEFAULT_SETTINGS.color,
//             fontSize: ['small', 'medium', 'large'].includes(fontSize) ? fontSize : DEFAULT_SETTINGS.fontSize,
//             darkMode: typeof darkMode === 'boolean' ? darkMode : DEFAULT_SETTINGS.darkMode,
//             isLoading: false,
//             error: null,
//           });

//           if (darkMode) {
//             document.documentElement.classList.add('dark');
//           } else {
//             document.documentElement.classList.remove('dark');
//           }
//         } catch (error) {
//           console.error('Failed to fetch theme settings:', error);
//           set({ ...DEFAULT_SETTINGS, isLoading: false, error: null });
//         }
//       },

//       setColor: async (color: ThemeColor) => {
//         const previousColor = get().color;
//         const userId = localStorage.getItem('userId');
//         set({ color, isLoading: true, error: null });
        
//         try {
//           await api.post('/auth/theme', { user_id: userId, toolbar_background: color });
//           set({ isLoading: false });
//         } catch (error) {
//           console.error('Failed to update theme color:', error);
//           set({ color: previousColor, error: 'Failed to update theme color. Please try again.', isLoading: false });
//         }
//       },

//       setFontSize: async (fontSize) => {
//         const previousSize = get().fontSize;
//         const userId = localStorage.getItem('userId');
//         set({ fontSize, isLoading: true, error: null });
        
//         try {
//           await api.post('/auth/theme', { user_id: userId, font_size: fontSize });
//           set({ isLoading: false });
//         } catch (error) {
//           console.error('Failed to update font size:', error);
//           set({ fontSize: previousSize, error: 'Failed to update font size. Please try again.', isLoading: false });
//         }
//       },

//       toggleDarkMode: async () => {
//         const newMode = !get().darkMode;
//         const previousMode = get().darkMode;
//         const userId = localStorage.getItem('userId');
//         set({ darkMode: newMode, isLoading: true, error: null });

//         if (newMode) {
//           document.documentElement.classList.add('dark');
//         } else {
//           document.documentElement.classList.remove('dark');
//         }

//         try {
//           await api.post('/auth/theme', { user_id: userId, dark_mode: newMode });
//           set({ isLoading: false });
//         } catch (error) {
//           console.error('Failed to update dark mode:', error);
//           set({ darkMode: previousMode, error: 'Failed to update dark mode. Please try again.', isLoading: false });
          
//           if (previousMode) {
//             document.documentElement.classList.add('dark');
//           } else {
//             document.documentElement.classList.remove('dark');
//           }
//         }
//       },
//     }),
//     {
//       name: 'theme-storage',
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({
//         color: state.color,
//         fontSize: state.fontSize,
//         darkMode: state.darkMode,
//       }),
//     }
//   )
// );



import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

export type ThemeColor = 'blue' | 'purple' | 'green' | 'orange' | 'pink';
// import api from '../lib/api';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      window.location.href = '/signin';
      return Promise.reject('Authentication failed: Missing token or userId');
    }

    config.headers['Authorization'] = `Bearer ${token}`;

    if (config.method === 'get') {
      config.params = { ...config.params, user_id: userId };
    } else if (config.method === 'post' || config.method === 'put') {
      config.data = { ...(config.data || {}), user_id: userId };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

interface ThemeState {
  color: ThemeColor;
  fontSize: 'small' | 'medium' | 'large';
  darkMode: boolean;
  isLoading: boolean;
  error: string | null;
  setColor: (color: ThemeColor) => Promise<void>;
  setFontSize: (size: 'small' | 'medium' | 'large') => Promise<void>;
  toggleDarkMode: () => Promise<void>;
  initializeSettings: () => Promise<void>;
  resetToDefaults: () => void;
}

const DEFAULT_SETTINGS = {
  color: 'blue' as ThemeColor,
  fontSize: 'medium' as const,
  darkMode: false,
  isLoading: false,
  error: null,
};

export const getThemeColors = (color: ThemeColor) => {
  const colors = {
    blue: {
      primary: '#3B82F6',
      light: '#EFF6FF',
    },
    purple: {
      primary: '#8B5CF6',
      light: '#F5F3FF',
    },
    green: {
      primary: '#10B981',
      light: '#ECFDF5',
    },
    orange: {
      primary: '#F97316',
      light: '#FFF7ED',
    },
    pink: {
      primary: '#EC4899',
      light: '#FDF2F8',
    },
  };
  return colors[color];
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_SETTINGS,

      resetToDefaults: () => {
        set(DEFAULT_SETTINGS);
        document.documentElement.classList.remove('dark');
        localStorage.removeItem('theme-storage');
      },

      initializeSettings: async () => {
        set({ isLoading: true, error: null });
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('authToken');

        // If not logged in, use default settings
        if (!userId || !token) {
          get().resetToDefaults();
          return;
        }

        try {
          // Fixed: Removed userId from URL path, using only query parameter
          // const response = await api.get('/auth/theme', {
          //   params: { user_id: userId }
          // });
          const response = await api.get(`/auth/theme/${userId}`);

          
          const { toolbar_background: color, font_size: fontSize, dark_mode: darkMode } = response.data;
          
          // Only update if we got valid values from the API
          const newSettings = {
            color: ['blue', 'purple', 'green', 'orange', 'pink'].includes(color) ? color : get().color,
            fontSize: ['small', 'medium', 'large'].includes(fontSize) ? fontSize : get().fontSize,
            darkMode: typeof darkMode === 'boolean' ? darkMode : get().darkMode,
            isLoading: false,
            error: null,
          };

          set(newSettings);

          if (newSettings.darkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        } catch (error) {
          console.error('Failed to fetch theme settings:', error);
          // On API error, keep the persisted settings from localStorage if they exist
          const persistedSettings = localStorage.getItem('theme-storage');
          if (persistedSettings) {
            const { state } = JSON.parse(persistedSettings);
            set({ 
              ...state,
              isLoading: false,
              error: 'Failed to fetch theme settings from server. Using saved preferences.'
            });
          } else {
            // If no persisted settings, use defaults
            set({ ...DEFAULT_SETTINGS, error: 'Failed to fetch theme settings' });
          }
        }
      },

      setColor: async (color: ThemeColor) => {
        const previousColor = get().color;
        const userId = localStorage.getItem('userId');
        set({ color, isLoading: true, error: null });
        
        try {
          await api.post('/auth/theme', { user_id: userId, toolbar_background: color });
          set({ isLoading: false });
        } catch (error) {
          console.error('Failed to update theme color:', error);
          set({ color: previousColor, error: 'Failed to update theme color. Please try again.', isLoading: false });
        }
      },

      setFontSize: async (fontSize) => {
        const previousSize = get().fontSize;
        const userId = localStorage.getItem('userId');
        set({ fontSize, isLoading: true, error: null });
        
        try {
          await api.post('/auth/theme', { user_id: userId, font_size: fontSize });
          set({ isLoading: false });
        } catch (error) {
          console.error('Failed to update font size:', error);
          set({ fontSize: previousSize, error: 'Failed to update font size. Please try again.', isLoading: false });
        }
      },

      toggleDarkMode: async () => {
        const newMode = !get().darkMode;
        const previousMode = get().darkMode;
        const userId = localStorage.getItem('userId');
        set({ darkMode: newMode, isLoading: true, error: null });

        if (newMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

        try {
          await api.post('/auth/theme', { user_id: userId, dark_mode: newMode });
          set({ isLoading: false });
        } catch (error) {
          console.error('Failed to update dark mode:', error);
          set({ darkMode: previousMode, error: 'Failed to update dark mode. Please try again.', isLoading: false });
          
          if (previousMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        color: state.color,
        fontSize: state.fontSize,
        darkMode: state.darkMode,
      }),
    }
  )
);



