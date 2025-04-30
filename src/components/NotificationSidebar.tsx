// import React, { useEffect } from 'react';
// import { useNotificationStore } from '../store/notificationStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { formatDistanceToNow } from 'date-fns';
// import { Bell, Check, Video, UserPlus, X } from 'lucide-react';

// interface NotificationSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const NotificationSidebar: React.FC<NotificationSidebarProps> = ({ isOpen, onClose }) => {
//   const { notifications, unreadCount, isLoading, fetchNotifications, markAsRead, markAllAsRead } = useNotificationStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
  
//   useEffect(() => {
//     if (isOpen) {
//       fetchNotifications();
//     }
//   }, [isOpen, fetchNotifications]);
  
//   const getNotificationIcon = (type?: string) => {
//     switch (type) {
//       case 'video_approval':
//         return <Video className="w-5 h-5" />;
//       case 'invite_request':
//         return <UserPlus className="w-5 h-5" />;
//       default:
//         return <Bell className="w-5 h-5" />;
//     }
//   };
  
//   const getNotificationColor = (type?: string) => {
//     switch (type) {
//       case 'video_approval':
//         return 'bg-blue-100 text-blue-600';
//       case 'invite_request':
//         return 'bg-green-100 text-green-600';
//       default:
//         return 'bg-purple-100 text-purple-600';
//     }
//   };
  
//   if (!isOpen) return null;

//   return (
//     <div 
//       className="fixed inset-0 z-30"
//       style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//       onClick={onClose}
//     >
//       <div 
//         className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl"
//         onClick={e => e.stopPropagation()}
//       >
//         <div className="h-full flex flex-col">
//           <div className="flex justify-between items-center p-4 border-b">
//             <h2 className="text-xl font-semibold">Notifications</h2>
//             <div className="flex items-center gap-4">
//               {unreadCount > 0 && (
//                 <button
//                   onClick={() => markAllAsRead()}
//                   className="text-sm"
//                   style={{ color: themeColors.primary }}
//                 >
//                   Mark all as read
//                 </button>
//               )}
//               <button 
//                 onClick={onClose}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto p-4">
//             {isLoading ? (
//               <div className="text-center py-8">
//                 <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//                 <p className="mt-2 text-gray-600">Loading notifications...</p>
//               </div>
//             ) : notifications.length === 0 ? (
//               <div className="text-center py-8">
//                 <div className="flex justify-center mb-4">
//                   <div className="p-4 rounded-full bg-gray-100">
//                     <Bell className="w-8 h-8 text-gray-400" />
//                   </div>
//                 </div>
//                 <p className="text-gray-600">You don't have any notifications yet.</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {notifications.map((notification) => (
//                   <div 
//                     key={notification.id} 
//                     className={`bg-white rounded-xl shadow-sm p-4 flex items-start gap-4 ${
//                       !notification.read ? 'border-l-4' : ''
//                     }`}
//                     style={{ borderLeftColor: !notification.read ? themeColors.primary : 'transparent' }}
//                   >
//                     <div className={`p-3 rounded-full ${getNotificationColor(notification.type)}`}>
//                       {getNotificationIcon(notification.type)}
//                     </div>
                    
//                     <div className="flex-1">
//                       <p className="text-gray-800">{notification.content}</p>
//                       <p className="text-gray-500 text-sm mt-1">
//                         {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
//                       </p>
                      
//                       {notification.reference && notification.type === 'video_approval' && (
//                         <div className="mt-2 p-3 bg-gray-50 rounded-lg">
//                           <p className="text-sm font-medium">
//                             Video: {notification.reference.title}
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             Status: <span className={
//                               notification.reference.approval_status === 'approved' 
//                                 ? 'text-green-600' 
//                                 : notification.reference.approval_status === 'rejected'
//                                 ? 'text-red-600'
//                                 : 'text-yellow-600'
//                             }>
//                               {notification.reference.approval_status.charAt(0).toUpperCase() + 
//                                 notification.reference.approval_status.slice(1)}
//                             </span>
//                           </p>
//                         </div>
//                       )}
                      
//                       {notification.reference && notification.type === 'invite_request' && (
//                         <div className="mt-2 p-3 bg-gray-50 rounded-lg">
//                           <p className="text-sm font-medium">
//                             {notification.reference.name} ({notification.reference.email})
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             Status: <span className={
//                               notification.reference.status === 'approved' 
//                                 ? 'text-green-600' 
//                                 : notification.reference.status === 'rejected'
//                                 ? 'text-red-600'
//                                 : 'text-yellow-600'
//                             }>
//                               {notification.reference.status.charAt(0).toUpperCase() + 
//                                 notification.reference.status.slice(1)}
//                             </span>
//                           </p>
//                         </div>
//                       )}
//                     </div>
                    
//                     {!notification.read && (
//                       <button
//                         onClick={() => markAsRead(notification.id)}
//                         className="text-gray-400 hover:text-gray-600"
//                       >
//                         <Check className="w-5 h-5" />
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// import React, { useEffect, useState } from 'react';
// import { X } from 'lucide-react';
// import { format } from 'date-fns';

// interface Notification {
//   id: number;
//   user_id: number;
//   text: string;
//   description: string;
//   created_at: string;
// }

// interface NotificationSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const mockNotifications: Notification[] = Array.from({ length: 25 }, (_, i) => ({
//   id: i + 1,
//   user_id: 3,
//   text: `Notification ${i + 1}`,
//   description: `Description for notification ${i + 1}`,
//   created_at: new Date().toISOString()
// }));

// export const NotificationSidebar: React.FC<NotificationSidebarProps> = ({ isOpen, onClose }) => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   useEffect(() => {
//     // In a real app, this would be an API call
//     setNotifications(mockNotifications.slice(0, 20));
//   }, []);

//   if (!isOpen) return null;

//   return (
//     <div 
//       className="fixed inset-0 z-30 bg-black bg-opacity-50"
//       onClick={onClose}
//     >
//       <div 
//         className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl"
//         onClick={e => e.stopPropagation()}
//       >
//         <div className="h-full flex flex-col">
//           <div className="flex justify-between items-center p-4 border-b">
//             <h2 className="text-xl font-semibold">Notifications</h2>
//             <button 
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             <div className="p-4 space-y-4">
//               {notifications.map((notification) => (
//                 <div 
//                   key={notification.id}
//                   className="bg-white rounded-lg shadow p-4 hover:bg-gray-50 transition-colors"
//                 >
//                   <h3 className="font-medium text-gray-900">{notification.text}</h3>
//                   <p className="text-gray-600 mt-1">{notification.description}</p>
//                   <p className="text-sm text-gray-500 mt-2">
//                     {format(new Date(notification.created_at), 'MMM d, yyyy')}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



// import React, { useEffect, useState } from 'react';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { X } from 'lucide-react';
// import { format } from 'date-fns';

// // interface Notification {
// //   id: number;
// //   user_id: number;
// //   text: string;
// //   username: string;
// //   description: string;
// //   created_at: string;
// // }
// interface Notification {
//   id: number;
//   message: string;
//   text: string;
//   username: string;
//   description: string;
//   created_at: string;
// }


// interface NotificationSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// export const NotificationSidebar: React.FC<NotificationSidebarProps> = ({ isOpen, onClose }) => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (!isOpen) return;
      
//       try {
//         setLoading(true);
//         setError(null);

//         const token = localStorage.getItem('authToken');
//         if (!token) {
//           setError("User not authenticated.");
//           setLoading(false);
//           return;
//         }

//         const response = await api.get('/auth/notifications', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setNotifications(Array.isArray(response.data) ? response.data.slice(0, 20) : []);
//       } catch (err: any) {
//         console.error("Error fetching notifications:", err);
//         setError(err.response?.data?.message || 'Failed to load notifications.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div 
//       className="fixed inset-0 z-30 bg-black bg-opacity-50"
//       onClick={onClose}
//     >
//       <div 
//         className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl"
//         onClick={e => e.stopPropagation()}
//       >
//         <div className="h-full flex flex-col">
//           <div className="flex justify-between items-center p-4 border-b">
//             <h2 className="text-xl font-semibold">Notifications</h2>
//             <button 
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             <div className="p-4 space-y-4">
//               {loading ? (
//                 <div className="flex items-center justify-center py-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//                 </div>
//               ) : error ? (
//                 <div className="text-center py-8">
//                   <p className="text-red-500">{error}</p>
//                 </div>
//               ) : notifications.length === 0 ? (
//                 <div className="text-center py-8">
//                   <p className="text-gray-500">No notifications found.</p>
//                 </div>
//               ) : (
//                 notifications.map((notification) => (
//                   <div 
//                     key={notification.id}
//                     className="bg-white rounded-lg shadow p-4 hover:bg-gray-50 transition-colors"
//                   >
//                     <h3 className="font-medium text-gray-900">{notifications.message}</h3>
//                     {/* <p className="text-gray-600 mt-1">{notification.description}</p> */}
//                     <p className="text-sm text-gray-500 mt-2">
//                       {format(new Date(notification.created_at), 'MMM d, yyyy')}
//                     </p>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { X } from 'lucide-react';
// import { format } from 'date-fns';

// interface Notification {
//   id: number;
//   message: string;
//   text: string;
//   username: string;
//   created_at: string;
// }

// interface NotificationSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// export const NotificationSidebar: React.FC<NotificationSidebarProps> = ({ isOpen, onClose }) => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (!isOpen) return;
      
//       try {
//         setLoading(true);
//         setError(null);

//         const token = localStorage.getItem('authToken');
//         if (!token) {
//           setError("User not authenticated.");
//           setLoading(false);
//           return;
//         }

//         const response = await api.get('/auth/notifications', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setNotifications(Array.isArray(response.data.notifications) ? response.data.notifications : []);
//       } catch (err: any) {
//         console.error("Error fetching notifications:", err);
//         setError(err.response?.data?.message || 'Failed to load notifications.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div 
//       className="fixed inset-0 z-30 bg-black bg-opacity-50"
//       onClick={onClose}
//     >
//       <div 
//         className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl"
//         onClick={e => e.stopPropagation()}
//       >
//         <div className="h-full flex flex-col">
//           <div className="flex justify-between items-center p-4 border-b">
//             <h2 className="text-xl font-semibold">Notifications</h2>
//             <button 
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             <div className="p-4 space-y-4">
//               {loading ? (
//                 <div className="flex items-center justify-center py-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//                 </div>
//               ) : error ? (
//                 <div className="text-center py-8">
//                   <p className="text-red-500">{error}</p>
//                 </div>
//               ) : notifications.length === 0 ? (
//                 <div className="text-center py-8">
//                   <p className="text-gray-500">No notifications found.</p>
//                 </div>
//               ) : (
//                 notifications.map((notification) => (
//                   <div 
//                     key={notification.id}
//                     className="bg-white rounded-lg shadow p-4 hover:bg-gray-50 transition-colors"
//                   >
//                     <h3 className="font-medium text-gray-900">{notification.message}</h3>
//                     <p className="text-sm text-gray-500 mt-2 italic">
//                       {format(new Date(notification.created_at), 'MMM d, yyyy')}
//                     </p>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { format } from 'date-fns';

interface Notification {
  id: number;
  message: string;
  text: string;
  username: string;
  created_at: string;
}

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

export const NotificationSidebar: React.FC<NotificationSidebarProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!isOpen) return;
      
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('authToken');
        if (!token) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }

        const response = await api.get('/auth/notifications', {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            limit: 20,
            sort: 'created_at:desc' // Ensure we get the most recent notifications
          }
        });

        const sortedNotifications = Array.isArray(response.data.notifications) 
          ? response.data.notifications
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .slice(0, 20)
          : [];

        setNotifications(sortedNotifications);
      } catch (err: any) {
        console.error("Error fetching notifications:", err);
        setError(err.response?.data?.message || 'Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-30 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Recent Notifications</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No notifications found.</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500 mb-4">Showing most recent {notifications.length} notifications</p>
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className="bg-white rounded-lg shadow p-4 hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-medium text-gray-900">{notification.message}</h3>
                      <p className="text-sm text-gray-500 mt-2 italic">
                        {format(new Date(notification.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSidebar;
