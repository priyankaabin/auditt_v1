
// import React, { useState, useEffect, useCallback } from 'react';
// import { useAuthStore } from '../store/authStore';
// import { useProfileStore } from '../store/profileStore';
// import { usePostStore } from '../store/postStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Image, Send, Video, Home as HomeIcon, Bell, Settings, Music } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { CATEGORIES } from '../store/postStore';
// import { Avatar } from '../components/Avatar';
// import { PostCard } from '../components/PostCard';
// import { MediaUploader } from '../components/MediaUploader';
// import { USER_TIERS, DEFAULT_GAMIFICATION_SETTINGS } from '../config/constants';
// import { ProfileService } from '../services';
// import { HomeService } from '../services/home.service';
// import toast, { Toaster } from 'react-hot-toast';
// import { LoadingSpinner } from '../components/LoadingSpinner';
// import { useInfiniteScroll } from '../hook/useInfiniteScroll';
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface Category {
//   id: number;
//   name: string;
// }

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

// const gradients = [
//   { name: "Ocean", value: "from-blue-500 to-cyan-500" },
//   { name: "Sunset", value: "from-orange-500 to-pink-500" },
//   { name: "Forest", value: "from-green-500 to-emerald-500" },
//   { name: "Royal", value: "from-purple-500 to-indigo-500" },
//   { name: "Spring", value: "from-green-400 to-yellow-400" },
//   { name: "Aurora", value: "from-teal-400 to-purple-500" },
//   { name: "Desert", value: "from-yellow-400 to-orange-500" },
//   { name: "Default", value: "from-purple-500 via-blue-500 to-orange-500" },
// ];

// const POSTS_PER_PAGE = 10;

// export default function Home() {
//   const { user } = useAuthStore();
//   const { displayName, bio, avatarUrl, points, tier } = useProfileStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
  
//   const [newPost, setNewPost] = useState('');
//   // const [postCategory, setPostCategory] = useState('Community and Leadership');
//   const [showMediaUploader, setShowMediaUploader] = useState<'image' | 'video' | null>(null);
//   const [mediaUrl, setMediaUrl] = useState<string | null>(null);
//   const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState('All Categories');
//   const [postIds, setPostIds] = useState<number[]>([]);
//   const [likes, setLikes] = useState([]);
//   const [profile, setProfile] = useState<any>(null);
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
//   const [postTitle, setPostTitle] = useState('');
//   const [mediaFile, setMediaFile] = useState<File | null>(null);
//   const [postCategoryId, setPostCategoryId] = useState<number | null>(null);
//   const [postCategoryName, setPostCategoryName] = useState(""); 
//   const [bannerColor, setBannerColor] = useState(gradients.find(g => g.name === "Default")?.value);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [loadError, setLoadError] = useState(false);
//   const [page, setPage] = useState(1);
//   const [postCategory, setPostCategory] = useState('');
//   const [previewUrl, setPreviewUrl] = useState(null);
 


//   const [profileData, setProfileData] = useState<{ 
//     username: string; 
//     bio: string; 
//     total_likes: number;
//     level: number; 
//     tier: string;
//   } | null>(null);
//   const fetchCategories = useCallback(async () => {
//     const token = localStorage.getItem("authToken");
    
//     if (!token) {
//       setError("Authentication required");
//       return;
//     }

//     try {
//       const response = await api.get("/auth/categories", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data) {
//         setCategories(response.data);
//       }
//     } catch (error: any) {
//       console.error("Error fetching categories:", error);
//       if (error.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/signin");
//       }
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);


  
  
//   const handleAuthError = (error: any) => {
//     if (error.response?.status === 401) {
//       console.log("Token expired! Logging out...");
//       localStorage.removeItem("authToken");
  
//       setTimeout(() => {
//         navigate("/signin");
//       }, 0);
//     }
//     setError("Error fetching data");
//   };


//   const fetchPosts = useCallback(async (pageNum: number) => {
//     const token = localStorage.getItem("authToken");
//     const userId = localStorage.getItem("userId");

//     if (!token || !userId) {
//       setError("Authentication required");
//       setIsLoading(false);
//       navigate("/signin");
//       return;
//     }

//     try {
//       setIsLoadingMore(true);
//       setLoadError(false);

//       const response = await api.get(`/auth/posts?page=${pageNum}&limit=${POSTS_PER_PAGE}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data && response.data.posts) {
//         const newPosts = response.data.posts.filter((post: Post) =>
//           post.isNoMedia || post.isImage || post.isAudio ||
//           (post.isVideo && post.isVideoApproved && !post.isVideoRejected)
//         );

//         if (pageNum === 1) {
//           setPosts(newPosts);
//           setFilteredPosts(newPosts);
//         } else {
//           setPosts(prev => [...prev, ...newPosts]);
//           setFilteredPosts(prev => [...prev, ...newPosts]);
//         }

//         setHasMore(newPosts.length === POSTS_PER_PAGE);
//       }
//     } catch (error: any) {
//       console.error("Error fetching posts:", error);
//       setLoadError(true);

//       if (error.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/signin");
//       }
//       setError(error.response?.data?.message || "Error fetching data");
//     } finally {
//       setIsLoading(false);
//       setIsLoadingMore(false);
//     }
//   }, [navigate]);

  

  

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

  
//   const loadMore = useCallback(() => {
//     if (!isLoadingMore && hasMore) {
//       setPage(prev => prev + 1);
//       fetchPosts(page + 1);
//     }
//   }, [fetchPosts, isLoadingMore, hasMore, page]);

//   useInfiniteScroll(loadMore, isLoadingMore, hasMore);

//   useEffect(() => {
//     fetchPosts(1);
//   }, [fetchPosts]);

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
//           const gradient = gradients.find(g => g.name === response.data.name);
//           setBannerColor(gradient?.value || gradients.find(g => g.name === "Default")?.value);
//         }
//       } catch (error: any) {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
//           navigate("/signin");
//         }
//         setBannerColor(gradients.find(g => g.name === "Default")?.value);
//       }
//     };

//     fetchBanner();
//   }, [navigate]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const userId = localStorage.getItem('userId');
//       if (!userId) {
//         window.location.href = '/signin';
//         return;
//       }

//       try {
//         const profileData = await ProfileService.getProfile(userId);
        
//         if (profileData) {
//           const totalLikes = parseInt(profileData.total_likes) || 0;
//           const level = getLevel(totalLikes);
//           const tier = getTier(totalLikes);

//           setProfileData({
//             username: profileData.username,
//             bio: profileData.bio,
//             total_likes: totalLikes,
//             level,
//             tier,
//           });

//           localStorage.setItem('seed', profileData.username);
//           localStorage.setItem('profileName', profileData.username);
//         }

//         const imageUrl = await ProfileService.getProfileImage(userId);
//         setProfileImage(imageUrl);
//       } catch (error: any) { 
//         console.error('Error fetching profile:', error);
//         if (error.response?.status === 401) {
//           localStorage.removeItem('authToken');
//           window.location.href = '/signin';
//         }
//       }
//     };

//     fetchProfile();
//   }, []);

//   const getLevel = (likes: number): number => {
//     if (likes >= 76) return 4;
//     if (likes >= 51) return 3;
//     if (likes >= 26) return 2;
//     return 1;
//   };

//   const getTierColor = (likes: number): string => {
//     if (likes >= 76) return 'from-cyan-400 to-cyan-500';
//     if (likes >= 51) return 'from-yellow-400 to-yellow-500';
//     if (likes >= 26) return 'from-gray-300 to-gray-400';
//     return 'from-amber-600 to-amber-700';
//   };

//   const getTier = (likes: number): string => {
//     if (likes >= 76) return "Platinum";
//     if (likes >= 51) return "Gold";
//     if (likes >= 26) return "Silver";
//     return "Bronze";
//   };

//   const getPointsNeeded = (likes: number): number => {
//     if (likes < 26) return 26 - likes;
//     if (likes < 51) return 51 - likes;
//     if (likes < 76) return 76 - likes;
//     return 0;
//   };



//   const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'audio') => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setMediaFile(file);
//       setMediaUrl(URL.createObjectURL(file));
//       setMediaType(type);
//       setShowMediaUploader(null);
//     }
//   };

//   const removeMedia = () => {
//     setMediaUrl(null);
//     setMediaType(null);
//     setMediaFile(null);
//   };
  

//   const handlePostSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
  
//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("authToken");
  
//     if (!userId || !token) {
//       toast.error("User is not logged in!");
//       setIsSubmitting(false);
//       return;
//     }
  
//     if (!postCategoryId || !postCategoryName) {
//       toast.error("Please select a valid category");
//       setIsSubmitting(false);
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("title", postTitle);
//     formData.append("category", postCategoryName);
//     formData.append("content", newPost);
//     formData.append("userId", userId);
  
//     if (mediaFile) {
//       formData.append("media", mediaFile);
//     }
  
//     try {
//       const response = await api.post(
//         `/auth/post/${userId}?category_id=${postCategoryId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
  
//       if (response.status >= 200 && response.status < 300) {
//         toast.success("Post created successfully!");
  
//         // Send notification
//         const notificationData = {
//           user_id: userId,
//           category_id: postCategoryId,
//           title: postTitle || "Untitled Post",
//           content: newPost || "No content",
//         };
  
//         api.post("/auth/notifications/add", notificationData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }).catch((notifError) => {
//           console.error("Error adding notification:", notifError);
//         });
  
//         // Reset form fields
//         setPostTitle("");
//         setNewPost("");
//         setPostCategory("");
//         setPostCategoryId(null);
//         setPostCategoryName("");
//         setMediaUrl(null);
//         setMediaType(null);
//         setMediaFile(null);
  
//         // Refresh posts
//         await fetchPosts(1);
//       }
//     } catch (error: any) {
//       console.error("Error creating post:", error);
  
//       if (error.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/signin");
//       }
  
//       const errorMessage = error.response?.data?.detail || "Failed to create post!";
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  

//   // const handlePostSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setIsSubmitting(true);
  
//   //   const userId = localStorage.getItem("userId");
//   //   const token = localStorage.getItem("authToken");
  
//   //   if (!userId || !token) {
//   //     toast.error("User is not logged in!");
//   //     setIsSubmitting(false);
//   //     return;
//   //   }
  
//   //   if (!postCategoryId || !postCategoryName) {
//   //     toast.error("Please select a valid category");
//   //     setIsSubmitting(false);
//   //     return;
//   //   }
  
//   //   // Create a temporary post for instant UI update
//   //   const tempPost: Post = {
//   //     id: Math.random().toString(), // Temporary ID
//   //     user_id: parseInt(userId, 10),
//   //     username: profileData?.username || "",
//   //     title: postTitle,
//   //     category: postCategoryName,
//   //     content: newPost,
//   //     media_path: mediaUrl,
//   //     isVideo: mediaType === "video",
//   //     isImage: mediaType === "image",
//   //     isAudio: mediaType === "audio",
//   //     isNoMedia: !mediaFile,
//   //     category_id: postCategoryId,
//   //     isVideoApproved: true,
//   //     isVideoRejected: false,
//   //     is_public: true,
//   //     created_at: new Date().toISOString(),
//   //     updated_at: new Date().toISOString(),
//   //   };
  
//   //   // Update UI immediately with tempPost
//   //   setPosts((prevPosts) => [tempPost, ...prevPosts]);
  
//   //   const formData = new FormData();
//   //   formData.append("title", postTitle);
//   //   formData.append("category", postCategoryName);
//   //   formData.append("content", newPost);
//   //   formData.append("userId", userId);
  
//   //   if (mediaFile) {
//   //     formData.append("media", mediaFile);
//   //   }
  
//   //   try {
//   //     const response = await api.post(
//   //       `/auth/post/${userId}?category_id=${postCategoryId}`,
//   //       formData,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //           "Content-Type": "multipart/form-data",
//   //         },
//   //       }
//   //     );
  
//   //     if (response.status >= 200 && response.status < 300) {
//   //       const backendPostId = response.data.id;
  
//   //       // Replace the temporary post with the backend post
//   //       setPosts((prevPosts) =>
//   //         prevPosts.map((p) =>
//   //           p.id === tempPost.id
//   //             ? { ...p, id: backendPostId, media_path: response.data.media_path || mediaUrl }
//   //             : p
//   //         )
//   //       );
  
//   //       if (selectedCategory === "All Categories" || selectedCategory === postCategoryName) {
//   //         setFilteredPosts((prevFiltered) =>
//   //           prevFiltered.map((p) =>
//   //             p.id === tempPost.id
//   //               ? { ...p, id: backendPostId, media_path: response.data.media_path || mediaUrl }
//   //               : p
//   //           )
//   //         );
//   //       }
  
//   //       toast.success("Post created successfully!");
  
//   //       // Send notification
//   //       const notificationData = {
//   //         user_id: userId,
//   //         category_id: postCategoryId,
//   //         title: postTitle || "Untitled Post",
//   //         content: newPost || "No content",
//   //       };
  
//   //       api.post("/auth/notifications/add", notificationData, {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //           "Content-Type": "application/json",
//   //         },
//   //       }).catch((notifError) => {
//   //         console.error("Error adding notification:", notifError);
//   //       });
  
//   //       setTimeout(() => {
//   //         setPostTitle("");
//   //         setNewPost("");
//   //         setPostCategory("");
//   //         setPostCategoryId(null);
//   //         setPostCategoryName("");
//   //         setMediaUrl(null);
//   //         setMediaType(null);
//   //         setMediaFile(null);
//   //       }, 100);
//   //     }
//   //   } catch (error: any) {
//   //     console.error("Error creating post:", error);
  
//   //     if (error.response?.status === 401) {
//   //       localStorage.removeItem("authToken");
//   //       navigate("/signin");
//   //     }
  
//   //     const errorMessage = error.response?.data?.detail || "Failed to create post!";
//   //     toast.error(errorMessage);
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };


//     const handleCategoryClick = (category: { id: number; name: string }) => {
//     console.log("Selected Category:", category);

//     try {
//         setSelectedCategory(category.name);

//         if (category.id === 0) {
//             setFilteredPosts(posts);
//         } else {
//             const filtered = posts.filter((post) => {
//                 console.log("Post Category ID:", post.category_id, "Selected Category ID:", category.id);
//                 return post.category_id === category.id;
//             });

//             console.log("Filtered Posts:", filtered);
//             setFilteredPosts(filtered);
//         }
//     } catch (error: any) {
//         console.error("Error filtering posts:", error);

//         if (error.response?.status === 401) {
//             console.log("Token expired! Logging out...");
//             localStorage.removeItem("authToken");

//             setTimeout(() => {
//                 window.location.href = "/signin";
//             }, 0);
//         }
//     }
// };
  

 

//   return (
//     <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
//       <Toaster />
      
//       {/* Profile Section */}
//       <div className="w-full lg:w-80 lg:flex-shrink-0 order-1 lg:order-none">
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className={`h-24 lg:h-32 bg-gradient-to-r ${bannerColor}`}></div>
          
//           <div className="relative px-4 pb-4">
//             <div className="flex justify-center">
//               <img
//                 src={profileImage || avatarUrl}
//                 alt="add Profile"
//                 className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-white -mt-10 lg:-mt-12 bg-white"
//               />
//             </div>
//             <div className="text-center mt-2">
//               <h2 className="text-xl font-semibold">
//                 {profileData?.username}
//               </h2>
//               <p className="text-gray-600 text-sm">
//                 Level {profileData?.level} {profileData?.tier}
//               </p>
//             </div>
//             <p className="text-center text-gray-600 mt-3 text-sm">
//               {profileData?.bio || "Share your story here! Tell others about yourself, your interests, and what you're passionate about."}
//             </p>

//             <div className="mt-4 px-4">
//               <div className="flex justify-between text-sm mb-1">
//                 <span className="font-medium">
//                   Level {profileData?.level || 1} {profileData?.tier || "Bronze"}
//                   {["Platinum"].includes(profileData?.tier) && (
//                     <span className="text-yellow-400 text-lg">👑</span>
//                   )}
//                 </span>
//               </div>
              
//               <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
//                 <div 
//                   className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${getTierColor(profileData?.total_likes || 0)}`}
//                   style={{ width: `${profileData?.total_likes || 0}%` }}
//                 >
//                   <div className="w-full h-full opacity-75 bg-[linear-gradient(110deg,rgba(255,255,255,0.48)_0.8%,rgba(255,255,255,0)_10%,rgba(255,255,255,0.1)_100%)]"></div>
//                 </div>
//               </div>
              
//               <div className="text-xs text-gray-500 mt-1 text-center">
//                 {getPointsNeeded(profileData?.total_likes || 0) > 0 
//                   ? `${getPointsNeeded(profileData?.total_likes || 0)} more likes to next level`
//                   : 'Level Cap Achieved!'}
//               </div>
//             </div>

//             <div className="hidden lg:block mt-6 space-y-2">
//               <Link to="/" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
//                 <HomeIcon className="w-5 h-5" />
//                 <span>Feed</span>
//               </Link>
              
//               <Link to="/settings" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
//                 <Settings className="w-5 h-5" />
//                 <span>Settings</span>
//               </Link>
//             </div>

//             <div className="hidden lg:block mt-6">
//               <Link 
//                 to="/profile" 
//                 className="block text-center font-medium"
//                 style={{ color: themeColors.primary }}
//               >
//                 View Profile
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow max-w-2xl order-2 lg:order-none">
//         <div className="bg-white rounded-xl shadow-sm mb-6">
//           <div className="p-4 border-b border-gray-100">
//             <h4 className="text-lg font-semibold text-gray-900">Create Post</h4>
//           </div>
//           <form onSubmit={handlePostSubmit} className="p-4">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="hidden sm:flex relative h-28 lg:h-32 justify-center items-center">
//                 <Avatar
//                   src={avatarUrl}
//                   seed={profileData?.username}
//                   size="md"
//                   tier={tier}
//                   points={points}
//                 />
//               </div>

//               <div className="flex-1 space-y-4">
//                 <input
//                   type="text"
//                   value={postTitle}
//                   onChange={(e) => setPostTitle(e.target.value)}
//                   placeholder="Post Title"
//                   className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//                 />

//                 <textarea
//                   value={newPost}
//                   onChange={(e) => setNewPost(e.target.value)}
//                   placeholder="What's on your mind?"
//                   className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:border-transparent min-h-[120px] text-gray-700"
//                 />

//                 {mediaUrl && (
//                   <div className="relative">
//                     {mediaType === 'image' ? (
//                       <div className="relative">
//                         <img 
//                           src={mediaUrl} 
//                           alt="image" 
//                           className="w-full max-h-[200px] object-cover rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={removeMedia}
//                           className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
//                         >
//                           <Image className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ) : mediaType === 'video' ? (
//                       <div className="relative">
//                         <video 
//                           src={mediaUrl} 
//                           controls 
//                           className="w-full max-h-[200px] rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={removeMedia}
//                           className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
//                         >
//                           <Video className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="relative">
//                         <audio 
//                           src={mediaUrl} 
//                           controls 
//                           className="w-full rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={removeMedia}
//                           className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
//                         >
//                           <Music className="w-4 h-4" />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 <div>
//                   <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//                     Select Category
//                   </label>
//                   <select
//                     id="category"
//                     value={postCategory}
//                     onChange={(e) => {
//                       const selectedCategory = categories.find((cat) => cat.name === e.target.value);
//                       if (selectedCategory) {
//                         setPostCategoryId(selectedCategory.id);
//                         setPostCategoryName(selectedCategory.name);
//                       } else {
//                         setPostCategoryId(null);
//                         setPostCategoryName("");
//                       }
//                       setPostCategory(e.target.value);
//                     }}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((category) => (
//                       <option key={category.id} value={category.name}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-2">
//                   <div className="flex flex-wrap gap-2">
//                     <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
//                       <Image className="w-5 h-5" />
//                       <span className="text-sm font-medium">Photo</span>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={(e) => handleMediaUpload(e, 'image')}
//                       />
//                     </label>

//                     <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
//                       <Video className="w-5 h-5" />
//                       <span className="text-sm font-medium">Video</span>
//                       <input
//                         type="file"
//                         accept="video/*"
//                         className="hidden"
//                         onChange={(e) => handleMediaUpload(e, 'video')}
//                       />
//                     </label>

//                     <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
//                       <Music className="w-5 h-5" />
//                       <span className="text-sm font-medium">Audio</span>
//                       <input
//                         type="file"
//                         accept="audio/*"
//                         className="hidden"
//                         onChange={(e) => handleMediaUpload(e, 'audio')}
//                       />
//                     </label>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={(!newPost.trim() && !mediaUrl) || isSubmitting}
//                     className="ml-auto text-white px-6 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
//                     style={{ backgroundColor: themeColors.primary }}
//                   >
//                     <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
//                     <span className="hidden sm:inline">
//                       {isSubmitting ? 'Sharing...' : 'Share'}
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>

//         {isLoading ? (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//             <p className="mt-2 text-gray-600">Loading posts...</p>
//           </div>
//         ) : error ? (
//           <div className="bg-white rounded-xl shadow-sm p-8 text-center">
//             <p className="text-red-600">{error}</p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {filteredPosts.length === 0 ? (
//               <div className="bg-white rounded-xl shadow-sm p-8 text-center">
//                 <p className="text-gray-600">No posts found in this category.</p>
//               </div>
//             ) : (
//               filteredPosts.map((post) => (
//                 <PostCard key={post.id} post={post} />
//               ))
//             )}
//           </div>
//         )}
//       </div>

//       {/* Categories Sidebar */}
//       <div className="hidden lg:block w-80 flex-shrink-0 order-3 lg:order-none">
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-xl font-semibold mb-4">Categories</h2>
//           <div className="space-y-2">
//             <button
//               onClick={() => handleCategoryClick({ id: 0, name: 'All Categories' })}
//               className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
//                 selectedCategory === 'All Categories' ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
//               }`}
//               style={{ backgroundColor: selectedCategory === 'All Categories' ? themeColors.primary : 'transparent' }}
//             >
//               All Categories
//             </button>
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => handleCategoryClick(category)}
//                 className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
//                   category.name === selectedCategory ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
//                 }`}
//                 style={{ backgroundColor: category.name === selectedCategory ? themeColors.primary : 'transparent' }}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// import React, { useState, useEffect, useCallback } from 'react';
// import { useAuthStore } from '../store/authStore';
// import { useProfileStore } from '../store/profileStore';
// import { usePostStore } from '../store/postStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Image, Send, Video, Home as HomeIcon, Bell, Settings, Music } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { CATEGORIES } from '../store/postStore';
// import { Avatar } from '../components/Avatar';
// import { PostCard } from '../components/PostCard';
// import { MediaUploader } from '../components/MediaUploader';
// import { USER_TIERS, DEFAULT_GAMIFICATION_SETTINGS } from '../config/constants';
// import { ProfileService } from '../services';
// import { HomeService } from '../services/home.service';
// import toast, { Toaster } from 'react-hot-toast';
// import { LoadingSpinner } from '../components/LoadingSpinner';
// import { useInfiniteScroll } from '../hook/useInfiniteScroll';
// import axios from 'axios';
// import { TopBar } from '../components/TopBar';
// import { TopBarHome } from '../components/topnavhome';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface Category {
//   id: number;
//   name: string;
// }

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


// interface HomeProps {
//   searchResults: Post[] | null;
//   isSearchActive: boolean;
//   searchError: string | null;
// }

// const gradients = [
//   { name: "Ocean", value: "from-blue-500 to-cyan-500" },
//   { name: "Sunset", value: "from-orange-500 to-pink-500" },
//   { name: "Forest", value: "from-green-500 to-emerald-500" },
//   { name: "Royal", value: "from-purple-500 to-indigo-500" },
//   { name: "Spring", value: "from-green-400 to-yellow-400" },
//   { name: "Aurora", value: "from-teal-400 to-purple-500" },
//   { name: "Desert", value: "from-yellow-400 to-orange-500" },
//   { name: "Default", value: "from-purple-500 via-blue-500 to-orange-500" },
// ];

// const POSTS_PER_PAGE = 10;
// export default function Home({ searchResults, isSearchActive, searchError }: HomeProps) {

//   const { user } = useAuthStore();
//   const { displayName, bio, avatarUrl, points, tier } = useProfileStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
  
//   const [newPost, setNewPost] = useState('');
 
//   const [showMediaUploader, setShowMediaUploader] = useState<'image' | 'video' | null>(null);
//   const [mediaUrl, setMediaUrl] = useState<string | null>(null);
//   const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState('All Categories');
//   const [postIds, setPostIds] = useState<number[]>([]);
//   const [likes, setLikes] = useState([]);
//   const [profile, setProfile] = useState<any>(null);
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
//   const [postTitle, setPostTitle] = useState('');
//   const [mediaFile, setMediaFile] = useState<File | null>(null);
//   const [postCategoryId, setPostCategoryId] = useState<number | null>(null);
//   const [postCategoryName, setPostCategoryName] = useState(""); 
//   const [bannerColor, setBannerColor] = useState(gradients.find(g => g.name === "Default")?.value);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [loadError, setLoadError] = useState(false);
//   const [page, setPage] = useState(1);
//   const [postCategory, setPostCategory] = useState('');
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [tierInfo, setTierInfo] = useState(null);


//   const [profileData, setProfileData] = useState<{ username: string } | null>(null);
  
//    const [loading, setLoading] = useState(true);
//    const displayPosts = isSearchActive ? searchResults || [] : posts;
  
//   const fetchCategories = useCallback(async () => {
//     const token = localStorage.getItem("authToken");
    
//     if (!token) {
//       setError("Authentication required");
//       return;
//     }

//     try {
//       const response = await api.get("/auth/categories", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data) {
//         setCategories(response.data);
//       }
//     } catch (error: any) {
//       console.error("Error fetching categories:", error);
//       if (error.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/signin");
//       }
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);


//   // useEffect(() => {
//   //   const fetchProfile = async () => {
//   //     const token = localStorage.getItem("authToken");
//   //     const userId = localStorage.getItem("userId");

//   //     if (!token || !userId) {
//   //       setLoading(false);
//   //       return; // Stop execution if token or userId is missing
//   //     }

//   //     try {
//   //       const { data } = await api.get(`/auth/profile/${userId}`, {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       });

//   //       setProfile(data);
//   //     } catch (err) {
//   //       if (err.response?.status === 401) {
//   //         console.log("Token expired! Logging out...");
//   //         localStorage.removeItem("authToken");
//   //         localStorage.removeItem("userId"); // Remove userId too
  
//   //         setTimeout(() => {
//   //           window.location.href = "/signin";
//   //         }, 0);
//   //       } else {
//   //         console.error("Error fetching profile:", err);
//   //         setError('Failed to load profile. Please try again later.');
//   //       }
//   //     } finally {
      
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchProfile();
//   // }, []);


//   const handleSearchResults = (results: Post[] | null, isActive: boolean, error?: string) => {
//     setIsSearchActive(isActive);
//     setSearchError(error);
    
//     if (isActive) {
//       if (results === null) {
//         // Keep existing posts if results is null (error case)
//         setFilteredPosts([]);
//       } else {
//         setFilteredPosts(results);
//       }
//     } else {
//       setFilteredPosts(posts);
//     }
//   };

  
//   const handleAuthError = (error: any) => {
//     if (error.response?.status === 401) {
//       console.log("Token expired! Logging out...");
//       localStorage.removeItem("authToken");
  
//       setTimeout(() => {
//         navigate("/signin");
//       }, 0);
//     }
//     setError("Error fetching data");
//   };


//   const fetchPosts = useCallback(async (pageNum: number) => {
//     const token = localStorage.getItem("authToken");
//     const userId = localStorage.getItem("userId");

//     if (!token || !userId) {
//       setError("Authentication required");
//       setIsLoading(false);
//       navigate("/signin");
//       return;
//     }

//     try {
//       setIsLoadingMore(true);
//       setLoadError(false);

//       const response = await api.get(`/auth/posts?page=${pageNum}&limit=${POSTS_PER_PAGE}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data && response.data.posts) {
//         const newPosts = response.data.posts.filter((post: Post) =>
//           post.isNoMedia || post.isImage || post.isAudio ||
//           (post.isVideo && post.isVideoApproved && !post.isVideoRejected)
//         );

//         if (pageNum === 1) {
//           setPosts(newPosts);
//           setFilteredPosts(newPosts);
//         } else {
//           setPosts(prev => [...prev, ...newPosts]);
//           setFilteredPosts(prev => [...prev, ...newPosts]);
//         }

//         setHasMore(newPosts.length === POSTS_PER_PAGE);
//       }
//     } catch (error: any) {
//       console.error("Error fetching posts:", error);
//       setLoadError(true);

//       if (error.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/signin");
//       }
//       setError(error.response?.data?.message || "Error fetching data");
//     } finally {
//       setIsLoading(false);
//       setIsLoadingMore(false);
//     }
//   }, [navigate]);

  

  

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

  
//   const loadMore = useCallback(() => {
//     if (!isLoadingMore && hasMore) {
//       setPage(prev => prev + 1);
//       fetchPosts(page + 1);
//     }
//   }, [fetchPosts, isLoadingMore, hasMore, page]);

//   useInfiniteScroll(loadMore, isLoadingMore, hasMore);

//   useEffect(() => {
//     fetchPosts(1);
//   }, [fetchPosts]);

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
//           const gradient = gradients.find(g => g.name === response.data.name);
//           setBannerColor(gradient?.value || gradients.find(g => g.name === "Default")?.value);
//         }
//       } catch (error: any) {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
//           navigate("/signin");
//         }
//         setBannerColor(gradients.find(g => g.name === "Default")?.value);
//       }
//     };

//     fetchBanner();
//   }, [navigate]);

  


//   useEffect(() => {
//     const fetchProfile = async () => {
//       const userId = localStorage.getItem("userId");
//       const token = localStorage.getItem("authToken");

//       if (!userId || !token) {
//         window.location.href = "/signin";
//         return;
//       }

//       try {
//         // Fetch user profile data
//         const profileResponse = await api.get(`/auth/profile/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setProfileData({ username: profileResponse.data.username , bio: profileResponse.data.bio,total_likes:profileResponse.data.total_likes});

//         // Fetch user profile image
//         const imageResponse = await api.get(`/auth/get-profile-image/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//           responseType: "blob",
//         });

//         setProfileImage(URL.createObjectURL(imageResponse.data));
//       } catch (error: any) {
//         console.error("Error fetching profile:", error);
//         if (error.response?.status === 401) {
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
//           window.location.href = "/signin";
//         }
//       }
//     };

//     fetchProfile();
//   }, []); 

 


  
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
//   const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'audio') => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setMediaFile(file);
//       setMediaUrl(URL.createObjectURL(file));
//       setMediaType(type);
//       setShowMediaUploader(null);
//     }
//   };

//   const removeMedia = () => {
//     setMediaUrl(null);
//     setMediaType(null);
//     setMediaFile(null);
//   };
  

//   const handlePostSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
  
//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("authToken");
  
//     if (!userId || !token) {
//       toast.error("User is not logged in!");
//       setIsSubmitting(false);
//       return;
//     }
  
//     if (!postCategoryId || !postCategoryName) {
//       toast.error("Please select a valid category");
//       setIsSubmitting(false);
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("title", postTitle);
//     formData.append("category", postCategoryName);
//     formData.append("content", newPost);
//     formData.append("userId", userId);
  
//     if (mediaFile) {
//       formData.append("media", mediaFile);
//     }
  
//     try {
//       const response = await api.post(
//         `/auth/post/${userId}?category_id=${postCategoryId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
  
//       if (response.status >= 200 && response.status < 300) {
//         toast.success("Post created successfully!");
  
//         // Send notification
//         const notificationData = {
//           user_id: userId,
//           category_id: postCategoryId,
//           title: postTitle || "Untitled Post",
//           content: newPost || "No content",
//         };
  
//         api.post("/auth/notifications/add", notificationData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }).catch((notifError) => {
//           console.error("Error adding notification:", notifError);
//         });
  
//         // Reset form fields
//         setPostTitle("");
//         setNewPost("");
//         setPostCategory("");
//         setPostCategoryId(null);
//         setPostCategoryName("");
//         setMediaUrl(null);
//         setMediaType(null);
//         setMediaFile(null);
  
//         // Refresh posts
//         await fetchPosts(1);
//       }
//     } catch (error: any) {
//       console.error("Error creating post:", error);
  
//       if (error.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/signin");
//       }
  
//       const errorMessage = error.response?.data?.detail || "Failed to create post!";
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  

  



// const handleCategoryClick = async (category: { id: number; name: string }) => {
//   console.log("Selected Category:", category);
//   setSelectedCategory(category.name);

//   try {
//     if (category.id === 0) {
//       // Show all posts
//       setFilteredPosts(posts);
//     } else {
//       // Filter posts by category
//       const filtered = posts.filter(post => post.category_id === category.id);
//       setFilteredPosts(filtered);
//     }
//   } catch (error: any) {
//     console.error("Error filtering posts:", error);
//     if (error.response?.status === 401) {
//       localStorage.removeItem("authToken");
//       navigate("/signin");
//     }
//   }
// };

// // Update the posts display logic in the return statement
// const postsToDisplay = isSearchActive ? searchResults || [] : 
//                       selectedCategory !== 'All Categories' ? filteredPosts : 
//                       posts;


 

//   return (
//     <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
//       <Toaster />
      
      
//       {/* Profile Section */}
//       <div className="w-full lg:w-80 lg:flex-shrink-0 order-1 lg:order-none">
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className={`h-24 lg:h-32 bg-gradient-to-r ${bannerColor}`}></div>
          
//           <div className="relative px-4 pb-4">
//             <div className="flex justify-center">
//               <img
//                 src={profileImage || avatarUrl}
//                 alt="add Profile"
//                 className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-white -mt-10 lg:-mt-12 bg-white"
//               />
//             </div>
//             <div className="text-center mt-2">
//               <h2 className="text-xl font-semibold">
//                 {profileData?.username}
//               </h2>
//               <p className="text-gray-600 text-sm">
//               Level {tierInfo?.level} {tierInfo?.tier_name}
//                 {/* Level {profileData?.level} {profileData?.tier} */}
//               </p>
//             </div>
//             <p className="text-center text-gray-600 mt-3 text-sm">
//               {profileData?.bio || "Share your story here! Tell others about yourself, your interests, and what you're passionate about."}
//             </p>

//             <div className="mt-4 px-4">
//               <div className="flex justify-between text-sm mb-1">
//                 <span className="font-medium">
//                   {/* Level {profileData?.level || 1} {profileData?.tier || "Bronze"}
//                   {["Platinum"].includes(profileData?.tier) && (
//                     <span className="text-yellow-400 text-lg">👑</span> */}
//                      Level {tierInfo?.level || 1} {tierInfo?.tier_name || "Bronze"}
//             {tierInfo?.tier_name === "Platinum" && (
//               <span className="text-yellow-400 text-lg">👑</span>
//                   )}
//                 </span>
//               </div>
              
//               <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
                

// <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
//                   <div 
//                     className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${tierInfo?.tier_color || 'from-blue-500 to-purple-500'}`}
//                     style={{ width: `${profileData?.total_likes || 0}%` }} 
//                   >
//                     <div className="w-full h-full opacity-75 bg-[linear-gradient(110deg,rgba(255,255,255,0.48)_0.8%,rgba(255,255,255,0)_10%,rgba(255,255,255,0.1)_100%)]"></div>
//                   </div>
//                 </div>
                
//                 <div className="text-xs text-gray-500 mt-1 text-center">
//                   {tierInfo?.likes_needed_for_next_level > 0
//                     ? `${tierInfo.likes_needed_for_next_level} more likes to next level`
//                     : "Level Cap Achieved!"}
//                   <br />
//                   Total Likes: {profileData?.total_likes}
//                 </div>
//               </div>

//             </div>

//             <div className="hidden lg:block mt-6 space-y-2">
//               <Link to="/" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
//                 <HomeIcon className="w-5 h-5" />
//                 <span>Feed</span>
//               </Link>
              
//               <Link to="/settings" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
//                 <Settings className="w-5 h-5" />
//                 <span>Settings</span>
//               </Link>
//             </div>

//             <div className="hidden lg:block mt-6">
//               <Link 
//                 to="/profile" 
//                 className="block text-center font-medium"
//                 style={{ color: themeColors.primary }}
//               >
//                 View Profile
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow max-w-2xl order-2 lg:order-none">
//         <div className="bg-white rounded-xl shadow-sm mb-6">
//           <div className="p-4 border-b border-gray-100">
//             <h4 className="text-lg font-semibold text-gray-900">Create Post</h4>
//           </div>
//           <form onSubmit={handlePostSubmit} className="p-4">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="hidden sm:flex relative h-28 lg:h-32 justify-center items-center">
//                 <Avatar
//                   src={avatarUrl}
//                   seed={profileData?.username}
//                   size="md"
//                   tier={tier}
//                   points={points}
//                 />
//               </div>

//               <div className="flex-1 space-y-4">
//                 <input
//                   type="text"
//                   value={postTitle}
//                   onChange={(e) => setPostTitle(e.target.value)}
//                   placeholder="Post Title"
//                   className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//                 />

//                 <textarea
//                   value={newPost}
//                   onChange={(e) => setNewPost(e.target.value)}
//                   placeholder="What's on your mind?"
//                   className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:border-transparent min-h-[120px] text-gray-700"
//                 />

//                 {mediaUrl && (
//                   <div className="relative">
//                     {mediaType === 'image' ? (
//                       <div className="relative">
//                         <img 
//                           src={mediaUrl} 
//                           alt="image" 
//                           className="w-full max-h-[200px] object-cover rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={removeMedia}
//                           className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
//                         >
//                           <Image className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ) : mediaType === 'video' ? (
//                       <div className="relative">
//                         <video 
//                           src={mediaUrl} 
//                           controls 
//                           className="w-full max-h-[200px] rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={removeMedia}
//                           className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
//                         >
//                           <Video className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="relative">
//                         <audio 
//                           src={mediaUrl} 
//                           controls 
//                           className="w-full rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={removeMedia}
//                           className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
//                         >
//                           <Music className="w-4 h-4" />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 <div>
//                   <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//                     Select Category
//                   </label>
//                   <select
//                     id="category"
//                     value={postCategory}
//                     onChange={(e) => {
//                       const selectedCategory = categories.find((cat) => cat.name === e.target.value);
//                       if (selectedCategory) {
//                         setPostCategoryId(selectedCategory.id);
//                         setPostCategoryName(selectedCategory.name);
//                       } else {
//                         setPostCategoryId(null);
//                         setPostCategoryName("");
//                       }
//                       setPostCategory(e.target.value);
//                     }}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((category) => (
//                       <option key={category.id} value={category.name}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-2">
//                   <div className="flex flex-wrap gap-2">
//                     <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
//                       <Image className="w-5 h-5" />
//                       <span className="text-sm font-medium">Photo</span>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={(e) => handleMediaUpload(e, 'image')}
//                       />
//                     </label>

//                     <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
//                       <Video className="w-5 h-5" />
//                       <span className="text-sm font-medium">Video</span>
//                       <input
//                         type="file"
//                         accept="video/*"
//                         className="hidden"
//                         onChange={(e) => handleMediaUpload(e, 'video')}
//                       />
//                     </label>

//                     <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
//                       <Music className="w-5 h-5" />
//                       <span className="text-sm font-medium">Audio</span>
//                       <input
//                         type="file"
//                         accept="audio/*"
//                         className="hidden"
//                         onChange={(e) => handleMediaUpload(e, 'audio')}
//                       />
//                     </label>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={(!newPost.trim() && !mediaUrl) || isSubmitting}
//                     className="ml-auto text-white px-6 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
//                     style={{ backgroundColor: themeColors.primary }}
//                   >
//                     <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
//                     <span className="hidden sm:inline">
//                       {isSubmitting ? 'Sharing...' : 'Share'}
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>

//    {isLoading ? (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//             <p className="mt-2 text-gray-600">Loading posts...</p>
//           </div>
//         ) : error || searchError ? (
//           <div className="bg-white rounded-xl shadow-sm p-8 text-center">
//             <p className="text-red-600">{error || searchError}</p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {postsToDisplay.length === 0 ? (
//               <div className="bg-white rounded-xl shadow-sm p-8 text-center">
//                 <p className="text-gray-600">
//                   {isSearchActive 
//                     ? "No posts found matching your search."
//                     : selectedCategory !== 'All Categories'
//                     ? `No posts found in ${selectedCategory} category.`
//                     : "No posts available."}
//                 </p>
//               </div>
//             ) : (
//               postsToDisplay.map((post) => (
//                 <PostCard 
//                   key={post.id} 
//                   post={post}
//                   currentUserId={parseInt(localStorage.getItem("userId") || "0")}
//                 />
//               ))
//             )}
//           </div>
// )}

     
//       </div>

//       {/* Categories Sidebar */}
//       <div className="hidden lg:block w-80 flex-shrink-0 order-3 lg:order-none">
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-xl font-semibold mb-4">Categories</h2>
//           <div className="space-y-2">
//             <button
//               onClick={() => handleCategoryClick({ id: 0, name: 'All Categories' })}
//               className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
//                 selectedCategory === 'All Categories' ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
//               }`}
//               style={{ backgroundColor: selectedCategory === 'All Categories' ? themeColors.primary : 'transparent' }}
//             >
//               All Categories
//             </button>
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => handleCategoryClick(category)}
//                 className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
//                   category.name === selectedCategory ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
//                 }`}
//                 style={{ backgroundColor: category.name === selectedCategory ? themeColors.primary : 'transparent' }}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState, useEffect, useCallback } from 'react';
// import { useAuthStore } from '../store/authStore';
// import { useProfileStore } from '../store/profileStore';
// import { usePostStore } from '../store/postStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Image, Send, Video, Home as HomeIcon, Bell, Settings, Music } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { CATEGORIES } from '../store/postStore';
// import { Avatar } from '../components/Avatar';
// import { PostCard } from '../components/PostCard';
// import { MediaUploader } from '../components/MediaUploader';
// import { USER_TIERS, DEFAULT_GAMIFICATION_SETTINGS } from '../config/constants';
// import { ProfileService } from '../services';
// import { HomeService } from '../services/home.service';
// import toast, { Toaster } from 'react-hot-toast';
// import { LoadingSpinner } from '../components/LoadingSpinner';
// import { useInfiniteScroll } from '../hook/useInfiniteScroll';
// import axios from 'axios';
// import { TopBar } from '../components/TopBar';
// import { TopBarHome } from '../components/topnavhome';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface Category {
//   id: number;
//   name: string;
// }

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


// interface HomeProps {
//   searchResults: Post[] | null;
//   isSearchActive: boolean;
//   searchError: string | null;
// }

// const gradients = [
//   { name: "Ocean", value: "from-blue-500 to-cyan-500" },
//   { name: "Sunset", value: "from-orange-500 to-pink-500" },
//   { name: "Forest", value: "from-green-500 to-emerald-500" },
//   { name: "Royal", value: "from-purple-500 to-indigo-500" },
//   { name: "Spring", value: "from-green-400 to-yellow-400" },
//   { name: "Aurora", value: "from-teal-400 to-purple-500" },
//   { name: "Desert", value: "from-yellow-400 to-orange-500" },
//   { name: "Default", value: "from-purple-500 via-blue-500 to-orange-500" },
// ];

// const POSTS_PER_PAGE = 10;
// export default function Home({ searchResults, isSearchActive, searchError }: HomeProps) {

//   const { user } = useAuthStore();
//   const { displayName, bio, avatarUrl, points, tier } = useProfileStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
  
//   const [newPost, setNewPost] = useState('');
 
//   const [showMediaUploader, setShowMediaUploader] = useState<'image' | 'video' | null>(null);
//   const [mediaUrl, setMediaUrl] = useState<string | null>(null);
//   const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState('All Categories');
//   const [postIds, setPostIds] = useState<number[]>([]);
//   const [likes, setLikes] = useState([]);
//   const [profile, setProfile] = useState<any>(null);
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
//   const [postTitle, setPostTitle] = useState('');
//   const [mediaFile, setMediaFile] = useState<File | null>(null);
//   const [postCategoryId, setPostCategoryId] = useState<number | null>(null);
//   const [postCategoryName, setPostCategoryName] = useState(""); 
//   const [bannerColor, setBannerColor] = useState(gradients.find(g => g.name === "Default")?.value);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [loadError, setLoadError] = useState(false);
//   const [page, setPage] = useState(1);
//   const [postCategory, setPostCategory] = useState('');
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [tierInfo, setTierInfo] = useState(null);


//   const [profileData, setProfileData] = useState<{ username: string } | null>(null);
  
//    const [loading, setLoading] = useState(true);
//    const displayPosts = isSearchActive ? searchResults || [] : posts;
  
//   const fetchCategories = useCallback(async () => {
//     const token = localStorage.getItem("authToken");
    
//     if (!token) {
//       setError("Authentication required");
//       return;
//     }

//     try {
//       const response = await api.get("/auth/categories", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data) {
//         setCategories(response.data);
//       }
//     } catch (error: any) {
//       console.error("Error fetching categories:", error);
//       if (error.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/signin");
//       }
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);


  
//   const handleSearchResults = (results: Post[] | null, isActive: boolean, error?: string) => {
//     setIsSearchActive(isActive);
//     setSearchError(error);
    
//     if (isActive) {
//       if (results === null) {
//         // Keep existing posts if results is null (error case)
//         setFilteredPosts([]);
//       } else {
//         setFilteredPosts(results);
//       }
//     } else {
//       setFilteredPosts(posts);
//     }
//   };

  
//   const handleAuthError = (error: any) => {
//     if (error.response?.status === 401) {
//       console.log("Token expired! Logging out...");
//       localStorage.removeItem("authToken");
  
//       setTimeout(() => {
//         navigate("/signin");
//       }, 0);
//     }
//     setError("Error fetching data");
//   };


//   const fetchPosts = useCallback(async (pageNum: number) => {
//     const token = localStorage.getItem("authToken");
//     const userId = localStorage.getItem("userId");

//     if (!token || !userId) {
//       setError("Authentication required");
//       setIsLoading(false);
//       navigate("/signin");
//       return;
//     }

//     try {
//       setIsLoadingMore(true);
//       setLoadError(false);

//       const response = await api.get(`/auth/posts?page=${pageNum}&limit=${POSTS_PER_PAGE}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data && response.data.posts) {
//         const newPosts = response.data.posts.filter((post: Post) =>
//           post.isNoMedia || post.isImage || post.isAudio ||
//           (post.isVideo && post.isVideoApproved && !post.isVideoRejected)
//         );

//         if (pageNum === 1) {
//           setPosts(newPosts);
//           setFilteredPosts(newPosts);
//         } else {
//           setPosts(prev => [...prev, ...newPosts]);
//           setFilteredPosts(prev => [...prev, ...newPosts]);
//         }

//         setHasMore(newPosts.length === POSTS_PER_PAGE);
//       }
//     } catch (error: any) {
//       console.error("Error fetching posts:", error);
//       setLoadError(true);

//       if (error.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/signin");
//       }
//       setError(error.response?.data?.message || "Error fetching data");
//     } finally {
//       setIsLoading(false);
//       setIsLoadingMore(false);
//     }
//   }, [navigate]);

  

  

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

  
//   const loadMore = useCallback(() => {
//     if (!isLoadingMore && hasMore) {
//       setPage(prev => prev + 1);
//       fetchPosts(page + 1);
//     }
//   }, [fetchPosts, isLoadingMore, hasMore, page]);

//   useInfiniteScroll(loadMore, isLoadingMore, hasMore);

//   useEffect(() => {
//     fetchPosts(1);
//   }, [fetchPosts]);

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
//           const gradient = gradients.find(g => g.name === response.data.name);
//           setBannerColor(gradient?.value || gradients.find(g => g.name === "Default")?.value);
//         }
//       } catch (error: any) {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
//           navigate("/signin");
//         }
//         setBannerColor(gradients.find(g => g.name === "Default")?.value);
//       }
//     };

//     fetchBanner();
//   }, [navigate]);

  


//   useEffect(() => {
//     const fetchProfile = async () => {
//       const userId = localStorage.getItem("userId");
//       const token = localStorage.getItem("authToken");

//       if (!userId || !token) {
//         window.location.href = "/signin";
//         return;
//       }

//       try {
//         // Fetch user profile data
//         const profileResponse = await api.get(`/auth/profile/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setProfileData({ username: profileResponse.data.username , bio: profileResponse.data.bio,total_likes:profileResponse.data.total_likes});

//         // Fetch user profile image
//         const imageResponse = await api.get(`/auth/get-profile-image/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//           responseType: "blob",
//         });

//         setProfileImage(URL.createObjectURL(imageResponse.data));
//       } catch (error: any) {
//         console.error("Error fetching profile:", error);
//         if (error.response?.status === 401) {
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
//           window.location.href = "/signin";
//         }
//       }
//     };

//     fetchProfile();
//   }, []); 

 


  
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
//   const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'audio') => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setMediaFile(file);
//       setMediaUrl(URL.createObjectURL(file));
//       setMediaType(type);
//       setShowMediaUploader(null);
//     }
//   };

//   const removeMedia = () => {
//     setMediaUrl(null);
//     setMediaType(null);
//     setMediaFile(null);
//   };
  

//   const handlePostSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
  
//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("authToken");
  
//     if (!userId || !token) {
//       toast.error("User is not logged in!");
//       setIsSubmitting(false);
//       return;
//     }
  
//     if (!postCategoryId || !postCategoryName) {
//       toast.error("Please select a valid category");
//       setIsSubmitting(false);
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("title", postTitle);
//     formData.append("category", postCategoryName);
//     formData.append("content", newPost);
//     formData.append("userId", userId);
  
//     if (mediaFile) {
//       formData.append("media", mediaFile);
//     }
  
//     try {
//       const response = await api.post(
//         `/auth/post/${userId}?category_id=${postCategoryId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
  
//       if (response.status >= 200 && response.status < 300) {
//         toast.success("Post created successfully!");
  
//         // Send notification
//         const notificationData = {
//           user_id: userId,
//           category_id: postCategoryId,
//           title: postTitle || "Untitled Post",
//           content: newPost || "No content",
//         };
  
//         api.post("/auth/notifications/add", notificationData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }).catch((notifError) => {
//           console.error("Error adding notification:", notifError);
//         });
  
//         // Reset form fields
//         setPostTitle("");
//         setNewPost("");
//         setPostCategory("");
//         setPostCategoryId(null);
//         setPostCategoryName("");
//         setMediaUrl(null);
//         setMediaType(null);
//         setMediaFile(null);
  
//         // Refresh posts
//         await fetchPosts(1);
//       }
//     } catch (error: any) {
//       console.error("Error creating post:", error);
  
//       if (error.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/signin");
//       }
  
//       const errorMessage = error.response?.data?.detail || "Failed to create post!";
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  

  



// const handleCategoryClick = async (category: { id: number; name: string }) => {
//   console.log("Selected Category:", category);
//   setSelectedCategory(category.name);

//   try {
//     if (category.id === 0) {
//       // Show all posts
//       setFilteredPosts(posts);
//     } else {
//       // Filter posts by category
//       const filtered = posts.filter(post => post.category_id === category.id);
//       setFilteredPosts(filtered);
//     }
//   } catch (error: any) {
//     console.error("Error filtering posts:", error);
//     if (error.response?.status === 401) {
//       localStorage.removeItem("authToken");
//       navigate("/signin");
//     }
//   }
// };

// // Update the posts display logic in the return statement
// const postsToDisplay = isSearchActive ? searchResults || [] : 
//                       selectedCategory !== 'All Categories' ? filteredPosts : 
//                       posts;


 

//   return (
//     <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
//       <Toaster />
      
      
//       {/* Profile Section */}
//       <div className="w-full lg:w-80 lg:flex-shrink-0 order-1 lg:order-none">
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className={`h-24 lg:h-32 bg-gradient-to-r ${bannerColor}`}></div>
          
//           <div className="relative px-4 pb-4">
//             <div className="flex justify-center">
//               <img
//                 src={profileImage || avatarUrl}
//                 alt="add Profile"
//                 className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-white -mt-10 lg:-mt-12 bg-white"
//               />
//             </div>
//             <div className="text-center mt-2">
//               <h2 className="text-xl font-semibold">
//                 {profileData?.username}
//               </h2>
//               <p className="text-gray-600 text-sm">
//               Level {tierInfo?.level} {tierInfo?.tier_name}
//                 {/* Level {profileData?.level} {profileData?.tier} */}
//               </p>
//             </div>
//             <p className="text-center text-gray-600 mt-3 text-sm">
//               {profileData?.bio || "Share your story here! Tell others about yourself, your interests, and what you're passionate about."}
//             </p>

//             <div className="mt-4 px-4">
//               <div className="flex justify-between text-sm mb-1">
//                 <span className="font-medium">
//                   {/* Level {profileData?.level || 1} {profileData?.tier || "Bronze"}
//                   {["Platinum"].includes(profileData?.tier) && (
//                     <span className="text-yellow-400 text-lg">👑</span> */}
//                      Level {tierInfo?.level || 1} {tierInfo?.tier_name || "Bronze"}
//             {tierInfo?.tier_name === "Platinum" && (
//               <span className="text-yellow-400 text-lg">👑</span>
//                   )}
//                 </span>
//               </div>
              
//               <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
                

// <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
//                   <div 
//                     className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${tierInfo?.tier_color || 'from-blue-500 to-purple-500'}`}
//                     style={{ width: `${profileData?.total_likes || 0}%` }} 
//                   >
//                     <div className="w-full h-full opacity-75 bg-[linear-gradient(110deg,rgba(255,255,255,0.48)_0.8%,rgba(255,255,255,0)_10%,rgba(255,255,255,0.1)_100%)]"></div>
//                   </div>
//                 </div>
                
//                 <div className="text-xs text-gray-500 mt-1 text-center">
//                   {tierInfo?.likes_needed_for_next_level > 0
//                     ? `${tierInfo.likes_needed_for_next_level} more likes to next level`
//                     : "Level Cap Achieved!"}
//                   <br />
//                   Total Likes: {profileData?.total_likes}
//                 </div>
//               </div>

//             </div>

//             <div className="hidden lg:block mt-6 space-y-2">
//               <Link to="/" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
//                 <HomeIcon className="w-5 h-5" />
//                 <span>Feed</span>
//               </Link>
              
//               <Link to="/settings" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
//                 <Settings className="w-5 h-5" />
//                 <span>Settings</span>
//               </Link>
//             </div>

//             <div className="hidden lg:block mt-6">
//               <Link 
//                 to="/profile" 
//                 className="block text-center font-medium"
//                 style={{ color: themeColors.primary }}
//               >
//                 View Profile
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow max-w-2xl order-2 lg:order-none">
//         <div className="bg-white rounded-xl shadow-sm mb-6">
//           <div className="p-4 border-b border-gray-100">
//             <h4 className="text-lg font-semibold text-gray-900">Create Post</h4>
//           </div>
//           <form onSubmit={handlePostSubmit} className="p-4">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="hidden sm:flex relative h-28 lg:h-32 justify-center items-center">
//                 <Avatar
//                   src={avatarUrl}
//                   seed={profileData?.username}
//                   size="md"
//                   tier={tier}
//                   points={points}
//                 />
//               </div>

//               <div className="flex-1 space-y-4">
//                 <input
//                   type="text"
//                   value={postTitle}
//                   onChange={(e) => setPostTitle(e.target.value)}
//                   placeholder="Post Title"
//                   className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//                 />

//                 <textarea
//                   value={newPost}
//                   onChange={(e) => setNewPost(e.target.value)}
//                   placeholder="What's on your mind?"
//                   className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:border-transparent min-h-[120px] text-gray-700"
//                 />

//                 {mediaUrl && (
//                   <div className="relative">
//                     {mediaType === 'image' ? (
//                       <div className="relative">
//                         <img 
//                           src={mediaUrl} 
//                           alt="image" 
//                           className="w-full max-h-[200px] object-cover rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={removeMedia}
//                           className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
//                         >
//                           <Image className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ) : mediaType === 'video' ? (
//                       <div className="relative">
//                         <video 
//                           src={mediaUrl} 
//                           controls 
//                           className="w-full max-h-[200px] rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={removeMedia}
//                           className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
//                         >
//                           <Video className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="relative">
//                         <audio 
//                           src={mediaUrl} 
//                           controls 
//                           className="w-full rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={removeMedia}
//                           className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
//                         >
//                           <Music className="w-4 h-4" />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 <div>
//                   <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//                     Select Category
//                   </label>
//                   <select
//                     id="category"
//                     value={postCategory}
//                     onChange={(e) => {
//                       const selectedCategory = categories.find((cat) => cat.name === e.target.value);
//                       if (selectedCategory) {
//                         setPostCategoryId(selectedCategory.id);
//                         setPostCategoryName(selectedCategory.name);
//                       } else {
//                         setPostCategoryId(null);
//                         setPostCategoryName("");
//                       }
//                       setPostCategory(e.target.value);
//                     }}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((category) => (
//                       <option key={category.id} value={category.name}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-2">
//                   <div className="flex flex-wrap gap-2">
//                     <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
//                       <Image className="w-5 h-5" />
//                       <span className="text-sm font-medium">Photo</span>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={(e) => handleMediaUpload(e, 'image')}
//                       />
//                     </label>

//                     <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
//                       <Video className="w-5 h-5" />
//                       <span className="text-sm font-medium">Video</span>
//                       <input
//                         type="file"
//                         accept="video/*"
//                         className="hidden"
//                         onChange={(e) => handleMediaUpload(e, 'video')}
//                       />
//                     </label>

//                     <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
//                       <Music className="w-5 h-5" />
//                       <span className="text-sm font-medium">Audio</span>
//                       <input
//                         type="file"
//                         accept="audio/*"
//                         className="hidden"
//                         onChange={(e) => handleMediaUpload(e, 'audio')}
//                       />
//                     </label>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={(!newPost.trim() && !mediaUrl) || isSubmitting}
//                     className="ml-auto text-white px-6 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
//                     style={{ backgroundColor: themeColors.primary }}
//                   >
//                     <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
//                     <span className="hidden sm:inline">
//                       {isSubmitting ? 'Sharing...' : 'Share'}
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>

//    {isLoading ? (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//             <p className="mt-2 text-gray-600">Loading posts...</p>
//           </div>
//         ) : error || searchError ? (
//           <div className="bg-white rounded-xl shadow-sm p-8 text-center">
//             <p className="text-red-600">{error || searchError}</p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {postsToDisplay.length === 0 ? (
//               <div className="bg-white rounded-xl shadow-sm p-8 text-center">
//                 <p className="text-gray-600">
//                   {isSearchActive 
//                     ? "No posts found matching your search."
//                     : selectedCategory !== 'All Categories'
//                     ? `No posts found in ${selectedCategory} category.`
//                     : "No posts available."}
//                 </p>
//               </div>
//             ) : (
//               postsToDisplay.map((post) => (
                
//                 <PostCard 
//                   key={post.id} 
//                   post={post}
//                   currentUserId={userId ? parseInt(userId) : undefined}
//                   // currentUserId={parseInt(localStorage.getItem("userId") || "0")}
//                 />
//               ))
//             )}
//           </div>
// )}

     
//       </div>

//       {/* Categories Sidebar */}
//       <div className="hidden lg:block w-80 flex-shrink-0 order-3 lg:order-none">
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-xl font-semibold mb-4">Categories</h2>
//           <div className="space-y-2">
//             <button
//               onClick={() => handleCategoryClick({ id: 0, name: 'All Categories' })}
//               className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
//                 selectedCategory === 'All Categories' ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
//               }`}
//               style={{ backgroundColor: selectedCategory === 'All Categories' ? themeColors.primary : 'transparent' }}
//             >
//               All Categories
//             </button>
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => handleCategoryClick(category)}
//                 className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
//                   category.name === selectedCategory ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
//                 }`}
//                 style={{ backgroundColor: category.name === selectedCategory ? themeColors.primary : 'transparent' }}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// correct



// import React, { useState, useEffect, useCallback } from 'react';
// import { useAuthStore } from '../store/authStore';
// import { useProfileStore } from '../store/profileStore';
// import { usePostStore } from '../store/postStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { Image, Send, Video, Home as HomeIcon, Bell, Settings, Music } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { CATEGORIES } from '../store/postStore';
// import { Avatar } from '../components/Avatar';
// import { PostCard } from '../components/PostCard';
// import { MediaUploader } from '../components/MediaUploader';
// import { USER_TIERS, DEFAULT_GAMIFICATION_SETTINGS } from '../config/constants';
// import { ProfileService } from '../services';
// import { HomeService } from '../services/home.service';
// import toast, { Toaster } from 'react-hot-toast';
// import { LoadingSpinner } from '../components/LoadingSpinner';
// import { useInfiniteScroll } from '../hook/useInfiniteScroll';
// import axios from 'axios';
// import { TopBar } from '../components/TopBar';
// import { TopBarHome } from '../components/topnavhome';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface Category {
//   id: number;
//   name: string;
// }

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


// interface HomeProps {
//   searchResults: Post[] | null;
//   isSearchActive: boolean;
//   searchError: string | null;
// }

// const gradients = [
//   { name: "Ocean", value: "from-blue-500 to-cyan-500" },
//   { name: "Sunset", value: "from-orange-500 to-pink-500" },
//   { name: "Forest", value: "from-green-500 to-emerald-500" },
//   { name: "Royal", value: "from-purple-500 to-indigo-500" },
//   { name: "Spring", value: "from-green-400 to-yellow-400" },
//   { name: "Aurora", value: "from-teal-400 to-purple-500" },
//   { name: "Desert", value: "from-yellow-400 to-orange-500" },
//   { name: "Default", value: "from-purple-500 via-blue-500 to-orange-500" },
// ];

// const POSTS_PER_PAGE = 10;
// export default function Home({ searchResults, isSearchActive, searchError }: HomeProps) {

//   const { user } = useAuthStore();
//   const { displayName, bio, avatarUrl, points, tier } = useProfileStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
  
//   const [newPost, setNewPost] = useState('');
 
//   const [showMediaUploader, setShowMediaUploader] = useState<'image' | 'video' | null>(null);
//   const [mediaUrl, setMediaUrl] = useState<string | null>(null);
//   const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState('All Categories');
//   const [postIds, setPostIds] = useState<number[]>([]);
//   const [likes, setLikes] = useState([]);
//   const [profile, setProfile] = useState<any>(null);
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
//   const [postTitle, setPostTitle] = useState('');
//   const [mediaFile, setMediaFile] = useState<File | null>(null);
//   const [postCategoryId, setPostCategoryId] = useState<number | null>(null);
//   const [postCategoryName, setPostCategoryName] = useState(""); 
//   const [bannerColor, setBannerColor] = useState(gradients.find(g => g.name === "Default")?.value);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [loadError, setLoadError] = useState(false);
//   const [page, setPage] = useState(1);
//   const [postCategory, setPostCategory] = useState('');
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [tierInfo, setTierInfo] = useState(null);


//   const [profileData, setProfileData] = useState<{ username: string } | null>(null);
  
//    const [loading, setLoading] = useState(true);
//    const displayPosts = isSearchActive ? searchResults || [] : posts;
  
//   const fetchCategories = useCallback(async () => {
//     const token = localStorage.getItem("authToken");
    
//     if (!token) {
//       setError("Authentication required");
//       return;
//     }

//     try {
//       const response = await api.get("/auth/categories", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data) {
//         setCategories(response.data);
//       }
//     } catch (error: any) {
//       console.error("Error fetching categories:", error);
//       if (error.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/signin");
//       }
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);


  
//   const handleSearchResults = (results: Post[] | null, isActive: boolean, error?: string) => {
//     setIsSearchActive(isActive);
//     setSearchError(error);
    
//     if (isActive) {
//       if (results === null) {
//         // Keep existing posts if results is null (error case)
//         setFilteredPosts([]);
//       } else {
//         setFilteredPosts(results);
//       }
//     } else {
//       setFilteredPosts(posts);
//     }
//   };

  
//   const handleAuthError = (error: any) => {
//     if (error.response?.status === 401) {
//       console.log("Token expired! Logging out...");
//       localStorage.removeItem("authToken");
  
//       setTimeout(() => {
//         navigate("/signin");
//       }, 0);
//     }
//     setError("Error fetching data");
//   };


//   const fetchPosts = useCallback(async (pageNum: number) => {
//     const token = localStorage.getItem("authToken");
//     const userId = localStorage.getItem("userId");

//     if (!token || !userId) {
//       setError("Authentication required");
//       setIsLoading(false);
//       navigate("/signin");
//       return;
//     }

//     try {
//       setIsLoadingMore(true);
//       setLoadError(false);

//       const response = await api.get(`/auth/posts?page=${pageNum}&limit=${POSTS_PER_PAGE}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data && response.data.posts) {
//         const newPosts = response.data.posts.filter((post: Post) =>
//           post.isNoMedia || post.isImage || post.isAudio ||
//           (post.isVideo && post.isVideoApproved && !post.isVideoRejected)
//         );

//         if (pageNum === 1) {
//           setPosts(newPosts);
//           setFilteredPosts(newPosts);
//         } else {
//           setPosts(prev => [...prev, ...newPosts]);
//           setFilteredPosts(prev => [...prev, ...newPosts]);
//         }

//         setHasMore(newPosts.length === POSTS_PER_PAGE);
//       }
//     } catch (error: any) {
//       console.error("Error fetching posts:", error);
//       setLoadError(true);

//       if (error.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/signin");
//       }
//       setError(error.response?.data?.message || "Error fetching data");
//     } finally {
//       setIsLoading(false);
//       setIsLoadingMore(false);
//     }
//   }, [navigate]);

  

  

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

  
//   const loadMore = useCallback(() => {
//     if (!isLoadingMore && hasMore) {
//       setPage(prev => prev + 1);
//       fetchPosts(page + 1);
//     }
//   }, [fetchPosts, isLoadingMore, hasMore, page]);

//   useInfiniteScroll(loadMore, isLoadingMore, hasMore);

//   useEffect(() => {
//     fetchPosts(1);
//   }, [fetchPosts]);

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
//           const gradient = gradients.find(g => g.name === response.data.name);
//           setBannerColor(gradient?.value || gradients.find(g => g.name === "Default")?.value);
//         }
//       } catch (error: any) {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
//           navigate("/signin");
//         }
//         setBannerColor(gradients.find(g => g.name === "Default")?.value);
//       }
//     };

//     fetchBanner();
//   }, [navigate]);

  


//   useEffect(() => {
//     const fetchProfile = async () => {
//       const userId = localStorage.getItem("userId");
//       const token = localStorage.getItem("authToken");

//       if (!userId || !token) {
//         window.location.href = "/signin";
//         return;
//       }

//       try {
//         // Fetch user profile data
//         const profileResponse = await api.get(`/auth/profile/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setProfileData({ username: profileResponse.data.username , bio: profileResponse.data.bio,total_likes:profileResponse.data.total_likes});

//         // Fetch user profile image
//         const imageResponse = await api.get(`/auth/get-profile-image/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//           responseType: "blob",
//         });

//         setProfileImage(URL.createObjectURL(imageResponse.data));
//       } catch (error: any) {
//         console.error("Error fetching profile:", error);
//         if (error.response?.status === 401) {
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
//           window.location.href = "/signin";
//         }
//       }
//     };

//     fetchProfile();
//   }, []); 

 


  
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
//   const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'audio') => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setMediaFile(file);
//       setMediaUrl(URL.createObjectURL(file));
//       setMediaType(type);
//       setShowMediaUploader(null);
//     }
//   };

//   const removeMedia = () => {
//     setMediaUrl(null);
//     setMediaType(null);
//     setMediaFile(null);
//   };
  

//   const handlePostSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
  
//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("authToken");
  
//     if (!userId || !token) {
//       toast.error("User is not logged in!");
//       setIsSubmitting(false);
//       return;
//     }
  
//     if (!postCategoryId || !postCategoryName) {
//       toast.error("Please select a valid category");
//       setIsSubmitting(false);
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("title", postTitle);
//     formData.append("category", postCategoryName);
//     formData.append("content", newPost);
//     formData.append("userId", userId);
  
//     if (mediaFile) {
//       formData.append("media", mediaFile);
//     }
  
//     try {
//       const response = await api.post(
//         `/auth/post/${userId}?category_id=${postCategoryId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
  
//       if (response.status >= 200 && response.status < 300) {
//         toast.success("Post created successfully!");
  
//         // Send notification
//         const notificationData = {
//           user_id: userId,
//           category_id: postCategoryId,
//           title: postTitle || "Untitled Post",
//           content: newPost || "No content",
//         };
  
//         api.post("/auth/notifications/add", notificationData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }).catch((notifError) => {
//           console.error("Error adding notification:", notifError);
//         });
  
//         // Reset form fields
//         setPostTitle("");
//         setNewPost("");
//         setPostCategory("");
//         setPostCategoryId(null);
//         setPostCategoryName("");
//         setMediaUrl(null);
//         setMediaType(null);
//         setMediaFile(null);
  
//         // Refresh posts
//         await fetchPosts(1);
//       }
//     } catch (error: any) {
//       console.error("Error creating post:", error);
  
//       if (error.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/signin");
//       }
  
//       const errorMessage = error.response?.data?.detail || "Failed to create post!";
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  

  



// const handleCategoryClick = async (category: { id: number; name: string }) => {
//   console.log("Selected Category:", category);
//   setSelectedCategory(category.name);

//   try {
//     if (category.id === 0) {
//       // Show all posts
//       setFilteredPosts(posts);
//     } else {
//       // Filter posts by category
//       const filtered = posts.filter(post => post.category_id === category.id);
//       setFilteredPosts(filtered);
//     }
//   } catch (error: any) {
//     console.error("Error filtering posts:", error);
//     if (error.response?.status === 401) {
//       localStorage.removeItem("authToken");
//       navigate("/signin");
//     }
//   }
// };

// // Update the posts display logic in the return statement
// const postsToDisplay = isSearchActive ? searchResults || [] : 
//                       selectedCategory !== 'All Categories' ? filteredPosts : 
//                       posts;


 

//   return (
//     <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
//       <Toaster />
      
      
//       {/* Profile Section */}
//       <div className="w-full lg:w-80 lg:flex-shrink-0 order-1 lg:order-none">
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className={`h-24 lg:h-32 bg-gradient-to-r ${bannerColor}`}></div>
          
//           <div className="relative px-4 pb-4">
//             <div className="flex justify-center">
//               <img
//                 src={profileImage || avatarUrl}
//                 alt="add Profile"
//                 className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-white -mt-10 lg:-mt-12 bg-white"
//               />
//             </div>
//             <div className="text-center mt-2">
//               <h2 className="text-xl font-semibold">
//                 {profileData?.username}
//               </h2>
//               <p className="text-gray-600 text-sm">
//               Level {tierInfo?.level} {tierInfo?.tier_name}
//                 {/* Level {profileData?.level} {profileData?.tier} */}
//               </p>
//             </div>
//             <p className="text-center text-gray-600 mt-3 text-sm">
//               {profileData?.bio || "Share your story here! Tell others about yourself, your interests, and what you're passionate about."}
//             </p>

//             <div className="mt-4 px-4">
//               <div className="flex justify-between text-sm mb-1">
//                 <span className="font-medium">
//                   {/* Level {profileData?.level || 1} {profileData?.tier || "Bronze"}
//                   {["Platinum"].includes(profileData?.tier) && (
//                     <span className="text-yellow-400 text-lg">👑</span> */}
//                      Level {tierInfo?.level || 1} {tierInfo?.tier_name || "Bronze"}
//             {tierInfo?.tier_name === "Platinum" && (
//               <span className="text-yellow-400 text-lg">👑</span>
//                   )}
//                 </span>
//               </div>
              
//               <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
                

// <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
//                   <div 
//                     className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${tierInfo?.tier_color || 'from-blue-500 to-purple-500'}`}
//                     style={{ width: `${profileData?.total_likes || 0}%` }} 
//                   >
//                     <div className="w-full h-full opacity-75 bg-[linear-gradient(110deg,rgba(255,255,255,0.48)_0.8%,rgba(255,255,255,0)_10%,rgba(255,255,255,0.1)_100%)]"></div>
//                   </div>
//                 </div>
                
//                 <div className="text-xs text-gray-500 mt-1 text-center">
//                   {tierInfo?.likes_needed_for_next_level > 0
//                     ? `${tierInfo.likes_needed_for_next_level} more likes to next level`
//                     : "Level Cap Achieved!"}
//                   <br />
//                   Total Likes: {profileData?.total_likes}
//                 </div>
//               </div>

//             </div>

//             <div className="hidden lg:block mt-6 space-y-2">
//               <Link to="/" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
//                 <HomeIcon className="w-5 h-5" />
//                 <span>Feed</span>
//               </Link>
              
//               <Link to="/settings" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
//                 <Settings className="w-5 h-5" />
//                 <span>Settings</span>
//               </Link>
//             </div>

//             <div className="hidden lg:block mt-6">
//               <Link 
//                 to="/profile" 
//                 className="block text-center font-medium"
//                 style={{ color: themeColors.primary }}
//               >
//                 View Profile
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow max-w-2xl order-2 lg:order-none">
//         <div className="bg-white rounded-xl shadow-sm mb-6">
//           <div className="p-4 border-b border-gray-100">
//             <h4 className="text-lg font-semibold text-gray-900">Create Post</h4>
//           </div>
//           <form onSubmit={handlePostSubmit} className="p-4">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="hidden sm:flex relative h-28 lg:h-32 justify-center items-center">
//                 <Avatar
//                   src={avatarUrl}
//                   seed={profileData?.username}
//                   size="md"
//                   tier={tier}
//                   points={points}
//                 />
//               </div>

//               <div className="flex-1 space-y-4">
//                 <input
//                   type="text"
//                   value={postTitle}
//                   onChange={(e) => setPostTitle(e.target.value)}
//                   placeholder="Post Title"
//                   className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
//                 />

//                 <textarea
//                   value={newPost}
//                   onChange={(e) => setNewPost(e.target.value)}
//                   placeholder="What's on your mind?"
//                   className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:border-transparent min-h-[120px] text-gray-700"
//                 />

//                 {mediaUrl && (
//                   <div className="relative">
//                     {mediaType === 'image' ? (
//                       <div className="relative">
//                         <img 
//                           src={mediaUrl} 
//                           alt="image" 
//                           className="w-full max-h-[200px] object-cover rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={removeMedia}
//                           className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
//                         >
//                           <Image className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ) : mediaType === 'video' ? (
//                       <div className="relative">
//                         <video 
//                           src={mediaUrl} 
//                           controls 
//                           className="w-full max-h-[200px] rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={removeMedia}
//                           className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
//                         >
//                           <Video className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="relative">
//                         <audio 
//                           src={mediaUrl} 
//                           controls 
//                           className="w-full rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={removeMedia}
//                           className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
//                         >
//                           <Music className="w-4 h-4" />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 <div>
//                   <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//                     Select Category
//                   </label>
//                   <select
//                     id="category"
//                     value={postCategory}
//                     onChange={(e) => {
//                       const selectedCategory = categories.find((cat) => cat.name === e.target.value);
//                       if (selectedCategory) {
//                         setPostCategoryId(selectedCategory.id);
//                         setPostCategoryName(selectedCategory.name);
//                       } else {
//                         setPostCategoryId(null);
//                         setPostCategoryName("");
//                       }
//                       setPostCategory(e.target.value);
//                     }}
//                     className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((category) => (
//                       <option key={category.id} value={category.name}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-2">
//                   <div className="flex flex-wrap gap-2">
//                     <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
//                       <Image className="w-5 h-5" />
//                       <span className="text-sm font-medium">Photo</span>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={(e) => handleMediaUpload(e, 'image')}
//                       />
//                     </label>

//                     <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
//                       <Video className="w-5 h-5" />
//                       <span className="text-sm font-medium">Video</span>
//                       <input
//                         type="file"
//                         accept="video/*"
//                         className="hidden"
//                         onChange={(e) => handleMediaUpload(e, 'video')}
//                       />
//                     </label>

//                     <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
//                       <Music className="w-5 h-5" />
//                       <span className="text-sm font-medium">Audio</span>
//                       <input
//                         type="file"
//                         accept="audio/*"
//                         className="hidden"
//                         onChange={(e) => handleMediaUpload(e, 'audio')}
//                       />
//                     </label>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={(!newPost.trim() && !mediaUrl) || isSubmitting}
//                     className="ml-auto text-white px-6 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
//                     style={{ backgroundColor: themeColors.primary }}
//                   >
//                     <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
//                     <span className="hidden sm:inline">
//                       {isSubmitting ? 'Sharing...' : 'Share'}
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>

//         {isLoading ? (
//         <div className="text-center py-8">
//           <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//           <p className="mt-2 text-gray-600">Loading posts...</p>
//         </div>
//       ) : error || searchError ? (
//         <div className="bg-white rounded-xl shadow-sm p-8 text-center">
//           <p className="text-red-600">{error || searchError}</p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {postsToDisplay.length === 0 ? (
//             <div className="bg-white rounded-xl shadow-sm p-8 text-center">
//               <p className="text-gray-600">
//                 {isSearchActive 
//                   ? "No posts found matching your search."
//                   : selectedCategory !== 'All Categories'
//                   ? `No posts found in ${selectedCategory} category.`
//                   : "No posts available."}
//               </p>
//             </div>
//           ) : (
//             postsToDisplay.map((post) => {
//               // const userId = localStorage.getItem("userId");
//               return (
//                 <PostCard 
//                   key={post.id} 
//                   post={post}
//                   // currentUserId={userId}
//                   // currentUserId={parseInt(localStorage.getItem("userId") || "")}
//                 />
//               );
//             })
//           )}
//         </div>
// )}

     
//       </div>

//       {/* Categories Sidebar */}
//       <div className="hidden lg:block w-80 flex-shrink-0 order-3 lg:order-none">
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-xl font-semibold mb-4">Categories</h2>
//           <div className="space-y-2">
//             <button
//               onClick={() => handleCategoryClick({ id: 0, name: 'All Categories' })}
//               className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
//                 selectedCategory === 'All Categories' ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
//               }`}
//               style={{ backgroundColor: selectedCategory === 'All Categories' ? themeColors.primary : 'transparent' }}
//             >
//               All Categories
//             </button>
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => handleCategoryClick(category)}
//                 className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
//                   category.name === selectedCategory ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
//                 }`}
//                 style={{ backgroundColor: category.name === selectedCategory ? themeColors.primary : 'transparent' }}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// correct bove

import React, { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { useProfileStore } from '../store/profileStore';
import { usePostStore } from '../store/postStore';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import { Image, Send, Video, Home as HomeIcon, Bell, Settings, Music ,UserIcon} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../store/postStore';
import { Avatar } from '../components/Avatar';
import { PostCard } from '../components/PostCard';
import { MediaUploader } from '../components/MediaUploader';
import { USER_TIERS, DEFAULT_GAMIFICATION_SETTINGS } from '../config/constants';
import { ProfileService } from '../services';
import { HomeService } from '../services/home.service';
import toast, { Toaster } from 'react-hot-toast';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useInfiniteScroll } from '../hook/useInfiniteScroll';
import axios from 'axios';
import { TopBar } from '../components/TopBar';
import { TopBarHome } from '../components/topnavhome';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

interface Category {
  id: number;
  name: string;
}

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


interface HomeProps {
  searchResults: Post[] | null;
  isSearchActive: boolean;
  searchError: string | null;
  onCategorySelect: (categoryId: number | null) => void;
}

const gradients = [
  { name: "Ocean", value: "from-blue-500 to-cyan-500" },
  { name: "Sunset", value: "from-orange-500 to-pink-500" },
  { name: "Forest", value: "from-green-500 to-emerald-500" },
  { name: "Royal", value: "from-purple-500 to-indigo-500" },
  { name: "Spring", value: "from-green-400 to-yellow-400" },
  { name: "Aurora", value: "from-teal-400 to-purple-500" },
  { name: "Desert", value: "from-yellow-400 to-orange-500" },
  { name: "Default", value: "from-purple-500 via-blue-500 to-orange-500" },
];

const POSTS_PER_PAGE = 10;
export default function Home({ searchResults, isSearchActive, searchError,onCategorySelect }: HomeProps) {

  const { user } = useAuthStore();
  const { displayName, bio, avatarUrl, points, tier } = useProfileStore();
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);
  const navigate = useNavigate();
  
  const [newPost, setNewPost] = useState('');
 
  const [showMediaUploader, setShowMediaUploader] = useState<'image' | 'video' | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [postIds, setPostIds] = useState<number[]>([]);
  const [likes, setLikes] = useState([]);
  const [profile, setProfile] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [postTitle, setPostTitle] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [postCategoryId, setPostCategoryId] = useState<number | null>(null);
  const [postCategoryName, setPostCategoryName] = useState(""); 
  const [bannerColor, setBannerColor] = useState(gradients.find(g => g.name === "Default")?.value);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [page, setPage] = useState(1);
  const [postCategory, setPostCategory] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [tierInfo, setTierInfo] = useState(null);


  const [profileData, setProfileData] = useState<{ username: string } | null>(null);
  
   const [loading, setLoading] = useState(true);
   const displayPosts = isSearchActive ? searchResults || [] : posts;
  
  const fetchCategories = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      setError("Authentication required");
      return;
    }

    try {
      const response = await api.get("/auth/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        setCategories(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/signin");
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchCategories();
  }, []);


  
  const handleSearchResults = (results: Post[] | null, isActive: boolean, error?: string) => {
    setIsSearchActive(isActive);
    setSearchError(error);
    
    if (isActive) {
      if (results === null) {
        // Keep existing posts if results is null (error case)
        setFilteredPosts([]);
      } else {
        setFilteredPosts(results);
      }
    } else {
      setFilteredPosts(posts);
    }
  };

  
  const handleAuthError = (error: any) => {
    if (error.response?.status === 401) {
      console.log("Token expired! Logging out...");
      localStorage.removeItem("authToken");
  
      setTimeout(() => {
        navigate("/signin");
      }, 0);
    }
    setError("Error fetching data");
  };


  const fetchPosts = useCallback(async (pageNum: number) => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setError("Authentication required");
      setIsLoading(false);
      navigate("/signin");
      return;
    }

    try {
      setIsLoadingMore(true);
      setLoadError(false);

      const response = await api.get(`/auth/posts?page=${pageNum}&limit=${POSTS_PER_PAGE}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.data.posts) {
        const newPosts = response.data.posts.filter((post: Post) =>
          post.isNoMedia || post.isImage || post.isAudio ||
          (post.isVideo && post.isVideoApproved && !post.isVideoRejected)
        );

        if (pageNum === 1) {
          setPosts(newPosts);
          setFilteredPosts(newPosts);
        } else {
          setPosts(prev => [...prev, ...newPosts]);
          setFilteredPosts(prev => [...prev, ...newPosts]);
        }

        setHasMore(newPosts.length === POSTS_PER_PAGE);
      }
    } catch (error: any) {
      console.error("Error fetching posts:", error);
      setLoadError(true);

      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/signin");
      }
      setError(error.response?.data?.message || "Error fetching data");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [navigate]);

  

  

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  
  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      setPage(prev => prev + 1);
      fetchPosts(page + 1);
    }
  }, [fetchPosts, isLoadingMore, hasMore, page]);

  useInfiniteScroll(loadMore, isLoadingMore, hasMore);

  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

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
          const gradient = gradients.find(g => g.name === response.data.name);
          setBannerColor(gradient?.value || gradients.find(g => g.name === "Default")?.value);
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          navigate("/signin");
        }
        setBannerColor(gradients.find(g => g.name === "Default")?.value);
      }
    };

    fetchBanner();
  }, [navigate]);

  


  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("authToken");

      if (!userId || !token) {
        window.location.href = "/signin";
        return;
      }

      try {
        // Fetch user profile data
        const profileResponse = await api.get(`/auth/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfileData({ username: profileResponse.data.username , bio: profileResponse.data.bio,total_likes:profileResponse.data.total_likes});

        // Fetch user profile image
        const imageResponse = await api.get(`/auth/get-profile-image/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        });

        setProfileImage(URL.createObjectURL(imageResponse.data));
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          window.location.href = "/signin";
        }
      }
    };

    fetchProfile();
  }, []); 

 


  
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
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'audio') => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      setMediaUrl(URL.createObjectURL(file));
      setMediaType(type);
      setShowMediaUploader(null);
    }
  };

  const removeMedia = () => {
    setMediaUrl(null);
    setMediaType(null);
    setMediaFile(null);
  };
  

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken");
  
    if (!userId || !token) {
      toast.error("User is not logged in!");
      setIsSubmitting(false);
      return;
    }
  
    if (!postCategoryId || !postCategoryName) {
      toast.error("Please select a valid category");
      setIsSubmitting(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("title", postTitle);
    formData.append("category", postCategoryName);
    formData.append("content", newPost);
    formData.append("userId", userId);
  
    if (mediaFile) {
      formData.append("media", mediaFile);
    }
  
    try {
      const response = await api.post(
        `/auth/post/${userId}?category_id=${postCategoryId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
        toast.success("Post created successfully!");
  
        // Send notification
        const notificationData = {
          user_id: userId,
          category_id: postCategoryId,
          title: postTitle || "Untitled Post",
          content: newPost || "No content",
        };
  
        api.post("/auth/notifications/add", notificationData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }).catch((notifError) => {
          console.error("Error adding notification:", notifError);
        });
  
        // Reset form fields
        setPostTitle("");
        setNewPost("");
        setPostCategory("");
        setPostCategoryId(null);
        setPostCategoryName("");
        setMediaUrl(null);
        setMediaType(null);
        setMediaFile(null);
  
        // Refresh posts
        await fetchPosts(1);
      }
    } catch (error: any) {
      console.error("Error creating post:", error);
  
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/signin");
      }
  
      const errorMessage = error.response?.data?.detail || "Failed to create post!";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
// Update the handleCategoryClick function
const handleCategoryClick = async (category: { id: number; name: string }) => {
  console.log("Selected Category:", category);
  setSelectedCategory(category.name);
  onCategorySelect(category.id === 0 ? null : category.id);

  try {
    if (category.id === 0) {
      if (isSearchActive) {
        const searchInput = document.querySelector<HTMLInputElement>('input[placeholder="Search posts..."]');
        if (searchInput?.value) {
          const paramKey = searchInput.value.includes("@") ? "email" : "username";
          const token = localStorage.getItem("authToken");
          
          const response = await api.get(
            `/auth/search_posts?${paramKey}=${encodeURIComponent(searchInput.value)}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.data.posts) {
            setFilteredPosts(response.data.posts);
          }
        } else {
          setFilteredPosts(posts);
        }
      } else {
        setFilteredPosts(posts);
      }
    } else {
      if (isSearchActive) {
        const searchInput = document.querySelector<HTMLInputElement>('input[placeholder="Search posts..."]');
        if (searchInput?.value) {
          const token = localStorage.getItem("authToken");
          const paramKey = searchInput.value.includes("@") ? "email" : "username";
          
          const response = await api.get(
            `/auth/search_posts?${paramKey}=${encodeURIComponent(searchInput.value)}&category_id=${category.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.data.posts) {
            setFilteredPosts(response.data.posts);
          }
        }
      } else {
        const filtered = posts.filter(post => post.category_id === category.id);
        setFilteredPosts(filtered);
      }
    }
  } catch (error: any) {
    console.error("Error filtering posts:", error);
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      navigate("/signin");
    }
  }
};


  // const handleCategoryClick = async (category: { id: number; name: string }) => {
  //   console.log("Selected Category:", category);
  //   setSelectedCategory(category.name);
  
  //   try {
  //     if (category.id === 0) {
  //       // Show all posts
  //       setFilteredPosts(posts);
  //       // If there's an active search, re-trigger it without category filter
  //       if (isSearchActive) {
  //         onSearch(searchResults, true);
  //       }
  //     } else {
  //       if (isSearchActive) {
  //         // Re-trigger search with the selected category
  //         const token = localStorage.getItem("authToken");
  //         if (!token) {
  //           console.error("No auth token found");
  //           return;
  //         }
  
  //         try {
  //           const searchQuery = document.querySelector<HTMLInputElement>('input[placeholder="Search posts..."]')?.value;
  //           if (!searchQuery) return;
  
  //           const paramKey = searchQuery.includes("@") ? "email" : "username";
  //           const response = await api.get<SearchResponse>(
  //             `/auth/search_posts?${paramKey}=${encodeURIComponent(searchQuery)}&category_id=${category.id}`,
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //               },
  //             }
  //           );
  
  //           if (response.data.posts) {
  //             setFilteredPosts(response.data.posts);
  //             onSearch(response.data.posts, true);
  //           }
  //         } catch (error) {
  //           console.error("Error searching with category:", error);
  //         }
  //       } else {
  //         // Just filter existing posts by category
  //         const filtered = posts.filter(post => post.category_id === category.id);
  //         setFilteredPosts(filtered);
  //       }
  //     }
  //   } catch (error: any) {
  //     console.error("Error filtering posts:", error);
  //     if (error.response?.status === 401) {
  //       localStorage.removeItem("authToken");
  //       navigate("/signin");
  //     }
  //   }
  // };



// const handleCategoryClick = async (category: { id: number; name: string }) => {
//   console.log("Selected Category:", category);
//   setSelectedCategory(category.name);

//   try {
//     if (category.id === 0) {
//       // Show all posts
//       setFilteredPosts(posts);
//     } else {
//       // Filter posts by category
//       const filtered = posts.filter(post => post.category_id === category.id);
//       setFilteredPosts(filtered);
//     }
//   } catch (error: any) {
//     console.error("Error filtering posts:", error);
//     if (error.response?.status === 401) {
//       localStorage.removeItem("authToken");
//       navigate("/signin");
//     }
//   }
// };

// Update the posts display logic in the return statement
const postsToDisplay = isSearchActive ? searchResults || [] : 
                      selectedCategory !== 'All Categories' ? filteredPosts : 
                      posts;


 

  return (
    
    // <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
    <div className="max-w-screen-xl mx-auto px-2 sm:px-1 md:px-2 py-6 flex flex-col lg:flex-row gap-6">
      <Toaster />
      
      
      {/* Profile Section */}
      <div className="w-full lg:w-80 lg:flex-shrink-0 order-1 lg:order-none">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className={`h-24 lg:h-32 bg-gradient-to-r ${bannerColor}`}></div>
          
          <div className="relative px-4 pb-10">
            <div className="flex justify-center">
              <img
                src={profileImage || avatarUrl}
                alt="add Profile"
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-white -mt-10 lg:-mt-12 bg-white"
              />
            </div>
            <div className="text-center mt-2">
              <h2 className="text-xl font-semibold">
                {profileData?.username}
              </h2>
              <p className="text-gray-600 text-sm">
              Level {tierInfo?.level} {tierInfo?.tier_name}
                {/* Level {profileData?.level} {profileData?.tier} */}
              </p>
            </div>
            <p className="text-center text-gray-600 mt-3 text-sm">
              {profileData?.bio || "Share your story here! Tell others about yourself, your interests, and what you're passionate about."}
            </p>

            <div className="mt-4 px-4">
              <div className="flex justify-between text-sm mb-1">
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
              
              <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
                

<div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${tierInfo?.tier_color || 'from-blue-500 to-purple-500'}`}
                    style={{ width: `${profileData?.total_likes || 0}%` }} 
                  >
                    <div className="w-full h-full opacity-75 bg-[linear-gradient(110deg,rgba(255,255,255,0.48)_0.8%,rgba(255,255,255,0)_10%,rgba(255,255,255,0.1)_100%)]"></div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-1 text-center">
                  {tierInfo?.likes_needed_for_next_level > 0
                    ? `${tierInfo.likes_needed_for_next_level} more likes to next level`
                    : "Level Cap Achieved!"}
                  <br />
                  Total Likes: {profileData?.total_likes}
                </div>
              </div>

            </div>

            <div className="hidden lg:block mt-6 space-y-2">
              <Link to="/profile" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
                <UserIcon className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              
              <Link to="/settings" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>
            </div>

            <div className="hidden lg:block mt-6">
              <Link 
                to="/profile" 
                className="block text-center font-medium"
                style={{ color: themeColors.primary }}
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow max-w-2xl order-2 lg:order-none">
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-4 border-b border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900">Create Post</h4>
          </div>
          <form onSubmit={handlePostSubmit} className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="hidden sm:flex relative h-28 lg:h-32 justify-center items-center">
                <Avatar
                  src={avatarUrl}
                  seed={profileData?.username}
                  size="md"
                  tier={tier}
                  points={points}
                />
              </div>

              <div className="flex-1 space-y-4">
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Post Title"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
                />

                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:border-transparent min-h-[120px] text-gray-700"
                />

                {mediaUrl && (
                  <div className="relative">
                    {mediaType === 'image' ? (
                      <div className="relative">
                        <img 
                          src={mediaUrl} 
                          alt="image" 
                          className="w-full max-h-[200px] object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removeMedia}
                          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                        >
                          <Image className="w-4 h-4" />
                        </button>
                      </div>
                    ) : mediaType === 'video' ? (
                      <div className="relative">
                        <video 
                          src={mediaUrl} 
                          controls 
                          className="w-full max-h-[200px] rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removeMedia}
                          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                        >
                          <Video className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <audio 
                          src={mediaUrl} 
                          controls 
                          className="w-full rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removeMedia}
                          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                        >
                          <Music className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Category
                  </label>
                  <select
                    id="category"
                    value={postCategory}
                    onChange={(e) => {
                      const selectedCategory = categories.find((cat) => cat.name === e.target.value);
                      if (selectedCategory) {
                        setPostCategoryId(selectedCategory.id);
                        setPostCategoryName(selectedCategory.name);
                      } else {
                        setPostCategoryId(null);
                        setPostCategoryName("");
                      }
                      setPostCategory(e.target.value);
                    }}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                      <Image className="w-5 h-5" />
                      <span className="text-sm font-medium">Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleMediaUpload(e, 'image')}
                      />
                    </label>

                    <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                      <Video className="w-5 h-5" />
                      <span className="text-sm font-medium">Video</span>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => handleMediaUpload(e, 'video')}
                      />
                    </label>

                    <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                      <Music className="w-5 h-5" />
                      <span className="text-sm font-medium">Audio</span>
                      <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={(e) => handleMediaUpload(e, 'audio')}
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={(!newPost.trim() && !mediaUrl) || isSubmitting}
                    className="ml-auto text-white px-6 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                    <span className="hidden sm:inline">
                      {isSubmitting ? 'Sharing...' : 'Share'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading posts...</p>
        </div>
      ) : error || searchError ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-red-600">{error || searchError}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {postsToDisplay.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <p className="text-gray-600">
                {isSearchActive 
                  ? "No posts found matching your search."
                  : selectedCategory !== 'All Categories'
                  ? `No posts found in ${selectedCategory} category.`
                  : "No posts available."}
              </p>
            </div>
          ) : (
            postsToDisplay.map((post) => {
              // const userId = localStorage.getItem("userId");
              return (
                <PostCard 
                  key={post.id} 
                  post={post}
                  // currentUserId={userId}
                  // currentUserId={parseInt(localStorage.getItem("userId") || "")}
                />
              );
            })
          )}
        </div>
)}

     
      </div>

      {/* Categories Sidebar */}
      <div className="hidden lg:block w-80 flex-shrink-0 order-3 lg:order-none">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="space-y-2">
            <button
              onClick={() => handleCategoryClick({ id: 0, name: 'All Categories' })}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === 'All Categories' ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
              }`}
              style={{ backgroundColor: selectedCategory === 'All Categories' ? themeColors.primary : 'transparent' }}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  category.name === selectedCategory ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
                }`}
                style={{ backgroundColor: category.name === selectedCategory ? themeColors.primary : 'transparent' }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
