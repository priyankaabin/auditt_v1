
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuthStore } from '../store/authStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Users, Video, UserPlus ,Code,BookOpen} from 'lucide-react';
// // import UserManagement from './UserManagement';
// import UserManagement from './UserManagement';
// import VideoApproval from './VideoApproval';
// import { InviteModal } from '../components/InviteModal';

// type Tab = 'users' | 'videos';

// interface VideoData {
//   id: number;
//   user_id: number;
//   username: string;
//   title: string;
//   category: string;
//   content: string;
//   media_path: string;
//   category_id: number;
//   isVideo: boolean;
//   isImage: boolean;
//   isVideoApproved: boolean;
//   isVideoRejected: boolean;
//   created_at: string;
//   updated_at: string;
//   category_name: string;
// }

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// export default function AdminDashboard() {
//   const { isAdmin } = useAuthStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
  
//   const [activeTab, setActiveTab] = useState<Tab>('users');
//   const [videos, setVideos] = useState<VideoData[]>([]);
//   const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
//   // const [refreshKey, setRefreshKey] = useState(0); 
//   const token = localStorage.getItem('authToken');

//   const fetchPendingVideos = async () => {
//     try {
//       const response = await api.get('/auth/videos/pending-approval', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setVideos(response.data);
//     } catch (error) {
//       console.error('Error fetching pending videos:', error);
//       alert('Failed to load pending videos.');
//     }
//   };

//   useEffect(() => {
//     if (activeTab === 'videos') {
//       fetchPendingVideos();
//     }
//   }, [activeTab]);

//   if (!isAdmin) {
//     navigate('/');
//     return null;
//   }

//   // Filter videos by status
//   const pendingVideos = videos.filter(video => !video.isVideoApproved && !video.isVideoRejected);
//   const approvedVideos = videos.filter(video => video.isVideoApproved && !video.isVideoRejected);
//   const rejectedVideos = videos.filter(video => video.isVideoRejected);

    
  

//   return (
//     <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         {/* Header with Invite Button */}
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>


//           {/* Add API Documentation and User Manual buttons */}
//         {/* Documentation Buttons */}
//         <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => window.open('http://4.240.122.136:48367/', '_blank')}
//               className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 shadow-sm"
//             >
//               <Code className="w-4 h-4" />
//               <span>API Docs</span>
//             </button>
           
//         </div></div> </div>

//         {/* Tabs */}
//         <div className="border-b border-gray-200">
//         <div className="flex min-w-max">
//             <button
//               onClick={() => setActiveTab('users')}
//               className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
//                 activeTab === 'users'
//                   ? 'border-current text-blue-500'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <Users className="w-5 h-5" />
//               User Management
//             </button>
            
//             <button
//               onClick={() => setActiveTab('videos')}
//               className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 relative whitespace-nowrap ${
//                 activeTab === 'videos'
//                   ? 'border-current text-blue-500'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <Video className="w-5 h-5" />
//               Video Approval
//               {pendingVideos.length > 0 && (
//                 <span className="absolute top-2 right-2 flex h-5 w-5">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">
//                     {pendingVideos.length}
//                   </span>
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
        
//         {/* Content */}
//         <div className="p-6">
//           {activeTab === 'users' ? (
//             <UserManagement />
//           ) : (
//             <div>
//               <div className="mb-6 grid grid-cols-3 gap-4">
              
//               </div>
//               <VideoApproval 
//                 pendingVideos={pendingVideos}
//                 approvedVideos={approvedVideos}
//                 rejectedVideos={rejectedVideos}
//                 onStatusUpdate={fetchPendingVideos}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Invite Modal */}
//       <InviteModal
//         isOpen={isInviteModalOpen}
//         onClose={() => setIsInviteModalOpen(false)}
        
//       />
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuthStore } from '../store/authStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Users, Video, UserPlus, Code, BookOpen, Layout } from 'lucide-react';
// import UserManagement from './UserManagement';
// import VideoApproval from './VideoApproval';
// import Categories from '../components/Categories';
// import { InviteModal } from '../components/InviteModal';

// type Tab = 'users' | 'videos' | 'categories';

// interface VideoData {
//   id: number;
//   user_id: number;
//   username: string;
//   title: string;
//   category: string;
//   content: string;
//   media_path: string;
//   category_id: number;
//   isVideo: boolean;
//   isImage: boolean;
//   isVideoApproved: boolean;
//   isVideoRejected: boolean;
//   created_at: string;
//   updated_at: string;
//   category_name: string;
// }

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// export default function AdminDashboard() {
//   const { isAdmin } = useAuthStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
  
//   const [activeTab, setActiveTab] = useState<Tab>('users');
//   const [videos, setVideos] = useState<VideoData[]>([]);
//   const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
//   const token = localStorage.getItem('authToken');

//   const fetchPendingVideos = async () => {
//     try {
//       const response = await api.get('/auth/videos/pending-approval', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setVideos(response.data);
//     } catch (error) {
//       console.error('Error fetching pending videos:', error);
//       alert('Failed to load pending videos.');
//     }
//   };

//   useEffect(() => {
//     if (activeTab === 'videos') {
//       fetchPendingVideos();
//     }
//   }, [activeTab]);

//   if (!isAdmin) {
//     navigate('/');
//     return null;
//   }

//   const pendingVideos = videos.filter(video => !video.isVideoApproved && !video.isVideoRejected);
//   const approvedVideos = videos.filter(video => video.isVideoApproved && !video.isVideoRejected);
//   const rejectedVideos = videos.filter(video => video.isVideoRejected);

//   return (
//     <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//             <div className="flex flex-wrap gap-3">
//               <button
//                 onClick={() => window.open('http://4.240.122.136:48367/', '_blank')}
//                 className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 shadow-sm"
//               >
//                 <Code className="w-4 h-4" />
//                 <span>API Docs</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="border-b border-gray-200">
//           <div className="flex min-w-max">
//             <button
//               onClick={() => setActiveTab('users')}
//               className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
//                 activeTab === 'users'
//                   ? 'border-current text-blue-500'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <Users className="w-5 h-5" />
//               User Management
//             </button>
            
//             <button
//               onClick={() => setActiveTab('videos')}
//               className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 relative whitespace-nowrap ${
//                 activeTab === 'videos'
//                   ? 'border-current text-blue-500'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <Video className="w-5 h-5" />
//               Video Approval
//               {pendingVideos.length > 0 && (
//                 <span className="absolute top-2 right-2 flex h-5 w-5">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">
//                     {pendingVideos.length}
//                   </span>
//                 </span>
//               )}
//             </button>

//             <button
//               onClick={() => setActiveTab('categories')}
//               className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
//                 activeTab === 'categories'
//                   ? 'border-current text-blue-500'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <Layout className="w-5 h-5" />
//               Categories
//             </button>
//           </div>
//         </div>


        


        
        
//         <div className="p-6">
//           {activeTab === 'users' ? (
//             <UserManagement />
//           ) : activeTab === 'videos' ? (
//             <div>
//               <div className="mb-6 grid grid-cols-3 gap-4"></div>
//               <VideoApproval 
//                 pendingVideos={pendingVideos}
//                 approvedVideos={approvedVideos}
//                 rejectedVideos={rejectedVideos}
//                 onStatusUpdate={fetchPendingVideos}
//               />
//             </div>
//           ) : (
//             <Categories />
//           )}
//         </div>
//       </div>

//       <InviteModal
//         isOpen={isInviteModalOpen}
//         onClose={() => setIsInviteModalOpen(false)}
//       />
//     </div>
//   );
// }



// correct below


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuthStore } from '../store/authStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Users, Video, UserPlus, Code, BookOpen, Layout, Award } from 'lucide-react';
// import UserManagement from './UserManagement';
// import VideoApproval from './VideoApproval';
// import Categories from '../components/Categories';
// import TierManagement from '../components/TierManagement';
// import { InviteModal } from '../components/InviteModal';

// type Tab = 'users' | 'videos' | 'categories' | 'tiers';

// interface VideoData {
//   id: number;
//   user_id: number;
//   username: string;
//   title: string;
//   category: string;
//   content: string;
//   media_path: string;
//   category_id: number;
//   isVideo: boolean;
//   isImage: boolean;
//   isVideoApproved: boolean;
//   isVideoRejected: boolean;
//   created_at: string;
//   updated_at: string;
//   category_name: string;
// }

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// export default function AdminDashboard() {
//   const { isAdmin } = useAuthStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
  
//   const [activeTab, setActiveTab] = useState<Tab>('users');
//   const [videos, setVideos] = useState<VideoData[]>([]);
//   const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
//   const token = localStorage.getItem('authToken');

//   const fetchPendingVideos = async () => {
//     try {
//       const response = await api.get('/auth/videos/pending-approval', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setVideos(response.data);
//     } catch (error) {
//       console.error('Error fetching pending videos:', error);
//       alert('Failed to load pending videos.');
//     }
//   };

//   useEffect(() => {
//     if (activeTab === 'videos') {
//       fetchPendingVideos();
//     }
//   }, [activeTab]);

//   if (!isAdmin) {
//     navigate('/');
//     return null;
//   }

//   const pendingVideos = videos.filter(video => !video.isVideoApproved && !video.isVideoRejected);
//   const approvedVideos = videos.filter(video => video.isVideoApproved && !video.isVideoRejected);
//   const rejectedVideos = videos.filter(video => video.isVideoRejected);

//   return (
//     <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//             <div className="flex flex-wrap gap-3">
//               <button
//                 onClick={() => window.open('http://4.240.122.136:48367/', '_blank')}
//                 className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 shadow-sm"
//               >
//                 <Code className="w-4 h-4" />
//                 <span>API Docs</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="border-b border-gray-200">
//           <div className="flex min-w-max">
//             <button
//               onClick={() => setActiveTab('users')}
//               className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
//                 activeTab === 'users'
//                   ? 'border-current text-blue-500'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <Users className="w-5 h-5" />
//               User Management
//             </button>
            
//             <button
//               onClick={() => setActiveTab('videos')}
//               className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 relative whitespace-nowrap ${
//                 activeTab === 'videos'
//                   ? 'border-current text-blue-500'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <Video className="w-5 h-5" />
//               Video Approval
//               {pendingVideos.length > 0 && (
//                 <span className="absolute top-2 right-2 flex h-5 w-5">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">
//                     {pendingVideos.length}
//                   </span>
//                 </span>
//               )}
//             </button>

//             <button
//               onClick={() => setActiveTab('categories')}
//               className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
//                 activeTab === 'categories'
//                   ? 'border-current text-blue-500'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <Layout className="w-5 h-5" />
//               Categories
//             </button>

//             <button
//               onClick={() => setActiveTab('tiers')}
//               className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
//                 activeTab === 'tiers'
//                   ? 'border-current text-blue-500'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <Award className="w-5 h-5" />
//               Tier & Points
//             </button>
//           </div>
//         </div>
        
//         <div className="p-6">
//           {activeTab === 'users' ? (
//             <UserManagement />
//           ) : activeTab === 'videos' ? (
//             <div>
//               <div className="mb-6 grid grid-cols-3 gap-4"></div>
//               <VideoApproval 
//                 pendingVideos={pendingVideos}
//                 approvedVideos={approvedVideos}
//                 rejectedVideos={rejectedVideos}
//                 onStatusUpdate={fetchPendingVideos}
//               />
//             </div>
//           ) : activeTab === 'categories' ? (
//             <Categories />
//           ) : (
//             <TierManagement />
//           )}
//         </div>
//       </div>

//       <InviteModal
//         isOpen={isInviteModalOpen}
//         onClose={() => setIsInviteModalOpen(false)}
//       />
//     </div>
//   );
// }






// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuthStore } from '../store/authStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Users, Video, UserPlus, Code, BookOpen, Layout, Award } from 'lucide-react';
// import UserManagement from './UserManagement';
// import VideoApproval from './VideoApproval';
// import Categories from '../components/Categories';
// import TierManagement from '../components/TierManagement';
// import { InviteModal } from '../components/InviteModal';

// type Tab = 'users' | 'videos' | 'categories' | 'tiers';

// interface VideoData {
//   id: number;
//   user_id: number;
//   username: string;
//   title: string;
//   category: string;
//   content: string;
//   media_path: string;
//   category_id: number;
//   isVideo: boolean;
//   isImage: boolean;
//   isVideoApproved: boolean;
//   isVideoRejected: boolean;
//   created_at: string;
//   updated_at: string;
//   category_name: string;
// }

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// export default function AdminDashboard() {
//   const { isAdmin } = useAuthStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
  
//   const [activeTab, setActiveTab] = useState<Tab>('users');
//   const [videos, setVideos] = useState<VideoData[]>([]);
//   const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
//   const token = localStorage.getItem('authToken');

//   const fetchPendingVideos = async () => {
//     try {
//       const response = await api.get('/auth/videos/pending-approval', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setVideos(response.data);
//     } catch (error) {
//       console.error('Error fetching pending videos:', error);
//       alert('Failed to load pending videos.');
//     }
//   };

//   useEffect(() => {
//     if (activeTab === 'videos') {
//       fetchPendingVideos();
//     }
//   }, [activeTab]);

//   if (!isAdmin) {
//     navigate('/');
//     return null;
//   }

//   const pendingVideos = videos.filter(video => !video.isVideoApproved && !video.isVideoRejected);
//   const approvedVideos = videos.filter(video => video.isVideoApproved && !video.isVideoRejected);
//   const rejectedVideos = videos.filter(video => video.isVideoRejected);

//   return (
//     <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//             <div className="flex flex-wrap gap-3">
//               <button
//                 onClick={() => window.open('http://4.240.122.136:48367/', '_blank')}
//                 className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 shadow-sm"
//               >
//                 <Code className="w-4 h-4" />
//                 <span>API Docs</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="border-b border-gray-200 overflow-x-auto">
//           <div className="flex min-w-max" style={{ minWidth: '100%' }}>
//             <button
//               onClick={() => setActiveTab('users')}
//               className={`flex items-center gap-2 px-4 sm:px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap flex-1 justify-center ${
//                 activeTab === 'users'
//                   ? 'border-current text-blue-500'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <Users className="w-5 h-5" />
//               <span className="hidden sm:inline">User Management</span>
//               <span className="sm:hidden">Users</span>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('videos')}
//               className={`flex items-center gap-2 px-4 sm:px-6 py-4 text-sm font-medium border-b-2 relative whitespace-nowrap flex-1 justify-center ${
//                 activeTab === 'videos'
//                   ? 'border-current text-blue-500'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <Video className="w-5 h-5" />
//               <span className="hidden sm:inline">Video Approval</span>
//               <span className="sm:hidden">Videos</span>
//               {pendingVideos.length > 0 && (
//                 <span className="absolute top-2 right-2 flex h-5 w-5">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">
//                     {pendingVideos.length}
//                   </span>
//                 </span>
//               )}
//             </button>

//             <button
//               onClick={() => setActiveTab('categories')}
//               className={`flex items-center gap-2 px-4 sm:px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap flex-1 justify-center ${
//                 activeTab === 'categories'
//                   ? 'border-current text-blue-500'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <Layout className="w-5 h-5" />
//               <span className="hidden sm:inline">Categories</span>
//               <span className="sm:hidden">Cats</span>
//             </button>

//             <button
//               onClick={() => setActiveTab('tiers')}
//               className={`flex items-center gap-2 px-4 sm:px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap flex-1 justify-center ${
//                 activeTab === 'tiers'
//                   ? 'border-current text-blue-500'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <Award className="w-5 h-5" />
//               <span className="hidden sm:inline">Tier & Points</span>
//               <span className="sm:hidden">Tiers</span>
//             </button>
//           </div>
//         </div>
        
//         <div className="p-6">
//           {activeTab === 'users' ? (
//             <UserManagement />
//           ) : activeTab === 'videos' ? (
//             <div>
//               <div className="mb-6 grid grid-cols-3 gap-4"></div>
//               <VideoApproval 
//                 pendingVideos={pendingVideos}
//                 approvedVideos={approvedVideos}
//                 rejectedVideos={rejectedVideos}
//                 onStatusUpdate={fetchPendingVideos}
//               />
//             </div>
//           ) : activeTab === 'categories' ? (
//             <Categories />
//           ) : (
//             <TierManagement />
//           )}
//         </div>
//       </div>

//       <InviteModal
//         isOpen={isInviteModalOpen}
//         onClose={() => setIsInviteModalOpen(false)}
//       />
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import { Users, Video, UserPlus, Code, BookOpen, Layout, Award } from 'lucide-react';
import UserManagement from './UserManagement';
import VideoApproval from './VideoApproval';
import Categories from '../components/Categories';
import TierManagement from '../components/TierManagement';
import { InviteModal } from '../components/InviteModal';

type Tab = 'users' | 'videos' | 'categories' | 'tiers';

interface VideoData {
  id: number;
  user_id: number;
  username: string;
  title: string;
  category: string;
  content: string;
  media_path: string;
  category_id: number;
  isVideo: boolean;
  isImage: boolean;
  isVideoApproved: boolean;
  isVideoRejected: boolean;
  created_at: string;
  updated_at: string;
  category_name: string;
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

export default function AdminDashboard() {
  const { isAdmin } = useAuthStore();
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<Tab>('users');
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const token = localStorage.getItem('authToken');

  const fetchPendingVideos = async () => {
    try {
      const response = await api.get('/auth/videos/pending-approval', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching pending videos:', error);
      alert('Failed to load pending videos.');
    }
  };

  useEffect(() => {
    if (activeTab === 'videos') {
      fetchPendingVideos();
    }
  }, [activeTab]);

  if (!isAdmin) {
    navigate('/');
    return null;
  }

  const pendingVideos = videos.filter(video => !video.isVideoApproved && !video.isVideoRejected);
  const approvedVideos = videos.filter(video => video.isVideoApproved && !video.isVideoRejected);
  const rejectedVideos = videos.filter(video => video.isVideoRejected);

  return (
   
    // <div className="w-full max-w-[100vw] mx-auto py-2 sm:py-4 lg:py-6 px-2 sm:px-4 lg:px-8">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-2 lg:px-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => window.open('http://4.240.122.136:48367/', '_blank')}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 shadow-sm"
              >
                <Code className="w-4 h-4" />
                <span>API Docs</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 overflow-x-auto">
          <div className="flex min-w-max" style={{ minWidth: '100%' }}>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-4 text-sm font-medium border-b-2 whitespace-nowrap flex-1 justify-center ${
                activeTab === 'users'
                  ? 'border-current text-blue-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="hidden sm:inline">User Management</span>
              {/* <span className="sm:hidden">Users</span> */}
            </button>
            
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-4 text-sm font-medium border-b-2 relative whitespace-nowrap flex-1 justify-center ${
                activeTab === 'videos'
                  ? 'border-current text-blue-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Video className="w-5 h-5" />
              <span className="hidden sm:inline">Video Approval</span>
              {/* <span className="sm:hidden">Videos</span> */}
              {pendingVideos.length > 0 && (
                <span className="absolute top-2 right-2 flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">
                    {pendingVideos.length}
                  </span>
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-4 text-sm font-medium border-b-2 whitespace-nowrap flex-1 justify-center ${
                activeTab === 'categories'
                  ? 'border-current text-blue-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Layout className="w-5 h-5" />
              <span className="hidden sm:inline">Categories</span>
              {/* <span className="sm:hidden">Cats</span> */}
            </button>

            <button
              onClick={() => setActiveTab('tiers')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-4 text-sm font-medium border-b-2 whitespace-nowrap flex-1 justify-center ${
                activeTab === 'tiers'
                  ? 'border-current text-blue-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Award className="w-5 h-5" />
              <span className="hidden sm:inline">Tier & Points</span>
              {/* <span className="sm:hidden">Tiers</span> */}
            </button>
          </div>
        </div>
        
        <div className="p-3 sm:p-4 lg:p-6">
          {activeTab === 'users' ? (
            <UserManagement />
          ) : activeTab === 'videos' ? (
            <div>
              <div className="mb-6 grid grid-cols-3 gap-4"></div>
              <VideoApproval 
                pendingVideos={pendingVideos}
                approvedVideos={approvedVideos}
                rejectedVideos={rejectedVideos}
                onStatusUpdate={fetchPendingVideos}
              />
            </div>
          ) : activeTab === 'categories' ? (
            <Categories />
          ) : (
            <TierManagement />
          )}
        </div>
      </div>

      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
}