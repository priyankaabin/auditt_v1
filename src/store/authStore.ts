// import { create } from 'zustand';
// // import { api } from '../lib/api';
// import { User } from '../types/api';


// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',  // Your backend URL
//   // headers: {
//   //   'Content-Type': 'application/json',
//   // },
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;  // Add token to Authorization header
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// interface AuthState {
//   user: User | null;
//   isAdmin: boolean;
//   setUser: (user: User | null) => void;
//   setIsAdmin: (isAdmin: boolean) => void;
//   checkAdminStatus: () => Promise<boolean>;
//   login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
//   logout: () => Promise<void>;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   isAdmin: false,
  
//   setUser: (user) => set({ user }),
  
//   setIsAdmin: (isAdmin) => set({ isAdmin }),
  
//   checkAdminStatus: async () => {
//     const { user } = useAuthStore.getState();
//     if (!user) return false;

//     try {
//       const { data } = await api.get('/auth/check-admin');
//       const isAdmin = data?.isAdmin || false;
//       set({ isAdmin });
//       return isAdmin;
//     } catch (error) {
//       return false;
//     }
//   },

//   login: async (username: string, password: string) => {
//     try {
//       // Send the request to the backend API
//       const response = await api.post('/auth/signin', { username, password });
//       const data = response.data;
  
//       if (data && data.token) {
//         // Store token and user data in localStorage
//         localStorage.setItem('authToken', data.token);  // Store the JWT token
//         localStorage.setItem('username', data.user.username);  // Store username
//         localStorage.setItem('isAdmin', data.user.isAdmin.toString());  // Store isAdmin as string for localStorage

//         console.log("User ID received:", data.user.id);  // ✅ Log userId
//             localStorage.setItem('userId', data.user.id);  // Store userId in localStorage
  
//         // Set the store state
//         set({ 
//           user: data.user,
//           isAdmin: data.user.isAdmin || false  // Ensure it's always a boolean
//         });
  
//         return { success: true, message: 'Sign-in successful' };
//       }
  
//       return { success: false, error: 'Invalid credentials' };
  
//     } catch (error: any) {
//       console.error("Login Error:", error);  // Log for debugging
//       return { 
//         success: false, 
//         error: error.response?.data?.error || 'Failed to login'
//       };
//     }
//   },

//   // login: async (username: string, password: string) => {
//   //   try {
//   //     // Send the request to the backend API
//   //     const response = await api.post('/auth/signin', { username, password });
//   //     const data = response.data;
  
//   //     if (data && data.token) {
//   //       // Store token and user data in localStorage
//   //       localStorage.setItem('authToken', data.token);  // Store the JWT token
//   //       localStorage.setItem('username', data.user.username);  // Store username
//   //       localStorage.setItem('isAdmin', data.user.isAdmin.toString());  // Store isAdmin as string for localStorage
  
//   //       // Set the store state
//   //       set({ 
//   //         user: data.user,
//   //         isAdmin: data.user.isAdmin || false  // Ensure it's always a boolean
//   //       });
  
//   //       return { success: true, message: 'Sign-in successful' };
//   //     }
  
//   //     return { success: false, error: 'Invalid credentials' };
  
//   //   } catch (error: any) {
//   //     console.error("Login Error:", error);  // Log for debugging
//   //     return { 
//   //       success: false, 
//   //       error: error.response?.data?.error || 'Failed to login'
//   //     };
//   //   }
//   // },
  
//   // login: async (username: string, password: string) => {
//   //   try {
//   //     // Remove the `withCredentials: true` property
//   //     const response = await api.post('/auth/signin', { 
//   //       username,  
//   //       password 
//   //     });
  
//   //     const data = response.data;
  
//   //     if (data && data.token) {
//   //       localStorage.setItem('authToken', data.token); // Store JWT token
  
//   //       set({ 
//   //         user: data,
//   //         isAdmin: data.isAdmin || false  // Ensure it's always a boolean
//   //       });
  
//   //       return { success: true };
//   //     }
  
//   //     return { success: false, error: 'Invalid credentials' };
  
//   //   } catch (error: any) {
//   //     console.error("Login Error:", error);  // Debugging in console
  
//   //     return { 
//   //       success: false, 
//   //       error: error.response?.data?.error || 'Failed to login'
//   //     };
//   //   }
//   // },
  
// //   login: async (username: string, password: string) => {
// //     try {
// //       const response = await api.post('/auth/signin', { 
// //         username,  
// //         password 
// //       }, { withCredentials: true });  // Ensures cookies/session handling

// //       const data = response.data;

// //       if (data && data.token) {
// //         localStorage.setItem('authToken', data.token); // Store JWT token

// //         set({ 
// //           user: data,
// //           isAdmin: data.isAdmin || false  // Ensure it's always a boolean
// //         });

// //         return { success: true };
// //       }

// //       return { success: false, error: 'Invalid credentials' };

// //     } catch (error: any) {
// //       console.error("Login Error:", error);  // Debugging in console

// //       return { 
// //         success: false, 
// //         error: error.response?.data?.error || 'Failed to login'
// //       };
// //     }
// // },


//   // login: async (username: string, password: string) => {
//   //   try {
//   //     const { data } = await api.post('/auth/signin', { 
//   //       username,  // Use username instead of email
//   //       password 
//   //     }, {
//   //       withCredentials: true  // Include credentials (cookies) with request
//   //     });
    
//   //     if (data) {
//   //       // Assuming the response contains the token in the data
//   //       localStorage.setItem('authToken', data.token); // Store JWT token
//   //       set({ 
//   //         user: data,
//   //         isAdmin: data.isAdmin
//   //       });
//   //       return { success: true };
//   //     }
    
//   //     return { 
//   //       success: false, 
//   //       error: 'Invalid credentials'
//   //     };
//   //   } catch (error: any) {
//   //     return { 
//   //       success: false, 
//   //       error: error.response?.data?.error || 'Failed to login'
//   //     };
//   //   }
//   // },
  
//   // login: async (username: string, password: string) => {
//   //   try {
//   //     // Send username and password in the body, and ensure credentials are included if using cookies
//   //     const { data } = await api.post('/auth/signin', { 
//   //       username,  // Use username instead of email
//   //       password 
//   //     }, {
//   //       withCredentials: true  // Include credentials (cookies) with request
//   //     });
  
//   //     if (data) {
//   //       set({ 
//   //         user: data,
//   //         isAdmin: data.isAdmin
//   //       });
//   //       return { success: true };
//   //     }
  
//   //     return { 
//   //       success: false, 
//   //       error: 'Invalid credentials'
//   //     };
//   //   } catch (error: any) {
//   //     return { 
//   //       success: false, 
//   //       error: error.response?.data?.error || 'Failed to login'
//   //     };
//   //   }
//   // },
  

//   // login: async (username: string, password: string) => {
//   //   try {
//   //     const { data } = await api.post('/auth/signin', { 
//   //       username,  // Use username instead of email
//   //       password 
//   //     });
  
//   //     if (data) {
//   //       set({ 
//   //         user: data,
//   //         isAdmin: data.isAdmin
//   //       });
//   //       return { success: true };
//   //     }
  
//   //     return { 
//   //       success: false, 
//   //       error: 'Invalid credentials'
//   //     };
//   //   } catch (error: any) {
//   //     return { 
//   //       success: false, 
//   //       error: error.response?.data?.error || 'Failed to login'
//   //     };
//   //   }
//   // },
  

//   // login: async (email: string, password: string) => {
//   //   try {
//   //     const { data } = await api.post('/auth/signin', { 
//   //       email, 
//   //       password 
//   //     });

//   //     if (data) {
//   //       set({ 
//   //         user: data,
//   //         isAdmin: data.isAdmin
//   //       });
//   //       return { success: true };
//   //     }

//   //     return { 
//   //       success: false, 
//   //       error: 'Invalid credentials'
//   //     };
//   //   } catch (error: any) {
//   //     return { 
//   //       success: false, 
//   //       error: error.response?.data?.error || 'Failed to login'
//   //     };
//   //   }
//   // },

//   logout: async () => {
//     try {
//       await api.post('/auth/logout');
//     } finally {
//       set({ user: null, isAdmin: false });
//     }
//   }
// }));


// import { create } from 'zustand';
// import axios from 'axios';
// import { User } from '../types/api';
// import { useThemeStore } from './themeStore';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
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

// interface AuthState {
//   user: User | null;
//   isAdmin: boolean;
//   setUser: (user: User | null) => void;
//   setIsAdmin: (isAdmin: boolean) => void;
//   checkAdminStatus: () => Promise<boolean>;
//   login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
//   logout: () => Promise<void>;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   isAdmin: false,
  
//   setUser: (user) => set({ user }),
  
//   setIsAdmin: (isAdmin) => set({ isAdmin }),
  
//   checkAdminStatus: async () => {
//     const { user } = useAuthStore.getState();
//     if (!user) return false;

//     try {
//       const { data } = await api.get('/auth/check-admin');
//       const isAdmin = data?.isAdmin || false;
//       set({ isAdmin });
//       return isAdmin;
//     } catch (error) {
//       return false;
//     }
//   },

//   login: async (username: string, password: string) => {
//     try {
//       const response = await api.post('/auth/signin', { username, password });
//       const data = response.data;
  
//       if (data && data.token) {
//         // Store token and user data in localStorage
//         localStorage.setItem('authToken', data.token);
//         localStorage.setItem('username', data.user.username);
//         localStorage.setItem('isAdmin', data.user.isAdmin.toString());
//         localStorage.setItem('userId', data.user.id);
  
//         // Set the store state
//         set({ 
//           user: data.user,
//           isAdmin: data.user.isAdmin || false
//         });

//         // Initialize theme settings immediately after successful login
//         const initializeTheme = useThemeStore.getState().initializeSettings;
//         await initializeTheme();
  
//         return { success: true, message: 'Sign-in successful' };
//       }
  
//       return { success: false, error: 'Invalid credentials' };
  
//     } catch (error: any) {
//       console.error("Login Error:", error);
//       return { 
//         success: false, 
//         error: error.response?.data?.error || 'Failed to login'
//       };
//     }
//   },

//   logout: async () => {
//     try {
//       await api.post('/auth/logout');
//     } finally {
//       // Reset theme store to defaults
//       useThemeStore.getState().resetToDefaults();
//       // Clear auth state
//       set({ user: null, isAdmin: false });
//       // Clear localStorage
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('username');
//       localStorage.removeItem('isAdmin');
//       localStorage.removeItem('userId');
//     }
//   }
// }));


// import { create } from 'zustand';
// import axios from 'axios';
// import { User } from '../types/api';
// import { useThemeStore } from './themeStore';
// // import api from '../lib/api';
// // import { default as api } from '../lib/api';


// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
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

// interface AuthState {
//   user: User | null;
//   isAdmin: boolean;
//   setUser: (user: User | null) => void;
//   setIsAdmin: (isAdmin: boolean) => void;
//   checkAdminStatus: () => Promise<boolean>;
//   login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
//   logout: () => Promise<void>;
// }





// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   isAdmin: false,
  
//   setUser: (user) => set({ user }),
  
//   setIsAdmin: (isAdmin) => set({ isAdmin }),
  
//   checkAdminStatus: async () => {
//     const { user } = useAuthStore.getState();
//     if (!user) return false;

//     try {
//       const { data } = await api.get('/auth/check-admin');
//       const isAdmin = data?.isAdmin || false;
//       set({ isAdmin });
//       return isAdmin;
//     } catch (error) {
//       return false;
//     }
//   },
// //   login: async (username: string, password: string, rememberMe: boolean = false) => { 
// //     try {
// //         const response = await api.post('/auth/signin', { username, password, remember_me: rememberMe });
// //         const data = response.data;

// //         if (data && data.token) {
// //             console.log("Token from API:", data.token); // ✅ Log token

// //             if (rememberMe) {
// //                 localStorage.setItem('authToken', data.token);
// //                 console.log("Stored in Local Storage:", localStorage.getItem('authToken')); // ✅ Check after setting
// //             } else {
// //                 sessionStorage.setItem('authToken', data.token);
// //                 console.log("Stored in Session Storage:", sessionStorage.getItem('authToken')); // ✅ Check after setting
// //             }

// //             localStorage.setItem('username', data.user.username);
// //             localStorage.setItem('isAdmin', data.user.isAdmin.toString());
// //             localStorage.setItem('userId', data.user.id);

// //             set({ 
// //                 user: data.user,
// //                 isAdmin: data.user.isAdmin || false
// //             });

// //             return { success: true, message: 'Sign-in successful' };
// //         }

// //         return { success: false, error: 'Invalid credentials' };

// //     } catch (error: any) {
// //         console.error("Login Error:", error);
// //         return { success: false, error: 'Failed to login' };
// //     }
// // },


//   login: async (username: string, password: string, rememberMe: boolean = false) => { 
//     try {
//         const response = await api.post('/auth/signin', { username, password, remember_me: rememberMe });
//         const data = response.data;
    
//         if (data && data.token) {
//             localStorage.setItem('authToken', data.token);
//             localStorage.setItem('username', data.user.username);
//             localStorage.setItem('isAdmin', data.user.isAdmin.toString());
//             localStorage.setItem('userId', data.user.id);
    
//             set({ 
//                 user: data.user,
//                 isAdmin: data.user.isAdmin || false
//             });

//             const initializeTheme = useThemeStore.getState().initializeSettings;
//             await initializeTheme();
    
//             return { success: true, message: 'Sign-in successful' };
//         }
    
//         return { success: false, error: 'Invalid credentials' };
    
//     } catch (error: any) {
//         console.error("Login Error:", error);

//         // Extract the error message and remove "400: " if present
//         let errorMessage = error.response?.data?.detail || 'Failed to login';
//         errorMessage = errorMessage.replace(/^400:\s*/, ''); // Remove "400: " prefix

//         return { 
//             success: false, 
//             error: errorMessage
//         };
//     }
// },


//   // login: async (username: string, password: string, rememberMe: boolean = false) => {
//   //   try {
//   //     const response = await api.post('/auth/signin', { username, password, remember_me: rememberMe });
//   //     const data = response.data;
  
//   //     if (data && data.token) {
//   //       // Store token and user data in localStorage
//   //       localStorage.setItem('authToken', data.token);
//   //       localStorage.setItem('username', data.user.username);
//   //       localStorage.setItem('isAdmin', data.user.isAdmin.toString());
//   //       localStorage.setItem('userId', data.user.id);
  
//   //       // Set the store state
//   //       set({ 
//   //         user: data.user,
//   //         isAdmin: data.user.isAdmin || false
//   //       });

//   //       // Initialize theme settings immediately after successful login
//   //       const initializeTheme = useThemeStore.getState().initializeSettings;
//   //       await initializeTheme();
  
//   //       return { success: true, message: 'Sign-in successful' };
//   //     }
  
//   //     return { success: false, error: 'Invalid credentials' };
  
//   //   } catch (error: any) {
//   //     console.error("Login Error:", error);
//   //     return { 
//   //       success: false, 
//   //       error: error.response?.data?.error || 'Failed to login'
//   //     };
//   //   }
//   // },

//   logout: async () => {
//     try {
//       await api.post('/auth/logout');
//     } finally {
//       // Reset theme store to defaults
//       useThemeStore.getState().resetToDefaults();
//       // Clear auth state
//       set({ user: null, isAdmin: false });
//       // Clear localStorage
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('username');
//       localStorage.removeItem('isAdmin');
//       localStorage.removeItem('userId');
//     }
//   }
// }));




import { create } from 'zustand';
import axios from 'axios';
import { User } from '../types/api';
import { useThemeStore } from './themeStore';
import bcrypt from 'bcryptjs';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
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

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  checkAdminStatus: () => Promise<boolean>;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

// Load stored user from localStorage
const loadUserFromStorage = (): { user: User | null; isAdmin: boolean } => {
  const token = localStorage.getItem('authToken');
  if (!token) return { user: null, isAdmin: false };

  try {
    const user = {
      id: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      isAdmin: localStorage.getItem('isAdmin') === 'true',
    } as User;
    return { user, isAdmin: user.isAdmin };
  } catch (error) {
    console.error('Error loading user from storage:', error);
    return { user: null, isAdmin: false };
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  ...loadUserFromStorage(),

  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem('userId', user.id.toString());
      localStorage.setItem('username', user.username);
      localStorage.setItem('isAdmin', user.isAdmin.toString());
    }
  },

  setIsAdmin: (isAdmin) => set({ isAdmin }),

  checkAdminStatus: async () => {
    const { user } = useAuthStore.getState();
    if (!user) return false;

    try {
      const { data } = await api.get('/auth/check-admin');
      const isAdmin = data?.isAdmin || false;
      set({ isAdmin });
      return isAdmin;
    } catch (error) {
      return false;
    }
  },

  // login: async (username: string, password: string, rememberMe: boolean = false) => { 
  //   try {
  //       const response = await api.post('/auth/signin', { username, password, remember_me: rememberMe });
  //       const data = response.data;
    
  //       if (data && data.token) {
  //           localStorage.setItem('authToken', data.token);
  //           localStorage.setItem('username', data.user.username);
  //           localStorage.setItem('isAdmin', data.user.isAdmin.toString());
  //           localStorage.setItem('userId', data.user.id);
    
  //           set({ 
  //               user: data.user,
  //               isAdmin: data.user.isAdmin || false
  //           });

  //           const initializeTheme = useThemeStore.getState().initializeSettings;
  //           await initializeTheme();
    
  //           return { success: true, message: 'Sign-in successful' };
  //       }
    
  //       return { success: false, error: 'Invalid credentials' };
    
  //   } catch (error: any) {
  //       console.error("Login Error:", error);

  //       let errorMessage = error.response?.data?.detail || 'Failed to login';
  //       errorMessage = errorMessage.replace(/^400:\s*/, ''); 

  //       return { 
  //           success: false, 
  //           error: errorMessage
  //       };
  //   }
  // },



//   login: async (username: string, password: string, rememberMe: boolean = false) => { 
//     try {
       
//         const response = await api.post('/auth/signin', { 
//             username, 
//             password,  // Send raw password
//             remember_me: rememberMe 
//         });

//         const data = response.data;
    
//         if (data && data.token) {
//             localStorage.setItem('authToken', data.token);
//             localStorage.setItem('username', data.user.username);
//             localStorage.setItem('isAdmin', data.user.isAdmin.toString());
//             localStorage.setItem('userId', data.user.id);
    
//             set({ 
//                 user: data.user,
//                 isAdmin: data.user.isAdmin || false
//             });

//             const initializeTheme = useThemeStore.getState().initializeSettings;
//             await initializeTheme();
    
//             return { success: true, message: 'Sign-in successful' };
//         }
    
//         return { success: false, error: 'Invalid credentials' };
    
//     } catch (error: any) {
//         console.error("Login Error:", error);

//         let errorMessage = error.response?.data?.detail || 'Failed to login';
//         errorMessage = errorMessage.replace(/^400:\s*/, ''); 

//         return { 
//             success: false, 
//             error: errorMessage
//         };
//     }
// }, 


login: async (username: string, password: string, rememberMe: boolean = false) => { 
  try {
     
      const response = await api.post('/auth/signin', { 
          username, 
          password,  // Send plain password
          remember_me: rememberMe 
      });

      const data = response.data;
  
      if (data && data.token) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('username', data.user.username);
          localStorage.setItem('isAdmin', data.user.isAdmin.toString());
          localStorage.setItem('userId', data.user.id);
  
          set({ 
              user: data.user,
              isAdmin: data.user.isAdmin || false
          });

          const initializeTheme = useThemeStore.getState().initializeSettings;
          await initializeTheme();
  
          return { success: true, message: 'Sign-in successful' };
      }
  
      return { success: false, error: 'Invalid credentials' };
  
  } catch (error: any) {
      console.error("Login Error:", error);

      let errorMessage = error.response?.data?.detail || 'Failed to login';
      errorMessage = errorMessage.replace(/^400:\s*/, ''); 

      return { 
          success: false, 
          error: errorMessage
      };
  }
},


  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      useThemeStore.getState().resetToDefaults();
      set({ user: null, isAdmin: false });

      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('userId');
    }
  }
}));
