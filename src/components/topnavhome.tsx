import React, { useState ,useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import { Home, Video, Bell, User, LogOut, Settings, Shield, Menu, X, Search, XCircle } from 'lucide-react';
import { NotificationSidebar } from './NotificationSidebar';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';



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

interface TopBarhomeProps {
  onSearch: (results: Post[] | null, isActive: boolean, error?: string) => void;
}


export const TopBarHome: React.FC<TopBarhomeProps> = ({ onSearch }) => {

  const { user, isAdmin } = useAuthStore();
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const isHomePage = location.pathname === '/';

  if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password'|| location.pathname === '/reset-password') {
    return null;
  }

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/signin';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
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
  
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found");
        return;
      }
  
      const paramKey = searchQuery.includes("@") ? "email" : "username";
  
      const response = await api.get<SearchResponse>(`/auth/search_posts?${paramKey}=${encodeURIComponent(searchQuery)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.detail) {
        // If there's an error message in the response
        onSearch(null, true, response.data.detail);
      } else if (response.data.posts) {
        // If there are posts in the response
        onSearch(response.data.posts, true);
      } else {
        // If the response is empty
        onSearch([], true);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || "Search failed";
      onSearch(null, true, errorMessage);
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
            {user && (
              <button 
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 hover:bg-gray-50 rounded-lg"
                style={{ color: themeColors.primary }}
                data-tooltip-id="menu-tooltip"
                data-tooltip-content="Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}

            <Link 
              to="/" 
              className="text-2xl font-bold"
              style={{ color: themeColors.primary }}
              data-tooltip-id="home-logo-tooltip"
              data-tooltip-content="Home"
            >
              Family Creatives
            </Link>
          </div>

          {user && isHomePage && (
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <button
                  onClick={handleSearchClick}
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                    isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
                  }`}
                  disabled={!isSearching}
                >
                  <Search className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          )}
          
          
          {user ? (
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
              <button
                onClick={handleSearchClick}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                  isSearching ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-gray-400'
                }`}
                disabled={!isSearching}
                data-tooltip-id="search-mobile-tooltip"
                data-tooltip-content={isSearching ? "Click to search" : "Type to enable search"}
              >
                <Search className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                placeholder="Search posts..."
                className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  data-tooltip-id="clear-search-mobile-tooltip"
                  data-tooltip-content="Clear search"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {user && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 lg:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={toggleMobileMenu}
        >
          <div 
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 space-y-4">
              <Link 
                to="/" 
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Shield className="w-5 h-5" />
                  <span>Admin</span>
                </Link>
              )}
              <button 
                onClick={toggleNotifications}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </button>
              <Link 
                to="/profile" 
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <Link 
                to="/settings" 
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <NotificationSidebar 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />

      <Tooltip id="menu-tooltip" place="right" />
      <Tooltip id="home-logo-tooltip" place="right" />
      <Tooltip id="home-tooltip" place="bottom" />
      <Tooltip id="admin-tooltip" place="bottom" />
      <Tooltip id="notifications-tooltip" place="bottom" />
      <Tooltip id="profile-tooltip" place="bottom" />
      <Tooltip id="settings-tooltip" place="bottom" />
      <Tooltip id="logout-tooltip" place="bottom" />
      <Tooltip id="signin-tooltip" place="bottom" />
      <Tooltip id="signup-tooltip" place="bottom" />
    </>
  );
};



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

// interface TopBarHomeProps {
//   onSearch: (results: Post[] | null, isActive: boolean, error?: string) => void;
// }

// export const TopBarHome: React.FC<TopBarHomeProps> = ({ onSearch }) => {
//   const { user, isAdmin } = useAuthStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearching, setIsSearching] = useState(false);

//   if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password' || location.pathname === '/reset-password') {
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

//           {user && (
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

//         {user && (
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