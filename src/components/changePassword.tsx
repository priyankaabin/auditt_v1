import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import toast from 'react-hot-toast';
import { InviteService } from '../services';

interface ChangePasswordProps {
  onClose: () => void;
}

export function ChangePassword({ onClose }: ChangePasswordProps) {
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  
  //   // Prevent multiple clicks while request is in progress
  //   if (isLoading) return;
  
  //   // Validate passwords
  //   if (formData.newPassword.length < 8) {
  //     toast.error('New password must be at least 8 characters long', { id: 'password-length' });
  //     return;
  //   }
  
  //   if (formData.newPassword !== formData.confirmPassword) {
  //     toast.error('New passwords do not match', { id: 'password-mismatch' });
  //     return;
  //   }
  
  //   setIsLoading(true);
  
  //   // Get userId and token from localStorage
  //   const token = localStorage.getItem('authToken');
  //   const userId = localStorage.getItem('userId');
  
  //   if (!token || !userId) {
  //     toast.error('User authentication failed. Please log in again.', { id: 'auth-failed' });
  //     setIsLoading(false);
  //     return;
  //   }
  
  //   try {
  //     const numericUserId = parseInt(userId, 10);
  
  //     // Call the API
  //     const response = await InviteService.changePassword({
  //       userId: numericUserId,
  //       currentPassword: formData.currentPassword,
  //       newPassword: formData.newPassword,
  //       confirmPassword: formData.confirmPassword
  //     });
  
  //     if (response.status === 200 || response.status === 201) {
  //       toast.success('Password updated successfully', { id: 'password-updated' });
  //       onClose();
  //     } else {
  //       toast.error(response.data?.message || 'Failed to update password', { id: 'password-failed' });
  //     }
  //   } catch (error) {
  //     console.error('Error changing password:', error);
  //     toast.error(error.response?.data?.detail || 'Failed to update password', { id: 'password-error' });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Prevent multiple clicks while request is in progress
//     if (isLoading) return;

//     // Validate passwords
//     if (formData.newPassword.length < 8) return;
//     if (formData.newPassword !== formData.confirmPassword) return;

//     setIsLoading(true);

//     // Get userId and token from localStorage
//     const token = localStorage.getItem('authToken');
//     const userId = localStorage.getItem('userId');

//     if (!token || !userId) {
//         setIsLoading(false);
//         return;
//     }

//     try {
//         const numericUserId = parseInt(userId, 10);

//         // Call the API
//         const response = await InviteService.changePassword({
//             userId: numericUserId,
//             currentPassword: formData.currentPassword,
//             newPassword: formData.newPassword,
//             confirmPassword: formData.confirmPassword
//         });

//         if (response.status === 200 || response.status === 201) {
//             onClose();
//         }
//     } catch (error) {
//         console.error('Error changing password:', error);
//     } finally {
//         setIsLoading(false);
//     }
// };


// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (isLoading) return;

//   // Password must be at least 8 characters and contain at least one special character
//   const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

//   if (!passwordRegex.test(formData.newPassword)) {
//     toast.error('Password must be at least 8 characters long and contain a special character.');
//     return;
//   }

//   if (formData.newPassword !== formData.confirmPassword) {
//     toast.error('New passwords do not match.');
//     return;
//   }

//   setIsLoading(true);

//   const token = localStorage.getItem('authToken');
//   const userId = localStorage.getItem('userId');

//   if (!token || !userId) {
//     toast.error('User authentication failed. Please log in again.');
//     setIsLoading(false);
//     return;
//   }

//   try {
//     const numericUserId = parseInt(userId, 10);

//     const response = await InviteService.changePassword({
//       userId: numericUserId,
//       currentPassword: formData.currentPassword,
//       newPassword: formData.newPassword,
//       confirmPassword: formData.confirmPassword
//     });

//     if (response.status === 200 || response.status === 201) {
//       toast.success('Password updated successfully');
//       onClose();
//     } else {
//       toast.error(response.data?.message || 'Failed to update password');
//     }
//   } catch (error) {
//     console.error('Error changing password:', error);
//     toast.error(error.response?.data?.detail || 'Failed to update password');
//   } finally {
//     setIsLoading(false);
//   }
// };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (isLoading) return;

  let validationErrors: { newPassword?: string; confirmPassword?: string } = {};

  const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  if (!passwordRegex.test(formData.newPassword)) {
      validationErrors.newPassword = "Password must be at least 8 characters long and contain a special character.";
  }

  if (formData.newPassword !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
  }

  setIsLoading(true);
  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');

  if (!token || !userId) {
      setIsLoading(false);
      return;
  }

  try {
      const numericUserId = parseInt(userId, 10);

      const response = await InviteService.changePassword({
          userId: numericUserId,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
      });

      if (response.status === 200 || response.status === 201) {
          onClose();
      }
  } catch (error) {
      console.error("Error changing password:", error);
  } finally {
      setIsLoading(false);
  }
};



  

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  
  //   // Validate passwords
  //   if (formData.newPassword.length < 8) {
  //     toast.error('New password must be at least 8 characters long');
  //     return;
  //   }
  
  //   if (formData.newPassword !== formData.confirmPassword) {
  //     toast.error('New passwords do not match');
  //     return;
  //   }
  
  //   setIsLoading(true);
  
  //   // Get userId and token from localStorage
  //   const token = localStorage.getItem('authToken');
  //   const userId = localStorage.getItem('userId');
  
  //   if (!token || !userId) {
  //     toast.error('User authentication failed. Please log in again.');
  //     setIsLoading(false);
  //     return;
  //   }
  
  //   try {
  //     // Ensure userId is a number
  //     const numericUserId = parseInt(userId, 10);
  
  //     // Call the API
  //     const response = await InviteService.changePassword({
  //       userId: numericUserId,
  //       currentPassword: formData.currentPassword,
  //       newPassword: formData.newPassword,
  //       confirmPassword: formData.confirmPassword
  //     });
  
  //     if (response.status === 200 || response.status === 201) {
  //       toast.success('Password updated successfully');
  //       onClose();
  //     } else {
  //       toast.error(response.data?.message || 'Failed to update password');
  //     }
  //   } catch (error) {
  //     console.error('Error changing password:', error);
  //     toast.error(error.response?.data?.detail || 'Failed to update password');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  
return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
        <p className="text-gray-600 mb-6">
          Update your password to keep your account secure
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRing: themeColors.primary }}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.current ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRing: themeColors.primary }}
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.new ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              
            </div>
            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
          </div>

          {/* Confirm New Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRing: themeColors.primary }}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 text-white rounded-lg transition-colors flex items-center justify-center"
            style={{ backgroundColor: themeColors.primary }}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Update Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}


// import React, { useState } from 'react';
// import { Eye, EyeOff, X } from 'lucide-react';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import toast from 'react-hot-toast';
// import { InviteService } from '../services';
// import { useAuthStore } from '../store/authStore'; // Import auth store to get userId

// interface ChangePasswordProps {
//   onClose: () => void;
// }

// export function ChangePassword({ onClose }: ChangePasswordProps) {
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const { user } = useAuthStore(); // Get userId from auth store

//   const [formData, setFormData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const [showPasswords, setShowPasswords] = useState({
//     current: false,
//     new: false,
//     confirm: false
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
//     setShowPasswords(prev => ({
//       ...prev,
//       [field]: !prev[field]
//     }));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate passwords
//     if (formData.newPassword.length < 8) {
//       toast.error('New password must be at least 8 characters long');
//       return;
//     }
  
//     if (formData.newPassword !== formData.confirmPassword) {
//       toast.error('New passwords do not match');
//       return;
//     }
  
//     setIsLoading(true);
  
//     // Get userId and token from localStorage
//     const token = localStorage.getItem('authToken');
//     const userId = localStorage.getItem('userId');
  
//     if (!token || !userId) {
//       toast.error('User authentication failed. Please log in again.');
//       setIsLoading(false);
//       return;
//     }
  
//     try {
//       // Call the API from InviteService
//       const response = await InviteService.changePassword(
//         {
//           userId,
//           currentPassword: formData.currentPassword,
//           newPassword: formData.newPassword,
//           confirmPassword: formData.confirmPassword
//         },
//         token // Pass the token for authentication
//       );
  
//       if (response.status === 200 || response.status === 201) {
//         toast.success('Password updated successfully');
//         onClose();
//       } else {
//         toast.error(response.data?.message || 'Failed to update password');
//       }
//     } catch (error) {
//       console.error('Error changing password:', error);
//       toast.error(error.response?.data?.detail || 'Failed to update password');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     // Validate passwords
// //     if (formData.newPassword.length < 8) {
// //       toast.error('New password must be at least 8 characters long');
// //       return;
// //     }

// //     if (formData.newPassword !== formData.confirmPassword) {
// //       toast.error('New passwords do not match');
// //       return;
// //     }

// //     setIsLoading(true);

// //     try {
// //       // Call the API from InviteService
// //       const response = await InviteService.changePassword({
// //         userId: user.id, // Pass the userId from auth store
// //         currentPassword: formData.currentPassword,
// //         newPassword: formData.newPassword,
// //         confirmPassword: formData.confirmPassword
// //       });

// //       if (response.status === 200 || response.status === 201) {
// //         toast.success('Password updated successfully');
// //         onClose();
// //       } else {
// //         toast.error('Failed to update password');
// //       }
// //     } catch (error) {
// //       console.error('Error changing password:', error);
// //       toast.error(error.response?.data?.detail || 'Failed to update password');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
//         <p className="text-gray-600 mb-6">
//           Update your password to keep your account secure
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Current Password */}
//           <div>
//             <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
//               Current Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPasswords.current ? 'text' : 'password'}
//                 id="currentPassword"
//                 name="currentPassword"
//                 value={formData.currentPassword}
//                 onChange={handleChange}
//                 className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                 style={{ focusRing: themeColors.primary }}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => togglePasswordVisibility('current')}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPasswords.current ? (
//                   <EyeOff className="w-5 h-5" />
//                 ) : (
//                   <Eye className="w-5 h-5" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* New Password */}
//           <div>
//             <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
//               New Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPasswords.new ? 'text' : 'password'}
//                 id="newPassword"
//                 name="newPassword"
//                 value={formData.newPassword}
//                 onChange={handleChange}
//                 className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                 style={{ focusRing: themeColors.primary }}
//                 required
//                 minLength={8}
//               />
//               <button
//                 type="button"
//                 onClick={() => togglePasswordVisibility('new')}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPasswords.new ? (
//                   <EyeOff className="w-5 h-5" />
//                 ) : (
//                   <Eye className="w-5 h-5" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }