// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuthStore } from './store/authStore';
// import { useThemeStore } from './store/themeStore';
// import { TopBar } from './components/TopBar';

// // Pages
// import Home from './pages/Home';
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
// import Profile from './pages/Profile';
// import AdminDashboard from './pages/AdminDashboard';
// import ForgotPassword from './pages/ForgotPassword';
// import Notifications from './pages/Notifications';
// import Settings from './pages/Settings';
// import ResetPassword from './pages/ResetPassword';


// const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
//   const { user } = useAuthStore();
//   return user ? <>{children}</> : <Navigate to="/signin" />;
// };

// const AdminRoute = ({ children }: { children: React.ReactNode }) => {
//   const { user, isAdmin } = useAuthStore();
//   return user && isAdmin ? <>{children}</> : <Navigate to="/" />;
// };

// function App() {
//   const { darkMode, syncThemeWithProfile } = useThemeStore();

//   return (
//     <Router>
//       <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
//         <TopBar />
//         <div className="pt-16 px-4">
//           <Routes>
//             <Route path="/signin" element={<SignIn />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
         
            
//             <Route path="/" element={
//               <PrivateRoute>
//                 <Home />
//               </PrivateRoute>
//             } />
            
//             <Route path="/profile" element={
//               <PrivateRoute>
//                 <Profile />
//               </PrivateRoute>
//             } />
            
//             <Route path="/settings" element={
//               <PrivateRoute>
//                 <Settings />
//               </PrivateRoute>
//             } />
            
//             <Route path="/admin" element={
//               <AdminRoute>
//                 <AdminDashboard />
//               </AdminRoute>
//             } />
            
//             <Route path="/notifications" element={
//               <PrivateRoute>
//                 <Notifications />
//               </PrivateRoute>
//             } />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;



// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { useAuthStore } from './store/authStore';
// import { useThemeStore } from './store/themeStore';
// import { TopBar } from './components/TopBar';

// // Pages
// import Home from './pages/Home';
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
// import Profile from './pages/Profile';
// import AdminDashboard from './pages/AdminDashboard';
// import ForgotPassword from './pages/ForgotPassword';
// import Notifications from './pages/Notifications';
// import Settings from './pages/Settings';
// import ResetPassword from './pages/ResetPassword';

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

// const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
//   const { user } = useAuthStore();
//   return user ? <>{children}</> : <Navigate to="/signin" />;
// };

// const AdminRoute = ({ children }: { children: React.ReactNode }) => {
//   const { user, isAdmin } = useAuthStore();
//   return user && isAdmin ? <>{children}</> : <Navigate to="/" />;
// };

// function App() {
//   const { darkMode } = useThemeStore();
//   const [searchResults, setSearchResults] = useState<Post[] | null>(null);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [searchError, setSearchError] = useState<string | null>(null);

//   const handleSearch = (results: Post[] | null, isActive: boolean, error?: string) => {
//     setSearchResults(results);
//     setIsSearchActive(isActive);
//     setSearchError(error || null);
//   };

//   return (
//     <Router>
//       <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
//         <TopBar onSearch={handleSearch} />
//         <div className="pt-16 px-4">
//           <Routes>
//             <Route path="/signin" element={<SignIn />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
            
//             <Route path="/" element={
//               <PrivateRoute>
//                 <Home 
//                   searchResults={searchResults}
//                   isSearchActive={isSearchActive}
//                   searchError={searchError}
//                 />
//               </PrivateRoute>
//             } />
            
//             <Route path="/profile" element={
//               <PrivateRoute>
//                 <Profile />
//               </PrivateRoute>
//             } />
            
//             <Route path="/settings" element={
//               <PrivateRoute>
//                 <Settings />
//               </PrivateRoute>
//             } />
            
//             <Route path="/admin" element={
//               <AdminRoute>
//                 <AdminDashboard />
//               </AdminRoute>
//             } />
            
//             <Route path="/notifications" element={
//               <PrivateRoute>
//                 <Notifications />
//               </PrivateRoute>
//             } />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;



// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { useAuthStore } from './store/authStore';
// import { useThemeStore } from './store/themeStore';
// import { TopBar } from './components/TopBar';

// // Pages
// import Home from './pages/Home';
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
// import Profile from './pages/Profile';
// import AdminDashboard from './pages/AdminDashboard';
// import ForgotPassword from './pages/ForgotPassword';
// import Notifications from './pages/Notifications';
// import Settings from './pages/Settings';
// import ResetPassword from './pages/ResetPassword';

// interface Post {
//   id: number;
//   user_id: number;
//   username: string;
//   title: string;
//   category: string;
//   content: string;
//   media_path?: string;
//   isVideo: boolean | number;
//   isImage: boolean | number;
//   isAudio: boolean | number;
//   isNoMedia: boolean | number;
//   category_id: number;
//   isVideoApproved: boolean | number;
//   isVideoRejected: boolean | number;
//   is_public: boolean | number;
//   created_at: string;
//   updated_at: string;
// }

// const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
//   const { user } = useAuthStore();
//   return user ? <>{children}</> : <Navigate to="/signin" />;
// };

// const AdminRoute = ({ children }: { children: React.ReactNode }) => {
//   const { user, isAdmin } = useAuthStore();
//   return user && isAdmin ? <>{children}</> : <Navigate to="/" />;
// };

// function App() {
//   const { darkMode } = useThemeStore();
//   const [searchResults, setSearchResults] = useState<Post[] | null>(null);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [searchError, setSearchError] = useState<string | null>(null);

//   const handleSearch = (results: Post[] | null, isActive: boolean, error?: string) => {
//     // Transform numeric booleans to actual booleans if results exist
//     const transformedResults = results?.map(post => ({
//       ...post,
//       isVideo: typeof post.isVideo === 'number' ? post.isVideo === 1 : post.isVideo,
//       isImage: typeof post.isImage === 'number' ? post.isImage === 1 : post.isImage,
//       isAudio: typeof post.isAudio === 'number' ? post.isAudio === 1 : post.isAudio,
//       isNoMedia: typeof post.isNoMedia === 'number' ? post.isNoMedia === 1 : post.isNoMedia,
//       isVideoApproved: typeof post.isVideoApproved === 'number' ? post.isVideoApproved === 1 : post.isVideoApproved,
//       isVideoRejected: typeof post.isVideoRejected === 'number' ? post.isVideoRejected === 1 : post.isVideoRejected,
//       is_public: typeof post.is_public === 'number' ? post.is_public === 1 : post.is_public,
//     }));

//     setSearchResults(transformedResults || null);
//     setIsSearchActive(isActive);
//     setSearchError(error || null);
//   };

//   return (
//     <Router>
//       <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
//         <TopBar onSearch={handleSearch} />
//         <div className="pt-16 px-4">
//           <Routes>
//             <Route path="/signin" element={<SignIn />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
            
//             <Route path="/" element={
//               <PrivateRoute>
//                 <Home 
//                   searchResults={searchResults}
//                   isSearchActive={isSearchActive}
//                   searchError={searchError}
//                 />
//               </PrivateRoute>
//             } />
            
//             <Route path="/profile" element={
//               <PrivateRoute>
//                 <Profile />
//               </PrivateRoute>
//             } />
            
//             <Route path="/settings" element={
//               <PrivateRoute>
//                 <Settings />
//               </PrivateRoute>
//             } />
            
//             <Route path="/admin" element={
//               <AdminRoute>
//                 <AdminDashboard />
//               </AdminRoute>
//             } />
            
//             <Route path="/notifications" element={
//               <PrivateRoute>
//                 <Notifications />
//               </PrivateRoute>
//             } />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


// correct above

// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { useAuthStore } from './store/authStore';
// import { useThemeStore } from './store/themeStore';
// import { TopBar } from './components/TopBar';

// // Pages
// import Home from './pages/Home';
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
// import Profile from './pages/Profile';
// import AdminDashboard from './pages/AdminDashboard';
// import ForgotPassword from './pages/ForgotPassword';
// import Notifications from './pages/Notifications';
// import Settings from './pages/Settings';
// import ResetPassword from './pages/ResetPassword';

// interface Post {
//   id: number;
//   user_id: number;
//   username: string;
//   title: string;
//   category: string;
//   content: string;
//   categoryId: number;
//   media_path?: string;
//   isVideo: boolean | number;
//   isImage: boolean | number;
//   isAudio: boolean | number;
//   isNoMedia: boolean | number;
//   category_id: number;
//   isVideoApproved: boolean | number;
//   isVideoRejected: boolean | number;
//   is_public: boolean | number;
//   created_at: string;
//   updated_at: string;
// }

// const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
//   const { user } = useAuthStore();
//   return user ? <>{children}</> : <Navigate to="/signin" />;
// };

// const AdminRoute = ({ children }: { children: React.ReactNode }) => {
//   const { user, isAdmin } = useAuthStore();
//   return user && isAdmin ? <>{children}</> : <Navigate to="/" />;
// };

// function App() {
//   const { darkMode } = useThemeStore();
//   const [searchResults, setSearchResults] = useState<Post[] | null>(null);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [searchError, setSearchError] = useState<string | null>(null);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

//   const handleSearch = (results: Post[] | null, isActive: boolean, error?: string) => {
//     // Transform numeric booleans to actual booleans if results exist
//     const transformedResults = results?.map(post => ({
//       ...post,
//       isVideo: typeof post.isVideo === 'number' ? post.isVideo === 1 : post.isVideo,
//       isImage: typeof post.isImage === 'number' ? post.isImage === 1 : post.isImage,
//       isAudio: typeof post.isAudio === 'number' ? post.isAudio === 1 : post.isAudio,
//       isNoMedia: typeof post.isNoMedia === 'number' ? post.isNoMedia === 1 : post.isNoMedia,
//       isVideoApproved: typeof post.isVideoApproved === 'number' ? post.isVideoApproved === 1 : post.isVideoApproved,
//       isVideoRejected: typeof post.isVideoRejected === 'number' ? post.isVideoRejected === 1 : post.isVideoRejected,
//       is_public: typeof post.is_public === 'number' ? post.is_public === 1 : post.is_public,
//     }));

//     setSearchResults(transformedResults || null);
//     setIsSearchActive(isActive);
//     setSearchError(error || null);
//   };

//   return (
//     <Router>
//       <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
//         <TopBar onSearch={handleSearch}
//           selectedCategoryId={selectedCategoryId} />
//         <div className="pt-16 px-4">
//           <Routes>
//             <Route path="/signin" element={<SignIn />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
            
//             <Route path="/" element={
//               <PrivateRoute>
//                 <Home 
//                   searchResults={searchResults}
//                   isSearchActive={isSearchActive}
//                   searchError={searchError}
//                   onCategorySelect={setSelectedCategoryId}
//                 />
//               </PrivateRoute>
//             } />
            
//             <Route path="/profile" element={
//               <PrivateRoute>
//                 <Profile />
//               </PrivateRoute>
//             } />
            
//             <Route path="/settings" element={
//               <PrivateRoute>
//                 <Settings />
//               </PrivateRoute>
//             } />
            
//             <Route path="/admin" element={
//               <AdminRoute>
//                 <AdminDashboard />
//               </AdminRoute>
//             } />
            
//             <Route path="/notifications" element={
//               <PrivateRoute>
//                 <Notifications />
//               </PrivateRoute>
//             } />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;



import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import { TopBar } from './components/TopBar';

// Pages
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import ForgotPassword from './pages/ForgotPassword';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import ResetPassword from './pages/ResetPassword';

interface Post {
  id: number;
  user_id: number;
  username: string;
  title: string;
  category: string;
  content: string;
  categoryId: number;
  media_path?: string;
  isVideo: boolean | number;
  isImage: boolean | number;
  isAudio: boolean | number;
  isNoMedia: boolean | number;
  category_id: number;
  isVideoApproved: boolean | number;
  isVideoRejected: boolean | number;
  is_public: boolean | number;
  created_at: string;
  updated_at: string;
}

// Wrapper component to check authentication status
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const location = useLocation();
  
  const publicPaths = ['/signin', '/signup', '/forgot-password', '/reset-password'];
  const isPublicPath = publicPaths.includes(location.pathname);

  // If user is not authenticated and trying to access a protected route
  if (!user && !isPublicPath) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If user is authenticated and trying to access auth pages
  if (user && isPublicPath) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin } = useAuthStore();
  return user && isAdmin ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  const { darkMode } = useThemeStore();
  const [searchResults, setSearchResults] = useState<Post[] | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const handleSearch = (results: Post[] | null, isActive: boolean, error?: string) => {
    const transformedResults = results?.map(post => ({
      ...post,
      isVideo: typeof post.isVideo === 'number' ? post.isVideo === 1 : post.isVideo,
      isImage: typeof post.isImage === 'number' ? post.isImage === 1 : post.isImage,
      isAudio: typeof post.isAudio === 'number' ? post.isAudio === 1 : post.isAudio,
      isNoMedia: typeof post.isNoMedia === 'number' ? post.isNoMedia === 1 : post.isNoMedia,
      isVideoApproved: typeof post.isVideoApproved === 'number' ? post.isVideoApproved === 1 : post.isVideoApproved,
      isVideoRejected: typeof post.isVideoRejected === 'number' ? post.isVideoRejected === 1 : post.isVideoRejected,
      is_public: typeof post.is_public === 'number' ? post.is_public === 1 : post.is_public,
    }));

    setSearchResults(transformedResults || null);
    setIsSearchActive(isActive);
    setSearchError(error || null);
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
        <AuthWrapper>
          <TopBar onSearch={handleSearch} selectedCategoryId={selectedCategoryId} />
          <div className="pt-16 px-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Protected Routes */}
              <Route path="/" element={
                <Home 
                  searchResults={searchResults}
                  isSearchActive={isSearchActive}
                  searchError={searchError}
                  onCategorySelect={setSelectedCategoryId}
                />
              } />
              
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notifications" element={<Notifications />} />
              
              {/* Admin Route */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />

              {/* Catch all route - redirect to signin if not authenticated */}
              <Route path="*" element={<Navigate to="/signin" replace />} />
            </Routes>
          </div>
        </AuthWrapper>
      </div>
    </Router>
  );
}

export default App;