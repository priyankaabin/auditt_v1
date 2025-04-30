
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Home, Video, Bell, User, LogOut, Settings, Shield, Menu, X } from 'lucide-react';
// import { NotificationSidebar } from './NotificationSidebar';
// import axios from 'axios';
// import { Tooltip } from 'react-tooltip';

// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// export const TopBar = () => {
//   const { user, isAdmin } = useAuthStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
  
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

//   if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password'|| location.pathname === '/reset-password') {
//     return null;
//   }

//   const handleSignOut = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     window.location.href = '/signin';
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     if (isNotificationsOpen) setIsNotificationsOpen(false);
//   };

//   const toggleNotifications = () => {
//     setIsNotificationsOpen(!isNotificationsOpen);
//     if (isMobileMenuOpen) setIsMobileMenuOpen(false);
//   };

//   return (
//     <>
//       <nav className="bg-white shadow-sm p-2 fixed w-full top-0 z-40">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             {user && (
//               <button 
//                 onClick={toggleMobileMenu}
//                 className="lg:hidden p-2 hover:bg-gray-50 rounded-lg"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="menu-tooltip"
//                 data-tooltip-content="Menu"
//               >
//                 {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             )}

//             <Link 
//               to="/" 
//               className="text-2xl font-bold"
//               style={{ color: themeColors.primary }}
//               data-tooltip-id="home-logo-tooltip"
//               data-tooltip-content="Home"
//             >
//               Family Creatives
//             </Link>
//           </div>
          
//           {user ? (
//             <div className="hidden lg:flex items-center space-x-6">
//               <Link 
//                 to="/" 
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="home-tooltip"
//                 data-tooltip-content="Home"
//               >
//                 <Home className="w-6 h-6" />
//               </Link>
             
//               {isAdmin && (
//                 <Link 
//                   to="/admin" 
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="admin-tooltip"
//                   data-tooltip-content="Admin Dashboard"
//                 >
//                   <Shield className="w-6 h-6" />
//                 </Link>
//               )}
//               <button 
//                 onClick={toggleNotifications}
//                 className="hover:bg-gray-50 p-2 rounded-lg relative transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="notifications-tooltip"
//                 data-tooltip-content="Notifications"
//               >
//                 <Bell className="w-6 h-6" />
//                 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>
//               <Link 
//                 to="/profile" 
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="profile-tooltip"
//                 data-tooltip-content="Profile"
//               >
//                 <User className="w-6 h-6" />
//               </Link>
//               <Link 
//                 to="/settings" 
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="settings-tooltip"
//                 data-tooltip-content="Settings"
//               >
//                 <Settings className="w-6 h-6" />
//               </Link>
//               <button
//                 onClick={handleSignOut}
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="logout-tooltip"
//                 data-tooltip-content="Sign Out"
//               >
//                 <LogOut className="w-6 h-6" />
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center space-x-4">
//               <Link 
//                 to="/signin" 
//                 className="hover:underline"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="signin-tooltip"
//                 data-tooltip-content="Sign In"
//               >
//                 Sign In
//               </Link>
//               <Link 
//                 to="/signup" 
//                 className="px-4 py-1 rounded-md font-semibold text-white hover:opacity-90 transition-opacity"
//                 style={{ backgroundColor: themeColors.primary }}
//                 data-tooltip-id="signup-tooltip"
//                 data-tooltip-content="Create Account"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {user && isMobileMenuOpen && (
//         <div 
//           className="fixed inset-0 z-30 lg:hidden"
//           style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//           onClick={toggleMobileMenu}
//         >
//           <div 
//             className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl"
//             onClick={e => e.stopPropagation()}
//           >
//             <div className="p-4 space-y-4">
//               <Link 
//                 to="/" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <Home className="w-5 h-5" />
//                 <span>Home</span>
//               </Link>
              
//               {isAdmin && (
//                 <Link 
//                   to="/admin" 
//                   className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <Shield className="w-5 h-5" />
//                   <span>Admin</span>
//                 </Link>
//               )}
//               <button 
//                 onClick={toggleNotifications}
//                 className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//               >
//                 <Bell className="w-5 h-5" />
//                 <span>Notifications</span>
//               </button>
//               <Link 
//                 to="/profile" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <User className="w-5 h-5" />
//                 <span>Profile</span>
//               </Link>
//               <Link 
//                 to="/settings" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <Settings className="w-5 h-5" />
//                 <span>Settings</span>
//               </Link>
//               <button
//                 onClick={handleSignOut}
//                 className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//               >
//                 <LogOut className="w-5 h-5" />
//                 <span>Sign Out</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Notification Sidebar */}
//       <NotificationSidebar 
//         isOpen={isNotificationsOpen} 
//         onClose={() => setIsNotificationsOpen(false)} 
//       />

//       {/* Tooltips */}
//       <Tooltip id="menu-tooltip" place="right" />
//       <Tooltip id="home-logo-tooltip" place="right" />
//       <Tooltip id="home-tooltip" place="bottom" />
//       <Tooltip id="admin-tooltip" place="bottom" />
//       <Tooltip id="notifications-tooltip" place="bottom" />
//       <Tooltip id="profile-tooltip" place="bottom" />
//       <Tooltip id="settings-tooltip" place="bottom" />
//       <Tooltip id="logout-tooltip" place="bottom" />
//       <Tooltip id="signin-tooltip" place="bottom" />
//       <Tooltip id="signup-tooltip" place="bottom" />
//     </>
//   );
// };




// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Home, Video, Bell, User, LogOut, Settings, Shield, Menu, X ,Search } from 'lucide-react';
// import { NotificationSidebar } from './NotificationSidebar';
// import axios from 'axios';
// import { Tooltip } from 'react-tooltip';

// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });


// interface TopBarProps {
//   onSearch?: (query: string) => void;
// }

// export const TopBar = () => {
//   const { user, isAdmin } = useAuthStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
  
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

//   const location = useLocation();
//   const isHomePage = location.pathname === '/';

//   if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password'|| location.pathname === '/reset-password') {
//     return null;
//   }

//   const handleSignOut = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     window.location.href = '/signin';
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     if (isNotificationsOpen) setIsNotificationsOpen(false);
//   };

//   const toggleNotifications = () => {
//     setIsNotificationsOpen(!isNotificationsOpen);
//     if (isMobileMenuOpen) setIsMobileMenuOpen(false);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     onSearch?.(query);
//   };

//   return (
//     <>
//       <nav className="bg-white shadow-sm p-2 fixed w-full top-0 z-40">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             {user && (
//               <button 
//                 onClick={toggleMobileMenu}
//                 className="lg:hidden p-2 hover:bg-gray-50 rounded-lg"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="menu-tooltip"
//                 data-tooltip-content="Menu"
//               >
//                 {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             )}

//             <Link 
//               to="/" 
//               className="text-2xl font-bold"
//               style={{ color: themeColors.primary }}
//               data-tooltip-id="home-logo-tooltip"
//               data-tooltip-content="Home"
//             >
//               Family Creatives
//             </Link>
//           </div>


//              {/* Search Bar - Only shown on home page */}
//              {user && isHomePage && (
//             <div className="hidden md:flex flex-1 max-w-xl mx-4">
//               <div className="relative w-full">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   placeholder="Search posts..."
//                   className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//                 />
//               </div>
//             </div>
//           )}
          
//           {user ? (
//             <div className="hidden lg:flex items-center space-x-6">
//               <Link 
//                 to="/" 
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="home-tooltip"
//                 data-tooltip-content="Home"
//               >
//                 <Home className="w-6 h-6" />
//               </Link>
             
//               {isAdmin && (
//                 <Link 
//                   to="/admin" 
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="admin-tooltip"
//                   data-tooltip-content="Admin Dashboard"
//                 >
//                   <Shield className="w-6 h-6" />
//                 </Link>
//               )}
//               <button 
//                 onClick={toggleNotifications}
//                 className="hover:bg-gray-50 p-2 rounded-lg relative transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="notifications-tooltip"
//                 data-tooltip-content="Notifications"
//               >
//                 <Bell className="w-6 h-6" />
//                 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>
//               <Link 
//                 to="/profile" 
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="profile-tooltip"
//                 data-tooltip-content="Profile"
//               >
//                 <User className="w-6 h-6" />
//               </Link>
//               <Link 
//                 to="/settings" 
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="settings-tooltip"
//                 data-tooltip-content="Settings"
//               >
//                 <Settings className="w-6 h-6" />
//               </Link>
//               <button
//                 onClick={handleSignOut}
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="logout-tooltip"
//                 data-tooltip-content="Sign Out"
//               >
//                 <LogOut className="w-6 h-6" />
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center space-x-4">
//               <Link 
//                 to="/signin" 
//                 className="hover:underline"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="signin-tooltip"
//                 data-tooltip-content="Sign In"
//               >
//                 Sign In
//               </Link>
//               <Link 
//                 to="/signup" 
//                 className="px-4 py-1 rounded-md font-semibold text-white hover:opacity-90 transition-opacity"
//                 style={{ backgroundColor: themeColors.primary }}
//                 data-tooltip-id="signup-tooltip"
//                 data-tooltip-content="Create Account"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Mobile Menu */}


//       {user && isHomePage && (
//           <div className="md:hidden mt-2 px-2">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 placeholder="Search posts..."
//                 className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//               />
//             </div>
//           </div>
//         )}
//       </nav>
//       {user && isMobileMenuOpen && (
//         <div 
//           className="fixed inset-0 z-30 lg:hidden"
//           style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//           onClick={toggleMobileMenu}
//         >
//           <div 
//             className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl"
//             onClick={e => e.stopPropagation()}
//           >
//             <div className="p-4 space-y-4">
//               <Link 
//                 to="/" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <Home className="w-5 h-5" />
//                 <span>Home</span>
//               </Link>
              
//               {isAdmin && (
//                 <Link 
//                   to="/admin" 
//                   className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <Shield className="w-5 h-5" />
//                   <span>Admin</span>
//                 </Link>
//               )}
//               <button 
//                 onClick={toggleNotifications}
//                 className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//               >
//                 <Bell className="w-5 h-5" />
//                 <span>Notifications</span>
//               </button>
//               <Link 
//                 to="/profile" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <User className="w-5 h-5" />
//                 <span>Profile</span>
//               </Link>
//               <Link 
//                 to="/settings" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <Settings className="w-5 h-5" />
//                 <span>Settings</span>
//               </Link>
//               <button
//                 onClick={handleSignOut}
//                 className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//               >
//                 <LogOut className="w-5 h-5" />
//                 <span>Sign Out</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Notification Sidebar */}
//       <NotificationSidebar 
//         isOpen={isNotificationsOpen} 
//         onClose={() => setIsNotificationsOpen(false)} 
//       />

//       {/* Tooltips */}
//       <Tooltip id="menu-tooltip" place="right" />
//       <Tooltip id="home-logo-tooltip" place="right" />
//       <Tooltip id="home-tooltip" place="bottom" />
//       <Tooltip id="admin-tooltip" place="bottom" />
//       <Tooltip id="notifications-tooltip" place="bottom" />
//       <Tooltip id="profile-tooltip" place="bottom" />
//       <Tooltip id="settings-tooltip" place="bottom" />
//       <Tooltip id="logout-tooltip" place="bottom" />
//       <Tooltip id="signin-tooltip" place="bottom" />
//       <Tooltip id="signup-tooltip" place="bottom" />
//     </>
//   );
// };

// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Home, Video, Bell, User, LogOut, Settings, Shield, Menu, X, Search,XCircle } from 'lucide-react';
// import { NotificationSidebar } from './NotificationSidebar';
// import { PostCard } from './PostCard';
// import axios from 'axios';
// import { Tooltip } from 'react-tooltip';

// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface TopBarProps {
//   onSearch?: (query: string) => void;
// }

// export const TopBar: React.FC<TopBarProps> = ({ onSearch }) => {
//   const { user, isAdmin } = useAuthStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearching, setIsSearching] = useState(false);
//   const [posts, setPosts] = useState([]); // Store fetched posts
//   const isHomePage = location.pathname === '/';

//   if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password'|| location.pathname === '/reset-password') {
//     return null;
//   }

//   const handleSignOut = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     window.location.href = '/signin';
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     if (isNotificationsOpen) setIsNotificationsOpen(false);
//   };

//   const toggleNotifications = () => {
//     setIsNotificationsOpen(!isNotificationsOpen);
//     if (isMobileMenuOpen) setIsMobileMenuOpen(false);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     setIsSearching(query.length > 0);
//   };

//   const clearSearch = () => {
//     setSearchQuery('');
//     setIsSearching(false);
//     onSearch?.('');
//   };


//   const handleSearchClick = async () => {
//     if (!searchQuery.trim() || !isSearching) return;

//     try {
//         const token = localStorage.getItem("authToken");
//         if (!token) {
//             console.error("No auth token found");
//             return;
//         }

//         // Determine if input is username or email
//         const paramKey = searchQuery.includes("@") ? "email" : "username";

//         const response = await api.get(`/auth/search_posts?${paramKey}=${encodeURIComponent(searchQuery)}`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });

//         setPosts(response.data.posts); // Update state with fetched posts
//     } catch (error) {
//         console.error("Search failed:", error);
//     }
// };

// //   const handleSearchClick = async () => {
// //     if (!searchQuery.trim() || !isSearching) return;
    
// //     try {
// //         const token = localStorage.getItem("authToken");
// //         if (!token) {
// //             console.error("No auth token found");
// //             return;
// //         }

// //         // Automatically detect if input is username or email
// //         const paramKey = searchQuery.includes("@") ? "email" : "username";

// //         const response = await api.get(`/auth/search_posts?${paramKey}=${encodeURIComponent(searchQuery)}`, {
// //             headers: {
// //                 Authorization: `Bearer ${token}`,
// //             },
// //         });

// //         onSearch?.(searchQuery);
// //     } catch (error) {
// //         console.error("Search failed:", error);
// //     }
// // };


//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       handleSearchClick();
//     }
//   };

//   return (
//     <>
//       <nav className="bg-white shadow-sm p-2 fixed w-full top-0 z-40">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             {user && (
//               <button 
//                 onClick={toggleMobileMenu}
//                 className="lg:hidden p-2 hover:bg-gray-50 rounded-lg"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="menu-tooltip"
//                 data-tooltip-content="Menu"
//               >
//                 {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             )}

//             <Link 
//               to="/" 
//               className="text-2xl font-bold"
//               style={{ color: themeColors.primary }}
//               data-tooltip-id="home-logo-tooltip"
//               data-tooltip-content="Home"
//             >
//               Family Creatives
//             </Link>
//           </div>

//           {/* Search Bar - Only shown on home page */}
//           {/* {user && isHomePage && (
//             <div className="hidden md:flex flex-1 max-w-xl mx-4">
//               <div className="relative w-full">
//                 <button
//                   onClick={handleSearchClick}
//                   className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
//                     isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
//                   }`}
//                   disabled={!isSearching}
//                   data-tooltip-id="search-tooltip"
//                   data-tooltip-content={isSearching ? "Click to search" : "Type to enable search"}
//                 >
//                   <Search className="w-5 h-5" />
//                 </button>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Search posts..."
//                   className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={clearSearch}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                     data-tooltip-id="clear-search-tooltip"
//                     data-tooltip-content="Clear search"
//                   >
//                     <XCircle className="w-5 h-5" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           )} */}



// {user && isHomePage && (
//   <div className="hidden md:flex flex-1 max-w-xl mx-4">
//     <div className="relative w-full">
//       <button
//         onClick={handleSearchClick}
//         className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
//           isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
//         }`}
//         disabled={!isSearching}
//         data-tooltip-id="search-tooltip"
//         data-tooltip-content={isSearching ? "Click to search" : "Type to enable search"}
//       >
//         <Search className="w-5 h-5" />
//       </button>

//       <input
//         type="text"
//         value={searchQuery}
//         onChange={handleSearchChange}
//         onKeyPress={handleKeyPress}
//         placeholder="Search posts..."
//         className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//       />

//       {searchQuery && (
//         <button
//           onClick={clearSearch}
//           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//           data-tooltip-id="clear-search-tooltip"
//           data-tooltip-content="Clear search"
//         >
//           <XCircle className="w-5 h-5" />
//         </button>
//       )}
//     </div>
//   </div>
// )}

// {/* Render search results as PostCards */}
// {posts.length > 0 && (
//   <div className="mt-4 w-full max-w-2xl mx-auto">
//     <h3 className="text-lg font-semibold mb-2">Search Results</h3>
//     <div className="grid grid-cols-1 gap-4">
//       {posts.map((post) => (
//         <PostCard key={post.id} post={post} />
//       ))}
//     </div>
//   </div>
// )}

          
//           {user ? (
//             <div className="hidden lg:flex items-center space-x-6">
//               <Link 
//                 to="/" 
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="home-tooltip"
//                 data-tooltip-content="Home"
//               >
//                 <Home className="w-6 h-6" />
//               </Link>
             
//               {isAdmin && (
//                 <Link 
//                   to="/admin" 
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="admin-tooltip"
//                   data-tooltip-content="Admin Dashboard"
//                 >
//                   <Shield className="w-6 h-6" />
//                 </Link>
//               )}
//               <button 
//                 onClick={toggleNotifications}
//                 className="hover:bg-gray-50 p-2 rounded-lg relative transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="notifications-tooltip"
//                 data-tooltip-content="Notifications"
//               >
//                 <Bell className="w-6 h-6" />
              
//               </button>
//               <Link 
//                 to="/profile" 
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="profile-tooltip"
//                 data-tooltip-content="Profile"
//               >
//                 <User className="w-6 h-6" />
//               </Link>
//               <Link 
//                 to="/settings" 
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="settings-tooltip"
//                 data-tooltip-content="Settings"
//               >
//                 <Settings className="w-6 h-6" />
//               </Link>
//               <button
//                 onClick={handleSignOut}
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="logout-tooltip"
//                 data-tooltip-content="Sign Out"
//               >
//                 <LogOut className="w-6 h-6" />
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center space-x-4">
//               <Link 
//                 to="/signin" 
//                 className="hover:underline"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="signin-tooltip"
//                 data-tooltip-content="Sign In"
//               >
//                 Sign In
//               </Link>
//               <Link 
//                 to="/signup" 
//                 className="px-4 py-1 rounded-md font-semibold text-white hover:opacity-90 transition-opacity"
//                 style={{ backgroundColor: themeColors.primary }}
//                 data-tooltip-id="signup-tooltip"
//                 data-tooltip-content="Create Account"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Mobile Search - Only shown on home page */}
//         {user && isHomePage && (
//           <div className="md:hidden mt-2 px-2">
//             <div className="relative">
//               <button
//                 onClick={handleSearchClick}
//                 className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
//                   isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
//                 }`}
//                 disabled={!isSearching}
//                 data-tooltip-id="search-mobile-tooltip"
//                 data-tooltip-content={isSearching ? "Click to search" : "Type to enable search"}
//               >
//                 <Search className="w-5 h-5" />
//               </button>
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Search posts..."
//                 className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   data-tooltip-id="clear-search-mobile-tooltip"
//                   data-tooltip-content="Clear search"
//                 >
//                   <XCircle className="w-5 h-5" />
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>
//       {/* Mobile Menu */}
//       {user && isMobileMenuOpen && (
//         <div 
//           className="fixed inset-0 z-30 lg:hidden"
//           style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//           onClick={toggleMobileMenu}
//         >
//           <div 
//             className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl"
//             onClick={e => e.stopPropagation()}
//           >
//             <div className="p-4 space-y-4">
//               <Link 
//                 to="/" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <Home className="w-5 h-5" />
//                 <span>Home</span>
//               </Link>
              
//               {isAdmin && (
//                 <Link 
//                   to="/admin" 
//                   className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <Shield className="w-5 h-5" />
//                   <span>Admin</span>
//                 </Link>
//               )}
//               <button 
//                 onClick={toggleNotifications}
//                 className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//               >
//                 <Bell className="w-5 h-5" />
//                 <span>Notifications</span>
//               </button>
//               <Link 
//                 to="/profile" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <User className="w-5 h-5" />
//                 <span>Profile</span>
//               </Link>
//               <Link 
//                 to="/settings" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <Settings className="w-5 h-5" />
//                 <span>Settings</span>
//               </Link>
//               <button
//                 onClick={handleSignOut}
//                 className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//               >
//                 <LogOut className="w-5 h-5" />
//                 <span>Sign Out</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Notification Sidebar */}
//       <NotificationSidebar 
//         isOpen={isNotificationsOpen} 
//         onClose={() => setIsNotificationsOpen(false)} 
//       />

//       {/* Tooltips */}
//       <Tooltip id="menu-tooltip" place="right" />
//       <Tooltip id="home-logo-tooltip" place="right" />
//       <Tooltip id="home-tooltip" place="bottom" />
//       <Tooltip id="admin-tooltip" place="bottom" />
//       <Tooltip id="notifications-tooltip" place="bottom" />
//       <Tooltip id="profile-tooltip" place="bottom" />
//       <Tooltip id="settings-tooltip" place="bottom" />
//       <Tooltip id="logout-tooltip" place="bottom" />
//       <Tooltip id="signin-tooltip" place="bottom" />
//       <Tooltip id="signup-tooltip" place="bottom" />
//     </>
//   );
// };




// import React, { useState ,useEffect} from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Home, Video, Bell, User, LogOut, Settings, Shield, Menu, X, Search, XCircle } from 'lucide-react';
// import { NotificationSidebar } from './NotificationSidebar';
// import axios from 'axios';
// import { Tooltip } from 'react-tooltip';



// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface Post {
//   id: number;
//   user_id: number;
//   username: string;
//   title: string;
//   category: string;
//   content: string;
//   media_path?: string;
//   isVideo: boolean;
//   isImage: boolean;
//   isAudio: boolean;
//   isNoMedia: boolean;
//   category_id: number;
//   isVideoApproved: boolean;
//   isVideoRejected: boolean;
//   is_public: boolean;
//   created_at: string;
//   updated_at: string;
// }
// interface SearchResponse {
//   posts?: Post[];
//   detail?: string;
// }

// interface TopBarProps {
//   onSearch: (results: Post[] | null, isActive: boolean, error?: string) => void;
// }


// export const TopBar: React.FC<TopBarProps> = ({ onSearch }) => {

//   const { user, isAdmin } = useAuthStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearching, setIsSearching] = useState(false);
//   const isHomePage = location.pathname === '/';

//   if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password'|| location.pathname === '/reset-password' ) {
//     return null;
//   }

//   const handleSignOut = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     window.location.href = '/signin';
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     if (isNotificationsOpen) setIsNotificationsOpen(false);
//   };

//   const toggleNotifications = () => {
//     setIsNotificationsOpen(!isNotificationsOpen);
//     if (isMobileMenuOpen) setIsMobileMenuOpen(false);
//   };



//   const clearSearch = () => {
//     setSearchQuery("");
//     setIsSearching(false);
//     onSearch(null, false);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     setIsSearching(value.trim().length > 0);
    
//     if (!value.trim()) {
//       clearSearch();
//     }
//   };
  
//   const handleSearchClick = async () => {
//     if (!searchQuery.trim()) {
//       clearSearch();
//       return;
//     }
  
//     try {
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         console.error("No auth token found");
//         return;
//       }
  
//       const paramKey = searchQuery.includes("@") ? "email" : "username";
  
//       const response = await api.get<SearchResponse>(`/auth/search_posts?${paramKey}=${encodeURIComponent(searchQuery)}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       if (response.data.detail) {
//         // If there's an error message in the response
//         onSearch(null, true, response.data.detail);
//       } else if (response.data.posts) {
//         // If there are posts in the response
//         onSearch(response.data.posts, true);
//       } else {
//         // If the response is empty
//         onSearch([], true);
//       }
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.detail || "Search failed";
//       onSearch(null, true, errorMessage);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       handleSearchClick();
//     }
//   };


 
  

//   return (
//     <>
//       <nav className="bg-white shadow-sm p-2 fixed w-full top-0 z-40">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             {user && (
//               <button 
//                 onClick={toggleMobileMenu}
//                 className="lg:hidden p-2 hover:bg-gray-50 rounded-lg"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="menu-tooltip"
//                 data-tooltip-content="Menu"
//               >
//                 {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             )}

//             <Link 
//               to="/" 
//               className="text-2xl font-bold"
//               style={{ color: themeColors.primary }}
//               data-tooltip-id="home-logo-tooltip"
//               data-tooltip-content="Home"
//             >
//               Family Creatives
//             </Link>
//           </div>

//           {user && isHomePage && (
//             <div className="hidden md:flex flex-1 max-w-xl mx-4">
//               <div className="relative w-full">
//                 <button
//                   onClick={handleSearchClick}
//                   className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
//                     isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
//                   }`}
//                   disabled={!isSearching}
//                 >
//                   <Search className="w-5 h-5" />
//                 </button>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Search posts..."
//                   className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={clearSearch}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <XCircle className="w-5 h-5" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
          
          
//           {user ? (
//             <div className="hidden lg:flex items-center space-x-6">
//               <Link 
//                 to="/" 
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="home-tooltip"
//                 data-tooltip-content="Home"
//               >
//                 <Home className="w-6 h-6" />
//               </Link>
             
//               {isAdmin && (
//                 <Link 
//                   to="/admin" 
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="admin-tooltip"
//                   data-tooltip-content="Admin Dashboard"
//                 >
//                   <Shield className="w-6 h-6" />
//                 </Link>
//               )}
//               <button 
//                 onClick={toggleNotifications}
//                 className="hover:bg-gray-50 p-2 rounded-lg relative transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="notifications-tooltip"
//                 data-tooltip-content="Notifications"
//               >
//                 <Bell className="w-6 h-6" />
//               </button>
//               <Link 
//                 to="/profile" 
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="profile-tooltip"
//                 data-tooltip-content="Profile"
//               >
//                 <User className="w-6 h-6" />
//               </Link>
//               <Link 
//                 to="/settings" 
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="settings-tooltip"
//                 data-tooltip-content="Settings"
//               >
//                 <Settings className="w-6 h-6" />
//               </Link>
//               <button
//                 onClick={handleSignOut}
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="logout-tooltip"
//                 data-tooltip-content="Sign Out"
//               >
//                 <LogOut className="w-6 h-6" />
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center space-x-4">
//               <Link 
//                 to="/signin" 
//                 className="hover:underline"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="signin-tooltip"
//                 data-tooltip-content="Sign In"
//               >
//                 Sign In
//               </Link>
//               <Link 
//                 to="/signup" 
//                 className="px-4 py-1 rounded-md font-semibold text-white hover:opacity-90 transition-opacity"
//                 style={{ backgroundColor: themeColors.primary }}
//                 data-tooltip-id="signup-tooltip"
//                 data-tooltip-content="Create Account"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>

//         {user && isHomePage && (
//           <div className="md:hidden mt-2 px-2">
//             <div className="relative">
//               <button
//                 onClick={handleSearchClick}
//                 className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
//                   isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
//                 }`}
//                 disabled={!isSearching}
//                 data-tooltip-id="search-mobile-tooltip"
//                 data-tooltip-content={isSearching ? "Click to search" : "Type to enable search"}
//               >
//                 <Search className="w-5 h-5" />
//               </button>
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Search posts..."
//                 className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   data-tooltip-id="clear-search-mobile-tooltip"
//                   data-tooltip-content="Clear search"
//                 >
//                   <XCircle className="w-5 h-5" />
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>

//       {user && isMobileMenuOpen && (
//         <div 
//           className="fixed inset-0 z-30 lg:hidden"
//           style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//           onClick={toggleMobileMenu}
//         >
//           <div 
//             className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl"
//             onClick={e => e.stopPropagation()}
//           >
//             <div className="p-4 space-y-4">
//               <Link 
//                 to="/" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <Home className="w-5 h-5" />
//                 <span>Home</span>
//               </Link>
              
//               {isAdmin && (
//                 <Link 
//                   to="/admin" 
//                   className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <Shield className="w-5 h-5" />
//                   <span>Admin</span>
//                 </Link>
//               )}
//               <button 
//                 onClick={toggleNotifications}
//                 className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//               >
//                 <Bell className="w-5 h-5" />
//                 <span>Notifications</span>
//               </button>
//               <Link 
//                 to="/profile" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <User className="w-5 h-5" />
//                 <span>Profile</span>
//               </Link>
//               <Link 
//                 to="/settings" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <Settings className="w-5 h-5" />
//                 <span>Settings</span>
//               </Link>
//               <button
//                 onClick={handleSignOut}
//                 className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//               >
//                 <LogOut className="w-5 h-5" />
//                 <span>Sign Out</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <NotificationSidebar 
//         isOpen={isNotificationsOpen} 
//         onClose={() => setIsNotificationsOpen(false)} 
//       />

//       <Tooltip id="menu-tooltip" place="right" />
//       <Tooltip id="home-logo-tooltip" place="right" />
//       <Tooltip id="home-tooltip" place="bottom" />
//       <Tooltip id="admin-tooltip" place="bottom" />
//       <Tooltip id="notifications-tooltip" place="bottom" />
//       <Tooltip id="profile-tooltip" place="bottom" />
//       <Tooltip id="settings-tooltip" place="bottom" />
//       <Tooltip id="logout-tooltip" place="bottom" />
//       <Tooltip id="signin-tooltip" place="bottom" />
//       <Tooltip id="signup-tooltip" place="bottom" />
//     </>
//   );
// };


// correct below

// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Home, Video, Bell, User, LogOut, Settings, Shield, Menu, X, Search, XCircle } from 'lucide-react';
// import { NotificationSidebar } from './NotificationSidebar';
// import axios from 'axios';
// import { Tooltip } from 'react-tooltip';

// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface Post {
//   id: number;
//   user_id: number;
//   username: string;
//   title: string;
//   category: string;
//   content: string;
//   media_path?: string;
//   isVideo: boolean;
//   isImage: boolean;
//   isAudio: boolean;
//   isNoMedia: boolean;
//   category_id: number;
//   isVideoApproved: boolean;
//   isVideoRejected: boolean;
//   is_public: boolean;
//   created_at: string;
//   updated_at: string;
// }

// interface SearchResponse {
//   posts?: Post[];
//   detail?: string;
// }

// interface TopBarProps {
//   onSearch: (results: Post[] | null, isActive: boolean, error?: string) => void;
// }

// export const TopBar: React.FC<TopBarProps> = ({ onSearch }) => {
//   const { user, isAdmin } = useAuthStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearching, setIsSearching] = useState(false);
//   const isHomePage = location.pathname === '/';

//   if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password'|| location.pathname === '/reset-password') {
//     return null;
//   }

//   const handleSignOut = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     window.location.href = '/signin';
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     if (isNotificationsOpen) setIsNotificationsOpen(false);
//   };

//   const toggleNotifications = () => {
//     setIsNotificationsOpen(!isNotificationsOpen);
//     if (isMobileMenuOpen) setIsMobileMenuOpen(false);
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//     setIsSearching(false);
//     onSearch(null, false);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     setIsSearching(value.trim().length > 0);
    
//     if (!value.trim()) {
//       clearSearch();
//     }
//   };

//   const handleSearchClick = async () => {
//     if (!searchQuery.trim()) {
//       clearSearch();
//       return;
//     }
  
//     try {
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         console.error("No auth token found");
//         return;
//       }
  
//       const paramKey = searchQuery.includes("@") ? "email" : "username";
  
//       const response = await api.get<SearchResponse>(`/auth/search_posts?${paramKey}=${encodeURIComponent(searchQuery)}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       if (response.data.detail) {
//         onSearch(null, true, response.data.detail);
//       } else if (response.data.posts) {
//         onSearch(response.data.posts, true, null);
//       } else {
//         onSearch([], true, null);
//       }
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.detail || "Search failed";
//       onSearch(null, true, errorMessage);
//     }
//   };
  
//   // const handleSearchClick = async () => {
//   //   if (!searchQuery.trim()) {
//   //     clearSearch();
//   //     return;
//   //   }
  
//   //   try {
//   //     const token = localStorage.getItem("authToken");
//   //     if (!token) {
//   //       console.error("No auth token found");
//   //       return;
//   //     }
  
//   //     const paramKey = searchQuery.includes("@") ? "email" : "username";
  
//   //     const response = await api.get<SearchResponse>(`/auth/search_posts?${paramKey}=${encodeURIComponent(searchQuery)}`, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     });
  
//   //     if (response.data.detail) {
//   //       onSearch(null, true, response.data.detail);
//   //     } else if (response.data.posts) {
//   //       onSearch(response.data.posts, true);
//   //     } else {
//   //       onSearch([], true);
//   //     }
//   //   } catch (error: any) {
//   //     const errorMessage = error.response?.data?.detail || "Search failed";
//   //     onSearch(null, true, errorMessage);
//   //   }
//   // };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       handleSearchClick();
//     }
//   };


 
  

//   return (
//     <>
//       <nav className="bg-white shadow-sm p-2 fixed w-full top-0 z-40">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             {user && (
//               <button 
//                 onClick={toggleMobileMenu}
//                 className="lg:hidden p-2 hover:bg-gray-50 rounded-lg"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="menu-tooltip"
//                 data-tooltip-content="Menu"
//               >
//                 {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             )}

//             <Link 
//               to="/" 
//               className="text-2xl font-bold"
//               style={{ color: themeColors.primary }}
//               data-tooltip-id="home-logo-tooltip"
//               data-tooltip-content="Home"
//             >
//               Family Creatives
//             </Link>
//           </div>

//           {user && isHomePage && (
//             <div className="hidden md:flex flex-1 max-w-xl mx-4">
//               <div className="relative w-full">
//                 <button
//                   onClick={handleSearchClick}
//                   className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
//                     isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
//                   }`}
//                   disabled={!isSearching}
//                 >
//                   <Search className="w-5 h-5" />
//                 </button>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Search posts..."
//                   className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={clearSearch}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <XCircle className="w-5 h-5" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
          
          
//           {user ? (
//             <div className="hidden lg:flex items-center space-x-6">
//               <Link 
//                 to="/" 
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="home-tooltip"
//                 data-tooltip-content="Home"
//               >
//                 <Home className="w-6 h-6" />
//               </Link>
             
//               {isAdmin && (
//                 <Link 
//                   to="/admin" 
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="admin-tooltip"
//                   data-tooltip-content="Admin Dashboard"
//                 >
//                   <Shield className="w-6 h-6" />
//                 </Link>
//               )}
//               <button 
//                 onClick={toggleNotifications}
//                 className="hover:bg-gray-50 p-2 rounded-lg relative transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="notifications-tooltip"
//                 data-tooltip-content="Notifications"
//               >
//                 <Bell className="w-6 h-6" />
//               </button>
//               <Link 
//                 to="/profile" 
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="profile-tooltip"
//                 data-tooltip-content="Profile"
//               >
//                 <User className="w-6 h-6" />
//               </Link>
//               <Link 
//                 to="/settings" 
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="settings-tooltip"
//                 data-tooltip-content="Settings"
//               >
//                 <Settings className="w-6 h-6" />
//               </Link>
//               <button
//                 onClick={handleSignOut}
//                 className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="logout-tooltip"
//                 data-tooltip-content="Sign Out"
//               >
//                 <LogOut className="w-6 h-6" />
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center space-x-4">
//               <Link 
//                 to="/signin" 
//                 className="hover:underline"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="signin-tooltip"
//                 data-tooltip-content="Sign In"
//               >
//                 Sign In
//               </Link>
//               <Link 
//                 to="/signup" 
//                 className="px-4 py-1 rounded-md font-semibold text-white hover:opacity-90 transition-opacity"
//                 style={{ backgroundColor: themeColors.primary }}
//                 data-tooltip-id="signup-tooltip"
//                 data-tooltip-content="Create Account"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>

//         {user && isHomePage && (
//           <div className="md:hidden mt-2 px-2">
//             <div className="relative">
//               <button
//                 onClick={handleSearchClick}
//                 className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
//                   isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
//                 }`}
//                 disabled={!isSearching}
//                 data-tooltip-id="search-mobile-tooltip"
//                 data-tooltip-content={isSearching ? "Click to search" : "Type to enable search"}
//               >
//                 <Search className="w-5 h-5" />
//               </button>
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Search posts..."
//                 className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   data-tooltip-id="clear-search-mobile-tooltip"
//                   data-tooltip-content="Clear search"
//                 >
//                   <XCircle className="w-5 h-5" />
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>

//       {user && isMobileMenuOpen && (
//         <div 
//           className="fixed inset-0 z-30 lg:hidden"
//           style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//           onClick={toggleMobileMenu}
//         >
//           <div 
//             className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl"
//             onClick={e => e.stopPropagation()}
//           >
//             <div className="p-4 space-y-4">
//               <Link 
//                 to="/" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <Home className="w-5 h-5" />
//                 <span>Home</span>
//               </Link>
              
//               {isAdmin && (
//                 <Link 
//                   to="/admin" 
//                   className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <Shield className="w-5 h-5" />
//                   <span>Admin</span>
//                 </Link>
//               )}
//               <button 
//                 onClick={toggleNotifications}
//                 className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//               >
//                 <Bell className="w-5 h-5" />
//                 <span>Notifications</span>
//               </button>
//               <Link 
//                 to="/profile" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <User className="w-5 h-5" />
//                 <span>Profile</span>
//               </Link>
//               <Link 
//                 to="/settings" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <Settings className="w-5 h-5" />
//                 <span>Settings</span>
//               </Link>
//               <button
//                 onClick={handleSignOut}
//                 className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//               >
//                 <LogOut className="w-5 h-5" />
//                 <span>Sign Out</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <NotificationSidebar 
//         isOpen={isNotificationsOpen} 
//         onClose={() => setIsNotificationsOpen(false)} 
//       />

//       <Tooltip id="menu-tooltip" place="right" />
//       <Tooltip id="home-logo-tooltip" place="right" />
//       <Tooltip id="home-tooltip" place="bottom" />
//       <Tooltip id="admin-tooltip" place="bottom" />
//       <Tooltip id="notifications-tooltip" place="bottom" />
//       <Tooltip id="profile-tooltip" place="bottom" />
//       <Tooltip id="settings-tooltip" place="bottom" />
//       <Tooltip id="logout-tooltip" place="bottom" />
//       <Tooltip id="signin-tooltip" place="bottom" />
//       <Tooltip id="signup-tooltip" place="bottom" />
//     </>
//   );
// };






// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Home, Bell, User, LogOut, Settings, Shield, Search, XCircle } from 'lucide-react';
// import { NotificationSidebar } from './NotificationSidebar';
// import axios from 'axios';
// import { Tooltip } from 'react-tooltip';

// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface Post {
//   id: number;
//   user_id: number;
//   username: string;
//   title: string;
//   category: string;
//   content: string;
//   media_path?: string;
//   isVideo: boolean;
//   isImage: boolean;
//   isAudio: boolean;
//   isNoMedia: boolean;
//   category_id: number;
//   isVideoApproved: boolean;
//   isVideoRejected: boolean;
//   is_public: boolean;
//   created_at: string;
//   updated_at: string;
// }

// interface SearchResponse {
//   posts?: Post[];
//   detail?: string;
// }

// interface TopBarProps {
//   onSearch: (results: Post[] | null, isActive: boolean, error?: string) => void;
// }

// export const TopBar: React.FC<TopBarProps> = ({ onSearch }) => {
//   const { user, isAdmin } = useAuthStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearching, setIsSearching] = useState(false);
//   const [showBottomNav, setShowBottomNav] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const isHomePage = location.pathname === '/';

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       setShowBottomNav(currentScrollY < lastScrollY || currentScrollY < 50);
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [lastScrollY]);

//   if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password' || location.pathname === '/reset-password') {
//     return null;
//   }

//   const handleSignOut = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     window.location.href = '/signin';
//   };

//   const toggleNotifications = () => {
//     setIsNotificationsOpen(!isNotificationsOpen);
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//     setIsSearching(false);
//     onSearch(null, false);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     setIsSearching(value.trim().length > 0);
    
//     if (!value.trim()) {
//       clearSearch();
//     }
//   };

//   const handleSearchClick = async () => {
//     if (!searchQuery.trim()) {
//       clearSearch();
//       return;
//     }
  
//     try {
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         console.error("No auth token found");
//         return;
//       }
  
//       const paramKey = searchQuery.includes("@") ? "email" : "username";
  
//       const response = await api.get<SearchResponse>(`/auth/search_posts?${paramKey}=${encodeURIComponent(searchQuery)}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       if (response.data.detail) {
//         onSearch(null, true, response.data.detail);
//       } else if (response.data.posts) {
//         onSearch(response.data.posts, true, null);
//       } else {
//         onSearch([], true, null);
//       }
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.detail || "Search failed";
//       onSearch(null, true, errorMessage);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       handleSearchClick();
//     }
//   };

//   return (
//     <>
//       <nav className="bg-white shadow-sm p-2 fixed w-full top-0 z-40">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <Link 
//               to="/" 
//               className="text-2xl font-bold"
//               style={{ color: themeColors.primary }}
//               data-tooltip-id="home-logo-tooltip"
//               data-tooltip-content="Home"
//             >
//               Family Creatives
//             </Link>
//           </div>

//           {user && isHomePage && (
//             <div className="hidden md:flex flex-1 max-w-xl mx-4">
//               <div className="relative w-full">
//                 <button
//                   onClick={handleSearchClick}
//                   className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
//                     isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
//                   }`}
//                   disabled={!isSearching}
//                 >
//                   <Search className="w-5 h-5" />
//                 </button>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Search posts..."
//                   className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={clearSearch}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <XCircle className="w-5 h-5" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
          
//           {user ? (
//             <>
//               <div className="hidden lg:flex items-center space-x-6">
//                 <Link 
//                   to="/" 
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="home-tooltip"
//                   data-tooltip-content="Home"
//                 >
//                   <Home className="w-6 h-6" />
//                 </Link>
//                 {isAdmin && (
//                   <Link 
//                     to="/admin" 
//                     className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                     style={{ color: themeColors.primary }}
//                     data-tooltip-id="admin-tooltip"
//                     data-tooltip-content="Admin Dashboard"
//                   >
//                     <Shield className="w-6 h-6" />
//                   </Link>
//                 )}
//                 <button 
//                   onClick={toggleNotifications}
//                   className="hover:bg-gray-50 p-2 rounded-lg relative transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="notifications-tooltip"
//                   data-tooltip-content="Notifications"
//                 >
//                   <Bell className="w-6 h-6" />
//                 </button>
//                 <Link 
//                   to="/profile" 
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="profile-tooltip"
//                   data-tooltip-content="Profile"
//                 >
//                   <User className="w-6 h-6" />
//                 </Link>
//                 <Link 
//                   to="/settings" 
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="settings-tooltip"
//                   data-tooltip-content="Settings"
//                 >
//                   <Settings className="w-6 h-6" />
//                 </Link>
//                 <button
//                   onClick={handleSignOut}
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="logout-tooltip"
//                   data-tooltip-content="Sign Out"
//                 >
//                   <LogOut className="w-6 h-6" />
//                 </button>
//               </div>
//               <div className="lg:hidden">
//                 <button
//                   onClick={handleSignOut}
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="logout-mobile-tooltip"
//                   data-tooltip-content="Sign Out"
//                 >
//                   <LogOut className="w-6 h-6" />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="flex items-center space-x-4">
//               <Link 
//                 to="/signin" 
//                 className="hover:underline"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="signin-tooltip"
//                 data-tooltip-content="Sign In"
//               >
//                 Sign In
//               </Link>
//               <Link 
//                 to="/signup" 
//                 className="px-4 py-1 rounded-md font-semibold text-white hover:opacity-90 transition-opacity"
//                 style={{ backgroundColor: themeColors.primary }}
//                 data-tooltip-id="signup-tooltip"
//                 data-tooltip-content="Create Account"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>

//         {user && isHomePage && (
//           <div className="md:hidden mt-2 px-2">
//             <div className="relative">
//               <button
//                 onClick={handleSearchClick}
//                 className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
//                   isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
//                 }`}
//                 disabled={!isSearching}
//               >
//                 <Search className="w-5 h-5" />
//               </button>
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Search posts..."
//                 className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <XCircle className="w-5 h-5" />
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Bottom Navigation Bar for Mobile/Medium Screens */}
//       {user && (
//         <div 
//           className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-t-lg z-40 transition-transform duration-300 ${
//             showBottomNav ? 'translate-y-0' : 'translate-y-full'
//           }`}
//         >
//           <div className="flex justify-around items-center p-2">
//             <Link 
//               to="/" 
//               className="flex flex-col items-center p-2 text-gray-700"
//               style={{ color: location.pathname === '/' ? themeColors.primary : undefined }}
//             >
//               <Home className="w-6 h-6" />
//               <span className="text-xs mt-1">Home</span>
//             </Link>
            
//             {isAdmin && (
//               <Link 
//                 to="/admin" 
//                 className="flex flex-col items-center p-2 text-gray-700"
//                 style={{ color: location.pathname === '/admin' ? themeColors.primary : undefined }}
//               >
//                 <Shield className="w-6 h-6" />
//                 <span className="text-xs mt-1">Admin</span>
//               </Link>
//             )}
            
//             <button 
//               onClick={toggleNotifications}
//               className="flex flex-col items-center p-2 text-gray-700"
//               style={{ color: isNotificationsOpen ? themeColors.primary : undefined }}
//             >
//               <Bell className="w-6 h-6" />
//               <span className="text-xs mt-1">Alerts</span>
//             </button>
            
//             <Link 
//               to="/profile" 
//               className="flex flex-col items-center p-2 text-gray-700"
//               style={{ color: location.pathname === '/profile' ? themeColors.primary : undefined }}
//             >
//               <User className="w-6 h-6" />
//               <span className="text-xs mt-1">Profile</span>
//             </Link>
            
//             <Link 
//               to="/settings" 
//               className="flex flex-col items-center p-2 text-gray-700"
//               style={{ color: location.pathname === '/settings' ? themeColors.primary : undefined }}
//             >
//               <Settings className="w-6 h-6" />
//               <span className="text-xs mt-1">Settings</span>
//             </Link>
//           </div>
//         </div>
//       )}

//       <NotificationSidebar 
//         isOpen={isNotificationsOpen} 
//         onClose={() => setIsNotificationsOpen(false)} 
//       />

//       <Tooltip id="home-logo-tooltip" place="right" />
//       <Tooltip id="home-tooltip" place="bottom" />
//       <Tooltip id="admin-tooltip" place="bottom" />
//       <Tooltip id="notifications-tooltip" place="bottom" />
//       <Tooltip id="profile-tooltip" place="bottom" />
//       <Tooltip id="settings-tooltip" place="bottom" />
//       <Tooltip id="logout-tooltip" place="bottom" />
//       <Tooltip id="logout-mobile-tooltip" place="bottom" />
//       <Tooltip id="signin-tooltip" place="bottom" />
//       <Tooltip id="signup-tooltip" place="bottom" />
//     </>
//   );
// };

// correct above



// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Home, Bell, User, LogOut, Settings, Shield, Search, XCircle } from 'lucide-react';
// import { NotificationSidebar } from './NotificationSidebar';
// import axios from 'axios';
// import { Tooltip } from 'react-tooltip';

// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface Post {
//   id: number;
//   user_id: number;
//   username: string;
//   title: string;
//   category: string;
//   content: string;
//   media_path?: string;
//   isVideo: boolean;
//   isImage: boolean;
//   isAudio: boolean;
//   isNoMedia: boolean;
//   category_id: number;
//   isVideoApproved: boolean;
//   isVideoRejected: boolean;
//   is_public: boolean;
//   created_at: string;
//   updated_at: string;
// }

// interface SearchResponse {
//   posts?: Post[];
//   detail?: string;
// }

// interface TopBarProps {
//   onSearch: (results: Post[] | null, isActive: boolean, error?: string) => void;
//   selectedCategoryId?: number | null;
// }

// export const TopBar: React.FC<TopBarProps> = ({ onSearch ,selectedCategoryId }) => {
//   const { user, isAdmin } = useAuthStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearching, setIsSearching] = useState(false);
//   const [showBottomNav, setShowBottomNav] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const isHomePage = location.pathname === '/';

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       setShowBottomNav(currentScrollY < lastScrollY || currentScrollY < 50);
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [lastScrollY]);

//   if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password' || location.pathname === '/reset-password') {
//     return null;
//   }

//   const handleSignOut = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     window.location.href = '/signin';
//   };

//   const toggleNotifications = () => {
//     setIsNotificationsOpen(!isNotificationsOpen);
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//     setIsSearching(false);
//     onSearch(null, false);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     setIsSearching(value.trim().length > 0);
    
//     if (!value.trim()) {
//       clearSearch();
//     }
//   };
//   const handleSearchClick = async () => {
//     if (!searchQuery.trim()) {
//       clearSearch();
//       return;
//     }

//     try {
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         console.error("No auth token found");
//         return;
//       }

//       const paramKey = searchQuery.includes("@") ? "email" : "username";
//       let url = `/auth/search_posts?${paramKey}=${encodeURIComponent(searchQuery)}`;
      
//       if (selectedCategoryId) {
//         url += `&category_id=${selectedCategoryId}`;
//       }

//       const response = await api.get<SearchResponse>(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.detail) {
//         onSearch(null, true, response.data.detail);
//       } else if (response.data.posts) {
//         onSearch(response.data.posts, true);
//       } else {
//         onSearch([], true);
//       }
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.detail || "Search failed";
//       onSearch(null, true, errorMessage);
//     }
//   };

//   // const handleSearchClick = async () => {
//   //   if (!searchQuery.trim()) {
//   //     clearSearch();
//   //     return;
//   //   }
  
//   //   try {
//   //     const token = localStorage.getItem("authToken");
//   //     if (!token) {
//   //       console.error("No auth token found");
//   //       return;
//   //     }
  
//   //     const paramKey = searchQuery.includes("@") ? "email" : "username";
//   //     let url = `/auth/search_posts?${paramKey}=${encodeURIComponent(searchQuery)}`;
      
//   //     // Add category_id to the search if it's selected
//   //     if (selectedCategoryId) {
//   //       url += `&category_id=${selectedCategoryId}`;
//   //     }
  
//   //     const response = await api.get<SearchResponse>(url, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     });
  
//   //     if (response.data.detail) {
//   //       onSearch(null, true, response.data.detail);
//   //     } else if (response.data.posts) {
//   //       onSearch(response.data.posts, true, null);
//   //     } else {
//   //       onSearch([], true, null);
//   //     }
//   //   } catch (error: any) {
//   //     const errorMessage = error.response?.data?.detail || "Search failed";
//   //     onSearch(null, true, errorMessage);
//   //   }
//   // };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       handleSearchClick();
//     }
//   };


//   // const handleSearchClick = async () => {
//   //   if (!searchQuery.trim()) {
//   //     clearSearch();
//   //     return;
//   //   }
  
//   //   try {
//   //     const token = localStorage.getItem("authToken");
//   //     if (!token) {
//   //       console.error("No auth token found");
//   //       return;
//   //     }
  
//   //     const paramKey = searchQuery.includes("@") ? "email" : "username";
  
//   //     const response = await api.get<SearchResponse>(`/auth/search_posts?${paramKey}=${encodeURIComponent(searchQuery)}`, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     });
  
//   //     if (response.data.detail) {
//   //       onSearch(null, true, response.data.detail);
//   //     } else if (response.data.posts) {
//   //       onSearch(response.data.posts, true, null);
//   //     } else {
//   //       onSearch([], true, null);
//   //     }
//   //   } catch (error: any) {
//   //     const errorMessage = error.response?.data?.detail || "Search failed";
//   //     onSearch(null, true, errorMessage);
//   //   }
//   // };

//   // const handleKeyPress = (e: React.KeyboardEvent) => {
//   //   if (e.key === 'Enter') {
//   //     handleSearchClick();
//   //   }
//   // };

//   return (
//     <>
//       <nav className="bg-white shadow-sm p-2 fixed w-full top-0 z-40">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <Link 
//               to="/" 
//               className="text-2xl font-bold"
//               style={{ color: themeColors.primary }}
//               data-tooltip-id="home-logo-tooltip"
//               data-tooltip-content="Home"
//             >
//               Family Creatives
//             </Link>
//           </div>

//           {user && isHomePage && (
//             <div className="hidden md:flex flex-1 max-w-xl mx-4">
//               <div className="relative w-full">
//                 <button
//                   onClick={handleSearchClick}
//                   className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
//                     isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
//                   }`}
//                   disabled={!isSearching}
//                 >
//                   <Search className="w-5 h-5" />
//                 </button>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Search posts..."
//                   className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={clearSearch}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <XCircle className="w-5 h-5" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
          
//           {user ? (
//             <>
//               <div className="hidden lg:flex items-center space-x-6">
//                 <Link 
//                   to="/" 
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="home-tooltip"
//                   data-tooltip-content="Home"
//                 >
//                   <Home className="w-6 h-6" />
//                 </Link>
//                 {isAdmin && (
//                   <Link 
//                     to="/admin" 
//                     className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                     style={{ color: themeColors.primary }}
//                     data-tooltip-id="admin-tooltip"
//                     data-tooltip-content="Admin Dashboard"
//                   >
//                     <Shield className="w-6 h-6" />
//                   </Link>
//                 )}
//                 <button 
//                   onClick={toggleNotifications}
//                   className="hover:bg-gray-50 p-2 rounded-lg relative transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="notifications-tooltip"
//                   data-tooltip-content="Notifications"
//                 >
//                   <Bell className="w-6 h-6" />
//                 </button>
//                 <Link 
//                   to="/profile" 
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="profile-tooltip"
//                   data-tooltip-content="Profile"
//                 >
//                   <User className="w-6 h-6" />
//                 </Link>
//                 <Link 
//                   to="/settings" 
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="settings-tooltip"
//                   data-tooltip-content="Settings"
//                 >
//                   <Settings className="w-6 h-6" />
//                 </Link>
//                 <button
//                   onClick={handleSignOut}
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="logout-tooltip"
//                   data-tooltip-content="Sign Out"
//                 >
//                   <LogOut className="w-6 h-6" />
//                 </button>
//               </div>
//               <div className="lg:hidden">
//                 <button
//                   onClick={handleSignOut}
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="logout-mobile-tooltip"
//                   data-tooltip-content="Sign Out"
//                 >
//                   <LogOut className="w-6 h-6" />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="flex items-center space-x-4">
//               <Link 
//                 to="/signin" 
//                 className="hover:underline"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="signin-tooltip"
//                 data-tooltip-content="Sign In"
//               >
//                 Sign In
//               </Link>
//               <Link 
//                 to="/signup" 
//                 className="px-4 py-1 rounded-md font-semibold text-white hover:opacity-90 transition-opacity"
//                 style={{ backgroundColor: themeColors.primary }}
//                 data-tooltip-id="signup-tooltip"
//                 data-tooltip-content="Create Account"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>

//         {user && isHomePage && (
//           <div className="md:hidden mt-2 px-2">
//             <div className="relative">
//               <button
//                 onClick={handleSearchClick}
//                 className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
//                   isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
//                 }`}
//                 disabled={!isSearching}
//               >
//                 <Search className="w-5 h-5" />
//               </button>
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Search posts..."
//                 className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <XCircle className="w-5 h-5" />
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Bottom Navigation Bar for Mobile/Medium Screens */}
//       {user && (
//         <div 
//           className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-t-lg z-40 transition-transform duration-300 ${
//             showBottomNav ? 'translate-y-0' : 'translate-y-full'
//           }`}
//         >
//           <div className="flex justify-around items-center p-2">
//             <Link 
//               to="/" 
//               className="flex flex-col items-center p-2 text-gray-700"
//               style={{ color: location.pathname === '/' ? themeColors.primary : undefined }}
//             >
//               <Home className="w-6 h-6" />
//               <span className="text-xs mt-1">Home</span>
//             </Link>
            
//             {isAdmin && (
//               <Link 
//                 to="/admin" 
//                 className="flex flex-col items-center p-2 text-gray-700"
//                 style={{ color: location.pathname === '/admin' ? themeColors.primary : undefined }}
//               >
//                 <Shield className="w-6 h-6" />
//                 <span className="text-xs mt-1">Admin</span>
//               </Link>
//             )}
            
//             <button 
//               onClick={toggleNotifications}
//               className="flex flex-col items-center p-2 text-gray-700"
//               style={{ color: isNotificationsOpen ? themeColors.primary : undefined }}
//             >
//               <Bell className="w-6 h-6" />
//               <span className="text-xs mt-1">Alerts</span>
//             </button>
            
//             <Link 
//               to="/profile" 
//               className="flex flex-col items-center p-2 text-gray-700"
//               style={{ color: location.pathname === '/profile' ? themeColors.primary : undefined }}
//             >
//               <User className="w-6 h-6" />
//               <span className="text-xs mt-1">Profile</span>
//             </Link>
            
//             <Link 
//               to="/settings" 
//               className="flex flex-col items-center p-2 text-gray-700"
//               style={{ color: location.pathname === '/settings' ? themeColors.primary : undefined }}
//             >
//               <Settings className="w-6 h-6" />
//               <span className="text-xs mt-1">Settings</span>
//             </Link>
//           </div>
//         </div>
//       )}

//       <NotificationSidebar 
//         isOpen={isNotificationsOpen} 
//         onClose={() => setIsNotificationsOpen(false)} 
//       />

//       <Tooltip id="home-logo-tooltip" place="right" />
//       <Tooltip id="home-tooltip" place="bottom" />
//       <Tooltip id="admin-tooltip" place="bottom" />
//       <Tooltip id="notifications-tooltip" place="bottom" />
//       <Tooltip id="profile-tooltip" place="bottom" />
//       <Tooltip id="settings-tooltip" place="bottom" />
//       <Tooltip id="logout-tooltip" place="bottom" />
//       <Tooltip id="logout-mobile-tooltip" place="bottom" />
//       <Tooltip id="signin-tooltip" place="bottom" />
//       <Tooltip id="signup-tooltip" place="bottom" />
//     </>
//   );
// };

// trialabove



// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Home, Bell, User, LogOut, Settings, Shield, Search, XCircle } from 'lucide-react';
// import { NotificationSidebar } from './NotificationSidebar';
// import axios from 'axios';
// import { Tooltip } from 'react-tooltip';

// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface Post {
//   id: number;
//   user_id: number;
//   username: string;
//   title: string;
//   category: string;
//   content: string;
//   media_path?: string;
//   isVideo: boolean;
//   isImage: boolean;
//   isAudio: boolean;
//   isNoMedia: boolean;
//   category_id: number;
//   isVideoApproved: boolean;
//   isVideoRejected: boolean;
//   is_public: boolean;
//   created_at: string;
//   updated_at: string;
// }

// interface SearchResponse {
//   posts?: Post[];
//   detail?: string;
// }

// interface TopBarProps {
//   onSearch: (results: Post[] | null, isActive: boolean, error?: string) => void;
//   selectedCategoryId?: number | null;
// }

// export const TopBar: React.FC<TopBarProps> = ({ onSearch, selectedCategoryId }) => {
//   const { user, isAdmin } = useAuthStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearching, setIsSearching] = useState(false);
//   const [showBottomNav, setShowBottomNav] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);
//   const isHomePage = location.pathname === '/';

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobileView(window.innerWidth < 1024);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (isMobileView) {
//       setIsNotificationsOpen(false);
//     }
//   }, [location.pathname, isMobileView]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       setShowBottomNav(currentScrollY < lastScrollY || currentScrollY < 50);
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [lastScrollY]);

//   if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password' || location.pathname === '/reset-password') {
//     return null;
//   }

//   const handleSignOut = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     window.location.href = '/signin';
//   };

//   const toggleNotifications = () => {
//     if (!isMobileView) {
//       setIsNotificationsOpen(!isNotificationsOpen);
//     } else {
//       setIsNotificationsOpen(true);
//     }
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//     setIsSearching(false);
//     onSearch(null, false);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     setIsSearching(value.trim().length > 0);
    
//     if (!value.trim()) {
//       clearSearch();
//     }
//   };

//   const handleSearchClick = async () => {
//     if (!searchQuery.trim()) {
//       clearSearch();
//       return;
//     }

//     try {
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         console.error("No auth token found");
//         return;
//       }

//       const paramKey = searchQuery.includes("@") ? "email" : "username";
//       let url = `/auth/search_posts?${paramKey}=${encodeURIComponent(searchQuery)}`;
      
//       if (selectedCategoryId) {
//         url += `&category_id=${selectedCategoryId}`;
//       }

//       const response = await api.get<SearchResponse>(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.detail) {
//         onSearch(null, true, response.data.detail);
//       } else if (response.data.posts) {
//         onSearch(response.data.posts, true);
//       } else {
//         onSearch([], true);
//       }
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.detail || "Search failed";
//       onSearch(null, true, errorMessage);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       handleSearchClick();
//     }
//   };

//   return (
//     <>
//       <nav className="bg-white shadow-sm p-2 fixed w-full top-0 z-40">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <Link 
//               to="/" 
//               className="text-2xl font-bold"
//               style={{ color: themeColors.primary }}
//               data-tooltip-id="home-logo-tooltip"
//               data-tooltip-content="Home"
//             >
//               Family Creatives
//             </Link>
//           </div>

//           {user && isHomePage && (
//             <div className="hidden md:flex flex-1 max-w-xl mx-4">
//               <div className="relative w-full">
//                 <button
//                   onClick={handleSearchClick}
//                   className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
//                     isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
//                   }`}
//                   disabled={!isSearching}
//                 >
//                   <Search className="w-5 h-5" />
//                 </button>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   onKeyPress={handleKeyPress}
//                   placeholder="search on email, user name..."
//                   className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={clearSearch}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <XCircle className="w-5 h-5" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
          
//           {user ? (
//             <>
//               <div className="hidden lg:flex items-center space-x-6">
//                 <Link 
//                   to="/" 
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="home-tooltip"
//                   data-tooltip-content="Home"
//                 >
//                   <Home className="w-6 h-6" />
//                 </Link>
//                 {isAdmin && (
//                   <Link 
//                     to="/admin" 
//                     className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                     style={{ color: themeColors.primary }}
//                     data-tooltip-id="admin-tooltip"
//                     data-tooltip-content="Admin Dashboard"
//                   >
//                     <Shield className="w-6 h-6" />
//                   </Link>
//                 )}
//                 <button 
//                   onClick={toggleNotifications}
//                   className="hover:bg-gray-50 p-2 rounded-lg relative transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="notifications-tooltip"
//                   data-tooltip-content="Notifications"
//                 >
//                   <Bell className="w-6 h-6" />
//                 </button>
//                 <Link 
//                   to="/profile" 
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="profile-tooltip"
//                   data-tooltip-content="Profile"
//                 >
//                   <User className="w-6 h-6" />
//                 </Link>
//                 <Link 
//                   to="/settings" 
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="settings-tooltip"
//                   data-tooltip-content="Settings"
//                 >
//                   <Settings className="w-6 h-6" />
//                 </Link>
//                 <button
//                   onClick={handleSignOut}
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="logout-tooltip"
//                   data-tooltip-content="Sign Out"
//                 >
//                   <LogOut className="w-6 h-6" />
//                 </button>
//               </div>
//               <div className="lg:hidden">
//                 <button
//                   onClick={handleSignOut}
//                   className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                   style={{ color: themeColors.primary }}
//                   data-tooltip-id="logout-mobile-tooltip"
//                   data-tooltip-content="Sign Out"
//                 >
//                   <LogOut className="w-6 h-6" />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="flex items-center space-x-4">
//               <Link 
//                 to="/signin" 
//                 className="hover:underline"
//                 style={{ color: themeColors.primary }}
//                 data-tooltip-id="signin-tooltip"
//                 data-tooltip-content="Sign In"
//               >
//                 Sign In
//               </Link>
//               <Link 
//                 to="/signup" 
//                 className="px-4 py-1 rounded-md font-semibold text-white hover:opacity-90 transition-opacity"
//                 style={{ backgroundColor: themeColors.primary }}
//                 data-tooltip-id="signup-tooltip"
//                 data-tooltip-content="Create Account"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>

//         {user && isHomePage && (
//           <div className="md:hidden mt-2 px-2">
//             <div className="relative">
//               <button
//                 onClick={handleSearchClick}
//                 className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
//                   isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
//                 }`}
//                 disabled={!isSearching}
//               >
//                 <Search className="w-5 h-5" />
//               </button>
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Search on email, user name..."
//                 className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <XCircle className="w-5 h-5" />
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Bottom Navigation Bar for Mobile/Medium Screens */}
//       {user && (
//         <div 
//           className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-t-lg z-40 transition-transform duration-300 ${
//             showBottomNav ? 'translate-y-0' : 'translate-y-full'
//           }`}
//         >
//           <div className="flex justify-around items-center p-2">
//             <Link 
//               to="/" 
//               className="flex flex-col items-center p-2 text-gray-700"
//               style={{ color: location.pathname === '/' ? themeColors.primary : undefined }}
//               onClick={() => setIsNotificationsOpen(false)}
//             >
//               <Home className="w-6 h-6" />
//               <span className="text-xs mt-1">Home</span>
//             </Link>
            
//             {isAdmin && (
//               <Link 
//                 to="/admin" 
//                 className="flex flex-col items-center p-2 text-gray-700"
//                 style={{ color: location.pathname === '/admin' ? themeColors.primary : undefined }}
//                 onClick={() => setIsNotificationsOpen(false)}
//               >
//                 <Shield className="w-6 h-6" />
//                 <span className="text-xs mt-1">Admin</span>
//               </Link>
//             )}
            
//             <button 
//               onClick={toggleNotifications}
//               className="flex flex-col items-center p-2 text-gray-700"
//               style={{ color: isNotificationsOpen ? themeColors.primary : undefined }}
//             >
//               <Bell className="w-6 h-6" />
//               <span className="text-xs mt-1">Alerts</span>
//             </button>
            
//             <Link 
//               to="/profile" 
//               className="flex flex-col items-center p-2 text-gray-700"
//               style={{ color: location.pathname === '/profile' ? themeColors.primary : undefined }}
//               onClick={() => setIsNotificationsOpen(false)}
//             >
//               <User className="w-6 h-6" />
//               <span className="text-xs mt-1">Profile</span>
//             </Link>
            
//             <Link 
//               to="/settings" 
//               className="flex flex-col items-center p-2 text-gray-700"
//               style={{ color: location.pathname === '/settings' ? themeColors.primary : undefined }}
//               onClick={() => setIsNotificationsOpen(false)}
//             >
//               <Settings className="w-6 h-6" />
//               <span className="text-xs mt-1">Settings</span>
//             </Link>
//           </div>
//         </div>
//       )}

//       <NotificationSidebar 
//         isOpen={isNotificationsOpen} 
//         onClose={() => setIsNotificationsOpen(false)} 
//       />

//       <Tooltip id="home-logo-tooltip" place="right" />
//       <Tooltip id="home-tooltip" place="bottom" />
//       <Tooltip id="admin-tooltip" place="bottom" />
//       <Tooltip id="notifications-tooltip" place="bottom" />
//       <Tooltip id="profile-tooltip" place="bottom" />
//       <Tooltip id="settings-tooltip" place="bottom" />
//       <Tooltip id="logout-tooltip" place="bottom" />
//       <Tooltip id="logout-mobile-tooltip" place="bottom" />
//       <Tooltip id="signin-tooltip" place="bottom" />
//       <Tooltip id="signup-tooltip" place="bottom" />
//     </>
//   );
// };

// export default TopBar




import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import { Home, Bell, User, LogOut, Settings, Shield, Search, XCircle, Loader2 } from 'lucide-react';
import { NotificationSidebar } from './NotificationSidebar';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import toast, { Toaster } from 'react-hot-toast';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

interface Post {
  id: number;
  user_id: number;
  username: string;
  title: string;
  category: string;
  content: string;
  media_path?: string;
  isVideo: boolean;
  isImage: boolean;
  isAudio: boolean;
  isNoMedia: boolean;
  category_id: number;
  isVideoApproved: boolean;
  isVideoRejected: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

interface SearchResponse {
  posts?: Post[];
  detail?: string;
}

interface TopBarProps {
  onSearch: (results: Post[] | null, isActive: boolean, error?: string) => void;
  selectedCategoryId?: number | null;
}

export const TopBar: React.FC<TopBarProps> = ({ onSearch, selectedCategoryId }) => {
  const { user, isAdmin } = useAuthStore();
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileView) {
      setIsNotificationsOpen(false);
    }
  }, [location.pathname, isMobileView]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBottomNav(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password' || location.pathname === '/reset-password') {
    return null;
  }

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/signin';
  };

  const toggleNotifications = () => {
    if (!isMobileView) {
      setIsNotificationsOpen(!isNotificationsOpen);
    } else {
      setIsNotificationsOpen(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    onSearch(null, false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearching(value.trim().length > 0);
    
    if (!value.trim()) {
      clearSearch();
    }
  };

  const handleSearchClick = async () => {
    if (!searchQuery.trim()) {
      clearSearch();
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found");
        return;
      }

      const paramKey = searchQuery.includes("@") ? "email" : "username";
      let url = `/auth/search_posts?${paramKey}=${encodeURIComponent(searchQuery)}`;
      
      if (selectedCategoryId) {
        url += `&category_id=${selectedCategoryId}`;
      }

      const response = await api.get<SearchResponse>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.detail) {
        toast.error(response.data.detail);
        onSearch(null, true, response.data.detail);
      } else if (response.data.posts) {
        const resultCount = response.data.posts.length;
        if (resultCount > 0) {
          toast.success(`Found ${resultCount} result${resultCount === 1 ? '' : 's'}`);
        } else {
          toast.info('No results found');
        }
        onSearch(response.data.posts, true);
      } else {
        toast.info('No results found');
        onSearch([], true);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || "Search failed";
      toast.error(errorMessage);
      onSearch(null, true, errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm p-2 fixed w-full top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-2xl font-bold"
              style={{ color: themeColors.primary }}
              data-tooltip-id="home-logo-tooltip"
              data-tooltip-content="Home"
            >
              Auditt
            </Link>
          </div>

          {user && isHomePage && (
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                {isLoading ? (
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                ) : (
                  <button
                    onClick={handleSearchClick}
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                      isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
                    }`}
                    disabled={!isSearching || isLoading}
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                  placeholder="search on email, user name..."
                  className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
                  disabled={isLoading}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          )}
          
          {user ? (
            <>
              <div className="hidden lg:flex items-center space-x-6">
                <Link 
                  to="/" 
                  className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  style={{ color: themeColors.primary }}
                  data-tooltip-id="home-tooltip"
                  data-tooltip-content="Home"
                >
                  <Home className="w-6 h-6" />
                </Link>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    style={{ color: themeColors.primary }}
                    data-tooltip-id="admin-tooltip"
                    data-tooltip-content="Admin Dashboard"
                  >
                    <Shield className="w-6 h-6" />
                  </Link>
                )}
                <button 
                  onClick={toggleNotifications}
                  className="hover:bg-gray-50 p-2 rounded-lg relative transition-colors"
                  style={{ color: themeColors.primary }}
                  data-tooltip-id="notifications-tooltip"
                  data-tooltip-content="Notifications"
                >
                  <Bell className="w-6 h-6" />
                </button>
                <Link 
                  to="/profile" 
                  className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  style={{ color: themeColors.primary }}
                  data-tooltip-id="profile-tooltip"
                  data-tooltip-content="Profile"
                >
                  <User className="w-6 h-6" />
                </Link>
                <Link 
                  to="/settings" 
                  className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  style={{ color: themeColors.primary }}
                  data-tooltip-id="settings-tooltip"
                  data-tooltip-content="Settings"
                >
                  <Settings className="w-6 h-6" />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  style={{ color: themeColors.primary }}
                  data-tooltip-id="logout-tooltip"
                  data-tooltip-content="Sign Out"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
              <div className="lg:hidden">
                <button
                  onClick={handleSignOut}
                  className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  style={{ color: themeColors.primary }}
                  data-tooltip-id="logout-mobile-tooltip"
                  data-tooltip-content="Sign Out"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/signin" 
                className="hover:underline"
                style={{ color: themeColors.primary }}
                data-tooltip-id="signin-tooltip"
                data-tooltip-content="Sign In"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-1 rounded-md font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: themeColors.primary }}
                data-tooltip-id="signup-tooltip"
                data-tooltip-content="Create Account"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {user && isHomePage && (
          <div className="md:hidden mt-2 px-2">
            <div className="relative">
              {isLoading ? (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              ) : (
                <button
                  onClick={handleSearchClick}
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                    isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
                  }`}
                  disabled={!isSearching || isLoading}
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                placeholder="Search on email, user name..."
                className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
                disabled={isLoading}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  <XCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Navigation Bar for Mobile/Medium Screens */}
      {user && (
        <div 
          className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-t-lg z-40 transition-transform duration-300 ${
            showBottomNav ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex justify-around items-center p-2">
            <Link 
              to="/" 
              className="flex flex-col items-center p-2 text-gray-700"
              style={{ color: location.pathname === '/' ? themeColors.primary : undefined }}
              onClick={() => setIsNotificationsOpen(false)}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            
            {isAdmin && (
              <Link 
                to="/admin" 
                className="flex flex-col items-center p-2 text-gray-700"
                style={{ color: location.pathname === '/admin' ? themeColors.primary : undefined }}
                onClick={() => setIsNotificationsOpen(false)}
              >
                <Shield className="w-6 h-6" />
                <span className="text-xs mt-1">Admin</span>
              </Link>
            )}
            
            <button 
              onClick={toggleNotifications}
              className="flex flex-col items-center p-2 text-gray-700"
              style={{ color: isNotificationsOpen ? themeColors.primary : undefined }}
            >
              <Bell className="w-6 h-6" />
              <span className="text-xs mt-1">Alerts</span>
            </button>
            
            <Link 
              to="/profile" 
              className="flex flex-col items-center p-2 text-gray-700"
              style={{ color: location.pathname === '/profile' ? themeColors.primary : undefined }}
              onClick={() => setIsNotificationsOpen(false)}
            >
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
            
            <Link 
              to="/settings" 
              className="flex flex-col items-center p-2 text-gray-700"
              style={{ color: location.pathname === '/settings' ? themeColors.primary : undefined }}
              onClick={() => setIsNotificationsOpen(false)}
            >
              <Settings className="w-6 h-6" />
              <span className="text-xs mt-1">Settings</span>
            </Link>
          </div>
        </div>
      )}

      <NotificationSidebar 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />

      <Toaster position="top-center" />

      <Tooltip id="home-logo-tooltip" place="right" />
      <Tooltip id="home-tooltip" place="bottom" />
      <Tooltip id="admin-tooltip" place="bottom" />
      <Tooltip id="notifications-tooltip" place="bottom" />
      <Tooltip id="profile-tooltip" place="bottom" />
      <Tooltip id="settings-tooltip" place="bottom" />
      <Tooltip id="logout-tooltip" place="bottom" />
      <Tooltip id="logout-mobile-tooltip" place="bottom" />
      <Tooltip id="signin-tooltip" place="bottom" />
      <Tooltip id="signup-tooltip" place="bottom" />
    </>
  );
};

export default TopBar;