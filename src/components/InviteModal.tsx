// import React, { useState, useEffect } from 'react';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';
// import axios from 'axios';


// const api = axios.create({
//     baseURL: 'http://127.0.0.1:8000',
//     headers: {
//       'Cache-Control': 'no-cache',
//       'Pragma': 'no-cache',
//     },
//   });



// interface InviteModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose }) => {
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);

//   const [email, setEmail] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [alert, setAlert] = useState<{
//     type: 'success' | 'error';
//     message: string;
//   } | null>(null);

//   useEffect(() => {
//     if (!isOpen) {
//       // Reset form when modal closes
//       setEmail('');
//       setAlert(null);
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     // Clear alert after 5 seconds
//     if (alert) {
//       const timer = setTimeout(() => {
//         setAlert(null);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [alert]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     const token = localStorage.getItem('authToken');
  
//     if (!token) {
//       setAlert({ type: 'error', message: 'Unauthorized! Please log in again.' });
//       return;
//     }
  
//     if (!email.trim()) {
//       setAlert({ type: 'error', message: 'Please enter an email address.' });
//       return;
//     }
  
//     setIsSubmitting(true);
//     setAlert(null);
  
//     try {
//       await api.post(
//         '/auth/invite',
//         { email },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
  
//       setAlert({ type: 'success', message: 'Invitation sent successfully!' });
//       setEmail(''); // Clear input field
//     } catch (error: any) {
//       let errorMessage = 'An unexpected error occurred. Please try again.';
  
//       if (error.response?.status === 400) {
//         errorMessage =
//           error.response.data?.detail || 'Invalid request. Please check the email format.';
//       } else if (error.response?.status === 500) {
//         errorMessage =
//           error.response.data?.detail || 'Server error. Please try again later.';
//       }
  
//       setAlert({ type: 'error', message: errorMessage });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
  

//   if (!isOpen) return null;

//   return (
//     <div 
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//       onClick={onClose}
//     >
//       <div 
//         className="bg-white rounded-xl shadow-lg w-full max-w-md"
//         onClick={e => e.stopPropagation()}
//       >
//         <div className="p-4 border-b border-gray-100 flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Invite Friends</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           {alert && (
//             <div 
//               className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
//                 alert.type === 'success' 
//                   ? 'bg-green-50 text-green-700' 
//                   : 'bg-red-50 text-red-700'
//               }`}
//             >
//               {alert.type === 'success' ? (
//                 <CheckCircle className="w-5 h-5" />
//               ) : (
//                 <AlertCircle className="w-5 h-5" />
//               )}
//               <p>{alert.message}</p>
//             </div>
//           )}

//           <div className="mb-6">
//             <label 
//               htmlFor="email" 
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your friend's email"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//               style={{ focusRing: themeColors.primary }}
//               required
//             />
//           </div>

//           <div className="flex justify-end gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting || !email.trim()}
//               className="flex items-center gap-2 px-6 py-2 text-white rounded-lg disabled:opacity-50"
//               style={{ backgroundColor: themeColors.primary }}
//             >
//               <Send className="w-4 h-4" />
//               {isSubmitting ? 'Sending...' : 'Send Invite'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };



import React, { useState, useEffect } from 'react';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
  });

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInviteSuccess?: () => void;
}

export const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, onInviteSuccess }) => {
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setAlert(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (alert?.type === 'success') {
      const timer = setTimeout(() => {
        onClose();
        if (onInviteSuccess) {
          onInviteSuccess();
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alert, onClose, onInviteSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      setAlert({ type: 'error', message: 'Unauthorized! Please log in again.' });
      return;
    }
  
    if (!email.trim()) {
      setAlert({ type: 'error', message: 'Please enter an email address.' });
      return;
    }
  
    setIsSubmitting(true);
    setAlert(null);
  
    try {
      await api.post(
        '/auth/invite',
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      setAlert({ type: 'success', message: 'Invitation sent successfully!' });
      setEmail('');
    } catch (error: any) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
  
      if (error.response?.status === 400) {
        errorMessage =
          error.response.data?.detail || 'Invalid request. Please check the email format.';
      } else if (error.response?.status === 500) {
        errorMessage =
          error.response.data?.detail || 'Server error. Please try again later.';
      }
  
      setAlert({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-lg w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Invite Friends</h2>
          {/* <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button> */}
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {alert && (
            <div 
              className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
                alert.type === 'success' 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {alert.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <p>{alert.message}</p>
            </div>
          )}

          <div className="mb-6">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your friend's email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ focusRing: themeColors.primary }}
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="flex items-center gap-2 px-6 py-2 text-white rounded-lg disabled:opacity-50"
              style={{ backgroundColor: themeColors.primary }}
            >
              <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
              {isSubmitting ? 'Sending...' : 'Send Invite'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};