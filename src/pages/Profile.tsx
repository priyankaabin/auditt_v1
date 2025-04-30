
// import React, { useState, useEffect } from 'react';
// import { useAuthStore } from '../store/authStore';
// import { useProfileStore } from '../store/profileStore';
// import { usePostStore } from '../store/postStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Edit2, Key, X, Save, Camera, Image, Plus,PencilLine } from 'lucide-react';
// import { Avatar } from '../components/Avatar';
// import { AvatarSelector } from '../components/AvatarSelector';
// import { BannerEditor } from '../components/BannerEditor';
// import { PostItem } from '../components/PostItem';
// import { CreatePost } from '../components/CreatePosts';
// import { BANNER_TEMPLATES, DEFAULT_GAMIFICATION_SETTINGS } from '../config/environment';
// import { ImageViewer } from '../components/ImageViewer';
// import toast, { Toaster } from 'react-hot-toast';
// import { ProfileService } from '../services';
// import { formatDistanceToNow } from 'date-fns';
// import { ChangePassword } from '../components/changePassword';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios"

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000",
//   headers: {
//     "Cache-Control": "no-cache",
//     Pragma: "no-cache",
//   },
// });

// export default function Profile() {
//   const { user } = useAuthStore();
//   const { 
//     displayName, 
//     bio, 
//     // bannerColor, 
//     avatarUrl,
//     avatarType,
//     points = 0,
//     phone_number,
//     tier = 'bronze',
//     fetchProfile, 
//     updateProfile, 
//     // isLoading 
//   } = useProfileStore();
//   const { fetchPostsByUser, createPost } = usePostStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
  
//   const [isEditing, setIsEditing] = useState(false);
//   const [editName, setEditName] = useState('');
//   const [editBio, setEditBio] = useState('');
//   const [editBannerColor, setEditBannerColor] = useState('');
//   const [editAvatarType, setEditAvatarType] = useState('');
//   const [showAvatarSelector, setShowAvatarSelector] = useState(false);
//   const [showBannerEditor, setShowBannerEditor] = useState(false);
//   const [showAvatarViewer, setShowAvatarViewer] = useState(false);
//   const [userPosts, setUserPosts] = useState<any[]>([]);
//   const [isLoadingPosts, setIsLoadingPosts] = useState(false);
//   const [showCreatePost, setShowCreatePost] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [editEmail, setEditEmail] = useState('');
//   const [editUserName, setEditUserName] = useState(''); 
//   const [editLastName, setEditLastName] = useState('');
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const navigate = useNavigate(); 
//   const [reason, setReason] = useState('');
//   const [bannerColor, setBannerColor] = useState('from-purple-500 via-blue-500 to-orange-500');
 


//   const handlePasswordChangeToggle = () => {
//     setShowChangePassword(prev => !prev);
//   };

//   const getTierColor = (likes: number): string => {
//     if (likes >= 76) return 'from-cyan-400 to-cyan-500'; // Platinum
//     if (likes >= 51) return 'from-yellow-400 to-yellow-500'; // Gold
//     if (likes >= 26) return 'from-gray-300 to-gray-400'; // Silver
//     return 'from-amber-600 to-amber-700'; // Bronze
//   };
  
//   const getTier = (likes: number): string => {
//     if (likes >= 76) return "Platinum";
//     if (likes >= 51) return "Gold";
//     if (likes >= 26) return "Silver";
//     return "Bronze";
//   };
//   const getPointsNeeded = (likes: number): number => {
//     if (likes < 26) return 26 - likes; // Bronze to Silver
//     if (likes < 51) return 51 - likes; // Silver to Gold
//     if (likes < 76) return 76 - likes; // Gold to Platinum
//     return 0; // Maximum level reached
//   };

//   const getLevel = (likes: number): number => {
//     if (likes >= 76) return 4; // Platinum
//     if (likes >= 51) return 3; // Gold
//     if (likes >= 26) return 2; // Silver
//     return 1; // Bronze
//   };
  
  
//   const gradients = [
//     { name: "Ocean", value: "from-blue-500 to-cyan-500" },
//     { name: "Sunset", value: "from-orange-500 to-pink-500" },
//     { name: "Forest", value: "from-green-500 to-emerald-500" },
//     { name: "Royal", value: "from-purple-500 to-indigo-500" },
//     { name: "Spring", value: "from-green-400 to-yellow-400" },
//     { name: "Aurora", value: "from-teal-400 to-purple-500" },
//     { name: "Desert", value: "from-yellow-400 to-orange-500" },
//     { name: "Rose", value: "from-pink-400 to-rose-500" },
//   ];
 
//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//           window.location.href = '/signin';
//           return;
//         }
  
//         const userId = localStorage.getItem('userId'); 
//         if (!userId) {
//           console.error('User ID not found in localStorage');
//           toast.error('User ID not found. Please log in again.');
//           return;
//         }
  
//         const profile = await ProfileService.getProfile(userId);
//         if (profile) {
//           const totalLikes = profile.total_likes || 0;  
//           const level = getLevel(totalLikes);
//           // const tier = getTier(level);
//           const tier = getTier(totalLikes);

  
//           console.log("Total Likes:", totalLikes);  // Debugging
//           console.log("Calculated Level:", level);  // Debugging
//           console.log("Assigned Tier:", tier);      // Debugging
  
//           setProfileData({
//             name: profile.name || '',
//             last_name: profile.last_name || '',
//             username: profile.username || '',
//             email: profile.email || '',
//             bio: profile.bio || '',
//             points: profile.points || 0,
//             phone_number: profile.phone_number || null,
//             total_likes: totalLikes,
//             level: level,   // ✅ Set level correctly
//             tier: tier,     // ✅ Set tier correctly
//           });
//         } else {
//           toast.error('Failed to load profile data.');
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//         toast.error('Failed to load profile data.');
//       }
//     };
  
//     loadProfile();
//   }, []);
  
// useEffect(() => {
//   const fetchProfile = async () => {
//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("authToken");

//     if (!userId || !token) {
//       window.location.href = "/signin";
//       return;
//     }

//     try {
//       // Fetch user profile data
//       const profileResponse = await api.get(`/auth/profile/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setProfileData({
//         username: profileResponse.data.username,
//         bio: profileResponse.data.bio,
//       });

//     } catch (error) {
//       console.error("Error fetching profile:", error);
//       if (error.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("userId");
//         window.location.href = "/signin";
//       }
//     }
//   };

//   fetchProfile();
// }, []);

  

//   useEffect(() => {
//     if (displayName) setEditName(displayName);
//     if (bio) setEditBio(bio);
//     if (bannerColor) setEditBannerColor(bannerColor);
//     if (avatarType) setEditAvatarType(avatarType);
//   }, [displayName, bio, bannerColor, avatarType]);

 
 

//   const [profileData, setProfileData] = useState({
//     name: '',
//     last_name: '',
//     username: '',
//     email: '',
//     bio: '',
//     points: 0,
//     tier: 'bronze',
//     phone_number:''
//   });
  
//   const [isLoading, setIsLoading] = useState(false);

 

//   useEffect(() => {
//     const loadUserPosts = async () => {
//       if (user?.id) {
//         setIsLoadingPosts(true);
//         setError(null);
//         try {
//           // Fetching user posts
//           const posts = await ProfileService.fetchUserPosts(user.id);
//           setUserPosts(Array.isArray(posts) ? posts : []);
  
//           // Fetching categories after fetching posts
//           const categoriesData = await ProfileService.getCategories();
//           if (categoriesData) {
//             setCategories(categoriesData);  // Store the categories in the array state
//           }
//         } catch (error) {
//           console.error('Error fetching user posts or categories:', error);
//           setError('Failed to load posts or categories');
//           toast.error('Failed to load posts or categories');
//           setUserPosts([]);
//         } finally {
//           setIsLoadingPosts(false);
//         }
//       }
//     };
  
//     loadUserPosts();
//   }, [user]);

//   useEffect(() => {
//     const fetchProfileImage = async () => {
//       if (user?.id) {
//         console.log("Fetching profile image for user:", user.id);
//         try {
//           const imageUrl = await ProfileService.getProfileImage(user.id);
//           console.log("Fetched Image URL:", imageUrl);
//           if (imageUrl) {
//             setProfileImage(imageUrl);
//           }
//         } catch (error) {
//           console.error("Error fetching profile image:", error);
//         }
//       }
//     };
  
//     fetchProfileImage();
//   }, [user]);
  
 
//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//     if (!isEditing) {
//       setEditName(profileData.username || '');
//       setEditBio(profileData.bio || '');
//       setEditUserName(profileData.name || '');
//       setEditEmail(profileData.email || '');
//       setEditBannerColor(profileData.bannerColor || 'from-blue-500 to-purple-500');
//       setEditAvatarType(profileData.avatarType || 'default');
//       setEditLastName(profileData.last_name || ''); // ✅ Include last name
//     }
//   };



//   const handleSaveProfile = async () => {
//     if (!user?.id) return;

//     setIsLoading(true);

//     const updatedProfile = {
//       name: editUserName,
//       last_name: editLastName,
//       username: editName,
//       email: editEmail,
//       bio: editBio,
//       points: profileData.points,
//       tier: profileData.tier,
//       phone_number: profileData.phone_number,
//     };

//     try {
//       const response = await ProfileService.updateProfile(user.id, updatedProfile);
//       if (response) {
//         // Update local state immediately

//         setProfileData({
//           ...profileData,
//           ...updatedProfile
//         });
//         // Toggle off edit mode
//         setIsEditing(false);

//         toast.success('Profile updated successfully!');
//       } else {
//         toast.error('Failed to update profile.');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('An error occurred while updating profile.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

 
  
  
//   useEffect(() => {
//     const fetchBanner = async () => {
//       const token = localStorage.getItem("authToken");
//       const userId = localStorage.getItem("userId");
  
//       if (!token || !userId) {
//         navigate("/signin");
//         return;
//       }
  
//       try {
//         const response = await api.get(`/auth/banner/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
  
//         if (response.data?.banner_type === "gradient" && response.data?.name) {
//           // Find the matching gradient value for the name from the API
//           const gradient = gradients.find(g => g.name === response.data.name);
//           if (gradient) {
//             setBannerColor(gradient.value);
//           } else {
//             // Fallback to Ocean if no match found
//             setBannerColor("from-purple-500 via-blue-500 to-orange-500");
//           }
//         }
//       } catch (error: any) {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
//           navigate("/signin");
//         }
//         // Fallback to Ocean on error
//         setBannerColor("from-purple-500 via-blue-500 to-orange-500");
//       }
//     };
  
//     fetchBanner();
//   }, []);
  
  
  


  
  

//   const handleBannerSelect = (gradient: { name: string; value: string }) => {
//     console.log("Selected Gradient:", gradient.name, gradient.value);
//     setBannerColor(gradient.value); // Update the banner in the UI
//   };
  

 

  
  
//   const handleAvatarSelect = (type: string, url?: string) => {
//     setEditAvatarType(type);
//     setShowAvatarSelector(false);
//   };
  
  
//   const refreshPosts = async () => {
//     if (user?.id) {
//       setIsLoadingPosts(true);
//       try {
//         const posts = await ProfileService.fetchUserPosts(user.id);
//         setUserPosts(Array.isArray(posts) ? posts : []);
//       } catch (error) {
//         console.error('Error refreshing posts:', error);
//         toast.error('Failed to refresh posts');
//       } finally {
//         setIsLoadingPosts(false);
//       }
//     }
//   };
 
//   const handleCreatePost = async (postData) => {
//     try {
//       await ProfileService.createPost(postData);
//       setShowCreatePost(false);
//       await refreshPosts();
//       toast.success('Post created successfully');
//     } catch (error) {
//       console.error('Error creating post:', error);
//       toast.error('Failed to create post');
//     }
//   };

//   useEffect(() => {
//     refreshPosts();
//   }, [user?.id]);
  



//   // Calculate user level and progress
//   const getUserLevel = (points: number) => {
//     const thresholds = DEFAULT_GAMIFICATION_SETTINGS.levelThresholds;
//     for (let i = thresholds.length - 1; i >= 0; i--) {
//       if (points >= thresholds[i].points) {
//         return {
//           currentLevel: thresholds[i].level,
//           currentPoints: points,
//           nextLevel: i < thresholds.length - 1 ? thresholds[i + 1].level : null,
//           nextLevelPoints: i < thresholds.length - 1 ? thresholds[i + 1].points : null,
//           pointsNeeded: i < thresholds.length - 1 ? thresholds[i + 1].points - points : 0,
//           progress: i < thresholds.length - 1 
//             ? ((points - thresholds[i].points) / (thresholds[i + 1].points - thresholds[i].points)) * 100
//             : 100
//         };
//       }
//     }
//     return {
//       currentLevel: 1,
//       currentPoints: points,
//       nextLevel: 2,
//       nextLevelPoints: DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points,
//       pointsNeeded: DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points - points,
//       progress: (points / DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points) * 100
//     };
//   };
  
//   const levelInfo = getUserLevel(points);

//   return (
//     <div className="max-w-7xl mx-auto py-6 px-4">
//       <Toaster position="top-right" />
//       {/* Header with gradient background */}
//       <div className="relative">
        

// <div 
         
//           className={`h-48 w-full rounded-xl relative bg-gradient-to-r ${bannerColor || 'from-purple-500 via-blue-500 to-orange-500'}`}
          
//         >
         
// <button
//   onClick={() => setShowBannerEditor(true)}
//   className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800 p-2.5 rounded-full 
//              hover:bg-white dark:hover:bg-gray-700 transition-all shadow-lg group"
//   title="Edit banner"
// >
//   <PencilLine className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600" />
// </button>

//         </div>
       
        
//         {/* Banner Editor Modal */}
//         {showBannerEditor && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="w-full max-w-2xl mx-4">
//             <BannerEditor
//               currentBanner={bannerColor}
//               onSelect={handleBannerSelect}
//               onClose={() => setShowBannerEditor(false)}
//             />
//           </div>
//         </div>
//         )}


      




        
//         {/* Profile Info Card */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mt-[-64px] relative z-10 mx-4">
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//             {/* Profile Image */}
//             <div className="relative">
             
//               <Avatar 
//   src={profileImage || avatarUrl} 
//   seed={user?.email} 
//   size="xl" 
//   tier={tier} 
//   points={points} 
//   className="border-4 border-white bg-white shadow-lg"
// />

//               {isEditing && (
//                 <button 
//                   className="absolute bottom-2 right-2 text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
//                   style={{ backgroundColor: themeColors.primary }}
//                   onClick={() => setShowAvatarSelector(true)}
//                 >
//                   <Camera size={16} />
//                 </button>
//               )}
              
//               {showAvatarSelector && (
//                 <div className="absolute top-full left-0 mt-2 z-20 w-80">
//                   <AvatarSelector 
//                     onSelect={handleAvatarSelect}
//                     currentType={editAvatarType}
//                     onClose={() => setShowAvatarSelector(false)}
//                   />
//                 </div>
//               )}
              
             
              
//               {showAvatarViewer && avatarUrl && (
//                 <ImageViewer
//                   src={avatarUrl}
//                   alt="Profile Avatar"
//                   onClose={() => setShowAvatarViewer(false)}
//                 />
//               )}
//             </div>




//             {/* Profile Info */}
//             <div className="flex-grow">
//               {isEditing ? (
//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
//                       User Name
//                     </label>
//                     <input
//                       type="text"
//                       id="displayName"
                      
//                       value={editName}
//                       onChange={(e) => setEditName(e.target.value)}
//                       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                       style={{ focusRing: themeColors.primary }}
//                     />
//                   </div>
                  


//                   <div className="flex gap-4">
//                 <div className="w-1/2">
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                    First Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     value={editUserName}
//                     onChange={(e) => setEditUserName(e.target.value)}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                     style={{ focusRing: themeColors.primary }}
//                   />
//                 </div>
//                 <div className="w-1/2">
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Last Name
//                   </label>
//                   <input
//                     type="text"
//                     id="lastname"
                  
//                     value={editLastName}
//                     onChange={(e) => setEditLastName(e.target.value)}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                     style={{ focusRing: themeColors.primary }}
//                   />
//                 </div>


//                 <div className="w-1/2">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={editEmail}
//                     onChange={(e) => setEditEmail(e.target.value)}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                     style={{ focusRing: themeColors.primary }}
//                   />
//                 </div>
//               </div>

                  
//                   <div>
//                     <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
//                       Bio
//                     </label>
//                     <textarea
//                       id="bio"
//                       value={editBio}
                     
//                       onChange={(e) => setEditBio(e.target.value)}
//                       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent min-h-[80px]"
//                       style={{ focusRing: themeColors.primary }}
//                     />
//                   </div>
                  
//                   <div className="flex gap-2">
//                     <button
//                       onClick={handleSaveProfile}
//                       disabled={isLoading}
//                       className="inline-flex items-center px-4 py-2 text-white rounded-lg transition-colors"
//                       style={{ backgroundColor: themeColors.primary }}
//                     >
//                       <Save className="w-4 h-4 mr-2" />
//                       Save Changes
//                     </button>
//                     <button
//                       onClick={handleEditToggle}
//                       className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                     >
//                       <X className="w-4 h-4 mr-2" />
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                 <h1 className="text-3xl font-bold text-gray-900">
//   {profileData.username }
// </h1>
                 

// <p className="text-gray-600 mt-1">
//   {profileData.email}
//   {profileData.phone_number && <span className="mx-2">|</span>}
//   {profileData.phone_number}
//   {profileData.name && <span className="ml-2">({profileData.name})</span>}
// </p>

 

// <div className="mt-4 flex flex-wrap gap-3">
//                     <button
//                       onClick={handleEditToggle}
//                       className="inline-flex items-center px-4 py-2 text-white rounded-lg transition-colors"
//                       style={{ backgroundColor: themeColors.primary }}
//                     >
//                       <Edit2 className="w-4 h-4 mr-2" />
//                       Edit Profile
//                     </button>
                   
//                      <button
//     onClick={handlePasswordChangeToggle}
//     className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//   >
//     <Key className="w-4 h-4 mr-2" />
//     Change Password
//   </button>
// </div>
// {showChangePassword && <ChangePassword onClose={handlePasswordChangeToggle} />}         
//                 </>
//               )}
//             </div>
//           </div>

//           {/* About Section */}
//           {!isEditing && (
//             <div className="mt-8">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
//               <div className="bg-gray-50 rounded-lg p-6">
              
//                 <p className="text-gray-700">
//         {profileData.bio || "Share your story here! Tell others about yourself, your interests, and what you're passionate about."}
//       </p>
//               </div>
//             </div>
//           )}

//           {/* Progress Bar */}
//         <div className="mt-4 px-4">
//         <div className="flex justify-between text-sm mb-1">
//           <span className="font-medium">Level {profileData?.level || 1} {profileData?.tier || "Bronze"}
            
//             {/* Crown Icon for Silver, Gold, and Platinum */}
//             {["Platinum"].includes(profileData?.tier) && (
//               <span className="text-yellow-400 text-lg">👑</span>
//             )}
//           </span>
//         </div>
      
//         {/* Progress Bar - Directly Uses total_likes */}
//         <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
//           <div 
//             className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${getTierColor(profileData?.total_likes)}`}
//             style={{ width: `${profileData?.total_likes || 0}%` }} 
//           >
//             <div className="w-full h-full opacity-75 bg-[linear-gradient(110deg,rgba(255,255,255,0.48)_0.8%,rgba(255,255,255,0)_10%,rgba(255,255,255,0.1)_100%)]"></div>
//           </div>
//         </div>
      
//         <div className="text-xs text-gray-500 mt-1 text-center">
//           {getPointsNeeded(profileData?.total_likes || 0) > 0 
//             ? `${getPointsNeeded(profileData?.total_likes || 0)} more likes to next level` 
//             : 'Maximum level reached!'}
//         </div>
//       </div>
      
          
//         </div>
//       </div>

//       {/* User Posts Section */}
//       <div className="mt-8">
//         <div className="flex justify-between items-center mb-6 px-4">
//           <h2 className="text-xl font-semibold text-gray-900">My Posts</h2>
//           <button
//             onClick={() => setShowCreatePost(true)}
//             className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg"
//             style={{ backgroundColor: themeColors.primary }}
//           >
//             <Plus className="w-5 h-5" />
//             Create Post
//           </button>
//         </div>
        
//         {isLoadingPosts ? (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//             <p className="mt-2 text-gray-600">Loading posts...</p>
//           </div>
//         ) : error ? (
//           <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
//             <p className="text-gray-600 mb-4">
//               {error}. Please try again later.
//             </p>
//           </div>
//         ) : userPosts.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
//             <p className="text-gray-600 mb-4">
//               There are no posts yet. Start sharing your amazing moments and inspire others!
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {userPosts.map(post => (
             
//               <PostItem
//               key={post.id}
//               post={post}
//               onPostDeleted={refreshPosts}
             
//             />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Create Post Modal */}
//       {showCreatePost && (
//         <CreatePost
//           onClose={() => setShowCreatePost(false)}
//           onSubmit={handleCreatePost}
//           avatarUrl={avatarUrl}
//           userEmail={user?.email}
//           tier={tier}
//           points={points}
//           onPostCreated={refreshPosts}
//         />
//       )}


      
//     </div>
//   );
// }






// import React, { useState, useEffect, useCallback } from 'react';
// // import React, { useState, useEffect } from 'react';
// import { useAuthStore } from '../store/authStore';
// import { useProfileStore } from '../store/profileStore';
// import { usePostStore } from '../store/postStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Edit2, Key, X, Save, Camera, Image, Plus,PencilLine } from 'lucide-react';
// import { Avatar } from '../components/Avatar';
// import { AvatarSelector } from '../components/AvatarSelector';
// import { BannerEditor } from '../components/BannerEditor';
// import { PostItem } from '../components/PostItem';
// import { CreatePost } from '../components/CreatePosts';
// import { BANNER_TEMPLATES, DEFAULT_GAMIFICATION_SETTINGS } from '../config/environment';
// import { ImageViewer } from '../components/ImageViewer';
// import toast, { Toaster } from 'react-hot-toast';
// import { ProfileService } from '../services';
// import { formatDistanceToNow } from 'date-fns';
// import { ChangePassword } from '../components/changePassword';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios"



// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000",
//   headers: {
//     "Cache-Control": "no-cache",
//     Pragma: "no-cache",
//   },
// });
// interface UserPost {
//   id: string;
//   title: string;
//   content: string;
// }

// export default function Profile() {
//   const { user } = useAuthStore();
//   const { 
//     displayName, 
//     bio, 
//     // bannerColor, 
//     avatarUrl,
//     avatarType,
//     points = 0,
//     phone_number,
//     tier = 'bronze',
//     fetchProfile, 
//     updateProfile, 
//     // isLoading 
//   } = useProfileStore();
//   const { fetchPostsByUser, createPost } = usePostStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
  
//   const [isEditing, setIsEditing] = useState(false);
//   const [editName, setEditName] = useState('');
//   const [editBio, setEditBio] = useState('');
//   const [editBannerColor, setEditBannerColor] = useState('');
//   const [editAvatarType, setEditAvatarType] = useState('');
//   const [showAvatarSelector, setShowAvatarSelector] = useState(false);
//   const [showBannerEditor, setShowBannerEditor] = useState(false);
//   const [showAvatarViewer, setShowAvatarViewer] = useState(false);
//   const [userPosts, setUserPosts] = useState<any[]>([]);
//   const [isLoadingPosts, setIsLoadingPosts] = useState(false);
//   const [showCreatePost, setShowCreatePost] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [editEmail, setEditEmail] = useState('');
//   const [editUserName, setEditUserName] = useState(''); 
//   const [editLastName, setEditLastName] = useState('');
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const navigate = useNavigate(); 
//   const [reason, setReason] = useState('');
//   const [bannerColor, setBannerColor] = useState('from-purple-500 via-blue-500 to-orange-500');
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);

//   // const [userPosts, setUserPosts] = useState<UserPost[]>([]);
//   // const [userPosts, setUserPosts] = useState<UserPostType[]>([]);

//   const POSTS_PER_PAGE = 10;

 


//   const handlePasswordChangeToggle = () => {
//     setShowChangePassword(prev => !prev);
//   };

//   const getTierColor = (likes: number): string => {
//     if (likes >= 76) return 'from-cyan-400 to-cyan-500'; // Platinum
//     if (likes >= 51) return 'from-yellow-400 to-yellow-500'; // Gold
//     if (likes >= 26) return 'from-gray-300 to-gray-400'; // Silver
//     return 'from-amber-600 to-amber-700'; // Bronze
//   };
  
//   const getTier = (likes: number): string => {
//     if (likes >= 76) return "Platinum";
//     if (likes >= 51) return "Gold";
//     if (likes >= 26) return "Silver";
//     return "Bronze";
//   };
//   const getPointsNeeded = (likes: number): number => {
//     if (likes < 26) return 26 - likes; // Bronze to Silver
//     if (likes < 51) return 51 - likes; // Silver to Gold
//     if (likes < 76) return 76 - likes; // Gold to Platinum
//     return 0; // Maximum level reached
//   };

//   const getLevel = (likes: number): number => {
//     if (likes >= 76) return 4; // Platinum
//     if (likes >= 51) return 3; // Gold
//     if (likes >= 26) return 2; // Silver
//     return 1; // Bronze
//   };
  
  
//   const gradients = [
//     { name: "Ocean", value: "from-blue-500 to-cyan-500" },
//     { name: "Sunset", value: "from-orange-500 to-pink-500" },
//     { name: "Forest", value: "from-green-500 to-emerald-500" },
//     { name: "Royal", value: "from-purple-500 to-indigo-500" },
//     { name: "Spring", value: "from-green-400 to-yellow-400" },
//     { name: "Aurora", value: "from-teal-400 to-purple-500" },
//     { name: "Desert", value: "from-yellow-400 to-orange-500" },
//     { name: "Rose", value: "from-pink-400 to-rose-500" },
//   ];
 
//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//           window.location.href = '/signin';
//           return;
//         }
  
//         const userId = localStorage.getItem('userId'); 
//         if (!userId) {
//           console.error('User ID not found in localStorage');
//           toast.error('User ID not found. Please log in again.');
//           return;
//         }
  
//         const profile = await ProfileService.getProfile(userId);
//         if (profile) {
//           const totalLikes = profile.total_likes || 0;  
//           const level = getLevel(totalLikes);
//           // const tier = getTier(level);
//           const tier = getTier(totalLikes);

  
//           console.log("Total Likes:", totalLikes);  // Debugging
//           console.log("Calculated Level:", level);  // Debugging
//           console.log("Assigned Tier:", tier);      // Debugging
  
//           setProfileData({
//             name: profile.name || '',
//             last_name: profile.last_name || '',
//             username: profile.username || '',
//             email: profile.email || '',
//             bio: profile.bio || '',
//             points: profile.points || 0,
//             phone_number: profile.phone_number || null,
//             total_likes: totalLikes,
//             level: level,   // ✅ Set level correctly
//             tier: tier,     // ✅ Set tier correctly
//           });
//         } else {
//           toast.error('Failed to load profile data.');
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//         toast.error('Failed to load profile data.');
//       }
//     };
  
//     loadProfile();
//   }, []);
  
  
  
  

//   useEffect(() => {
//     if (displayName) setEditName(displayName);
//     if (bio) setEditBio(bio);
//     if (bannerColor) setEditBannerColor(bannerColor);
//     if (avatarType) setEditAvatarType(avatarType);
//   }, [displayName, bio, bannerColor, avatarType]);

 
 

//   const [profileData, setProfileData] = useState({
//     name: '',
//     last_name: '',
//     username: '',
//     email: '',
//     bio: '',
//     points: 0,
//     tier: 'bronze',
//     phone_number:''
//   });
  
//   const [isLoading, setIsLoading] = useState(false);


//   useEffect(() => {
//     const loadUserPosts = async () => {
//       if (!user?.id) return;
  
//       setIsLoadingPosts(true);
//       setError(null);
  
//       try {
//         const token = localStorage.getItem("authToken");
//         if (!token) {
//           window.location.href = "/signin";
//           return;
//         }
  
//         const { data } = await api.get(`/auth/posts`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           params: { user_id: user.id },
//         });
  
//         console.log("Fetched posts:", data); // ✅ Debugging output
  
//         setUserPosts(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching user posts:", error);
//         setError("Failed to load posts");
//         toast.error("Failed to load posts");
//         setUserPosts([]); // Reset state on failure
  
//         if (error.response?.status === 401) {
//           console.log("Token expired! Logging out...");
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
  
//           setTimeout(() => {
//             window.location.href = "/signin";
//           }, 0);
//         }
//       } finally {
//         setIsLoadingPosts(false);
//       }
//     };
  
//     loadUserPosts();
//   }, [user]);
  

  
//   useEffect(() => {
//     const fetchProfileImage = async () => {
//       if (user?.id) {
//         console.log("Fetching profile image for user:", user.id);
//         try {
//           const imageUrl = await ProfileService.getProfileImage(user.id);
//           console.log("Fetched Image URL:", imageUrl);
//           if (imageUrl) {
//             setProfileImage(imageUrl);
//           }
//         } catch (error) {
//           console.error("Error fetching profile image:", error);
//         }
//       }
//     };
  
//     fetchProfileImage();
//   }, [user]);
  

//   const loadPosts = async (pageNum: number, refresh: boolean = false) => {
//     if (!user?.id) return;
  
//     setIsLoadingPosts(true);
//     setError(null);
  
//     try {
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         window.location.href = '/signin';
//         return;
//       }
  
//       // API Call
//       const { data } = await api.get(`/auth/posts`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         params: {
//           user_id: user.id,
//           page: pageNum,
//           limit: POSTS_PER_PAGE,
//         },
//       });
  
//       // Ensure posts is an array
//       const posts = Array.isArray(data.posts) ? data.posts : [];
  
//       setUserPosts(prevPosts => (refresh ? posts : [...prevPosts, ...posts]));
//       setHasMore(data.has_more); // Ensure 'has_more' is used correctly
//     } catch (error) {
//       console.error('Error fetching user posts:', error);
//       setError('Failed to load posts');
  
//       if (error.response?.status === 401) {
//         console.log("Token expired! Logging out...");
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("userId");
  
//         setTimeout(() => {
//           window.location.href = "/signin";
//         }, 0);
//       }
//     } finally {
//       setIsLoadingPosts(false);
//       setIsLoadingMore(false);
//     }
//   };
  

//   const handleLoadMore = async () => {
//     if (!hasMore || isLoadingMore) return; // Prevent unnecessary API calls
  
//     setIsLoadingMore(true);
//     try {
//       const token = localStorage.getItem('authToken');
//       const { data } = await api.get(`/auth/posts`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { user_id: user.id, offset: userPosts.length, limit: 10 }, // Use pagination
//       });
  
//       if (Array.isArray(data.posts)) {
//         setUserPosts((prev) => [...prev, ...data.posts]); // Append new posts
//       }
//     } catch (error) {
//       console.error('Error loading more posts:', error);
//     } finally {
//       setIsLoadingMore(false);
//     }
//   };
  
//   const refreshPosts = async () => {
//     setPage(1);
//     setHasMore(true);
//     await loadPosts(1, true);
//   };

//   useEffect(() => {
//     refreshPosts();
//   }, [user?.id]);


 
//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//     if (!isEditing) {
//       setEditName(profileData.username || '');
//       setEditBio(profileData.bio || '');
//       setEditUserName(profileData.name || '');
//       setEditEmail(profileData.email || '');
//       setEditBannerColor(profileData.bannerColor || 'from-blue-500 to-purple-500');
//       setEditAvatarType(profileData.avatarType || 'default');
//       setEditLastName(profileData.last_name || ''); // ✅ Include last name
//     }
//   };



//   const handleSaveProfile = async () => {
//     if (!user?.id) return;

//     setIsLoading(true);

//     const updatedProfile = {
//       name: editUserName,
//       last_name: editLastName,
//       username: editName,
//       email: editEmail,
//       bio: editBio,
//       points: profileData.points,
//       tier: profileData.tier,
//       phone_number: profileData.phone_number,
//     };

//     try {
//       const response = await ProfileService.updateProfile(user.id, updatedProfile);
//       if (response) {
//         // Update local state immediately

//         setProfileData({
//           ...profileData,
//           ...updatedProfile
//         });
//         // Toggle off edit mode
//         setIsEditing(false);

//         toast.success('Profile updated successfully!');
//       } else {
//         toast.error('Failed to update profile.');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('An error occurred while updating profile.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

 
  
  
//   useEffect(() => {
//     const fetchBanner = async () => {
//       const token = localStorage.getItem("authToken");
//       const userId = localStorage.getItem("userId");
  
//       if (!token || !userId) {
//         navigate("/signin");
//         return;
//       }
  
//       try {
//         const response = await api.get(`/auth/banner/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
  
//         if (response.data?.banner_type === "gradient" && response.data?.name) {
//           // Find the matching gradient value for the name from the API
//           const gradient = gradients.find(g => g.name === response.data.name);
//           if (gradient) {
//             setBannerColor(gradient.value);
//           } else {
//             // Fallback to Ocean if no match found
//             setBannerColor("from-purple-500 via-blue-500 to-orange-500");
//           }
//         }
//       } catch (error: any) {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
//           navigate("/signin");
//         }
//         // Fallback to Ocean on error
//         setBannerColor("from-purple-500 via-blue-500 to-orange-500");
//       }
//     };
  
//     fetchBanner();
//   }, []);
  
  
  


  
  

//   const handleBannerSelect = (gradient: { name: string; value: string }) => {
//     console.log("Selected Gradient:", gradient.name, gradient.value);
//     setBannerColor(gradient.value); // Update the banner in the UI
//   };
  

 

  
  
//   const handleAvatarSelect = (type: string, url?: string) => {
//     setEditAvatarType(type);
//     setShowAvatarSelector(false);
//   };
  
  
  
 
//   const handleCreatePost = async (postData) => {
//     try {
//       await ProfileService.createPost(postData);
//       setShowCreatePost(false);
//       await refreshPosts();
//       toast.success('Post created successfully');
//     } catch (error) {
//       console.error('Error creating post:', error);
//       toast.error('Failed to create post');
//     }
//   };

//   useEffect(() => {
//     refreshPosts();
//   }, [user?.id]);
  



//   // Calculate user level and progress
//   const getUserLevel = (points: number) => {
//     const thresholds = DEFAULT_GAMIFICATION_SETTINGS.levelThresholds;
//     for (let i = thresholds.length - 1; i >= 0; i--) {
//       if (points >= thresholds[i].points) {
//         return {
//           currentLevel: thresholds[i].level,
//           currentPoints: points,
//           nextLevel: i < thresholds.length - 1 ? thresholds[i + 1].level : null,
//           nextLevelPoints: i < thresholds.length - 1 ? thresholds[i + 1].points : null,
//           pointsNeeded: i < thresholds.length - 1 ? thresholds[i + 1].points - points : 0,
//           progress: i < thresholds.length - 1 
//             ? ((points - thresholds[i].points) / (thresholds[i + 1].points - thresholds[i].points)) * 100
//             : 100
//         };
//       }
//     }
//     return {
//       currentLevel: 1,
//       currentPoints: points,
//       nextLevel: 2,
//       nextLevelPoints: DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points,
//       pointsNeeded: DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points - points,
//       progress: (points / DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points) * 100
//     };
//   };
  
//   const levelInfo = getUserLevel(points);

//   return (
//     <div className="max-w-7xl mx-auto py-6 px-4">
//       <Toaster position="top-right" />
//       {/* Header with gradient background */}
//       <div className="relative">
        

// <div 
         
//           className={`h-48 w-full rounded-xl relative bg-gradient-to-r ${bannerColor || 'from-purple-500 via-blue-500 to-orange-500'}`}
          
//         >
         
// <button
//   onClick={() => setShowBannerEditor(true)}
//   className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800 p-2.5 rounded-full 
//              hover:bg-white dark:hover:bg-gray-700 transition-all shadow-lg group"
//   title="Edit banner"
// >
//   <PencilLine className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600" />
// </button>

//         </div>
       
        
//         {/* Banner Editor Modal */}
//         {showBannerEditor && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="w-full max-w-2xl mx-4">
//             <BannerEditor
//               currentBanner={bannerColor}
//               onSelect={handleBannerSelect}
//               onClose={() => setShowBannerEditor(false)}
//             />
//           </div>
//         </div>
//         )}


      




        
//         {/* Profile Info Card */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mt-[-64px] relative z-10 mx-4">
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//             {/* Profile Image */}
//             <div className="relative">
             
//               <Avatar 
//   src={profileImage || avatarUrl} 
//   seed={user?.email} 
//   size="xl" 
//   tier={tier} 
//   points={points} 
//   className="border-4 border-white bg-white shadow-lg"
// />

//               {isEditing && (
//                 <button 
//                   className="absolute bottom-2 right-2 text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
//                   style={{ backgroundColor: themeColors.primary }}
//                   onClick={() => setShowAvatarSelector(true)}
//                 >
//                   <Camera size={16} />
//                 </button>
//               )}
              
//               {showAvatarSelector && (
//                 <div className="absolute top-full left-0 mt-2 z-20 w-80">
//                   <AvatarSelector 
//                     onSelect={handleAvatarSelect}
//                     currentType={editAvatarType}
//                     onClose={() => setShowAvatarSelector(false)}
//                   />
//                 </div>
//               )}
              
             
              
//               {showAvatarViewer && avatarUrl && (
//                 <ImageViewer
//                   src={avatarUrl}
//                   alt="Profile Avatar"
//                   onClose={() => setShowAvatarViewer(false)}
//                 />
//               )}
//             </div>




//             {/* Profile Info */}
//             <div className="flex-grow">
//               {isEditing ? (
//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
//                       User Name
//                     </label>
//                     <input
//                       type="text"
//                       id="displayName"
                      
//                       value={editName}
//                       onChange={(e) => setEditName(e.target.value)}
//                       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                       style={{ focusRing: themeColors.primary }}
//                     />
//                   </div>
                  


//                   <div className="flex gap-4">
//                 <div className="w-1/2">
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                    First Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     value={editUserName}
//                     onChange={(e) => setEditUserName(e.target.value)}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                     style={{ focusRing: themeColors.primary }}
//                   />
//                 </div>
//                 <div className="w-1/2">
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Last Name
//                   </label>
//                   <input
//                     type="text"
//                     id="lastname"
                  
//                     value={editLastName}
//                     onChange={(e) => setEditLastName(e.target.value)}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                     style={{ focusRing: themeColors.primary }}
//                   />
//                 </div>


//                 <div className="w-1/2">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={editEmail}
//                     onChange={(e) => setEditEmail(e.target.value)}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                     style={{ focusRing: themeColors.primary }}
//                   />
//                 </div>
//               </div>

                  
//                   <div>
//                     <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
//                       Bio
//                     </label>
//                     <textarea
//                       id="bio"
//                       value={editBio}
                     
//                       onChange={(e) => setEditBio(e.target.value)}
//                       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent min-h-[80px]"
//                       style={{ focusRing: themeColors.primary }}
//                     />
//                   </div>
                  
//                   <div className="flex gap-2">
//                     <button
//                       onClick={handleSaveProfile}
//                       disabled={isLoading}
//                       className="inline-flex items-center px-4 py-2 text-white rounded-lg transition-colors"
//                       style={{ backgroundColor: themeColors.primary }}
//                     >
//                       <Save className="w-4 h-4 mr-2" />
//                       Save Changes
//                     </button>
//                     <button
//                       onClick={handleEditToggle}
//                       className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                     >
//                       <X className="w-4 h-4 mr-2" />
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                 <h1 className="text-3xl font-bold text-gray-900">
//   {profileData.username }
// </h1>
                 

// <p className="text-gray-600 mt-1">
//   {profileData.email}
//   {profileData.phone_number && <span className="mx-2">|</span>}
//   {profileData.phone_number}
//   {profileData.name && <span className="ml-2">({profileData.name})</span>}
// </p>

 

// <div className="mt-4 flex flex-wrap gap-3">
//                     <button
//                       onClick={handleEditToggle}
//                       className="inline-flex items-center px-4 py-2 text-white rounded-lg transition-colors"
//                       style={{ backgroundColor: themeColors.primary }}
//                     >
//                       <Edit2 className="w-4 h-4 mr-2" />
//                       Edit Profile
//                     </button>
                   
//                      <button
//     onClick={handlePasswordChangeToggle}
//     className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//   >
//     <Key className="w-4 h-4 mr-2" />
//     Change Password
//   </button>
// </div>
// {showChangePassword && <ChangePassword onClose={handlePasswordChangeToggle} />}         
//                 </>
//               )}
//             </div>
//           </div>

//           {/* About Section */}
//           {!isEditing && (
//             <div className="mt-8">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
//               <div className="bg-gray-50 rounded-lg p-6">
              
//                 <p className="text-gray-700">
//         {profileData.bio || "Share your story here! Tell others about yourself, your interests, and what you're passionate about."}
//       </p>
//               </div>
//             </div>
//           )}

//           {/* Progress Bar */}
//         <div className="mt-4 px-4">
//         <div className="flex justify-between text-sm mb-1">
//           <span className="font-medium">Level {profileData?.level || 1} {profileData?.tier || "Bronze"}
            
//             {/* Crown Icon for Silver, Gold, and Platinum */}
//             {["Platinum"].includes(profileData?.tier) && (
//               <span className="text-yellow-400 text-lg">👑</span>
//             )}
//           </span>
//         </div>
      
//         {/* Progress Bar - Directly Uses total_likes */}
//         <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
//           <div 
//             className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${getTierColor(profileData?.total_likes)}`}
//             style={{ width: `${profileData?.total_likes || 0}%` }} 
//           >
//             <div className="w-full h-full opacity-75 bg-[linear-gradient(110deg,rgba(255,255,255,0.48)_0.8%,rgba(255,255,255,0)_10%,rgba(255,255,255,0.1)_100%)]"></div>
//           </div>
//         </div>
      
//         <div className="text-xs text-gray-500 mt-1 text-center">
//           {getPointsNeeded(profileData?.total_likes || 0) > 0 
//             ? `${getPointsNeeded(profileData?.total_likes || 0)} more likes to next level` 
//             : 'Maximum level reached!'}
//         </div>
//       </div>
      
          
//         </div>
//       </div>

//       {/* User Posts Section */}


//       {/* User Posts Section */}
// <div className="mt-8">
//   <div className="flex justify-between items-center mb-6 px-4">
//     <h2 className="text-xl font-semibold text-gray-900">My Posts</h2>
//     <button
//       onClick={() => setShowCreatePost(true)}
//       className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg"
//       style={{ backgroundColor: themeColors.primary }}
//     >
//       <Plus className="w-5 h-5" />
//       Create Post
//     </button>
//   </div>

//   {isLoadingPosts ? (
//     <div className="text-center py-8">
//       <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       <p className="mt-2 text-gray-600">Loading posts...</p>
//     </div>
//   ) : error ? (
//     <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
//       <p className="text-gray-600 mb-4">{error}. Please try again later.</p>
//     </div>
//   ) : Array.isArray(userPosts) && userPosts.length === 0 ? (
//     <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
//       <p className="text-gray-600 mb-4">
//         There are no posts yet. Start sharing your amazing moments and inspire others!
//       </p>
//     </div>
//   ) : (
//     <div className="space-y-6">
//       {userPosts?.map((post) => (
//         <PostItem
//           key={post.id}
//           post={post}
//           onPostDeleted={refreshPosts}
//           onPostUpdated={(updatedPost) => {
//             setUserPosts(prevPosts => 
//               prevPosts.map(p => p.id === updatedPost.id ? updatedPost : p)
//             );
//           }}
//         />
//       ))}
//       {hasMore && !isLoadingMore && (
//         <div className="text-center py-4">
//           <button
//             onClick={handleLoadMore}
//             className="px-4 py-2 text-white rounded-lg"
//             style={{ backgroundColor: themeColors.primary }}
//           >
//             Load More
//           </button>
//         </div>
//       )}
//       {isLoadingMore && (
//         <div className="text-center py-4">
//           <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
//         </div>
//       )}
//     </div>
//   )}
// </div>

//     {/* <div className="mt-8">
//   <div className="flex justify-between items-center mb-6 px-4">
//     <h2 className="text-xl font-semibold text-gray-900">My Posts</h2>
//     <button
//       onClick={() => setShowCreatePost(true)}
//       className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg"
//       style={{ backgroundColor: themeColors.primary }}
//     >
//       <Plus className="w-5 h-5" />
//       Create Post
//     </button>
//   </div>

//   {isLoadingPosts ? (
//     <div className="text-center py-8">
//       <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       <p className="mt-2 text-gray-600">Loading posts...</p>
//     </div>
//   ) : error ? (
//     <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
//       <p className="text-gray-600 mb-4">{error}. Please try again later.</p>
//     </div>
//   ) : Array.isArray(userPosts) && userPosts.length === 0 ? (
//     <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
//       <p className="text-gray-600 mb-4">
//         There are no posts yet. Start sharing your amazing moments and inspire others!
//       </p>
//     </div>
//   ) : (
//     <div className="space-y-6">
//       {
//       userPosts?.map((post) => (
//         <PostItem
//         posts={userPosts}
//         isLoading={isLoadingMore}
//         hasMore={hasMore}
//         onLoadMore={handleLoadMore}
//         onPostDeleted={refreshPosts}
//       />
//       )
//       )}
//     </div>
//   )}
// </div> */}


//       {/* Create Post Modal */}
//       {showCreatePost && (
//         <CreatePost
//           onClose={() => setShowCreatePost(false)}
//           onSubmit={handleCreatePost}
//           avatarUrl={avatarUrl}
//           userEmail={user?.email}
//           tier={tier}
//           points={points}
//           onPostCreated={refreshPosts}
//         />
//       )}


      
//     </div>
//   );
// }




// import React, { useState, useEffect, useCallback } from 'react';

// import { useAuthStore } from '../store/authStore';
// import { useProfileStore } from '../store/profileStore';
// import { usePostStore } from '../store/postStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Edit2, Key, X, Save, Camera, Image, Plus,PencilLine } from 'lucide-react';
// import { Avatar } from '../components/Avatar';
// import { AvatarSelector } from '../components/AvatarSelector';
// import { BannerEditor } from '../components/BannerEditor';
// import { PostItem } from '../components/PostItem';
// import { CreatePost } from '../components/CreatePosts';
// import { BANNER_TEMPLATES, DEFAULT_GAMIFICATION_SETTINGS } from '../config/environment';
// import { ImageViewer } from '../components/ImageViewer';
// import toast, { Toaster } from 'react-hot-toast';
// import { ProfileService } from '../services';
// import { formatDistanceToNow } from 'date-fns';
// import { ChangePassword } from '../components/changePassword';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios"
// // import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
// import { useInfiniteScroll } from '../hook/useInfiniteScroll';
// import { LoadingSpinner } from '../components/LoadingSpinner';


// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000",
//   headers: {
//     "Cache-Control": "no-cache",
//     Pragma: "no-cache",
//   },
// });
// interface UserPost {
//   id: string;
//   title: string;
//   content: string;
// }

// export default function Profile() {
//   const { user } = useAuthStore();
//   const { 
//     displayName, 
//     bio, 
//     // bannerColor, 
//     avatarUrl,
//     avatarType,
//     points = 0,
//     phone_number,
//     tier = 'bronze',
//     fetchProfile, 
//     updateProfile, 
//     // isLoading 
//   } = useProfileStore();
//   const { fetchPostsByUser, createPost } = usePostStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
  
//   const [isEditing, setIsEditing] = useState(false);
//   const [editName, setEditName] = useState('');
//   const [editBio, setEditBio] = useState('');
//   const [editBannerColor, setEditBannerColor] = useState('');
//   const [editAvatarType, setEditAvatarType] = useState('');
//   const [showAvatarSelector, setShowAvatarSelector] = useState(false);
//   const [showBannerEditor, setShowBannerEditor] = useState(false);
//   const [showAvatarViewer, setShowAvatarViewer] = useState(false);
//   const [userPosts, setUserPosts] = useState<any[]>([]);
//   const [isLoadingPosts, setIsLoadingPosts] = useState(false);
//   const [showCreatePost, setShowCreatePost] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [editEmail, setEditEmail] = useState('');
//   const [editUserName, setEditUserName] = useState(''); 
//   const [editLastName, setEditLastName] = useState('');
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const navigate = useNavigate(); 
//   const [reason, setReason] = useState('');
//   const [bannerColor, setBannerColor] = useState('from-purple-500 via-blue-500 to-orange-500');
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
  

  
//   const POSTS_PER_PAGE = 10;
  

//   const loadMore = useCallback(() => {
//     if (!isLoadingMore && hasMore) {
//       setPage(prev => prev + 1);
//       loadPosts(page + 1);
//     }
//   }, [isLoadingMore, hasMore, page]);

//   useInfiniteScroll(loadMore, isLoadingMore, hasMore);

//   useEffect(() => {
//     const loadUserPosts = async () => {
//       if (!user?.id) return;
  
//       setIsLoadingPosts(true);
//       setError(null);
  
//       try {
//         const token = localStorage.getItem("authToken");
//         if (!token) {
//           window.location.href = "/signin";
//           return;
//         }
  
//         const { data } = await api.get(`/auth/posts`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           params: { user_id: user.id },
//         });
  
//         if (Array.isArray(data)) {
//           setUserPosts(data);
//         } else if (Array.isArray(data.posts)) {
//           setUserPosts(data.posts);
//         } else {
//           setUserPosts([]);
//         }
//       } catch (error) {
//         console.error("Error fetching user posts:", error);
//         setError("Failed to load posts");
//         toast.error("Failed to load posts");
//         setUserPosts([]);
  
//         if (error.response?.status === 401) {
//           console.log("Token expired! Logging out...");
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
//           window.location.href = "/signin";
//         }
//       } finally {
//         setTimeout(() => {
//           setIsLoadingPosts(false);
//         }, 100);
//       }
//     };
  
//     loadUserPosts();
//   }, [user]);


  

//   // useInfiniteScroll(loadMore, isLoadingMore, hasMore);


//   const handlePasswordChangeToggle = () => {
//     setShowChangePassword(prev => !prev);
//   };

//   const getTierColor = (likes: number): string => {
//     if (likes >= 76) return 'from-cyan-400 to-cyan-500'; // Platinum
//     if (likes >= 51) return 'from-yellow-400 to-yellow-500'; // Gold
//     if (likes >= 26) return 'from-gray-300 to-gray-400'; // Silver
//     return 'from-amber-600 to-amber-700'; // Bronze
//   };
  
//   const getTier = (likes: number): string => {
//     if (likes >= 76) return "Platinum";
//     if (likes >= 51) return "Gold";
//     if (likes >= 26) return "Silver";
//     return "Bronze";
//   };
//   const getPointsNeeded = (likes: number): number => {
//     if (likes < 26) return 26 - likes; // Bronze to Silver
//     if (likes < 51) return 51 - likes; // Silver to Gold
//     if (likes < 76) return 76 - likes; // Gold to Platinum
//     return 0; // Maximum level reached
//   };

//   const getLevel = (likes: number): number => {
//     if (likes >= 76) return 4; // Platinum
//     if (likes >= 51) return 3; // Gold
//     if (likes >= 26) return 2; // Silver
//     return 1; // Bronze
//   };
  
  
//   const gradients = [
//     { name: "Ocean", value: "from-blue-500 to-cyan-500" },
//     { name: "Sunset", value: "from-orange-500 to-pink-500" },
//     { name: "Forest", value: "from-green-500 to-emerald-500" },
//     { name: "Royal", value: "from-purple-500 to-indigo-500" },
//     { name: "Spring", value: "from-green-400 to-yellow-400" },
//     { name: "Aurora", value: "from-teal-400 to-purple-500" },
//     { name: "Desert", value: "from-yellow-400 to-orange-500" },
//     { name: "Rose", value: "from-pink-400 to-rose-500" },
//   ];
 
//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//           window.location.href = '/signin';
//           return;
//         }
  
//         const userId = localStorage.getItem('userId'); 
//         if (!userId) {
//           console.error('User ID not found in localStorage');
//           toast.error('User ID not found. Please log in again.');
//           return;
//         }
  
//         const profile = await ProfileService.getProfile(userId);
//         if (profile) {
//           const totalLikes = profile.total_likes || 0;  
//           const level = getLevel(totalLikes);
//           // const tier = getTier(level);
//           const tier = getTier(totalLikes);

  
//           console.log("Total Likes:", totalLikes);  // Debugging
//           console.log("Calculated Level:", level);  // Debugging
//           console.log("Assigned Tier:", tier);      // Debugging
  
//           setProfileData({
//             name: profile.name || '',
//             last_name: profile.last_name || '',
//             username: profile.username || '',
//             email: profile.email || '',
//             bio: profile.bio || '',
//             points: profile.points || 0,
//             phone_number: profile.phone_number || null,
//             total_likes: totalLikes,
//             level: level,   // ✅ Set level correctly
//             tier: tier,     // ✅ Set tier correctly
//           });
//         } else {
//           toast.error('Failed to load profile data.');
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//         toast.error('Failed to load profile data.');
//       }
//     };
  
//     loadProfile();
//   }, []);
  
  
  
  

//   useEffect(() => {
//     if (displayName) setEditName(displayName);
//     if (bio) setEditBio(bio);
//     if (bannerColor) setEditBannerColor(bannerColor);
//     if (avatarType) setEditAvatarType(avatarType);
//   }, [displayName, bio, bannerColor, avatarType]);

 
 

//   const [profileData, setProfileData] = useState({
//     name: '',
//     last_name: '',
//     username: '',
//     email: '',
//     bio: '',
//     points: 0,
//     tier: 'bronze',
//     phone_number:''
//   });
  
//   const [isLoading, setIsLoading] = useState(false);


//   // useEffect(() => {
//   //   const loadUserPosts = async () => {
//   //     if (!user?.id) return;
  
//   //     setIsLoadingPosts(true);
//   //     setError(null);
  
//   //     try {
//   //       const token = localStorage.getItem("authToken");
//   //       if (!token) {
//   //         window.location.href = "/signin";
//   //         return;
//   //       }
  
//   //       const { data } = await api.get(`/auth/posts`, {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //           "Content-Type": "application/json",
//   //         },
//   //         params: { user_id: user.id },
//   //       });
  
//   //       console.log("Fetched posts:", data); // ✅ Debugging output
  
//   //       setUserPosts(Array.isArray(data) ? data : []);
//   //     } catch (error) {
//   //       console.error("Error fetching user posts:", error);
//   //       setError("Failed to load posts");
//   //       toast.error("Failed to load posts");
//   //       setUserPosts([]); // Reset state on failure
  
//   //       if (error.response?.status === 401) {
//   //         console.log("Token expired! Logging out...");
//   //         localStorage.removeItem("authToken");
//   //         localStorage.removeItem("userId");
  
//   //         setTimeout(() => {
//   //           window.location.href = "/signin";
//   //         }, 0);
//   //       }
//   //     } finally {
//   //       setIsLoadingPosts(false);
//   //     }
//   //   };
  
//   //   loadUserPosts();
//   // }, [user]);
  

  
//   useEffect(() => {
//     const fetchProfileImage = async () => {
//       if (user?.id) {
//         console.log("Fetching profile image for user:", user.id);
//         try {
//           const imageUrl = await ProfileService.getProfileImage(user.id);
//           console.log("Fetched Image URL:", imageUrl);
//           if (imageUrl) {
//             setProfileImage(imageUrl);
//           }
//         } catch (error) {
//           console.error("Error fetching profile image:", error);
//         }
//       }
//     };
  
//     fetchProfileImage();
//   }, [user]);
  

//   const loadPosts = async (pageNum: number, refresh: boolean = false) => {
//     if (!user?.id) return;
  
//     setIsLoadingPosts(true);
//     setError(null);
  
//     try {
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         window.location.href = '/signin';
//         return;
//       }
  
//       // API Call
//       const { data } = await api.get(`/auth/posts`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         params: {
//           user_id: user.id,
//           page: pageNum,
//           limit: POSTS_PER_PAGE,
//         },
//       });
  
//       // Ensure posts is an array
//       const posts = Array.isArray(data.posts) ? data.posts : [];
  
//       setUserPosts(prevPosts => (refresh ? posts : [...prevPosts, ...posts]));
//       setHasMore(data.has_more); // Ensure 'has_more' is used correctly
//     } catch (error) {
//       console.error('Error fetching user posts:', error);
//       setError('Failed to load posts');
  
//       if (error.response?.status === 401) {
//         console.log("Token expired! Logging out...");
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("userId");
  
//         setTimeout(() => {
//           window.location.href = "/signin";
//         }, 0);
//       }
//     } finally {
//       setIsLoadingPosts(false);
//       setIsLoadingMore(false);
//     }
//   };
  

//   const handleLoadMore = async () => {
//     if (!hasMore || isLoadingMore) return; // Prevent unnecessary API calls
  
//     setIsLoadingMore(true);
//     try {
//       const token = localStorage.getItem('authToken');
//       const { data } = await api.get(`/auth/posts`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { user_id: user.id, offset: userPosts.length, limit: 10 }, // Use pagination
//       });
  
//       if (Array.isArray(data.posts)) {
//         setUserPosts((prev) => [...prev, ...data.posts]); // Append new posts
//       }
//     } catch (error) {
//       console.error('Error loading more posts:', error);
//     } finally {
//       setIsLoadingMore(false);
//     }
//   };
  
//   const refreshPosts = async () => {
//     setPage(1);
//     setHasMore(true);
//     await loadPosts(1, true);
//   };

//   useEffect(() => {
//     refreshPosts();
//   }, [user?.id]);


 
//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//     if (!isEditing) {
//       setEditName(profileData.username || '');
//       setEditBio(profileData.bio || '');
//       setEditUserName(profileData.name || '');
//       setEditEmail(profileData.email || '');
//       setEditBannerColor(profileData.bannerColor || 'from-blue-500 to-purple-500');
//       setEditAvatarType(profileData.avatarType || 'default');
//       setEditLastName(profileData.last_name || ''); // ✅ Include last name
//     }
//   };



//   const handleSaveProfile = async () => {
//     if (!user?.id) return;

//     setIsLoading(true);

//     const updatedProfile = {
//       name: editUserName,
//       last_name: editLastName,
//       username: editName,
//       email: editEmail,
//       bio: editBio,
//       points: profileData.points,
//       tier: profileData.tier,
//       phone_number: profileData.phone_number,
//     };

//     try {
//       const response = await ProfileService.updateProfile(user.id, updatedProfile);
//       if (response) {
//         // Update local state immediately

//         setProfileData({
//           ...profileData,
//           ...updatedProfile
//         });
//         // Toggle off edit mode
//         setIsEditing(false);

//         toast.success('Profile updated successfully!');
//       } else {
//         toast.error('Failed to update profile.');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('An error occurred while updating profile.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

 
  
  
//   useEffect(() => {
//     const fetchBanner = async () => {
//       const token = localStorage.getItem("authToken");
//       const userId = localStorage.getItem("userId");
  
//       if (!token || !userId) {
//         navigate("/signin");
//         return;
//       }
  
//       try {
//         const response = await api.get(`/auth/banner/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
  
//         if (response.data?.banner_type === "gradient" && response.data?.name) {
//           // Find the matching gradient value for the name from the API
//           const gradient = gradients.find(g => g.name === response.data.name);
//           if (gradient) {
//             setBannerColor(gradient.value);
//           } else {
//             // Fallback to Ocean if no match found
//             setBannerColor("from-purple-500 via-blue-500 to-orange-500");
//           }
//         }
//       } catch (error: any) {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
//           navigate("/signin");
//         }
//         // Fallback to Ocean on error
//         setBannerColor("from-purple-500 via-blue-500 to-orange-500");
//       }
//     };
  
//     fetchBanner();
//   }, []);
  
  
  


  
  

//   const handleBannerSelect = (gradient: { name: string; value: string }) => {
//     console.log("Selected Gradient:", gradient.name, gradient.value);
//     setBannerColor(gradient.value); // Update the banner in the UI
//   };
  

 

  
  
//   const handleAvatarSelect = (type: string, url?: string) => {
//     setEditAvatarType(type);
//     setShowAvatarSelector(false);
//   };
  
  
  
 
//   const handleCreatePost = async (postData) => {
//     try {
//       await ProfileService.createPost(postData);
//       setShowCreatePost(false);
//       await refreshPosts();
//       toast.success('Post created successfully');
//     } catch (error) {
//       console.error('Error creating post:', error);
//       toast.error('Failed to create post');
//     }
//   };

//   useEffect(() => {
//     refreshPosts();
//   }, [user?.id]);
  



//   // Calculate user level and progress
//   const getUserLevel = (points: number) => {
//     const thresholds = DEFAULT_GAMIFICATION_SETTINGS.levelThresholds;
//     for (let i = thresholds.length - 1; i >= 0; i--) {
//       if (points >= thresholds[i].points) {
//         return {
//           currentLevel: thresholds[i].level,
//           currentPoints: points,
//           nextLevel: i < thresholds.length - 1 ? thresholds[i + 1].level : null,
//           nextLevelPoints: i < thresholds.length - 1 ? thresholds[i + 1].points : null,
//           pointsNeeded: i < thresholds.length - 1 ? thresholds[i + 1].points - points : 0,
//           progress: i < thresholds.length - 1 
//             ? ((points - thresholds[i].points) / (thresholds[i + 1].points - thresholds[i].points)) * 100
//             : 100
//         };
//       }
//     }
//     return {
//       currentLevel: 1,
//       currentPoints: points,
//       nextLevel: 2,
//       nextLevelPoints: DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points,
//       pointsNeeded: DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points - points,
//       progress: (points / DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points) * 100
//     };
//   };
  
//   const levelInfo = getUserLevel(points);

//   return (
//     <div className="max-w-7xl mx-auto py-6 px-4">
//       <Toaster position="top-right" />
//       {/* Header with gradient background */}
//       <div className="relative">
        

// <div 
         
//           className={`h-48 w-full rounded-xl relative bg-gradient-to-r ${bannerColor || 'from-purple-500 via-blue-500 to-orange-500'}`}
          
//         >
         
// <button
//   onClick={() => setShowBannerEditor(true)}
//   className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800 p-2.5 rounded-full 
//              hover:bg-white dark:hover:bg-gray-700 transition-all shadow-lg group"
//   title="Edit banner"
// >
//   <PencilLine className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600" />
// </button>

//         </div>
       
        
//         {/* Banner Editor Modal */}
//         {showBannerEditor && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="w-full max-w-2xl mx-4">
//             <BannerEditor
//               currentBanner={bannerColor}
//               onSelect={handleBannerSelect}
//               onClose={() => setShowBannerEditor(false)}
//             />
//           </div>
//         </div>
//         )}


      




        
//         {/* Profile Info Card */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mt-[-64px] relative z-10 mx-4">
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//             {/* Profile Image */}
//             <div className="relative">
             
//               <Avatar 
//   src={profileImage || avatarUrl} 
//   seed={user?.email} 
//   size="xl" 
//   tier={tier} 
//   points={points} 
//   className="border-4 border-white bg-white shadow-lg"
// />

//               {isEditing && (
//                 <button 
//                   className="absolute bottom-2 right-2 text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
//                   style={{ backgroundColor: themeColors.primary }}
//                   onClick={() => setShowAvatarSelector(true)}
//                 >
//                   <Camera size={16} />
//                 </button>
//               )}
              
//               {showAvatarSelector && (
//                 <div className="absolute top-full left-0 mt-2 z-20 w-80">
//                   <AvatarSelector 
//                     onSelect={handleAvatarSelect}
//                     currentType={editAvatarType}
//                     onClose={() => setShowAvatarSelector(false)}
//                   />
//                 </div>
//               )}
              
             
              
//               {showAvatarViewer && avatarUrl && (
//                 <ImageViewer
//                   src={avatarUrl}
//                   alt="Profile Avatar"
//                   onClose={() => setShowAvatarViewer(false)}
//                 />
//               )}
//             </div>




//             {/* Profile Info */}
//             <div className="flex-grow">
//               {isEditing ? (
//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
//                       User Name
//                     </label>
//                     <input
//                       type="text"
//                       id="displayName"
                      
//                       value={editName}
//                       onChange={(e) => setEditName(e.target.value)}
//                       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                       style={{ focusRing: themeColors.primary }}
//                     />
//                   </div>
                  


//                   <div className="flex gap-4">
//                 <div className="w-1/2">
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                    First Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     value={editUserName}
//                     onChange={(e) => setEditUserName(e.target.value)}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                     style={{ focusRing: themeColors.primary }}
//                   />
//                 </div>
//                 <div className="w-1/2">
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Last Name
//                   </label>
//                   <input
//                     type="text"
//                     id="lastname"
                  
//                     value={editLastName}
//                     onChange={(e) => setEditLastName(e.target.value)}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                     style={{ focusRing: themeColors.primary }}
//                   />
//                 </div>


//                 <div className="w-1/2">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={editEmail}
//                     onChange={(e) => setEditEmail(e.target.value)}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                     style={{ focusRing: themeColors.primary }}
//                   />
//                 </div>
//               </div>

                  
//                   <div>
//                     <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
//                       Bio
//                     </label>
//                     <textarea
//                       id="bio"
//                       value={editBio}
                     
//                       onChange={(e) => setEditBio(e.target.value)}
//                       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent min-h-[80px]"
//                       style={{ focusRing: themeColors.primary }}
//                     />
//                   </div>
                  
//                   <div className="flex gap-2">
//                     <button
//                       onClick={handleSaveProfile}
//                       disabled={isLoading}
//                       className="inline-flex items-center px-4 py-2 text-white rounded-lg transition-colors"
//                       style={{ backgroundColor: themeColors.primary }}
//                     >
//                       <Save className="w-4 h-4 mr-2" />
//                       Save Changes
//                     </button>
//                     <button
//                       onClick={handleEditToggle}
//                       className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                     >
//                       <X className="w-4 h-4 mr-2" />
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                 <h1 className="text-3xl font-bold text-gray-900">
//   {profileData.username }
// </h1>
                 

// <p className="text-gray-600 mt-1">
//   {profileData.email}
//   {profileData.phone_number && <span className="mx-2">|</span>}
//   {profileData.phone_number}
//   {profileData.name && <span className="ml-2">({profileData.name})</span>}
// </p>

 

// <div className="mt-4 flex flex-wrap gap-3">
//                     <button
//                       onClick={handleEditToggle}
//                       className="inline-flex items-center px-4 py-2 text-white rounded-lg transition-colors"
//                       style={{ backgroundColor: themeColors.primary }}
//                     >
//                       <Edit2 className="w-4 h-4 mr-2" />
//                       Edit Profile
//                     </button>
                   
//                      <button
//     onClick={handlePasswordChangeToggle}
//     className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//   >
//     <Key className="w-4 h-4 mr-2" />
//     Change Password
//   </button>
// </div>
// {showChangePassword && <ChangePassword onClose={handlePasswordChangeToggle} />}         
//                 </>
//               )}
//             </div>
//           </div>

//           {/* About Section */}
//           {!isEditing && (
//             <div className="mt-8">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
//               <div className="bg-gray-50 rounded-lg p-6">
              
//                 <p className="text-gray-700">
//         {profileData.bio || "Share your story here! Tell others about yourself, your interests, and what you're passionate about."}
//       </p>
//               </div>
//             </div>
//           )}

//           {/* Progress Bar */}
//         <div className="mt-4 px-4">
//         <div className="flex justify-between text-sm mb-1">
//           <span className="font-medium">Level {profileData?.level || 1} {profileData?.tier || "Bronze"}
            
//             {/* Crown Icon for Silver, Gold, and Platinum */}
//             {["Platinum"].includes(profileData?.tier) && (
//               <span className="text-yellow-400 text-lg">👑</span>
//             )}
//           </span>
//         </div>
      
//         {/* Progress Bar - Directly Uses total_likes */}
//         <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
//           <div 
//             className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${getTierColor(profileData?.total_likes)}`}
//             style={{ width: `${profileData?.total_likes || 0}%` }} 
//           >
//             <div className="w-full h-full opacity-75 bg-[linear-gradient(110deg,rgba(255,255,255,0.48)_0.8%,rgba(255,255,255,0)_10%,rgba(255,255,255,0.1)_100%)]"></div>
//           </div>
//         </div>
      
//         <div className="text-xs text-gray-500 mt-1 text-center">
//           {getPointsNeeded(profileData?.total_likes || 0) > 0 
//             ? `${getPointsNeeded(profileData?.total_likes || 0)} more likes to next level` 
//             : 'Maximum level reached!'}
//         </div>
//       </div>
      
          
//         </div>
//       </div>

//       {/* User Posts Section */}


     

// <div className="max-w-7xl mx-auto py-6 px-4">
//       <div className="mt-8">
//         <div className="flex justify-between items-center mb-6 px-4">
//           <h2 className="text-xl font-semibold text-gray-900">My Posts</h2>
//           <button
//             onClick={() => setShowCreatePost(true)}
//             className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg"
//             style={{ backgroundColor: themeColors.primary }}
//           >
//             <Plus className="w-5 h-5" />
//             Create Post
//           </button>
//         </div>

//         {isLoadingPosts ? (
//           <div className="flex justify-center items-center min-h-[200px]">
//             <LoadingSpinner />
//           </div>
//         ) : error ? (
//           <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
//             <p className="text-gray-600 mb-4">{error}. Please try again later.</p>
//           </div>
//         ) : !userPosts?.length ? (
//           <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
//             <p className="text-gray-600 mb-4">
//               There are no posts yet. Start sharing your amazing moments and inspire others!
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {userPosts.map((post) => (
//               <PostItem
//                 key={post.id}
//                 post={post}
//                 onPostDeleted={refreshPosts}
//                 onPostUpdated={(updatedPost) => {
//                   setUserPosts(prevPosts => 
//                     prevPosts.map(p => p.id === updatedPost.id ? updatedPost : p)
//                   );
//                 }}
//               />
//             ))}
//             {isLoadingMore && (
//               <div className="flex justify-center py-4">
//                 <LoadingSpinner />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>

   

//       {/* Create Post Modal */}
//       {showCreatePost && (
//         <CreatePost
//           onClose={() => setShowCreatePost(false)}
//           onSubmit={handleCreatePost}
//           avatarUrl={avatarUrl}
//           userEmail={user?.email}
//           tier={tier}
//           points={points}
//           onPostCreated={refreshPosts}
//         />
//       )}


      
//     </div>
//   );
// }






// import React, { useState, useEffect, useCallback } from 'react';

// import { useAuthStore } from '../store/authStore';
// import { useProfileStore } from '../store/profileStore';
// import { usePostStore } from '../store/postStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Edit2, Key, X, Save, Camera, Image, Plus,PencilLine } from 'lucide-react';
// import { Avatar } from '../components/Avatar';
// import { AvatarSelector } from '../components/AvatarSelector';
// import { BannerEditor } from '../components/BannerEditor';
// import { PostItem } from '../components/PostItem';
// import { CreatePost } from '../components/CreatePosts';
// import { BANNER_TEMPLATES, DEFAULT_GAMIFICATION_SETTINGS } from '../config/environment';
// import { ImageViewer } from '../components/ImageViewer';
// import toast, { Toaster } from 'react-hot-toast';
// import { ProfileService } from '../services';
// import { formatDistanceToNow } from 'date-fns';
// import { ChangePassword } from '../components/changePassword';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios"
// // import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
// import { useInfiniteScroll } from '../hook/useInfiniteScroll';
// import { LoadingSpinner } from '../components/LoadingSpinner';


// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000",
//   headers: {
//     "Cache-Control": "no-cache",
//     Pragma: "no-cache",
//   },
// });
// interface UserPost {
//   id: string;
//   title: string;
//   content: string;
// }

// export default function Profile() {
//   const { user } = useAuthStore();
//   const { 
//     displayName, 
//     bio, 
//     // bannerColor, 
//     avatarUrl,
//     avatarType,
//     points = 0,
//     phone_number,
//     tier = 'bronze',
//     fetchProfile, 
//     updateProfile, 
//     // isLoading 
//   } = useProfileStore();
//   const { fetchPostsByUser, createPost } = usePostStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
  
//   const [isEditing, setIsEditing] = useState(false);
//   const [editName, setEditName] = useState('');
//   const [editBio, setEditBio] = useState('');
//   const [editBannerColor, setEditBannerColor] = useState('');
//   const [editAvatarType, setEditAvatarType] = useState('');
//   const [showAvatarSelector, setShowAvatarSelector] = useState(false);
//   const [showBannerEditor, setShowBannerEditor] = useState(false);
//   const [showAvatarViewer, setShowAvatarViewer] = useState(false);
//   const [userPosts, setUserPosts] = useState<any[]>([]);
//   const [isLoadingPosts, setIsLoadingPosts] = useState(false);
//   const [showCreatePost, setShowCreatePost] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [editEmail, setEditEmail] = useState('');
//   const [editUserName, setEditUserName] = useState(''); 
//   const [editLastName, setEditLastName] = useState('');
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const navigate = useNavigate(); 
//   const [reason, setReason] = useState('');
//   const [bannerColor, setBannerColor] = useState('from-purple-500 via-blue-500 to-orange-500');
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [tierInfo, setTierInfo] = useState(null);
 
  

  
//   const POSTS_PER_PAGE = 10;
  

//   const loadMore = useCallback(() => {
//     if (!isLoadingMore && hasMore) {
//       setPage(prev => prev + 1);
//       loadPosts(page + 1);
//     }
//   }, [isLoadingMore, hasMore, page]);

//   useInfiniteScroll(loadMore, isLoadingMore, hasMore);

//   useEffect(() => {
//     const loadUserPosts = async () => {
//       if (!user?.id) return;
  
//       setIsLoadingPosts(true);
//       setError(null);
  
//       try {
//         const token = localStorage.getItem("authToken");
//         if (!token) {
//           window.location.href = "/signin";
//           return;
//         }
  
//         const { data } = await api.get(`/auth/posts`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           params: { user_id: user.id },
//         });
  
//         if (Array.isArray(data)) {
//           setUserPosts(data);
//         } else if (Array.isArray(data.posts)) {
//           setUserPosts(data.posts);
//         } else {
//           setUserPosts([]);
//         }
//       } catch (error) {
//         console.error("Error fetching user posts:", error);
//         setError("Failed to load posts");
//         toast.error("Failed to load posts");
//         setUserPosts([]);
  
//         if (error.response?.status === 401) {
//           console.log("Token expired! Logging out...");
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
//           window.location.href = "/signin";
//         }
//       } finally {
//         setTimeout(() => {
//           setIsLoadingPosts(false);
//         }, 100);
//       }
//     };
  
//     loadUserPosts();
//   }, [user]);


  

 


//   const handlePasswordChangeToggle = () => {
//     setShowChangePassword(prev => !prev);
//   };

  
  
  
//   const gradients = [
//     { name: "Ocean", value: "from-blue-500 to-cyan-500" },
//     { name: "Sunset", value: "from-orange-500 to-pink-500" },
//     { name: "Forest", value: "from-green-500 to-emerald-500" },
//     { name: "Royal", value: "from-purple-500 to-indigo-500" },
//     { name: "Spring", value: "from-green-400 to-yellow-400" },
//     { name: "Aurora", value: "from-teal-400 to-purple-500" },
//     { name: "Desert", value: "from-yellow-400 to-orange-500" },
//     { name: "Rose", value: "from-pink-400 to-rose-500" },
//   ];



//   useEffect(() => {
//     const fetchTierInfo = async () => {
//       const token = localStorage.getItem("authToken");
//       const userId = localStorage.getItem("userId");

//       if (!token || !userId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await api.get(
//           `/auth/calculatepoints?user_id=${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setTierInfo(response.data);
//       } catch (err) {
//         setError(err.response?.data?.detail || "Failed to fetch tier info");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTierInfo();
//   }, []);
 
//   // useEffect(() => {
//   //   const loadProfile = async () => {
//   //     try {
//   //       const token = localStorage.getItem('authToken');
//   //       if (!token) {
//   //         window.location.href = '/signin';
//   //         return;
//   //       }
  
//   //       const userId = localStorage.getItem('userId'); 
//   //       if (!userId) {
//   //         console.error('User ID not found in localStorage');
//   //         toast.error('User ID not found. Please log in again.');
//   //         return;
//   //       }
  
//   //       const profile = await ProfileService.getProfile(userId);
//   //       if (profile) {
//   //         const totalLikes = profile.total_likes || 0;  
//   //         const level = getLevel(totalLikes);
//   //         // const tier = getTier(level);
//   //         const tier = getTier(totalLikes);

  
//   //         console.log("Total Likes:", totalLikes);  // Debugging
//   //         console.log("Calculated Level:", level);  // Debugging
//   //         console.log("Assigned Tier:", tier);      // Debugging
  
//   //         setProfileData({
//   //           name: profile.name || '',
//   //           last_name: profile.last_name || '',
//   //           username: profile.username || '',
//   //           email: profile.email || '',
//   //           bio: profile.bio || '',
//   //           points: profile.points || 0,
//   //           phone_number: profile.phone_number || null,
//   //           total_likes: totalLikes,
//   //           level: level,   // ✅ Set level correctly
//   //           tier: tier,     // ✅ Set tier correctly
//   //         });
//   //       } else {
//   //         toast.error('Failed to load profile data.');
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching profile:', error);
//   //       toast.error('Failed to load profile data.');
//   //     }
//   //   };
  
//   //   loadProfile();
//   // }, []);
  
  

//   useEffect(() => {
//     const loadProfileData = async () => {
//       try {
//         const userId = localStorage.getItem('userId');
//         if (!userId) {
//           setError('User ID not found. Please log in again.');
//           return;
//         }

//         const profile = await ProfileService.getProfile(userId);
//         if (profile) {
//           setProfileData(profile);
          
//           // Load profile image
//           const imageUrl = await ProfileService.getProfileImage(userId);
//           if (imageUrl) {
//             setProfileImage(imageUrl);
//           }
//         }
//       } catch (err) {
//         console.error('Error loading profile:', err);
//         setError('Failed to load profile data');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadProfileData();
//   }, []);

  

//   useEffect(() => {
//     if (displayName) setEditName(displayName);
//     if (bio) setEditBio(bio);
//     if (bannerColor) setEditBannerColor(bannerColor);
//     if (avatarType) setEditAvatarType(avatarType);
//   }, [displayName, bio, bannerColor, avatarType]);

 
 

//   // const [profileData, setProfileData] = useState({
//   //   name: '',
//   //   last_name: '',
//   //   username: '',
//   //   email: '',
//   //   bio: '',
//   //   points: 0,
//   //   tier: 'bronze',
//   //   phone_number:''
//   // });
//   const [profileData, setProfileData] = useState<ProfileResponse>({
//     id: 0,
//     username: '',
//     email: '',
//     bio: '',
//     phone_number: null,
//     name: '',
//     last_name: '',
//     updated_at: '',
//     total_likes: '0'
//   });
//   const [isLoading, setIsLoading] = useState(false);


  
//   useEffect(() => {
//     const fetchProfileImage = async () => {
//       if (user?.id) {
//         console.log("Fetching profile image for user:", user.id);
//         try {
//           const imageUrl = await ProfileService.getProfileImage(user.id);
//           console.log("Fetched Image URL:", imageUrl);
//           if (imageUrl) {
//             setProfileImage(imageUrl);
//           }
//         } catch (error) {
//           console.error("Error fetching profile image:", error);
//         }
//       }
//     };
  
//     fetchProfileImage();
//   }, [user]);
  

//   const loadPosts = async (pageNum: number, refresh: boolean = false) => {
//     if (!user?.id) return;
  
//     setIsLoadingPosts(true);
//     setError(null);
  
//     try {
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         window.location.href = '/signin';
//         return;
//       }
  
//       // API Call
//       const { data } = await api.get(`/auth/posts`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         params: {
//           user_id: user.id,
//           page: pageNum,
//           limit: POSTS_PER_PAGE,
//         },
//       });
  
//       // Ensure posts is an array
//       const posts = Array.isArray(data.posts) ? data.posts : [];
  
//       setUserPosts(prevPosts => (refresh ? posts : [...prevPosts, ...posts]));
//       setHasMore(data.has_more); // Ensure 'has_more' is used correctly
//     } catch (error) {
//       console.error('Error fetching user posts:', error);
//       setError('Failed to load posts');
  
//       if (error.response?.status === 401) {
//         console.log("Token expired! Logging out...");
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("userId");
  
//         setTimeout(() => {
//           window.location.href = "/signin";
//         }, 0);
//       }
//     } finally {
//       setIsLoadingPosts(false);
//       setIsLoadingMore(false);
//     }
//   };
  

//   const handleLoadMore = async () => {
//     if (!hasMore || isLoadingMore) return; // Prevent unnecessary API calls
  
//     setIsLoadingMore(true);
//     try {
//       const token = localStorage.getItem('authToken');
//       const { data } = await api.get(`/auth/posts`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { user_id: user.id, offset: userPosts.length, limit: 10 }, // Use pagination
//       });
  
//       if (Array.isArray(data.posts)) {
//         setUserPosts((prev) => [...prev, ...data.posts]); // Append new posts
//       }
//     } catch (error) {
//       console.error('Error loading more posts:', error);
//     } finally {
//       setIsLoadingMore(false);
//     }
//   };
  
//   const refreshPosts = async () => {
//     setPage(1);
//     setHasMore(true);
//     await loadPosts(1, true);
//   };

//   useEffect(() => {
//     refreshPosts();
//   }, [user?.id]);


 
//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//     if (!isEditing) {
//       setEditName(profileData.username || '');
//       setEditBio(profileData.bio || '');
//       setEditUserName(profileData.name || '');
//       setEditEmail(profileData.email || '');
//       setEditBannerColor(profileData.bannerColor || 'from-blue-500 to-purple-500');
//       setEditAvatarType(profileData.avatarType || 'default');
//       setEditLastName(profileData.last_name || ''); // ✅ Include last name
//     }
//   };



//   const handleSaveProfile = async () => {
//     if (!user?.id) return;

//     setIsLoading(true);

//     const updatedProfile = {
//       name: editUserName,
//       last_name: editLastName,
//       username: editName,
//       email: editEmail,
//       bio: editBio,
//       points: profileData.points,
//       tier: profileData.tier,
//       phone_number: profileData.phone_number,
//     };

//     try {
//       const response = await ProfileService.updateProfile(user.id, updatedProfile);
//       if (response) {
//         // Update local state immediately

//         setProfileData({
//           ...profileData,
//           ...updatedProfile
//         });
//         // Toggle off edit mode
//         setIsEditing(false);

//         toast.success('Profile updated successfully!');
//       } else {
//         toast.error('Failed to update profile.');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('An error occurred while updating profile.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

 
  
  
//   useEffect(() => {
//     const fetchBanner = async () => {
//       const token = localStorage.getItem("authToken");
//       const userId = localStorage.getItem("userId");
  
//       if (!token || !userId) {
//         navigate("/signin");
//         return;
//       }
  
//       try {
//         const response = await api.get(`/auth/banner/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
  
//         if (response.data?.banner_type === "gradient" && response.data?.name) {
//           // Find the matching gradient value for the name from the API
//           const gradient = gradients.find(g => g.name === response.data.name);
//           if (gradient) {
//             setBannerColor(gradient.value);
//           } else {
//             // Fallback to Ocean if no match found
//             setBannerColor("from-purple-500 via-blue-500 to-orange-500");
//           }
//         }
//       } catch (error: any) {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
//           navigate("/signin");
//         }
//         // Fallback to Ocean on error
//         setBannerColor("from-purple-500 via-blue-500 to-orange-500");
//       }
//     };
  
//     fetchBanner();
//   }, []);
  
  
  


  
  

//   const handleBannerSelect = (gradient: { name: string; value: string }) => {
//     console.log("Selected Gradient:", gradient.name, gradient.value);
//     setBannerColor(gradient.value); // Update the banner in the UI
//   };
  

 

  
  
//   const handleAvatarSelect = (type: string, url?: string) => {
//     setEditAvatarType(type);
//     setShowAvatarSelector(false);
//   };
  
  
  
 
//   const handleCreatePost = async (postData) => {
//     try {
//       await ProfileService.createPost(postData);
//       setShowCreatePost(false);
//       await refreshPosts();
//       toast.success('Post created successfully');
//     } catch (error) {
//       console.error('Error creating post:', error);
//       toast.error('Failed to create post');
//     }
//   };

//   useEffect(() => {
//     refreshPosts();
//   }, [user?.id]);
  



//   // Calculate user level and progress
//   const getUserLevel = (points: number) => {
//     const thresholds = DEFAULT_GAMIFICATION_SETTINGS.levelThresholds;
//     for (let i = thresholds.length - 1; i >= 0; i--) {
//       if (points >= thresholds[i].points) {
//         return {
//           currentLevel: thresholds[i].level,
//           currentPoints: points,
//           nextLevel: i < thresholds.length - 1 ? thresholds[i + 1].level : null,
//           nextLevelPoints: i < thresholds.length - 1 ? thresholds[i + 1].points : null,
//           pointsNeeded: i < thresholds.length - 1 ? thresholds[i + 1].points - points : 0,
//           progress: i < thresholds.length - 1 
//             ? ((points - thresholds[i].points) / (thresholds[i + 1].points - thresholds[i].points)) * 100
//             : 100
//         };
//       }
//     }
//     return {
//       currentLevel: 1,
//       currentPoints: points,
//       nextLevel: 2,
//       nextLevelPoints: DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points,
//       pointsNeeded: DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points - points,
//       progress: (points / DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points) * 100
//     };
//   };
  
//   const levelInfo = getUserLevel(points);

//   return (
//     <div className="max-w-7xl mx-auto py-6 px-4">
//       <Toaster position="top-right" />
//       {/* Header with gradient background */}
//       <div className="relative">
        

// <div 
         
//           className={`h-48 w-full rounded-xl relative bg-gradient-to-r ${bannerColor || 'from-purple-500 via-blue-500 to-orange-500'}`}
          
//         >
         
// <button
//   onClick={() => setShowBannerEditor(true)}
//   className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800 p-2.5 rounded-full 
//              hover:bg-white dark:hover:bg-gray-700 transition-all shadow-lg group"
//   title="Edit banner"
// >
//   <PencilLine className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600" />
// </button>

//         </div>
       
        
//         {/* Banner Editor Modal */}
//         {showBannerEditor && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="w-full max-w-2xl mx-4">
//             <BannerEditor
//               currentBanner={bannerColor}
//               onSelect={handleBannerSelect}
//               onClose={() => setShowBannerEditor(false)}
//             />
//           </div>
//         </div>
//         )}


      




        
//         {/* Profile Info Card */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mt-[-64px] relative z-10 mx-4">
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//             {/* Profile Image */}
//             <div className="relative">
             
//               <Avatar 
//   src={profileImage || avatarUrl} 
//   seed={user?.email} 
//   size="xl" 
//   tier={tier} 
//   points={points} 
//   className="border-4 border-white bg-white shadow-lg"
// />

//               {isEditing && (
//                 <button 
//                   className="absolute bottom-2 right-2 text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
//                   style={{ backgroundColor: themeColors.primary }}
//                   onClick={() => setShowAvatarSelector(true)}
//                 >
//                   <Camera size={16} />
//                 </button>
//               )}
              
//               {showAvatarSelector && (
//                 <div className="absolute top-full left-0 mt-2 z-20 w-80">
//                   <AvatarSelector 
//                     onSelect={handleAvatarSelect}
//                     currentType={editAvatarType}
//                     onClose={() => setShowAvatarSelector(false)}
//                   />
//                 </div>
//               )}
              
             
              
//               {showAvatarViewer && avatarUrl && (
//                 <ImageViewer
//                   src={avatarUrl}
//                   alt="Profile Avatar"
//                   onClose={() => setShowAvatarViewer(false)}
//                 />
//               )}
//             </div>




//             {/* Profile Info */}
//             <div className="flex-grow">
//               {isEditing ? (
//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
//                       User Name
//                     </label>
//                     <input
//                       type="text"
//                       id="displayName"
                      
//                       value={editName}
//                       onChange={(e) => setEditName(e.target.value)}
//                       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                       style={{ focusRing: themeColors.primary }}
//                     />
//                   </div>
                  


//                   <div className="flex gap-4">
//                 <div className="w-1/2">
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                    First Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     value={editUserName}
//                     onChange={(e) => setEditUserName(e.target.value)}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                     style={{ focusRing: themeColors.primary }}
//                   />
//                 </div>
//                 <div className="w-1/2">
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Last Name
//                   </label>
//                   <input
//                     type="text"
//                     id="lastname"
                  
//                     value={editLastName}
//                     onChange={(e) => setEditLastName(e.target.value)}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                     style={{ focusRing: themeColors.primary }}
//                   />
//                 </div>


//                 <div className="w-1/2">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={editEmail}
//                     onChange={(e) => setEditEmail(e.target.value)}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                     style={{ focusRing: themeColors.primary }}
//                   />
//                 </div>
//               </div>

                  
//                   <div>
//                     <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
//                       Bio
//                     </label>
//                     <textarea
//                       id="bio"
//                       value={editBio}
                     
//                       onChange={(e) => setEditBio(e.target.value)}
//                       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent min-h-[80px]"
//                       style={{ focusRing: themeColors.primary }}
//                     />
//                   </div>
                  
//                   <div className="flex gap-2">
//                     <button
//                       onClick={handleSaveProfile}
//                       disabled={isLoading}
//                       className="inline-flex items-center px-4 py-2 text-white rounded-lg transition-colors"
//                       style={{ backgroundColor: themeColors.primary }}
//                     >
//                       <Save className="w-4 h-4 mr-2" />
//                       Save Changes
//                     </button>
//                     <button
//                       onClick={handleEditToggle}
//                       className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                     >
//                       <X className="w-4 h-4 mr-2" />
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                 <h1 className="text-3xl font-bold text-gray-900">
//   {profileData.username }
// </h1>
                 

// <p className="text-gray-600 mt-1">
//   {profileData.email}
//   {profileData.phone_number && <span className="mx-2">|</span>}
//   {profileData.phone_number}
//   {profileData.name && <span className="ml-2">({profileData.name})</span>}
// </p>

 

// <div className="mt-4 flex flex-wrap gap-3">
//                     <button
//                       onClick={handleEditToggle}
//                       className="inline-flex items-center px-4 py-2 text-white rounded-lg transition-colors"
//                       style={{ backgroundColor: themeColors.primary }}
//                     >
//                       <Edit2 className="w-4 h-4 mr-2" />
//                       Edit Profile
//                     </button>
                   
//                      <button
//     onClick={handlePasswordChangeToggle}
//     className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//   >
//     <Key className="w-4 h-4 mr-2" />
//     Change Password
//   </button>
// </div>
// {showChangePassword && <ChangePassword onClose={handlePasswordChangeToggle} />}         
//                 </>
//               )}
//             </div>
//           </div>

//           {/* About Section */}
//           {!isEditing && (
//             <div className="mt-8">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
//               <div className="bg-gray-50 rounded-lg p-6">
              
//                 <p className="text-gray-700">
//         {profileData.bio || "Share your story here! Tell others about yourself, your interests, and what you're passionate about."}
//       </p>
//               </div>
//             </div>
//           )}

//           {/* Progress Bar */}
//         <div className="mt-4 px-4">
//         <div className="flex justify-between text-sm mb-1">
//           {/* <span className="font-medium">  Level {tierInfo?.level} {tierInfo?.tier_name}
            
           
//             {["Platinum"].includes(profileData?.tier) && (
//               <span className="text-yellow-400 text-lg">👑</span>
//             )}
//           </span> */}
//           <span className="font-medium">
//                   {/* Level {profileData?.level || 1} {profileData?.tier || "Bronze"}
//                   {["Platinum"].includes(profileData?.tier) && (
//                     <span className="text-yellow-400 text-lg">👑</span> */}
//                      Level {tierInfo?.level || 1} {tierInfo?.tier_name || "Bronze"}
//             {tierInfo?.tier_name === "Platinum" && (
//               <span className="text-yellow-400 text-lg">👑</span>
//                   )} 
//                 </span>
//         </div>
      
//         {/* Progress Bar - Directly Uses total_likes */}
//         <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
//           <div 
//             className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${tierInfo?.tier_color}`}
//             style={{ width: `${profileData?.total_likes || 0}%` }} 
           
//           >
//             <div className="w-full h-full opacity-75 bg-[linear-gradient(110deg,rgba(255,255,255,0.48)_0.8%,rgba(255,255,255,0)_10%,rgba(255,255,255,0.1)_100%)]"></div>
//           </div>
//         </div>
      
//         <div className="text-xs text-gray-500 mt-1 text-center">
//         {tierInfo?.likes_needed_for_next_level > 0
//             ? `${tierInfo.likes_needed_for_next_level} more likes to next level`
//             : "Level Cap Achieved!"}Total Likes: {profileData.total_likes}
//         </div>
        
//       </div>
      
          
//         </div>
//       </div>

//       {/* User Posts Section */}


     

// <div className="max-w-7xl mx-auto py-6 px-4">
//       <div className="mt-8">
//         <div className="flex justify-between items-center mb-6 px-4">
//           <h2 className="text-xl font-semibold text-gray-900">My Posts</h2>
//           <button
//             onClick={() => setShowCreatePost(true)}
//             className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg"
//             style={{ backgroundColor: themeColors.primary }}
//           >
//             <Plus className="w-5 h-5" />
//             Create Post
//           </button>
//         </div>

//         {isLoadingPosts ? (
//           <div className="flex justify-center items-center min-h-[200px]">
//             <LoadingSpinner />
//           </div>
//         ) : error ? (
//           <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
//             <p className="text-gray-600 mb-4">{error}. Please try again later.</p>
//           </div>
//         ) : !userPosts?.length ? (
//           <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
//             <p className="text-gray-600 mb-4">
//               There are no posts yet. Start sharing your amazing moments and inspire others!
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {userPosts.map((post) => (
//               <PostItem
//                 key={post.id}
//                 post={post}
//                 onPostDeleted={refreshPosts}
//                 onPostUpdated={(updatedPost) => {
//                   setUserPosts(prevPosts => 
//                     prevPosts.map(p => p.id === updatedPost.id ? updatedPost : p)
//                   );
//                 }}
//               />
//             ))}
//             {isLoadingMore && (
//               <div className="flex justify-center py-4">
//                 <LoadingSpinner />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>

   

//       {/* Create Post Modal */}
//       {showCreatePost && (
//         <CreatePost
//           onClose={() => setShowCreatePost(false)}
//           onSubmit={handleCreatePost}
//           avatarUrl={avatarUrl}
//           userEmail={user?.email}
//           tier={tier}
//           points={points}
//           onPostCreated={refreshPosts}
//         />
//       )}


      
//     </div>
//   );
// }

// cprrect abve

// import React, { useState, useEffect, useCallback } from 'react';

// import { useAuthStore } from '../store/authStore';
// import { useProfileStore } from '../store/profileStore';
// import { usePostStore } from '../store/postStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Edit2, Key, X, Save, Camera, Image, Plus,PencilLine } from 'lucide-react';
// import { Avatar } from '../components/Avatar';
// import { AvatarSelector } from '../components/AvatarSelector';
// import { BannerEditor } from '../components/BannerEditor';
// import { PostItem } from '../components/PostItem';
// import { CreatePost } from '../components/CreatePosts';
// import { BANNER_TEMPLATES, DEFAULT_GAMIFICATION_SETTINGS } from '../config/environment';
// import { ImageViewer } from '../components/ImageViewer';
// import toast, { Toaster } from 'react-hot-toast';
// import { ProfileService } from '../services';
// import { formatDistanceToNow } from 'date-fns';
// import { ChangePassword } from '../components/changePassword';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios"
// // import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
// import { useInfiniteScroll } from '../hook/useInfiniteScroll';
// import { LoadingSpinner } from '../components/LoadingSpinner';


// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000",
//   headers: {
//     "Cache-Control": "no-cache",
//     Pragma: "no-cache",
//   },
// });
// interface UserPost {
//   id: string;
//   title: string;
//   content: string;
// }

// export default function Profile() {
//   const { user } = useAuthStore();
//   const { 
//     displayName, 
//     bio, 
//     // bannerColor, 
//     avatarUrl,
//     avatarType,
//     points = 0,
//     phone_number,
//     tier = 'bronze',
//     fetchProfile, 
//     updateProfile, 
//     // isLoading 
//   } = useProfileStore();
//   const { fetchPostsByUser, createPost } = usePostStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
  
//   const [isEditing, setIsEditing] = useState(false);
//   const [editName, setEditName] = useState('');
//   const [editBio, setEditBio] = useState('');
//   const [editBannerColor, setEditBannerColor] = useState('');
//   const [editAvatarType, setEditAvatarType] = useState('');
//   const [showAvatarSelector, setShowAvatarSelector] = useState(false);
//   const [showBannerEditor, setShowBannerEditor] = useState(false);
//   const [showAvatarViewer, setShowAvatarViewer] = useState(false);
//   const [userPosts, setUserPosts] = useState<any[]>([]);
//   const [isLoadingPosts, setIsLoadingPosts] = useState(false);
//   const [showCreatePost, setShowCreatePost] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [editEmail, setEditEmail] = useState('');
//   const [editUserName, setEditUserName] = useState(''); 
//   const [editLastName, setEditLastName] = useState('');
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const navigate = useNavigate(); 
//   const [reason, setReason] = useState('');
//   const [bannerColor, setBannerColor] = useState('from-purple-500 via-blue-500 to-orange-500');
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [tierInfo, setTierInfo] = useState(null);
 
  

  
//   const POSTS_PER_PAGE = 10;
  

//   const loadMore = useCallback(() => {
//     if (!isLoadingMore && hasMore) {
//       setPage(prev => prev + 1);
//       loadPosts(page + 1);
//     }
//   }, [isLoadingMore, hasMore, page]);

//   useInfiniteScroll(loadMore, isLoadingMore, hasMore);

//   useEffect(() => {
//     const loadUserPosts = async () => {
//       if (!user?.id) return;
  
//       setIsLoadingPosts(true);
//       setError(null);
  
//       try {
//         const token = localStorage.getItem("authToken");
//         if (!token) {
//           window.location.href = "/signin";
//           return;
//         }
  
//         const { data } = await api.get(`/auth/posts`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           params: { user_id: user.id },
//         });
  
//         if (Array.isArray(data)) {
//           setUserPosts(data);
//         } else if (Array.isArray(data.posts)) {
//           setUserPosts(data.posts);
//         } else {
//           setUserPosts([]);
//         }
//       } catch (error) {
//         console.error("Error fetching user posts:", error);
//         setError("Failed to load posts");
//         toast.error("Failed to load posts");
//         setUserPosts([]);
  
//         if (error.response?.status === 401) {
//           console.log("Token expired! Logging out...");
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
//           window.location.href = "/signin";
//         }
//       } finally {
//         setTimeout(() => {
//           setIsLoadingPosts(false);
//         }, 100);
//       }
//     };
  
//     loadUserPosts();
//   }, [user]);


  

 


//   const handlePasswordChangeToggle = () => {
//     setShowChangePassword(prev => !prev);
//   };

  
  
  
//   const gradients = [
//     { name: "Ocean", value: "from-blue-500 to-cyan-500" },
//     { name: "Sunset", value: "from-orange-500 to-pink-500" },
//     { name: "Forest", value: "from-green-500 to-emerald-500" },
//     { name: "Royal", value: "from-purple-500 to-indigo-500" },
//     { name: "Spring", value: "from-green-400 to-yellow-400" },
//     { name: "Aurora", value: "from-teal-400 to-purple-500" },
//     { name: "Desert", value: "from-yellow-400 to-orange-500" },
//     { name: "Rose", value: "from-pink-400 to-rose-500" },
//   ];



//   useEffect(() => {
//     const fetchTierInfo = async () => {
//       const token = localStorage.getItem("authToken");
//       const userId = localStorage.getItem("userId");

//       if (!token || !userId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await api.get(
//           `/auth/calculatepoints?user_id=${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setTierInfo(response.data);
//       } catch (err) {
//         setError(err.response?.data?.detail || "Failed to fetch tier info");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTierInfo();
//   }, []);
 
//   // useEffect(() => {
//   //   const loadProfile = async () => {
//   //     try {
//   //       const token = localStorage.getItem('authToken');
//   //       if (!token) {
//   //         window.location.href = '/signin';
//   //         return;
//   //       }
  
//   //       const userId = localStorage.getItem('userId'); 
//   //       if (!userId) {
//   //         console.error('User ID not found in localStorage');
//   //         toast.error('User ID not found. Please log in again.');
//   //         return;
//   //       }
  
//   //       const profile = await ProfileService.getProfile(userId);
//   //       if (profile) {
//   //         const totalLikes = profile.total_likes || 0;  
//   //         const level = getLevel(totalLikes);
//   //         // const tier = getTier(level);
//   //         const tier = getTier(totalLikes);

  
//   //         console.log("Total Likes:", totalLikes);  // Debugging
//   //         console.log("Calculated Level:", level);  // Debugging
//   //         console.log("Assigned Tier:", tier);      // Debugging
  
//   //         setProfileData({
//   //           name: profile.name || '',
//   //           last_name: profile.last_name || '',
//   //           username: profile.username || '',
//   //           email: profile.email || '',
//   //           bio: profile.bio || '',
//   //           points: profile.points || 0,
//   //           phone_number: profile.phone_number || null,
//   //           total_likes: totalLikes,
//   //           level: level,   // ✅ Set level correctly
//   //           tier: tier,     // ✅ Set tier correctly
//   //         });
//   //       } else {
//   //         toast.error('Failed to load profile data.');
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching profile:', error);
//   //       toast.error('Failed to load profile data.');
//   //     }
//   //   };
  
//   //   loadProfile();
//   // }, []);
  
  

//   useEffect(() => {
//     const loadProfileData = async () => {
//       try {
//         const userId = localStorage.getItem('userId');
//         if (!userId) {
//           setError('User ID not found. Please log in again.');
//           return;
//         }

//         const profile = await ProfileService.getProfile(userId);
//         if (profile) {
//           setProfileData(profile);
          
//           // Load profile image
//           const imageUrl = await ProfileService.getProfileImage(userId);
//           if (imageUrl) {
//             setProfileImage(imageUrl);
//           }
//         }
//       } catch (err) {
//         console.error('Error loading profile:', err);
//         setError('Failed to load profile data');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadProfileData();
//   }, []);

  

//   useEffect(() => {
//     if (displayName) setEditName(displayName);
//     if (bio) setEditBio(bio);
//     if (bannerColor) setEditBannerColor(bannerColor);
//     if (avatarType) setEditAvatarType(avatarType);
//   }, [displayName, bio, bannerColor, avatarType]);

 
 

//   // const [profileData, setProfileData] = useState({
//   //   name: '',
//   //   last_name: '',
//   //   username: '',
//   //   email: '',
//   //   bio: '',
//   //   points: 0,
//   //   tier: 'bronze',
//   //   phone_number:''
//   // });
//   const [profileData, setProfileData] = useState<ProfileResponse>({
//     id: 0,
//     username: '',
//     email: '',
//     bio: '',
//     phone_number: null,
//     name: '',
//     last_name: '',
//     updated_at: '',
//     total_likes: '0'
//   });
//   const [isLoading, setIsLoading] = useState(false);


  
//   useEffect(() => {
//     const fetchProfileImage = async () => {
//       if (user?.id) {
//         console.log("Fetching profile image for user:", user.id);
//         try {
//           const imageUrl = await ProfileService.getProfileImage(user.id);
//           console.log("Fetched Image URL:", imageUrl);
//           if (imageUrl) {
//             setProfileImage(imageUrl);
//           }
//         } catch (error) {
//           console.error("Error fetching profile image:", error);
//         }
//       }
//     };
  
//     fetchProfileImage();
//   }, [user]);
  

//   const loadPosts = async (pageNum: number, refresh: boolean = false) => {
//     if (!user?.id) return;
  
//     setIsLoadingPosts(true);
//     setError(null);
  
//     try {
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         window.location.href = '/signin';
//         return;
//       }
  
//       // API Call
//       const { data } = await api.get(`/auth/posts`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         params: {
//           user_id: user.id,
//           page: pageNum,
//           limit: POSTS_PER_PAGE,
//         },
//       });
  
//       // Ensure posts is an array
//       const posts = Array.isArray(data.posts) ? data.posts : [];
  
//       setUserPosts(prevPosts => (refresh ? posts : [...prevPosts, ...posts]));
//       setHasMore(data.has_more); // Ensure 'has_more' is used correctly
//     } catch (error) {
//       console.error('Error fetching user posts:', error);
//       setError('Failed to load posts');
  
//       if (error.response?.status === 401) {
//         console.log("Token expired! Logging out...");
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("userId");
  
//         setTimeout(() => {
//           window.location.href = "/signin";
//         }, 0);
//       }
//     } finally {
//       setIsLoadingPosts(false);
//       setIsLoadingMore(false);
//     }
//   };
  

//   const handleLoadMore = async () => {
//     if (!hasMore || isLoadingMore) return; // Prevent unnecessary API calls
  
//     setIsLoadingMore(true);
//     try {
//       const token = localStorage.getItem('authToken');
//       const { data } = await api.get(`/auth/posts`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { user_id: user.id, offset: userPosts.length, limit: 10 }, // Use pagination
//       });
  
//       if (Array.isArray(data.posts)) {
//         setUserPosts((prev) => [...prev, ...data.posts]); // Append new posts
//       }
//     } catch (error) {
//       console.error('Error loading more posts:', error);
//     } finally {
//       setIsLoadingMore(false);
//     }
//   };
  
//   const refreshPosts = async () => {
//     setPage(1);
//     setHasMore(true);
//     await loadPosts(1, true);
//   };

//   useEffect(() => {
//     refreshPosts();
//   }, [user?.id]);


 
//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//     if (!isEditing) {
//       setEditName(profileData.username || '');
//       setEditBio(profileData.bio || '');
//       setEditUserName(profileData.name || '');
//       setEditEmail(profileData.email || '');
//       setEditBannerColor(profileData.bannerColor || 'from-blue-500 to-purple-500');
//       setEditAvatarType(profileData.avatarType || 'default');
//       setEditLastName(profileData.last_name || ''); // ✅ Include last name
//     }
//   };



//   const handleSaveProfile = async () => {
//     if (!user?.id) return;

//     setIsLoading(true);

//     const updatedProfile = {
//       name: editUserName,
//       last_name: editLastName,
//       username: editName,
//       email: editEmail,
//       bio: editBio,
//       points: profileData.points,
//       tier: profileData.tier,
//       phone_number: profileData.phone_number,
//     };

//     try {
//       const response = await ProfileService.updateProfile(user.id, updatedProfile);
//       if (response) {
//         // Update local state immediately

//         setProfileData({
//           ...profileData,
//           ...updatedProfile
//         });
//         // Toggle off edit mode
//         setIsEditing(false);

//         toast.success('Profile updated successfully!');
//       } else {
//         toast.error('Failed to update profile.');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('An error occurred while updating profile.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

 
  
  
//   useEffect(() => {
//     const fetchBanner = async () => {
//       const token = localStorage.getItem("authToken");
//       const userId = localStorage.getItem("userId");
  
//       if (!token || !userId) {
//         navigate("/signin");
//         return;
//       }
  
//       try {
//         const response = await api.get(`/auth/banner/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
  
//         if (response.data?.banner_type === "gradient" && response.data?.name) {
//           // Find the matching gradient value for the name from the API
//           const gradient = gradients.find(g => g.name === response.data.name);
//           if (gradient) {
//             setBannerColor(gradient.value);
//           } else {
//             // Fallback to Ocean if no match found
//             setBannerColor("from-purple-500 via-blue-500 to-orange-500");
//           }
//         }
//       } catch (error: any) {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
//           navigate("/signin");
//         }
//         // Fallback to Ocean on error
//         setBannerColor("from-purple-500 via-blue-500 to-orange-500");
//       }
//     };
  
//     fetchBanner();
//   }, []);
  
  
  


  
  

//   const handleBannerSelect = (gradient: { name: string; value: string }) => {
//     console.log("Selected Gradient:", gradient.name, gradient.value);
//     setBannerColor(gradient.value); // Update the banner in the UI
//   };
  

 

  
  
//   const handleAvatarSelect = (type: string, url?: string) => {
//     setEditAvatarType(type);
//     setShowAvatarSelector(false);
//   };

//   // const handleAvatarSelect = async (type: string, url?: string) => {
//   //   try {
//   //     setIsLoading(true);
//   //     const userId = localStorage.getItem('userId');
//   //     if (!userId) {
//   //       toast.error('User ID not found. Please log in again.');
//   //       return;
//   //     }

//   //     // Update the avatar locally first for immediate feedback
//   //     setProfileImage(url || null);
//   //     setEditAvatarType(type);
//   //     setShowAvatarSelector(false);

//   //     // Then update in the backend
//   //     const response = await ProfileService.updateProfileImage(userId, url || '');
//   //     if (response) {
//   //       toast.success('Profile picture updated successfully!');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error updating profile picture:', error);
//   //     toast.error('Failed to update profile picture');
//   //     // Revert the local changes on error
//   //     setProfileImage(profileImage);
//   //     setEditAvatarType(editAvatarType);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
  
  
  
 
//   const handleCreatePost = async (postData) => {
//     try {
//       await ProfileService.createPost(postData);
//       setShowCreatePost(false);
//       await refreshPosts();
//       toast.success('Post created successfully');
//     } catch (error) {
//       console.error('Error creating post:', error);
//       toast.error('Failed to create post');
//     }
//   };

//   useEffect(() => {
//     refreshPosts();
//   }, [user?.id]);
  



//   // Calculate user level and progress
//   const getUserLevel = (points: number) => {
//     const thresholds = DEFAULT_GAMIFICATION_SETTINGS.levelThresholds;
//     for (let i = thresholds.length - 1; i >= 0; i--) {
//       if (points >= thresholds[i].points) {
//         return {
//           currentLevel: thresholds[i].level,
//           currentPoints: points,
//           nextLevel: i < thresholds.length - 1 ? thresholds[i + 1].level : null,
//           nextLevelPoints: i < thresholds.length - 1 ? thresholds[i + 1].points : null,
//           pointsNeeded: i < thresholds.length - 1 ? thresholds[i + 1].points - points : 0,
//           progress: i < thresholds.length - 1 
//             ? ((points - thresholds[i].points) / (thresholds[i + 1].points - thresholds[i].points)) * 100
//             : 100
//         };
//       }
//     }
//     return {
//       currentLevel: 1,
//       currentPoints: points,
//       nextLevel: 2,
//       nextLevelPoints: DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points,
//       pointsNeeded: DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points - points,
//       progress: (points / DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points) * 100
//     };
//   };
  
//   const levelInfo = getUserLevel(points);

//   return (
//     // <div className="max-w-7xl mx-auto py-6 px-4">
//     <div className="max-w-7xl mx-auto py-4 sm:py-6 px-2 sm:px-3 md:px-4">
//       <Toaster position="top-right" />
//       {/* Header with gradient background */}
//       <div className="relative">
        

// <div 
         
//           className={`h-48 w-full rounded-xl relative bg-gradient-to-r ${bannerColor || 'from-purple-500 via-blue-500 to-orange-500'}`}
          
//         >
         
// <button
//   onClick={() => setShowBannerEditor(true)}
//   className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800 p-2.5 rounded-full 
//              hover:bg-white dark:hover:bg-gray-700 transition-all shadow-lg group"
//   title="Edit banner"
// >
//   <PencilLine className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600" />
// </button>

//         </div>
       
        
//         {/* Banner Editor Modal */}
//         {showBannerEditor && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="w-full max-w-2xl mx-4">
//             <BannerEditor
//               currentBanner={bannerColor}
//               onSelect={handleBannerSelect}
//               onClose={() => setShowBannerEditor(false)}
//             />
//           </div>
//         </div>
//         )}


      




        
//         {/* Profile Info Card */}
//         {/* <div className="bg-white rounded-xl shadow-lg p-6 mt-[-64px] relative z-10 mx-4"> */}
//         <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mt-[-64px] relative z-10 mx-2 sm:mx-3 md:mx-4">
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//             {/* Profile Image */}
//             <div className="relative">
             
//               <Avatar 
//   src={profileImage || avatarUrl} 
//   seed={user?.email} 
//   size="xl" 
//   tier={tier} 
//   points={points} 
//   className="border-4 border-white bg-white shadow-lg"
// />

// {/* {isLoading && (
//           <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-full z-10">
//             <LoadingSpinner size="sm" />
//           </div>
//         )}
//         <Avatar 
//           src={profileImage || avatarUrl} 
//           seed={user?.email} 
//           size="xl" 
//           tier={tier} 
//           points={points} 
//           className={`border-4 border-white bg-white shadow-lg transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
//         /> */}

//               {isEditing && (
//                 <button 
//                   className="absolute bottom-2 right-2 text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
//                   style={{ backgroundColor: themeColors.primary }}
//                   onClick={() => setShowAvatarSelector(true)}
//                 >
//                   <Camera size={16} />
//                 </button>
//               )}
              
//               {showAvatarSelector && (
//                 <div className="absolute top-full left-0 mt-2 z-20 w-80">
//                   <AvatarSelector 
//                     onSelect={handleAvatarSelect}
//                     currentType={editAvatarType}
//                     onClose={() => setShowAvatarSelector(false)}
//                   />
//                 </div>
//               )}
              
             
              
//               {showAvatarViewer && avatarUrl && (
//                 <ImageViewer
//                   src={avatarUrl}
//                   alt="Profile Avatar"
//                   onClose={() => setShowAvatarViewer(false)}
//                 />
//               )}
//             </div>




//             {/* Profile Info */}
//             <div className="flex-grow">
//               {isEditing ? (
//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
//                       User Name
//                     </label>
//                     <input
//                       type="text"
//                       id="displayName"
                      
//                       value={editName}
//                       onChange={(e) => setEditName(e.target.value)}
//                       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                       style={{ focusRing: themeColors.primary }}
//                     />
//                   </div>
                  


//                   <div className="flex gap-4">
//                 <div className="w-1/2">
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                    First Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     value={editUserName}
//                     onChange={(e) => setEditUserName(e.target.value)}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                     style={{ focusRing: themeColors.primary }}
//                   />
//                 </div>
//                 <div className="w-1/2">
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Last Name
//                   </label>
//                   <input
//                     type="text"
//                     id="lastname"
                  
//                     value={editLastName}
//                     onChange={(e) => setEditLastName(e.target.value)}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                     style={{ focusRing: themeColors.primary }}
//                   />
//                 </div>


//                 <div className="w-1/2">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={editEmail}
//                     onChange={(e) => setEditEmail(e.target.value)}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                     style={{ focusRing: themeColors.primary }}
//                   />
//                 </div>
//               </div>

                  
//                   <div>
//                     <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
//                       Bio
//                     </label>
//                     <textarea
//                       id="bio"
//                       value={editBio}
                     
//                       onChange={(e) => setEditBio(e.target.value)}
//                       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent min-h-[80px]"
//                       style={{ focusRing: themeColors.primary }}
//                     />
//                   </div>
                  
//                   <div className="flex gap-2">
//                     <button
//                       onClick={handleSaveProfile}
//                       disabled={isLoading}
//                       className="inline-flex items-center px-4 py-2 text-white rounded-lg transition-colors"
//                       style={{ backgroundColor: themeColors.primary }}
//                     >
//                       <Save className="w-4 h-4 mr-2" />
//                       Save Changes
//                     </button>
//                     <button
//                       onClick={handleEditToggle}
//                       className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                     >
//                       <X className="w-4 h-4 mr-2" />
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                 <h1 className="text-3xl font-bold text-gray-900">
//   {profileData.username }
// </h1>
                 

// <p className="text-gray-600 mt-1">
//   {profileData.email}
//   {profileData.phone_number && <span className="mx-2">|</span>}
//   {profileData.phone_number}
//   {profileData.name && <span className="ml-2">({profileData.name})</span>}
// </p>

 

// <div className="mt-4 flex flex-wrap gap-3">
//                     <button
//                       onClick={handleEditToggle}
//                       className="inline-flex items-center px-4 py-2 text-white rounded-lg transition-colors"
//                       style={{ backgroundColor: themeColors.primary }}
//                     >
//                       <Edit2 className="w-4 h-4 mr-2" />
//                       Edit Profile
//                     </button>
                   
//                      <button
//     onClick={handlePasswordChangeToggle}
//     className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//   >
//     <Key className="w-4 h-4 mr-2" />
//     Change Password
//   </button>
// </div>
// {showChangePassword && <ChangePassword onClose={handlePasswordChangeToggle} />}         
//                 </>
//               )}
//             </div>
//           </div>

//           {/* About Section */}
//           {!isEditing && (
//             <div className="mt-8">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
//               <div className="bg-gray-50 rounded-lg p-6">
              
//                 <p className="text-gray-700">
//         {profileData.bio || "Share your story here! Tell others about yourself, your interests, and what you're passionate about."}
//       </p>
//               </div>
//             </div>
//           )}

//           {/* Progress Bar */}
//         <div className="mt-4 px-4">
//         <div className="flex justify-between text-sm mb-1">
//           {/* <span className="font-medium">  Level {tierInfo?.level} {tierInfo?.tier_name}
            
           
//             {["Platinum"].includes(profileData?.tier) && (
//               <span className="text-yellow-400 text-lg">👑</span>
//             )}
//           </span> */}
//           <span className="font-medium">
//                   {/* Level {profileData?.level || 1} {profileData?.tier || "Bronze"}
//                   {["Platinum"].includes(profileData?.tier) && (
//                     <span className="text-yellow-400 text-lg">👑</span> */}
//                      Level {tierInfo?.level || 1} {tierInfo?.tier_name || "Bronze"}
//             {tierInfo?.tier_name === "Platinum" && (
//               <span className="text-yellow-400 text-lg">👑</span>
//                   )} 
//                 </span>
//         </div>
      
//         {/* Progress Bar - Directly Uses total_likes */}
//         <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
//           <div 
//             className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${tierInfo?.tier_color}`}
//             style={{ width: `${profileData?.total_likes || 0}%` }} 
           
//           >
//             <div className="w-full h-full opacity-75 bg-[linear-gradient(110deg,rgba(255,255,255,0.48)_0.8%,rgba(255,255,255,0)_10%,rgba(255,255,255,0.1)_100%)]"></div>
//           </div>
//         </div>
      
//         <div className="text-xs text-gray-500 mt-1 text-center">
//         {tierInfo?.likes_needed_for_next_level > 0
//             ? `${tierInfo.likes_needed_for_next_level} more likes to next level`
//             : "Level Cap Achieved!"}Total Likes: {profileData.total_likes}
//         </div>
        
//       </div>
      
          
//         </div>
//       </div>

//       {/* User Posts Section */}


     
//       <div className="mt-6 sm:mt-8 px-2 sm:px-3 md:px-4">
// {/* <div className="max-w-7xl mx-auto py-6 px-4"> */}
//       <div className="mt-8">
//         <div className="flex justify-between items-center mb-6 px-4">
//           <h2 className="text-xl font-semibold text-gray-900">My Posts</h2>
//           <button
//             onClick={() => setShowCreatePost(true)}
//             // className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg"
//              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-white rounded-lg"
//             style={{ backgroundColor: themeColors.primary }}
//           >
//             <Plus className="w-5 h-5" />
//             Create Post
//           </button>
//         </div>

//         {isLoadingPosts ? (
//           <div className="flex justify-center items-center min-h-[200px]">
//             <LoadingSpinner />
//           </div>
//         ) : error ? (
//           <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
//             <p className="text-gray-600 mb-4">{error}. Please try again later.</p>
//           </div>
//         ) : !userPosts?.length ? (
//           <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
//             <p className="text-gray-600 mb-4">
//               There are no posts yet. Start sharing your amazing moments and inspire others!
//             </p>
//           </div>
//         ) : (
          
//           // <div className="space-y-6">
//           <div className="space-y-4 sm:space-y-6">
//             {userPosts.map((post) => (
//               <PostItem
//                 key={post.id}
//                 post={post}
//                 onPostDeleted={refreshPosts}
//                 onPostUpdated={(updatedPost) => {
//                   setUserPosts(prevPosts => 
//                     prevPosts.map(p => p.id === updatedPost.id ? updatedPost : p)
//                   );
//                 }}
//               />
//             ))}
//             {isLoadingMore && (
//               <div className="flex justify-center py-4">
//                 <LoadingSpinner />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>

   

//       {/* Create Post Modal */}
//       {showCreatePost && (
//         <CreatePost
//           onClose={() => setShowCreatePost(false)}
//           onSubmit={handleCreatePost}
//           avatarUrl={avatarUrl}
//           userEmail={user?.email}
//           tier={tier}
//           points={points}
//           onPostCreated={refreshPosts}
//         />
//       )}


      
//     </div>
//   );
// }


// trial to profile reflect


import React, { useState, useEffect, useCallback } from 'react';

import { useAuthStore } from '../store/authStore';
import { useProfileStore } from '../store/profileStore';
import { usePostStore } from '../store/postStore';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import { Edit2, Key, X, Save, Camera, Image, Plus,PencilLine } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { AvatarSelector } from '../components/AvatarSelector';
import { BannerEditor } from '../components/BannerEditor';
import { PostItem } from '../components/PostItem';
import { CreatePost } from '../components/CreatePosts';
import { BANNER_TEMPLATES, DEFAULT_GAMIFICATION_SETTINGS } from '../config/environment';
import { ImageViewer } from '../components/ImageViewer';
import toast, { Toaster } from 'react-hot-toast';
import { ProfileService } from '../services';
import { formatDistanceToNow } from 'date-fns';
import { ChangePassword } from '../components/changePassword';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
// import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useInfiniteScroll } from '../hook/useInfiniteScroll';
import { LoadingSpinner } from '../components/LoadingSpinner';


const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});
interface UserPost {
  id: string;
  title: string;
  content: string;
}

export default function Profile() {
  const { user } = useAuthStore();
  const { 
    displayName, 
    bio, 
    // bannerColor, 
    avatarUrl,
    avatarType,
    points = 0,
    phone_number,
    tier = 'bronze',
    fetchProfile, 
    updateProfile, 
    // isLoading 
  } = useProfileStore();
  const { fetchPostsByUser, createPost } = usePostStore();
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editBannerColor, setEditBannerColor] = useState('');
  const [editAvatarType, setEditAvatarType] = useState('');
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [showBannerEditor, setShowBannerEditor] = useState(false);
  const [showAvatarViewer, setShowAvatarViewer] = useState(false);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [editEmail, setEditEmail] = useState('');
  const [editUserName, setEditUserName] = useState(''); 
  const [editLastName, setEditLastName] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate(); 
  const [reason, setReason] = useState('');
  const [bannerColor, setBannerColor] = useState('from-purple-500 via-blue-500 to-orange-500');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [tierInfo, setTierInfo] = useState(null);
 
  

  
  const POSTS_PER_PAGE = 10;
  

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      setPage(prev => prev + 1);
      loadPosts(page + 1);
    }
  }, [isLoadingMore, hasMore, page]);

  useInfiniteScroll(loadMore, isLoadingMore, hasMore);

  useEffect(() => {
    const loadUserPosts = async () => {
      if (!user?.id) return;
  
      setIsLoadingPosts(true);
      setError(null);
  
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          window.location.href = "/signin";
          return;
        }
  
        const { data } = await api.get(`/auth/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: { user_id: user.id },
        });
  
        if (Array.isArray(data)) {
          setUserPosts(data);
        } else if (Array.isArray(data.posts)) {
          setUserPosts(data.posts);
        } else {
          setUserPosts([]);
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setError("Failed to load posts");
        toast.error("Failed to load posts");
        setUserPosts([]);
  
        if (error.response?.status === 401) {
          console.log("Token expired! Logging out...");
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          window.location.href = "/signin";
        }
      } finally {
        setTimeout(() => {
          setIsLoadingPosts(false);
        }, 100);
      }
    };
  
    loadUserPosts();
  }, [user]);


  

 


  const handlePasswordChangeToggle = () => {
    setShowChangePassword(prev => !prev);
  };

  
  
  
  const gradients = [
    { name: "Ocean", value: "from-blue-500 to-cyan-500" },
    { name: "Sunset", value: "from-orange-500 to-pink-500" },
    { name: "Forest", value: "from-green-500 to-emerald-500" },
    { name: "Royal", value: "from-purple-500 to-indigo-500" },
    { name: "Spring", value: "from-green-400 to-yellow-400" },
    { name: "Aurora", value: "from-teal-400 to-purple-500" },
    { name: "Desert", value: "from-yellow-400 to-orange-500" },
    { name: "Rose", value: "from-pink-400 to-rose-500" },
  ];



  useEffect(() => {
    const fetchTierInfo = async () => {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(
          `/auth/calculatepoints?user_id=${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTierInfo(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to fetch tier info");
      } finally {
        setLoading(false);
      }
    };

    fetchTierInfo();
  }, []);
 
  
  

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('User ID not found. Please log in again.');
          return;
        }

        const profile = await ProfileService.getProfile(userId);
        if (profile) {
          setProfileData(profile);
          
          // Load profile image
          const imageUrl = await ProfileService.getProfileImage(userId);
          if (imageUrl) {
            setProfileImage(imageUrl);
          }
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  

  useEffect(() => {
    if (displayName) setEditName(displayName);
    if (bio) setEditBio(bio);
    if (bannerColor) setEditBannerColor(bannerColor);
    if (avatarType) setEditAvatarType(avatarType);
  }, [displayName, bio, bannerColor, avatarType]);

 
 

  // const [profileData, setProfileData] = useState({
  //   name: '',
  //   last_name: '',
  //   username: '',
  //   email: '',
  //   bio: '',
  //   points: 0,
  //   tier: 'bronze',
  //   phone_number:''
  // });
  const [profileData, setProfileData] = useState<ProfileResponse>({
    id: 0,
    username: '',
    email: '',
    bio: '',
    phone_number: null,
    name: '',
    last_name: '',
    updated_at: '',
    total_likes: '0'
  });
  const [isLoading, setIsLoading] = useState(false);


  
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (user?.id) {
        console.log("Fetching profile image for user:", user.id);
        try {
          const imageUrl = await ProfileService.getProfileImage(user.id);
          console.log("Fetched Image URL:", imageUrl);
          if (imageUrl) {
            setProfileImage(imageUrl);
          }
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      }
    };
  
    fetchProfileImage();
  }, [user]);
  

  const loadPosts = async (pageNum: number, refresh: boolean = false) => {
    if (!user?.id) return;
  
    setIsLoadingPosts(true);
    setError(null);
  
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = '/signin';
        return;
      }
  
      // API Call
      const { data } = await api.get(`/auth/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: {
          user_id: user.id,
          page: pageNum,
          limit: POSTS_PER_PAGE,
        },
      });
  
      // Ensure posts is an array
      const posts = Array.isArray(data.posts) ? data.posts : [];
  
      setUserPosts(prevPosts => (refresh ? posts : [...prevPosts, ...posts]));
      setHasMore(data.has_more); // Ensure 'has_more' is used correctly
    } catch (error) {
      console.error('Error fetching user posts:', error);
      setError('Failed to load posts');
  
      if (error.response?.status === 401) {
        console.log("Token expired! Logging out...");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
  
        setTimeout(() => {
          window.location.href = "/signin";
        }, 0);
      }
    } finally {
      setIsLoadingPosts(false);
      setIsLoadingMore(false);
    }
  };
  

  const handleLoadMore = async () => {
    if (!hasMore || isLoadingMore) return; // Prevent unnecessary API calls
  
    setIsLoadingMore(true);
    try {
      const token = localStorage.getItem('authToken');
      const { data } = await api.get(`/auth/posts`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { user_id: user.id, offset: userPosts.length, limit: 10 }, // Use pagination
      });
  
      if (Array.isArray(data.posts)) {
        setUserPosts((prev) => [...prev, ...data.posts]); // Append new posts
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };
  
  const refreshPosts = async () => {
    setPage(1);
    setHasMore(true);
    await loadPosts(1, true);
  };

  useEffect(() => {
    refreshPosts();
  }, [user?.id]);


 
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditName(profileData.username || '');
      setEditBio(profileData.bio || '');
      setEditUserName(profileData.name || '');
      setEditEmail(profileData.email || '');
      setEditBannerColor(profileData.bannerColor || 'from-blue-500 to-purple-500');
      setEditAvatarType(profileData.avatarType || 'default');
      setEditLastName(profileData.last_name || ''); // ✅ Include last name
    }
  };



  const handleSaveProfile = async () => {
    if (!user?.id) return;

    setIsLoading(true);

    const updatedProfile = {
      name: editUserName,
      last_name: editLastName,
      username: editName,
      email: editEmail,
      bio: editBio,
      points: profileData.points,
      tier: profileData.tier,
      phone_number: profileData.phone_number,
    };

    try {
      const response = await ProfileService.updateProfile(user.id, updatedProfile);
      if (response) {
        // Update local state immediately

        setProfileData({
          ...profileData,
          ...updatedProfile
        });
        // Toggle off edit mode
        setIsEditing(false);

        toast.success('Profile updated successfully!');
        navigate('/'); 
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating profile.');
    } finally {
      setIsLoading(false);
    }
  };

 
  
  
  useEffect(() => {
    const fetchBanner = async () => {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
  
      if (!token || !userId) {
        navigate("/signin");
        return;
      }
  
      try {
        const response = await api.get(`/auth/banner/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.data?.banner_type === "gradient" && response.data?.name) {
          // Find the matching gradient value for the name from the API
          const gradient = gradients.find(g => g.name === response.data.name);
          if (gradient) {
            setBannerColor(gradient.value);
          } else {
            // Fallback to Ocean if no match found
            setBannerColor("from-purple-500 via-blue-500 to-orange-500");
          }
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          navigate("/signin");
        }
        // Fallback to Ocean on error
        setBannerColor("from-purple-500 via-blue-500 to-orange-500");
      }
    };
  
    fetchBanner();
  }, []);
  
  
  


  
  

  const handleBannerSelect = (gradient: { name: string; value: string }) => {
    console.log("Selected Gradient:", gradient.name, gradient.value);
    setBannerColor(gradient.value); // Update the banner in the UI
  };
  

 

  
  
  // const handleAvatarSelect = (type: string, url?: string) => {
  //   setEditAvatarType(type);
  //   setShowAvatarSelector(false);
  // };

  // const handleAvatarSelect = async (type: string, url?: string) => {
  //   try {
  //     setIsLoading(true);
  //     const userId = localStorage.getItem('userId');
  //     if (!userId) {
  //       toast.error('User ID not found. Please log in again.');
  //       return;
  //     }

  //     // Update the avatar locally first for immediate feedback
  //     setProfileImage(url || null);
  //     setEditAvatarType(type);
  //     setShowAvatarSelector(false);

  //     // Then update in the backend
  //     const response = await ProfileService.uploadAvatar(userId, url || '');
  //     if (response) {
  //       toast.success('Profile picture updated successfully!');
  //     }
  //   } catch (error) {
  //     console.error('Error updating profile picture:', error);
  //     toast.error('Failed to update profile picture');
  //     // Revert the local changes on error
  //     setProfileImage(profileImage);
  //     setEditAvatarType(editAvatarType);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleAvatarSelect = async (type: string, url?: string) => {
    const navigate = useNavigate(); // ⬅️ Make sure this is inside your component
    try {
      setIsLoading(true);
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast.error('User ID not found. Please log in again.');
        return;
      }
  
      // Update the avatar locally first for immediate feedback
      setProfileImage(url || null);
      setEditAvatarType(type);
      setShowAvatarSelector(false);
  
      // Then update in the backend
      const response = await ProfileService.uploadAvatar(userId, url || '');
      if (response) {
        toast.success('Profile picture updated successfully!');
        navigate('/'); // 👈 Redirect to home after successful upload
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      toast.error('Failed to update profile picture');
      // Revert the local changes on error
      setProfileImage(profileImage);
      setEditAvatarType(editAvatarType);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  
 
  const handleCreatePost = async (postData) => {
    try {
      await ProfileService.createPost(postData);
      setShowCreatePost(false);
      await refreshPosts();
      toast.success('Post created successfully');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    }
  };

  useEffect(() => {
    refreshPosts();
  }, [user?.id]);
  



  // Calculate user level and progress
  const getUserLevel = (points: number) => {
    const thresholds = DEFAULT_GAMIFICATION_SETTINGS.levelThresholds;
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (points >= thresholds[i].points) {
        return {
          currentLevel: thresholds[i].level,
          currentPoints: points,
          nextLevel: i < thresholds.length - 1 ? thresholds[i + 1].level : null,
          nextLevelPoints: i < thresholds.length - 1 ? thresholds[i + 1].points : null,
          pointsNeeded: i < thresholds.length - 1 ? thresholds[i + 1].points - points : 0,
          progress: i < thresholds.length - 1 
            ? ((points - thresholds[i].points) / (thresholds[i + 1].points - thresholds[i].points)) * 100
            : 100
        };
      }
    }
    return {
      currentLevel: 1,
      currentPoints: points,
      nextLevel: 2,
      nextLevelPoints: DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points,
      pointsNeeded: DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points - points,
      progress: (points / DEFAULT_GAMIFICATION_SETTINGS.levelThresholds[1].points) * 100
    };
  };
  
  const levelInfo = getUserLevel(points);

  return (
    // <div className="max-w-7xl mx-auto py-6 px-4">
    <div className="max-w-7xl mx-auto py-4 sm:py-6 px-2 sm:px-3 md:px-4">
      <Toaster position="top-right" />
      {/* Header with gradient background */}
      <div className="relative">
        

<div 
         
          className={`h-48 w-full rounded-xl relative bg-gradient-to-r ${bannerColor || 'from-purple-500 via-blue-500 to-orange-500'}`}
          
        >
         
<button
  onClick={() => setShowBannerEditor(true)}
  className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800 p-2.5 rounded-full 
             hover:bg-white dark:hover:bg-gray-700 transition-all shadow-lg group"
  title="Edit banner"
>
  <PencilLine className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600" />
</button>

        </div>
       
        
        {/* Banner Editor Modal */}
        {showBannerEditor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl mx-4">
            <BannerEditor
              currentBanner={bannerColor}
              onSelect={handleBannerSelect}
              onClose={() => setShowBannerEditor(false)}
            />
          </div>
        </div>
        )}


      




        
        {/* Profile Info Card */}
        {/* <div className="bg-white rounded-xl shadow-lg p-6 mt-[-64px] relative z-10 mx-4"> */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mt-[-64px] relative z-10 mx-2 sm:mx-3 md:mx-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Image */}
            <div className="relative">
{/*              
              <Avatar 
  src={profileImage || avatarUrl} 
  seed={user?.email} 
  size="xl" 
  tier={tier} 
  points={points} 
  className="border-4 border-white bg-white shadow-lg"
/> */}

{isLoading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-full z-10">
            <LoadingSpinner size="sm" />
          </div>
        )}
        <Avatar 
          src={profileImage || avatarUrl} 
          seed={user?.email} 
          size="xl" 
          tier={tier} 
          points={points} 
          className={`border-4 border-white bg-white shadow-lg transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
        />

              {isEditing && (
                <button 
                  className="absolute bottom-2 right-2 text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
                  style={{ backgroundColor: themeColors.primary }}
                  onClick={() => setShowAvatarSelector(true)}
                >
                  <Camera size={16} />
                </button>
              )}
              
              {showAvatarSelector && (
                <div className="absolute top-full left-0 mt-2 z-20 w-80">
                  <AvatarSelector 
                    onSelect={handleAvatarSelect}
                    currentType={editAvatarType}
                    onClose={() => setShowAvatarSelector(false)}
                  />
                </div>
              )}
              
             
              
              {showAvatarViewer && avatarUrl && (
                <ImageViewer
                  src={avatarUrl}
                  alt="Profile Avatar"
                  onClose={() => setShowAvatarViewer(false)}
                />
              )}
            </div>




            {/* Profile Info */}
            <div className="flex-grow">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                      User Name
                    </label>
                    <input
                      type="text"
                      id="displayName"
                      
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ focusRing: themeColors.primary }}
                    />
                  </div>
                  


                  <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                   First Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={editUserName}
                    onChange={(e) => setEditUserName(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ focusRing: themeColors.primary }}
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                  
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ focusRing: themeColors.primary }}
                  />
                </div>


                <div className="w-1/2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ focusRing: themeColors.primary }}
                  />
                </div>
              </div>

                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      value={editBio}
                     
                      onChange={(e) => setEditBio(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent min-h-[80px]"
                      style={{ focusRing: themeColors.primary }}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 text-white rounded-lg transition-colors"
                      style={{ backgroundColor: themeColors.primary }}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                <h1 className="text-3xl font-bold text-gray-900">
  {profileData.username }
</h1>
                 

<p className="text-gray-600 mt-1">
  {profileData.email}
  {profileData.phone_number && <span className="mx-2">|</span>}
  {profileData.phone_number}
  {profileData.name && <span className="ml-2">({profileData.name})</span>}
</p>

 

<div className="mt-4 flex flex-wrap gap-3">
                    <button
                      onClick={handleEditToggle}
                      className="inline-flex items-center px-4 py-2 text-white rounded-lg transition-colors"
                      style={{ backgroundColor: themeColors.primary }}
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </button>
                   
                     <button
    onClick={handlePasswordChangeToggle}
    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
  >
    <Key className="w-4 h-4 mr-2" />
    Change Password
  </button>
</div>
{showChangePassword && <ChangePassword onClose={handlePasswordChangeToggle} />}         
                </>
              )}
            </div>
          </div>

          {/* About Section */}
          {!isEditing && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
              <div className="bg-gray-50 rounded-lg p-6">
              
                <p className="text-gray-700">
        {profileData.bio || "Share your story here! Tell others about yourself, your interests, and what you're passionate about."}
      </p>
              </div>
            </div>
          )}

          {/* Progress Bar */}
        <div className="mt-4 px-4">
        <div className="flex justify-between text-sm mb-1">
          {/* <span className="font-medium">  Level {tierInfo?.level} {tierInfo?.tier_name}
            
           
            {["Platinum"].includes(profileData?.tier) && (
              <span className="text-yellow-400 text-lg">👑</span>
            )}
          </span> */}
          <span className="font-medium">
                  {/* Level {profileData?.level || 1} {profileData?.tier || "Bronze"}
                  {["Platinum"].includes(profileData?.tier) && (
                    <span className="text-yellow-400 text-lg">👑</span> */}
                     Level {tierInfo?.level || 1} {tierInfo?.tier_name || "Bronze"}
            {tierInfo?.tier_name === "Platinum" && (
              <span className="text-yellow-400 text-lg">👑</span>
                  )} 
                </span>
        </div>
      
        {/* Progress Bar - Directly Uses total_likes */}
        <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${tierInfo?.tier_color}`}
            style={{ width: `${profileData?.total_likes || 0}%` }} 
           
          >
            <div className="w-full h-full opacity-75 bg-[linear-gradient(110deg,rgba(255,255,255,0.48)_0.8%,rgba(255,255,255,0)_10%,rgba(255,255,255,0.1)_100%)]"></div>
          </div>
        </div>
      
        <div className="text-xs text-gray-500 mt-1 text-center">
        {tierInfo?.likes_needed_for_next_level > 0
            ? `${tierInfo.likes_needed_for_next_level} more likes to next level`
            : "Level Cap Achieved!"}Total Likes: {profileData.total_likes}
        </div>
        
      </div>
      
          
        </div>
      </div>

      {/* User Posts Section */}


     
      <div className="mt-6 sm:mt-8 px-2 sm:px-3 md:px-4">
{/* <div className="max-w-7xl mx-auto py-6 px-4"> */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6 px-4">
          <h2 className="text-xl font-semibold text-gray-900">My Posts</h2>
          <button
            onClick={() => setShowCreatePost(true)}
            // className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg"
             className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-white rounded-lg"
            style={{ backgroundColor: themeColors.primary }}
          >
            <Plus className="w-5 h-5" />
            Create Post
          </button>
        </div>

        {isLoadingPosts ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
            <p className="text-gray-600 mb-4">{error}. Please try again later.</p>
          </div>
        ) : !userPosts?.length ? (
          <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
            <p className="text-gray-600 mb-4">
              There are no posts yet. Start sharing your amazing moments and inspire others!
            </p>
          </div>
        ) : (
          
          // <div className="space-y-6">
          <div className="space-y-4 sm:space-y-6">
            {userPosts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onPostDeleted={refreshPosts}
                onPostUpdated={(updatedPost) => {
                  setUserPosts(prevPosts => 
                    prevPosts.map(p => p.id === updatedPost.id ? updatedPost : p)
                  );
                }}
              />
            ))}
            {isLoadingMore && (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            )}
          </div>
        )}
      </div>
    </div>

   

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePost
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
          avatarUrl={avatarUrl}
          userEmail={user?.email}
          tier={tier}
          points={points}
          onPostCreated={refreshPosts}
        />
      )}


      
    </div>
  );
}