

// import React, { useState, useRef } from 'react';
// import { Upload, X, Camera } from 'lucide-react';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';

// interface AvatarSelectorProps {
//   onSelect: (type: string, url?: string) => void;
//   onClose: () => void;
//   userId: number;
//   authToken: string;
// }

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// export const AvatarSelector: React.FC<AvatarSelectorProps> = ({ 
//   onSelect,
//   onClose,
//   userId,
//   authToken
// }) => {
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState('');
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) {
//       setSelectedFile(null);
//       setPreviewUrl(null);
//       return;
//     }


//     const allowedTypes = ['image/jpeg', 'image/png'];
//     if (!allowedTypes.includes(file.type)) {
//       setUploadError('Only JPG and PNG files are allowed');
//       toast.error('Only JPG and PNG files are allowed');
//       return;
//     }

//     setSelectedFile(file);
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setPreviewUrl(e.target?.result as string);
//     };
//     reader.readAsDataURL(file);
//   };
//   const handleFileUpload = async () => {
//     if (!selectedFile) {
//       setUploadError('Please select a file first');
//       return;
//     }
  
//     setIsUploading(true);
//     setUploadError('');
  
//     try {
//       // Retrieve the token and userId from localStorage
//       const token = localStorage.getItem('authToken');
//       const userId = localStorage.getItem('userId');
  
//       if (!token || !userId) {
//         // Redirect to login if either token or userId is missing
//         window.location.href = '/signin';
        
//         return;
//       }
  
//       // Create FormData and append the file
//       const formData = new FormData();
//       formData.append('file', selectedFile);
  
//       // Make the API request with user_id as query parameter
//       const response = await api.post(`/auth/upload-profile-image/?user_id=${userId}`, formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data', // Use 'multipart/form-data' for file uploads
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total!
//           );
//           console.log(`Upload progress: ${percentCompleted}%`);
//         },
//       });
  
//       // Handle the response based on status code
//       if (response.status === 200 || response.status === 201) {
//         // Show success toaster message
//         toast.success('Profile image successfully uploaded');
  
//         // Optionally, use the response data for further actions
//         onSelect('custom', response.data.url); // Assuming `url` is still needed here
//         onClose();
//       } else {
//         throw new Error('Unexpected response status');
//       }
//     } catch (error: any) {
//       console.error('Upload failed:', error);
  
//       let errorMessage = 'Failed to upload image';
  
//       // Handle specific errors
//       if (error.response?.status === 401) {
//         errorMessage = 'Your session has expired. Please log in again.';
//         window.location.href = '/signin'; // Redirect to login
//       } else if (error.response?.status === 413) {
//         errorMessage = 'Image file is too large';
//       } else if (error.response?.status === 415) {
//         errorMessage = 'Unsupported file type';
//       } else if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
  
//       setUploadError(errorMessage);
//       toast.error(errorMessage); // Show error message as a toast
//     } finally {
//       setIsUploading(false);
//     }
//   };


//   const handleCancel = () => {
//     setSelectedFile(null);
//     setPreviewUrl(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleBrowseClick = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold">Upload Profile Picture</h3>
//         <button 
//           onClick={onClose}
//           className="text-gray-400 hover:text-gray-600"
//         >
//           <X className="w-5 h-5" />
//         </button>
//       </div>

//       {uploadError && (
//         <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
//           {uploadError}
//         </div>
//       )}

//       <div className="mb-4">
//         {previewUrl ? (
//           <div className="flex flex-col items-center mb-4">
//             <div className="relative mb-3">
//               <img 
//                 src={previewUrl} 
//                 alt="Preview" 
//                 className="w-24 h-24 rounded-full object-cover"
//               />
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={handleCancel}
//                 className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleFileUpload}
//                 className="px-3 py-1 text-white rounded-lg flex items-center gap-1"
//                 style={{ backgroundColor: themeColors.primary }}
//                 disabled={isUploading}
//               >
//                 <Upload className="w-4 h-4" />
//                 {isUploading ? 'Uploading...' : 'Upload'}
//               </button>
//             </div>
//             {selectedFile && (
//               <div className="mt-2 text-sm text-gray-500">
//                 Selected: {selectedFile.name}
//               </div>
//             )}
//           </div>
//         ) : (
//           <label className="flex items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
//             <input
//               ref={fileInputRef}
//               type="file"
//               className="hidden"
//               accept="image/*"
//               onChange={handleFileChange}
//               disabled={isUploading}
//             />
//             <div className="flex flex-col items-center" onClick={handleBrowseClick}>
//               <Camera className="w-12 h-12 mb-3 text-gray-400" />
//               <span className="text-sm font-medium text-gray-600">
//                 Click to upload profile picture
//               </span>
//               <span className="mt-1 text-xs text-gray-500">
//                 Supported formats: JPG, PNG
//               </span>
//             </div>
//           </label>
//         )}
//       </div>
//     </div>
//   );
// };








// import React, { useState, useRef } from 'react';
// import { Upload, X, Camera } from 'lucide-react';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';

// interface AvatarSelectorProps {
//   onSelect: (type: string, url?: string) => void;
//   onClose: () => void;
//   userId: number;
//   authToken: string;
// }

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// export const AvatarSelector: React.FC<AvatarSelectorProps> = ({ 
//   onSelect,
//   onClose,
//   userId,
//   authToken
// }) => {
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState('');
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) {
//       setSelectedFile(null);
//       setPreviewUrl(null);
//       return;
//     }


//     const allowedTypes = ['image/jpeg', 'image/png'];
//     if (!allowedTypes.includes(file.type)) {
//       setUploadError('Only JPG and PNG files are allowed');
//       toast.error('Only JPG and PNG files are allowed');
//       return;
//     }

//     setSelectedFile(file);
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setPreviewUrl(e.target?.result as string);
//     };
//     reader.readAsDataURL(file);
//   };
//   const handleFileUpload = async () => {
//     if (!selectedFile) {
//       setUploadError('Please select a file first');
//       return;
//     }
  
//     setIsUploading(true);
//     setUploadError('');
  
//     try {
//       // Retrieve the token and userId from localStorage
//       const token = localStorage.getItem('authToken');
//       const userId = localStorage.getItem('userId');
  
//       if (!token || !userId) {
//         // Redirect to login if either token or userId is missing
//         window.location.href = '/signin';
        
//         return;
//       }
  
//       // Create FormData and append the file
//       const formData = new FormData();
//       formData.append('file', selectedFile);
  
//       // Make the API request with user_id as query parameter
//       const response = await api.post(`/auth/upload-profile-image/?user_id=${userId}`, formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data', // Use 'multipart/form-data' for file uploads
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total!
//           );
//           console.log(`Upload progress: ${percentCompleted}%`);
//         },
//       });
  
//       // Handle the response based on status code
//       if (response.status === 200 || response.status === 201) {
//         // Show success toaster message
//         toast.success('Profile image successfully uploaded');
  
//         // Optionally, use the response data for further actions
//         onSelect('custom', response.data.url); // Assuming `url` is still needed here
//         onClose();
//       } else {
//         throw new Error('Unexpected response status');
//       }
//     } catch (error: any) {
//       console.error('Upload failed:', error);
  
//       let errorMessage = 'Failed to upload image';
  
//       // Handle specific errors
//       if (error.response?.status === 401) {
//         errorMessage = 'Your session has expired. Please log in again.';
//         window.location.href = '/signin'; // Redirect to login
//       } else if (error.response?.status === 413) {
//         errorMessage = 'Image file is too large';
//       } else if (error.response?.status === 415) {
//         errorMessage = 'Unsupported file type';
//       } else if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
  
//       setUploadError(errorMessage);
//       toast.error(errorMessage); // Show error message as a toast
//     } finally {
//       setIsUploading(false);
//     }
//   };


//   const handleCancel = () => {
//     setSelectedFile(null);
//     setPreviewUrl(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleBrowseClick = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold">Upload Profile Picture</h3>
//         <button 
//           onClick={onClose}
//           className="text-gray-400 hover:text-gray-600"
//         >
//           <X className="w-5 h-5" />
//         </button>
//       </div>

//       {uploadError && (
//         <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
//           {uploadError}
//         </div>
//       )}

//       <div className="mb-4">
//         {previewUrl ? (
//           <div className="flex flex-col items-center mb-4">
//             <div className="relative mb-3">
//               <img 
//                 src={previewUrl} 
//                 alt="Preview" 
//                 className="w-24 h-24 rounded-full object-cover"
//               />
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={handleCancel}
//                 className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleFileUpload}
//                 className="px-3 py-1 text-white rounded-lg flex items-center gap-1"
//                 style={{ backgroundColor: themeColors.primary }}
//                 disabled={isUploading}
//               >
//                 <Upload className="w-4 h-4" />
//                 {isUploading ? 'Uploading...' : 'Upload'}
//               </button>
//             </div>
//             {selectedFile && (
//               <div className="mt-2 text-sm text-gray-500">
//                 Selected: {selectedFile.name}
//               </div>
//             )}
//           </div>
//         ) : (
//           <label className="flex items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
//             <input
//               ref={fileInputRef}
//               type="file"
//               className="hidden"
//               accept="image/*"
//               onChange={handleFileChange}
//               disabled={isUploading}
//             />
//             <div className="flex flex-col items-center" onClick={handleBrowseClick}>
//               <Camera className="w-12 h-12 mb-3 text-gray-400" />
//               <span className="text-sm font-medium text-gray-600">
//                 Click to upload profile picture
//               </span>
//               <span className="mt-1 text-xs text-gray-500">
//                 Supported formats: JPG, PNG
//               </span>
//             </div>
//           </label>
//         )}
//       </div>
//     </div>
//   );
// };




// import React, { useState, useRef } from 'react';
// import { Camera, X } from 'lucide-react';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// interface AvatarSelectorProps {
//   onSelect: (type: string, url?: string) => void;
//   onClose: () => void;
// }

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// export const AvatarSelector: React.FC<AvatarSelectorProps> = ({ 
//   onSelect,
//   onClose,
// }) => {
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState('');
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Validate file type
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       setUploadError('Only JPG, PNG and WebP files are allowed');
//       toast.error('Only JPG, PNG and WebP files are allowed');
//       return;
//     }

//     // Validate file size (5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       setUploadError('File size must be less than 5MB');
//       toast.error('File size must be less than 5MB');
//       return;
//     }

//     setIsUploading(true);
//     setUploadError('');

//     try {
//       const token = localStorage.getItem('authToken');
//       const userId = localStorage.getItem('userId');

//       if (!token || !userId) {
//         window.location.href = '/signin';
//         return;
//       }

//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await api.post(
//         `/auth/upload-profile-image/?user_id=${userId}`,
//         formData,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         toast.success('Profile picture updated successfully');
//         onSelect('custom', response.data.url);
//         onClose();
//         // Reload the page to show the new image
//         window.location.reload();
//       }
//     } catch (error: any) {
//       console.error('Upload failed:', error);
//       let errorMessage = 'Failed to upload image';

//       if (error.response?.status === 401) {
//         errorMessage = 'Your session has expired. Please log in again.';
//         window.location.href = '/signin';
//       } else if (error.response?.status === 413) {
//         errorMessage = 'Image file is too large';
//       } else if (error.response?.status === 415) {
//         errorMessage = 'Unsupported file type';
//       } else if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       }

//       setUploadError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setIsUploading(false);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-lg font-semibold">Upload Profile Picture</h3>
//           <button 
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {uploadError && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
//             {uploadError}
//           </div>
//         )}

//         <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 relative">
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/jpeg,image/png,image/webp"
//             onChange={handleFileChange}
//             className="hidden"
//             disabled={isUploading}
//           />
          
//           {isUploading ? (
//             <div className="flex flex-col items-center">
//               <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
//               <p className="text-sm text-gray-500">Uploading...</p>
//             </div>
//           ) : (
//             <div className="flex flex-col items-center">
//               <Camera className="w-12 h-12 text-gray-400 mb-3" />
//               <p className="text-sm font-medium text-gray-600">Click to upload profile picture</p>
//               <p className="mt-1 text-xs text-gray-500">JPG, PNG or WebP (max. 5MB)</p>
//             </div>
//           )}
//         </label>
//       </div>
//     </div>
//   );
// };



import React, { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import axios from 'axios';
import toast from 'react-hot-toast';

interface AvatarSelectorProps {
  onSelect: (type: string, url?: string) => void;
  onClose: () => void;
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({ 
  onSelect,
  onClose,
}) => {
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Only JPG, PNG and WebP files are allowed');
      toast.error('Only JPG, PNG and WebP files are allowed');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      toast.error('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        window.location.href = '/signin';
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post(
        `/auth/upload-profile-image/?user_id=${userId}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success('Profile picture updated successfully');
        onSelect('custom', response.data.url);
        onClose();
        // Reload the page to show the new image
        window.location.href = '/'; 
      }
    } catch (error: any) {
      console.error('Upload failed:', error);
      let errorMessage = 'Failed to upload image';

      if (error.response?.status === 401) {
        errorMessage = 'Your session has expired. Please log in again.';
        window.location.href = '/signin';
      } else if (error.response?.status === 413) {
        errorMessage = 'Image file is too large';
      } else if (error.response?.status === 415) {
        errorMessage = 'Unsupported file type';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setUploadError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   // Validate file type
  //   const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  //   if (!allowedTypes.includes(file.type)) {
  //     setUploadError('Only JPG, PNG and WebP files are allowed');
  //     toast.error('Only JPG, PNG and WebP files are allowed');
  //     return;
  //   }

  //   // Validate file size (5MB)
  //   if (file.size > 5 * 1024 * 1024) {
  //     setUploadError('File size must be less than 5MB');
  //     toast.error('File size must be less than 5MB');
  //     return;
  //   }

  //   setIsUploading(true);
  //   setUploadError('');

  //   try {
  //     const token = localStorage.getItem('authToken');
  //     const userId = localStorage.getItem('userId');

  //     if (!token || !userId) {
  //       window.location.href = '/signin';
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append('file', file);

  //     const response = await api.post(
  //       `/auth/upload-profile-image/?user_id=${userId}`,
  //       formData,
  //       {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );

  //     if (response.status === 200 || response.status === 201) {
  //       toast.success('Profile picture updated successfully');
  //       onSelect('custom', response.data.url);
  //       onClose();
  //       // Reload the page to show the new image
  //       window.location.reload();
  //     }
  //   } catch (error: any) {
  //     console.error('Upload failed:', error);
  //     let errorMessage = 'Failed to upload image';

  //     if (error.response?.status === 401) {
  //       errorMessage = 'Your session has expired. Please log in again.';
  //       window.location.href = '/signin';
  //     } else if (error.response?.status === 413) {
  //       errorMessage = 'Image file is too large';
  //     } else if (error.response?.status === 415) {
  //       errorMessage = 'Unsupported file type';
  //     } else if (error.response?.data?.message) {
  //       errorMessage = error.response.data.message;
  //     }

  //     setUploadError(errorMessage);
  //     toast.error(errorMessage);
  //   } finally {
  //     setIsUploading(false);
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = '';
  //     }
  //   }
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Upload Profile Picture</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {uploadError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {uploadError}
          </div>
        )}

        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 relative">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
          
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-sm text-gray-500">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Camera className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-sm font-medium text-gray-600">Click to upload profile picture</p>
              <p className="mt-1 text-xs text-gray-500">JPG, PNG or WebP (max. 5MB)</p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};