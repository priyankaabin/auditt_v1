
import { Profile } from '../types/api';

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', 
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});
// Expected return type from fetchUserPosts
interface FetchUserPostsResponse {
  posts: Post[];
  hasMore: boolean;
}



export const ProfileService = {
  
getProfile: async (userId: string) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/signin';
      return null;
    }

    const { data } = await api.get(`/auth/profile/${userId}`, {  // ✅ Fix the endpoint here
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return data;
  

} catch (error) {
  if (error.response?.status === 401) {
    console.log("Token expired! Logging out...");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId"); // Ensure userId is also removed

    setTimeout(() => {
      window.location.href = "/signin";
    }, 0);
  } else {
    console.error('Error fetching profile:', error);
  }

  return null;
  }
},


  getProfileImage: async (userId: string) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = '/signin';
        return null;
      }
  
      const response = await api.get<Blob>(`/auth/get-profile-image/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        responseType: 'blob', // Ensure response is treated as an image blob
      });
  
      return URL.createObjectURL(response.data); // Convert the blob to an image URL
    

  } catch (error) {
    if (error.response?.status === 401) {
      console.log("Token expired! Logging out...");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId"); // Ensure userId is also removed

      setTimeout(() => {
        window.location.href = "/signin";
      }, 0);
    } else {
      console.error('Error fetching profile image:', error);
    }

    return null;
    }
  },


  


//   updateProfile: async (userId: string, profileData: any) => {
//     try {
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//             window.location.href = '/signin';
//             return null;
//         }

//         const response = await api.put(`/auth/profile/${userId}`, profileData, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         // window.location.href = '/'; 
//         navigate('/'); 
//         return response.data; // Return success message or updated user data
   
//   } catch (error) {
//     if (error.response?.status === 401) {
//       console.log("Token expired! Logging out...");
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("userId"); // Ensure userId is also removed

//       setTimeout(() => {
//         window.location.href = "/signin";
//       }, 0);
//     } else {
//       console.error('Error updating profile:', error);
//     }
//         return null;
//     }
// },


updateProfile: async (userId: string, profileData: any) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/signin';
      return null;
    }

    const response = await api.put(`/auth/profile/${userId}`, profileData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data; // ✅ Return updated profile info
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log("Token expired! Logging out...");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      setTimeout(() => {
        window.location.href = "/signin";
      }, 0);
    } else {
      console.error('Error updating profile:', error);
    }
    return null;
  }
},



  


  uploadAvatar: async (file: File) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/signin';
      return null;
    }

    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await api.post('/auth/upload-profile-image', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data.avatarUrl;  // Adjust this based on your response
   
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("Token expired! Logging out...");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId"); // Ensure userId is also removed

      setTimeout(() => {
        window.location.href = "/signin";
      }, 0);
    } else {
      console.error('Error uploading avatar:', error);
    }

    throw new Error('Failed to upload avatar');}
  },

  fetchUserPosts: async (userId: string) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = '/signin';
        return null;
      }

      // Send the userId as a query parameter to match the backend route
      const { data } = await api.get(`/auth/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: {
          user_id: userId,  // Passing userId as a query parameter
        },
      });

      // Ensure we always return an array
      return Array.isArray(data) ? data : [];

    }catch (error) {
        if (error.response?.status === 401) {
          console.log("Token expired! Logging out...");
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId"); // Ensure userId is also removed
    
          setTimeout(() => {
            window.location.href = "/signin";
          }, 0);
        } else {
          console.error('Error fetching user posts:', error);
        }
    // } catch (error) {
    //   console.error('Error fetching user posts:', error);
      return [];
    }
  },

  // fetchUserPosts: async (userId: string) => {
  //   try {
  //     const token = localStorage.getItem('authToken');
  //     if (!token) {
  //       window.location.href = '/signin';
  //       return null;
  //     }

  //     // Send the userId as a query parameter to match the backend route
  //     const { data } = await api.get(`/auth/posts/user`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //       params: {
  //         user_id: userId,  // Passing userId as a query parameter
  //       },
  //     });

  //     // Ensure we always return an array
  //     return Array.isArray(data) ? data : [];

  //   }catch (error) {
  //       if (error.response?.status === 401) {
  //         console.log("Token expired! Logging out...");
  //         localStorage.removeItem("authToken");
  //         localStorage.removeItem("userId"); // Ensure userId is also removed
    
  //         setTimeout(() => {
  //           window.location.href = "/signin";
  //         }, 0);
  //       } else {
  //         console.error('Error fetching user posts:', error);
  //       }
  //   // } catch (error) {
  //   //   console.error('Error fetching user posts:', error);
  //     return [];
  //   }
  // },

  // above time utc



  // fetchUserPosts: async (userId: string) => {
  //   try {
  //     const token = localStorage.getItem('authToken');
  //     if (!token) {
  //       window.location.href = '/signin';
  //       return null;
  //     }

  //     // Send the userId as a query parameter to match the backend route
  //     const { data } = await api.get(`/auth/posts`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //       params: {
  //         user_id: userId,  // Passing userId as a query parameter
  //       },
  //     });

  //     // Ensure we always return an array
  //     return Array.isArray(data) ? data : [];

  //   }catch (error) {
  //       if (error.response?.status === 401) {
  //         console.log("Token expired! Logging out...");
  //         localStorage.removeItem("authToken");
  //         localStorage.removeItem("userId"); // Ensure userId is also removed
    
  //         setTimeout(() => {
  //           window.location.href = "/signin";
  //         }, 0);
  //       } else {
  //         console.error('Error fetching user posts:', error);
  //       }
   
  //     return [];
  //   }
  // },

  // fetchUserPosts: async (userId: string) => {
  //   try {
  //     const token = localStorage.getItem('authToken');
  //     if (!token) {
  //       window.location.href = '/signin';
  //       return null;
  //     }

  //     // Send the userId as a query parameter to match the backend route
  //     const { data } = await api.get(`/auth/posts/user`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //       params: {
  //         user_id: userId,  // Passing userId as a query parameter
  //       },
  //     });

  //     // Ensure we always return an array
  //     return Array.isArray(data) ? data : [];

  //   }catch (error) {
  //       if (error.response?.status === 401) {
  //         console.log("Token expired! Logging out...");
  //         localStorage.removeItem("authToken");
  //         localStorage.removeItem("userId"); // Ensure userId is also removed
    
  //         setTimeout(() => {
  //           window.location.href = "/signin";
  //         }, 0);
  //       } else {
  //         console.error('Error fetching user posts:', error);
  //       }
   
  //     return [];
  //   }
  // },



  
 
  getCategories: async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = '/signin';
        return;
      }
      
      const response = await api.get('/auth/categories', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      return response.data;  // Return the categories fetched
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },


  createPost: async (postData) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/signin";
      return null;
    }

    try {
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("content", postData.content);
      formData.append("category", postData.category);
      if (postData.media) {
        formData.append("media", postData.media);
      }

      const response = await api.post(
        `/auth/post/${postData.userId}?category_id=${postData.categoryId}`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  },



  
};

  



 
