

// import React, { useState, useEffect, useRef } from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import { Image as ImageIcon, Video, FileAudio, AlertCircle, Heart, MessageCircle, User, Send, FileText, MoreVertical, Edit, Trash2, Upload } from 'lucide-react';
// import { CommentComponent } from './commentComponent';
// import toast, { Toaster } from 'react-hot-toast';
// import { format } from "date-fns";
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface PostItemProps {
//   post: {
//     id: number;
//     title: string;
//     category: string;
//     content: string;
//     media_path?: string;
//     isVideo: boolean;
//     isImage: boolean;
//     isAudio: boolean;
//     isNoMedia: boolean;
//     isVideoApproved: boolean;
//     isVideoRejected: boolean;
//     is_public: boolean;
//     created_at: string;
//     updated_at:string;
//     user_id: number;
//   };
 
//   onPostDeleted?: () => void;
//   onPostUpdated?: (updatedPost: any) => void;
// }

// export const PostItem: React.FC<PostItemProps> = ({ post: initialPost, onPostDeleted, onPostUpdated }) => {
//   // Change to use local post state that can be updated
//   const [post, setPost] = useState(initialPost);
//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
//   const [showComments, setShowComments] = useState(false);
//   const [comments, setComments] = useState<any[]>([]);
//   const [newComment, setNewComment] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showOptions, setShowOptions] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedContent, setEditedContent] = useState(post.content);
//   const [editedTitle, setEditedTitle] = useState(post.title);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [newMediaFile, setNewMediaFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const optionsRef = useRef<HTMLDivElement>(null);

//   const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

//   const currentUserId = localStorage.getItem('userId');
//   const isOwner = currentUserId === String(post.user_id);

//   // Update local state when prop changes
//   useEffect(() => {
//     setPost(initialPost);
//     setEditedContent(initialPost.content);
//     setEditedTitle(initialPost.title);
//   }, [initialPost]);



//   // Fetch categories on component mount
// useEffect(() => {
//   const fetchCategories = async () => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       window.location.href = '/signin';
//       return;
//     }

//     try {
//       const response = await api.get('/auth/categories', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.data && Array.isArray(response.data)) {
//         setCategories(response.data);
//         setSelectedCategory(response.data[0]?.id || null);
//       }
//     } catch (error) {
//       if (error.response?.status === 401) {
//         console.log("Token expired! Logging out...");
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("userId");
//         setTimeout(() => {
//           window.location.href = "/signin";
//         }, 0);
//       } else {
//         console.error('Failed to fetch categories:', error);
//       }
//     }
//   };

//   fetchCategories();
// }, []);

// const handleUpdatePost = async () => {
//   if (!editedContent.trim() || !editedTitle.trim()) {
//     toast.error('Title and content cannot be empty');
//     return;
//   }

//   setIsSubmitting(true);

//   try {
//     const token = localStorage.getItem('authToken');

//     // Find the selected category's ID before sending the request
//     const categoryObj = categories.find(cat => cat.name === post.category);
//     const categoryId = categoryObj ? categoryObj.id : selectedCategory;

//     if (!categoryId) {
//       toast.error('Invalid category selection');
//       return;
//     }

//     const requestData = {
//       post_id: post.id,
//       title: editedTitle,
//       content: editedContent,
//       category_id: categoryId, // Use category ID from the array
//     };

//     const response = await api.put('/post_content/post/update', requestData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.status === 200) {
//       const updatedPost = {
//         ...post,
//         title: editedTitle,
//         content: editedContent,
//         category: categoryObj?.name || post.category, // Update category name if changed
//         ...response.data,
//       };

//       setPost(updatedPost);
//       setIsEditing(false);
//       toast.success('Post updated successfully');

//       if (onPostUpdated) {
//         onPostUpdated(updatedPost);
//       }
//     }
//   } catch (error) {
//     console.error('Error updating post:', error);
//     toast.error('Failed to update post');
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   // const handleUpdatePost = async () => {
//   //   if (!editedContent.trim() || !editedTitle.trim()) {
//   //     toast.error('Title and content cannot be empty');
//   //     return;
//   //   }
  
//   //   setIsSubmitting(true);
  
//   //   try {
//   //     const token = localStorage.getItem('authToken');
//   //     const requestData = {
//   //       post_id: post.id,
//   //       title: editedTitle,
//   //       content: editedContent,
//   //       category_id: post.category,
//   //     };
  
//   //     const response = await api.put('/post_content/post/update', requestData, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //         'Content-Type': 'application/json',
//   //       },
//   //     });
  
//   //     if (response.status === 200) {
//   //       // Update local state with new data
//   //       const updatedPost = {
//   //         ...post,
//   //         title: editedTitle,
//   //         content: editedContent,
//   //         ...response.data // Merge any additional updates from the server
//   //       };
        
//   //       setPost(updatedPost);
//   //       setIsEditing(false);
//   //       toast.success('Post updated successfully');
  
//   //       // Notify parent component
//   //       if (onPostUpdated) {
//   //         onPostUpdated(updatedPost);
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.error('Error updating post:', error);
//   //     toast.error('Failed to update post');
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
//         setShowOptions(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const fetchLikes = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         const userId = localStorage.getItem('userId');
  
//         if (!userId || !token) return;
  
//         const response = await api.get(`/auth/posts/${post.id}/likes/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
  
//         setLikeCount(response.data.likeCount);
//         setIsLiked(response.data.liked);
//       } catch (error) {
//         console.error('Error fetching likes:', error);
//       }
//     };
  
//     const fetchComments = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
  
//         if (!token) return;
  
//         const response = await api.get(`/auth/posts/${post.id}/comments`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
  
//         setComments(response.data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };
  
//     fetchLikes();
//     fetchComments();
//   }, [post.id]);

//   const handleToggleLike = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const userId = localStorage.getItem('userId');
  
//       const response = await api.post(
//         `/auth/posts/${post.id}/likes/toggle`,
//         { user_id: userId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
  
//       setIsLiked(response.data.liked);
//       setLikeCount(response.data.likeCount);
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     }
//   };

//   const handleDeletePost = async () => {
//     const confirmToast = toast((t) => (
//       <div className="flex flex-col gap-4 p-3">
//         <p className="text-sm font-medium text-gray-900">
//           Are you sure you want to delete this post? This action cannot be undone.
//         </p>
//         <div className="flex justify-end gap-2">
//           <button
//             className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//             onClick={() => toast.dismiss(t.id)}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
//             onClick={async () => {
//               toast.dismiss(t.id);
//               setIsDeleting(true);
              
//               try {
//                 const token = localStorage.getItem('authToken');
//                 const response = await api.delete(`/post_content/post/${post.id}`, {
//                   headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.status === 200 || response.status === 204) {
//                   toast.success('Post deleted successfully');
//                   // Call the callback after successful deletion
//                   onPostDeleted();
//                 }
//               } catch (error) {
//                 console.error('Error deleting post:', error);
//                 toast.error('Failed to delete post');
//               } finally {
//                 setIsDeleting(false);
//                 setShowOptions(false);
//               }
//             }}
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     ), {
//       duration: 6000,
//       position: 'top-right',
//     });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const maxSize = 100 * 1024 * 1024; // 100MB limit

//       if (file.size > maxSize) {
//         toast.error('File size must be less than 100MB', {
//           position: 'top-right',
//         });
//         return;
//       }

//       setNewMediaFile(file);
//     }
//   };

//   const handleSubmitComment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;
  
//     setIsSubmitting(true);
  
//     try {
//       const token = localStorage.getItem('authToken');
//       const userId = localStorage.getItem('userId');
      
//       if (!userId || !token) return;

//       const response = await api.post(
//         `/auth/posts/${post.id}/comments`,
//         { 
//           text: newComment,
//           user_id: userId 
//         },
//         {
//           headers: { 
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       setComments(prev => [...prev, response.data]);
//       setNewComment('');
//     } catch (error) {
//       console.error('Failed to submit comment:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getStatusBadge = () => {
//     if (post.isVideo) {
//       if (post.isVideoRejected) {
//         return (
//           <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
//             Rejected
//           </span>
//         );
//       }
//       if (!post.isVideoApproved) {
//         return (
//           <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
//             Pending
//           </span>
//         );
//       }
//     }
//     return null;
//   };

//   const getMediaIcon = () => {
//     if (post.isVideo) return <Video className="w-5 h-5 text-blue-500" />;
//     if (post.isImage) return <ImageIcon className="w-5 h-5 text-green-500" />;
//     if (post.isAudio) return <FileAudio className="w-5 h-5 text-purple-500" />;
//     if (post.isNoMedia) return <FileText className="w-5 h-5 text-gray-500" />;
//     return <AlertCircle className="w-5 h-5 text-gray-500" />;
//   };




  

  
//  const getMediaPreview = () => {
//     if (newMediaFile) {
//       const previewUrl = URL.createObjectURL(newMediaFile);
//       if (newMediaFile.type.startsWith('image/')) {
//         return (
//           <img
//             src={previewUrl}
//             alt="Preview"
//             className="w-full h-full object-contain max-h-[400px]"
//             onLoad={() => URL.revokeObjectURL(previewUrl)}
//           />
//         );
//       } else if (newMediaFile.type.startsWith('video/')) {
//         return (
//           <video
//             src={previewUrl}
//             controls
//             className="w-full h-full object-contain bg-black max-h-[400px]"
//             onLoadedData={() => URL.revokeObjectURL(previewUrl)}
//           />
//         );
//       }
//     }
    
//     if (post.media_path && post.isImage) {
//       return (
//         <img
//           src={post.media_path}
//           alt={post.title}
//           className="w-full h-full object-contain max-h-[400px]"
//           loading="lazy"
//         />
//       );
//     }
    
//     if (post.media_path && post.isVideo) {
//       // Check if it's a Vimeo URL
//       if (post.media_path.includes('vimeo.com')) {
//         return (
//           <iframe
//             src={post.media_path}
//             className="w-full aspect-video"
//             allow="autoplay; fullscreen; picture-in-picture"
//             allowFullScreen
//           />
//         );
//       }
//       // For regular video files
//       return (
//         <video
//           src={post.media_path}
//           controls
//           className="w-full h-full object-contain bg-black max-h-[400px]"
//         />
//       );
//     }
    
//     if (post.media_path && post.isAudio) {
//       return (
//         <div className="mt-4">
//           <audio src={post.media_path} controls className="w-full" />
//         </div>
//       );
//     }
    
//     return null;
//   };
  

//   // const getMediaPreview = () => {
//   //   if (newMediaFile) {
//   //     const previewUrl = URL.createObjectURL(newMediaFile);
//   //     if (newMediaFile.type.startsWith('image/')) {
//   //       return (
//   //         <img
//   //           src={previewUrl}
//   //           alt="Preview"
//   //           className="w-full h-full object-contain max-h-[400px]"
//   //           onLoad={() => URL.revokeObjectURL(previewUrl)}
//   //         />
//   //       );
//   //     } else if (newMediaFile.type.startsWith('video/')) {
//   //       return (
//   //         <video
//   //           src={previewUrl}
//   //           controls
//   //           className="w-full h-full object-contain bg-black max-h-[400px]"
//   //           onLoadedData={() => URL.revokeObjectURL(previewUrl)}
//   //         />
//   //       );
//   //     }
//   //   }
    
//   //   if (post.media_path && post.isImage) {
//   //     return (
//   //       <img
//   //         src={post.media_path}
//   //         alt={post.title}
//   //         className="w-full h-full object-contain max-h-[400px]"
//   //         loading="lazy"
//   //       />
//   //     );
//   //   }
    
//   //   if (post.media_path && post.isVideo) {
//   //     // Check if it's a Vimeo URL
//   //     if (post.media_path.includes('vimeo.com')) {
//   //       return (
//   //         <iframe
//   //           src={post.media_path}
//   //           className="w-full aspect-video"
//   //           allow="autoplay; fullscreen; picture-in-picture"
//   //           allowFullScreen
//   //         />
//   //       );
//   //     }
//   //     // For regular video files
//   //     return (
//   //       <video
//   //         src={post.media_path}
//   //         controls
//   //         className="w-full h-full object-contain bg-black max-h-[400px]"
//   //       />
//   //     );
//   //   }
    
//   //   if (post.media_path && post.isAudio) {
//   //     return (
//   //       <div className="mt-4">
//   //         <audio src={post.media_path} controls className="w-full" />
//   //       </div>
//   //     );
//   //   }
    
//   //   return null;
//   // };
  

//   // const getMediaPreview = () => {
//   //   if (newMediaFile) {
//   //     const previewUrl = URL.createObjectURL(newMediaFile);
//   //     if (newMediaFile.type.startsWith('image/')) {
//   //       return (
//   //         <img
//   //           src={previewUrl}
//   //           alt="Preview"
//   //           className="w-full h-full object-contain max-h-[400px]"
//   //           onLoad={() => URL.revokeObjectURL(previewUrl)}
//   //         />
//   //       );
//   //     } else if (newMediaFile.type.startsWith('video/')) {
//   //       return (
//   //         <video
//   //           src={previewUrl}
//   //           controls
//   //           className="w-full h-full object-contain bg-black max-h-[400px]"
//   //           onLoadedData={() => URL.revokeObjectURL(previewUrl)}
//   //         />
//   //       );
//   //     }
//   //   }
    
//   //   if (post.media_path && (post.isImage || post.isVideo)) {
//   //     return post.isImage ? (
//   //       <img
//   //         src={post.media_path}
//   //         alt={post.title}
//   //         className="w-full h-full object-contain max-h-[400px]"
//   //         loading="lazy"
//   //       />
//   //     ) : (
//   //       <video
//   //         src={post.media_path}
//   //         controls
//   //         className="w-full h-full object-contain bg-black max-h-[400px]"
//   //       />
//   //     );
//   //   }
    
//   //   return null;
//   // };

//   return (
//     <article className="bg-white rounded-xl shadow-lg overflow-hidden">
//       <div className="p-6">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex-grow">
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={editedTitle}
//                 onChange={(e) => setEditedTitle(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl font-semibold"
//               />
//             ) : (
//               <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
//             )}
//             <p className="text-sm text-gray-500 mt-1">
//               {/* <time dateTime={post.created_at} className="mr-2">
//                 {format(new Date(post.created_at), "MMM d, h:mm a")}
//               </time> */}
//               <time dateTime={post.updated_at} className="mr-2">
//                 {format(new Date(post.updated_at), "MMM d, h:mm a")}
//               </time>
//             </p>
//           </div>
//           <div className="flex items-center gap-3">
//             {getMediaIcon()}
//             {getStatusBadge()}
//             {isOwner && (
//               <div className="relative" ref={optionsRef}>
//                 <button
//                   onClick={() => setShowOptions(!showOptions)}
//                   className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <MoreVertical className="w-5 h-5 text-gray-500" />
//                 </button>
//                 {showOptions && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//                     <button
//                       onClick={() => {
//                         setIsEditing(true);
//                         setShowOptions(false);
//                       }}
//                       className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
//                       disabled={isDeleting}
//                     >
//                       <Edit className="w-4 h-4" />
//                       Edit Post
//                     </button>
//                     <button
//                       onClick={handleDeletePost}
//                       className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
//                       disabled={isDeleting}
//                     >
//                       <Trash2 className="w-4 h-4" />
//                       {isDeleting ? 'Deleting...' : 'Delete Post'}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {isEditing ? (
//           <div className="mb-4 space-y-4">
//             <textarea
//               value={editedContent}
//               onChange={(e) => setEditedContent(e.target.value)}
//               className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               rows={4}
//             />
            
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
//               >
//                 <Upload className="w-4 h-4" />
//                 {newMediaFile ? 'Change Media' : 'Upload Media'}
//               </button>
//               {newMediaFile && (
//                 <span className="text-sm text-gray-600">
//                   Selected: {newMediaFile.name}
//                 </span>
//               )}
//             </div>
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*,video/*"
//               onChange={handleFileChange}
//               className="hidden"
//             />
            
//             <div className="flex gap-2 mt-4">
//               <button
//                 onClick={handleUpdatePost}
//                 disabled={isSubmitting}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
//               >
//                 {isSubmitting ? 'Saving...' : 'Save Changes'}
//               </button>
//               <button
//                 onClick={() => {
//                   setIsEditing(false);
//                   setEditedContent(post.content);
//                   setEditedTitle(post.title);
//                   setNewMediaFile(null);
//                 }}
//                 className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-700 mb-4">{post.content}</p>
//         )}

//         {(post.media_path || newMediaFile) && (
//           <div className="relative rounded-lg overflow-hidden bg-gray-100 max-h-[400px]">
//             {getMediaPreview()}
//           </div>
//         )}

//         {post.media_path && post.isAudio && (
//           <div className="mt-4">
//             <audio src={post.media_path} controls className="w-full" />
//           </div>
//         )}
//       </div>

//       <div className="px-6 py-4 border-t border-gray-100">
//         <div className="flex items-center gap-6">
//           <button 
//             className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : 'text-gray-600'} transition-colors`}
//             onClick={handleToggleLike}
//           >
//             <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
//             <span className="text-sm font-medium">
//               {isLiked ? 'Unlike' : 'Like'} ({likeCount})
//             </span>
//           </button>
//           <button 
//             className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
//             onClick={() => setShowComments(!showComments)}
//           >
//             <MessageCircle className="w-5 h-5" />
//             <span className="text-sm font-medium">
//               Comment {comments.length > 0 && `(${comments.length})`}
//             </span>
//           </button>
//         </div>
//       </div>

//       {showComments && (
//         <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
//           <form onSubmit={handleSubmitComment} className="mb-6">
//             <div className="flex gap-3">
//               <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
//                 <User className="w-4 h-4 text-gray-500" />
//               </div>
//               <div className="flex-grow">
//                 <textarea
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   placeholder="Write a comment..."
//                   className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                   rows={2}
//                 />
//                 <button
//                   type="submit"
//                   disabled={!newComment.trim() || isSubmitting}
//                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm hover:bg-blue-600 transition-colors"
//                 >
//                   <Send className="w-4 h-4" />
//                   {isSubmitting ? 'Sending...' : 'Post Comment'}
//                 </button>
//               </div>
//             </div>
//           </form>

//           <div className="space-y-6">
//             {comments.map((comment) => (
//               <CommentComponent 
//                 key={comment.id} 
//                 comment={comment}
//               />
//             ))}

//             {comments.length === 0 && (
//               <p className="text-center text-gray-500 text-sm py-4">
//                 No comments yet. Be the first to comment!
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//     </article>
//   );
// };

// export default PostItem;






// import React, { useState, useEffect, useRef } from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import { Image as ImageIcon, Video, FileAudio, AlertCircle, Heart, MessageCircle, User, Send, FileText, MoreVertical, Edit, Trash2, Upload } from 'lucide-react';
// import { CommentComponent } from './commentComponent';
// import toast, { Toaster } from 'react-hot-toast';
// import { format } from "date-fns";
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });
// interface Post {
//   id: number;
//   title: string;
//   content: string;
//   category: string;
//   media_path?: string;
//   isVideo: boolean;
//   isImage: boolean;
//   isAudio: boolean;
//   isNoMedia: boolean;
//   isVideoApproved: boolean;
//   isVideoRejected: boolean;
//   is_public: boolean;
//   created_at: string;
//   updated_at: string;
//   user_id: number;
// }

// interface PostItemProps {
//   post: {
//     id: number;
//     title: string;
//     category: string;
//     content: string;
//     media_path?: string;
//     isVideo: boolean;
//     isImage: boolean;
//     isAudio: boolean;
//     isNoMedia: boolean;
//     isVideoApproved: boolean;
//     isVideoRejected: boolean;
//     is_public: boolean;
//     created_at: string;
//     updated_at:string;
//     user_id: number;
//   };
 
//   onPostDeleted?: () => void;
//   onPostUpdated?: (updatedPost: any) => void;
// }

// export const PostItem: React.FC<PostItemProps> = ({ post: initialPost, onPostDeleted, onPostUpdated }) => {
//   // Change to use local post state that can be updated
//   const [post, setPost] = useState(initialPost);
//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
//   const [showComments, setShowComments] = useState(false);
//   const [comments, setComments] = useState<any[]>([]);
//   const [newComment, setNewComment] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showOptions, setShowOptions] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedContent, setEditedContent] = useState(post.content);
//   const [editedTitle, setEditedTitle] = useState(post.title);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [newMediaFile, setNewMediaFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const optionsRef = useRef<HTMLDivElement>(null);

//   const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

//   const currentUserId = localStorage.getItem('userId');
//   const isOwner = currentUserId === String(post.user_id);

//   // Update local state when prop changes
//   useEffect(() => {
//     setPost(initialPost);
//     setEditedContent(initialPost.content);
//     setEditedTitle(initialPost.title);
//   }, [initialPost]);



//   // Fetch categories on component mount
// useEffect(() => {
//   const fetchCategories = async () => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       window.location.href = '/signin';
//       return;
//     }

//     try {
//       const response = await api.get('/auth/categories', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.data && Array.isArray(response.data)) {
//         setCategories(response.data);
//         setSelectedCategory(response.data[0]?.id || null);
//       }
//     } catch (error) {
//       if (error.response?.status === 401) {
//         console.log("Token expired! Logging out...");
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("userId");
//         setTimeout(() => {
//           window.location.href = "/signin";
//         }, 0);
//       } else {
//         console.error('Failed to fetch categories:', error);
//       }
//     }
//   };

//   fetchCategories();
// }, []);

// const handleUpdatePost = async () => {
//   if (!editedContent.trim() || !editedTitle.trim()) {
//     toast.error('Title and content cannot be empty');
//     return;
//   }

//   setIsSubmitting(true);

//   try {
//     const token = localStorage.getItem('authToken');

//     // Find the selected category's ID before sending the request
//     const categoryObj = categories.find(cat => cat.name === post.category);
//     const categoryId = categoryObj ? categoryObj.id : selectedCategory;

//     if (!categoryId) {
//       toast.error('Invalid category selection');
//       return;
//     }

//     const requestData = {
//       post_id: post.id,
//       title: editedTitle,
//       content: editedContent,
//       category_id: categoryId, // Use category ID from the array
//     };

//     const response = await api.put('/post_content/post/update', requestData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.status === 200) {
//       const updatedPost = {
//         ...post,
//         title: editedTitle,
//         content: editedContent,
//         category: categoryObj?.name || post.category, // Update category name if changed
//         ...response.data,
//       };

//       setPost(updatedPost);
//       setIsEditing(false);
//       toast.success('Post updated successfully');

//       if (onPostUpdated) {
//         onPostUpdated(updatedPost);
//       }
//     }
//   } catch (error) {
//     console.error('Error updating post:', error);
//     toast.error('Failed to update post');
//   } finally {
//     setIsSubmitting(false);
//   }
// };


//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
//         setShowOptions(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const fetchLikes = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         const userId = localStorage.getItem('userId');
  
//         if (!userId || !token) return;
  
//         const response = await api.get(`/auth/posts/${post.id}/likes/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
  
//         setLikeCount(response.data.likeCount);
//         setIsLiked(response.data.liked);
//       } catch (error) {
//         console.error('Error fetching likes:', error);
//       }
//     };
  
//     const fetchComments = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
  
//         if (!token) return;
  
//         const response = await api.get(`/auth/posts/${post.id}/comments`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
  
//         setComments(response.data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };
  
//     fetchLikes();
//     fetchComments();
//   }, [post.id]);

//   const handleToggleLike = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const userId = localStorage.getItem('userId');
  
//       const response = await api.post(
//         `/auth/posts/${post.id}/likes/toggle`,
//         { user_id: userId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
  
//       setIsLiked(response.data.liked);
//       setLikeCount(response.data.likeCount);
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     }
//   };

//   const handleDeletePost = async () => {
//     const confirmToast = toast((t) => (
//       <div className="flex flex-col gap-4 p-3">
//         <p className="text-sm font-medium text-gray-900">
//           Are you sure you want to delete this post? This action cannot be undone.
//         </p>
//         <div className="flex justify-end gap-2">
//           <button
//             className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//             onClick={() => toast.dismiss(t.id)}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
//             onClick={async () => {
//               toast.dismiss(t.id);
//               setIsDeleting(true);
              
//               try {
//                 const token = localStorage.getItem('authToken');
//                 const response = await api.delete(`/post_content/post/${post.id}`, {
//                   headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.status === 200 || response.status === 204) {
//                   toast.success('Post deleted successfully');
//                   // Call the callback after successful deletion
//                   onPostDeleted();
//                 }
//               } catch (error) {
//                 console.error('Error deleting post:', error);
//                 toast.error('Failed to delete post');
//               } finally {
//                 setIsDeleting(false);
//                 setShowOptions(false);
//               }
//             }}
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     ), {
//       duration: 6000,
//       position: 'top-right',
//     });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const maxSize = 100 * 1024 * 1024; // 100MB limit

//       if (file.size > maxSize) {
//         toast.error('File size must be less than 100MB', {
//           position: 'top-right',
//         });
//         return;
//       }

//       setNewMediaFile(file);
//     }
//   };

//   const handleSubmitComment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;
  
//     setIsSubmitting(true);
  
//     try {
//       const token = localStorage.getItem('authToken');
//       const userId = localStorage.getItem('userId');
      
//       if (!userId || !token) return;

//       const response = await api.post(
//         `/auth/posts/${post.id}/comments`,
//         { 
//           text: newComment,
//           user_id: userId 
//         },
//         {
//           headers: { 
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       setComments(prev => [...prev, response.data]);
//       setNewComment('');
//     } catch (error) {
//       console.error('Failed to submit comment:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getStatusBadge = () => {
//     if (post.isVideo) {
//       if (post.isVideoRejected) {
//         return (
//           <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
//             Rejected
//           </span>
//         );
//       }
//       if (!post.isVideoApproved) {
//         return (
//           <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
//             Pending
//           </span>
//         );
//       }
//     }
//     return null;
//   };

//   const getMediaIcon = () => {
//     if (post.isVideo) return <Video className="w-5 h-5 text-blue-500" />;
//     if (post.isImage) return <ImageIcon className="w-5 h-5 text-green-500" />;
//     if (post.isAudio) return <FileAudio className="w-5 h-5 text-purple-500" />;
//     if (post.isNoMedia) return <FileText className="w-5 h-5 text-gray-500" />;
//     return <AlertCircle className="w-5 h-5 text-gray-500" />;
//   };




  

  
//  const getMediaPreview = () => {
//     if (newMediaFile) {
//       const previewUrl = URL.createObjectURL(newMediaFile);
//       if (newMediaFile.type.startsWith('image/')) {
//         return (
//           <img
//             src={previewUrl}
//             alt="Preview"
//             className="w-full h-full object-contain max-h-[400px]"
//             onLoad={() => URL.revokeObjectURL(previewUrl)}
//           />
//         );
//       } else if (newMediaFile.type.startsWith('video/')) {
//         return (
//           <video
//             src={previewUrl}
//             controls
//             className="w-full h-full object-contain bg-black max-h-[400px]"
//             onLoadedData={() => URL.revokeObjectURL(previewUrl)}
//           />
//         );
//       }
//     }
    
//     if (post.media_path && post.isImage) {
//       return (
//         <img
//           src={post.media_path}
//           alt={post.title}
//           className="w-full h-full object-contain max-h-[400px]"
//           loading="lazy"
//         />
//       );
//     }
    
//     if (post.media_path && post.isVideo) {
//       // Check if it's a Vimeo URL
//       if (post.media_path.includes('vimeo.com')) {
//         return (
//           <iframe
//             src={post.media_path}
//             className="w-full aspect-video"
//             allow="autoplay; fullscreen; picture-in-picture"
//             allowFullScreen
//           />
//         );
//       }
//       // For regular video files
//       return (
//         <video
//           src={post.media_path}
//           controls
//           className="w-full h-full object-contain bg-black max-h-[400px]"
//         />
//       );
//     }
    
//     if (post.media_path && post.isAudio) {
//       return (
//         <div className="mt-4">
//           <audio src={post.media_path} controls className="w-full" />
//         </div>
//       );
//     }
    
//     return null;
//   };
  

  
//   return (
//     <article className="bg-white rounded-xl shadow-lg overflow-hidden">
//       <div className="p-6">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex-grow">
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={editedTitle}
//                 onChange={(e) => setEditedTitle(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl font-semibold"
//               />
//             ) : (
//               <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
//             )}
//             <p className="text-sm text-gray-500 mt-1">
//               {/* <time dateTime={post.created_at} className="mr-2">
//                 {format(new Date(post.created_at), "MMM d, h:mm a")}
//               </time> */}
//               <time dateTime={post.updated_at} className="mr-2">
//                 {format(new Date(post.updated_at), "MMM d, h:mm a")}
//               </time>
//             </p>
//           </div>
//           <div className="flex items-center gap-3">
//             {getMediaIcon()}
//             {getStatusBadge()}
//             {isOwner && (
//               <div className="relative" ref={optionsRef}>
//                 <button
//                   onClick={() => setShowOptions(!showOptions)}
//                   className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <MoreVertical className="w-5 h-5 text-gray-500" />
//                 </button>
//                 {showOptions && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//                     <button
//                       onClick={() => {
//                         setIsEditing(true);
//                         setShowOptions(false);
//                       }}
//                       className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
//                       disabled={isDeleting}
//                     >
//                       <Edit className="w-4 h-4" />
//                       Edit Post
//                     </button>
//                     <button
//                       onClick={handleDeletePost}
//                       className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
//                       disabled={isDeleting}
//                     >
//                       <Trash2 className="w-4 h-4" />
//                       {isDeleting ? 'Deleting...' : 'Delete Post'}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {isEditing ? (
//           <div className="mb-4 space-y-4">
//             <textarea
//               value={editedContent}
//               onChange={(e) => setEditedContent(e.target.value)}
//               className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               rows={4}
//             />
            
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
//               >
//                 <Upload className="w-4 h-4" />
//                 {newMediaFile ? 'Change Media' : 'Upload Media'}
//               </button>
//               {newMediaFile && (
//                 <span className="text-sm text-gray-600">
//                   Selected: {newMediaFile.name}
//                 </span>
//               )}
//             </div>
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*,video/*"
//               onChange={handleFileChange}
//               className="hidden"
//             />
            
//             <div className="flex gap-2 mt-4">
//               <button
//                 onClick={handleUpdatePost}
//                 disabled={isSubmitting}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
//               >
//                 {isSubmitting ? 'Saving...' : 'Save Changes'}
//               </button>
//               <button
//                 onClick={() => {
//                   setIsEditing(false);
//                   setEditedContent(post.content);
//                   setEditedTitle(post.title);
//                   setNewMediaFile(null);
//                 }}
//                 className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-700 mb-4">{post.content}</p>
//         )}

//         {(post.media_path || newMediaFile) && (
//           <div className="relative rounded-lg overflow-hidden bg-gray-100 max-h-[400px]">
//             {getMediaPreview()}
//           </div>
//         )}

//         {post.media_path && post.isAudio && (
//           <div className="mt-4">
//             <audio src={post.media_path} controls className="w-full" />
//           </div>
//         )}
//       </div>

//       <div className="px-6 py-4 border-t border-gray-100">
//         <div className="flex items-center gap-6">
//           <button 
//             className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : 'text-gray-600'} transition-colors`}
//             onClick={handleToggleLike}
//           >
//             <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
//             <span className="text-sm font-medium">
//               {isLiked ? 'Unlike' : 'Like'} ({likeCount})
//             </span>
//           </button>
//           <button 
//             className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
//             onClick={() => setShowComments(!showComments)}
//           >
//             <MessageCircle className="w-5 h-5" />
//             <span className="text-sm font-medium">
//               Comment {comments.length > 0 && `(${comments.length})`}
//             </span>
//           </button>
//         </div>
//       </div>

//       {showComments && (
//         <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
//           <form onSubmit={handleSubmitComment} className="mb-6">
//             <div className="flex gap-3">
//               <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
//                 <User className="w-4 h-4 text-gray-500" />
//               </div>
//               <div className="flex-grow">
//                 <textarea
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   placeholder="Write a comment..."
//                   className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                   rows={2}
//                 />
//                 <button
//                   type="submit"
//                   disabled={!newComment.trim() || isSubmitting}
//                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm hover:bg-blue-600 transition-colors"
//                 >
//                   <Send className="w-4 h-4" />
//                   {isSubmitting ? 'Sending...' : 'Post Comment'}
//                 </button>
//               </div>
//             </div>
//           </form>

//           <div className="space-y-6">
//             {comments.map((comment) => (
//               <CommentComponent 
//                 key={comment.id} 
//                 comment={comment}
//               />
//             ))}

//             {comments.length === 0 && (
//               <p className="text-center text-gray-500 text-sm py-4">
//                 No comments yet. Be the first to comment!
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//     </article>
//   );
// };

// export default PostItem;


import React, { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Image as ImageIcon, Video, FileAudio, AlertCircle, Heart, MessageCircle, User, Send, FileText, MoreVertical, Edit, Trash2, Upload ,Save,X} from 'lucide-react';
import { CommentComponent } from './commentComponent';
import toast, { Toaster } from 'react-hot-toast';
import { format } from "date-fns";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  media_path?: string;
  isVideo: boolean;
  isImage: boolean;
  isAudio: boolean;
  isNoMedia: boolean;
  isVideoApproved: boolean;
  isVideoRejected: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  user_id: number;
  category_id: number; 
}

interface PostItemProps {
  post: Post;
  onPostDeleted?: () => void;
  onPostUpdated?: (updatedPost: any) => void;
}

export const PostItem: React.FC<PostItemProps> = ({ post: initialPost, onPostDeleted, onPostUpdated }) => {
  const [post, setPost] = useState(initialPost);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newMediaFile, setNewMediaFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const currentUserId = localStorage.getItem('userId');
  const isOwner = currentUserId === String(post.user_id);

  useEffect(() => {
    setPost(initialPost);
    setEditedContent(initialPost.content);
    setEditedTitle(initialPost.title);
  }, [initialPost]);

  const getMediaPreview = () => {
    if (newMediaFile) {
      const previewUrl = URL.createObjectURL(newMediaFile);
      if (newMediaFile.type.startsWith('image/')) {
        return (
          <div className="relative w-full">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-contain max-h-[400px]"
              onLoad={() => URL.revokeObjectURL(previewUrl)}
            />
          </div>
        );
      } else if (newMediaFile.type.startsWith('video/')) {
        return (
          <div className="relative w-full">
            <video
              src={previewUrl}
              controls
              className="w-full h-full object-contain bg-black max-h-[400px]"
              onLoadedData={() => URL.revokeObjectURL(previewUrl)}
            />
          </div>
        );
      }
    }
    
    if (post.media_path && post.isImage) {
      return (
        <div className="relative w-full">
          <img
            src={post.media_path}
            alt={post.title}
            className="w-full h-full object-contain max-h-[400px]"
            loading="lazy"
          />
        </div>
      );
    }
    
    if (post.media_path && post.isVideo) {
      return (
        <div className="relative w-full">
          {post.media_path.includes('vimeo.com') ? (
            <iframe
              src={post.media_path}
              className="w-full aspect-video"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={post.media_path}
              controls
              className="w-full h-full object-contain bg-black max-h-[400px]"
            />
          )}
        </div>
      );
    }
    
    if (post.media_path && post.isAudio) {
      return (
        <div className="mt-4 w-full">
          <audio src={post.media_path} controls className="w-full" />
        </div>
      );
    }
    
    return null;
  };

  const handleToggleLike = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
  
      const response = await api.post(
        `/auth/posts/${post.id}/likes/toggle`,
        { user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      setIsLiked(response.data.liked);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDeletePost = async () => {
    const confirmToast = toast((t) => (
      <div className="flex flex-col gap-4 p-3">
        <p className="text-sm font-medium text-gray-900">
          Are you sure you want to delete this post? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
            onClick={async () => {
              toast.dismiss(t.id);
              setIsDeleting(true);
              
              try {
                const token = localStorage.getItem('authToken');
                const response = await api.delete(`/post_content/post/${post.id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200 || response.status === 204) {
                  toast.success('Post deleted successfully');
                  onPostDeleted?.();
                }
              } catch (error) {
                console.error('Error deleting post:', error);
                toast.error('Failed to delete post');
              } finally {
                setIsDeleting(false);
                setShowOptions(false);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
      position: 'top-right',
    });
  };

  const handleUpdatePost = async () => {
    if (!editedContent.trim() || !editedTitle.trim()) {
      toast.error('Title and content cannot be empty');
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const token = localStorage.getItem('authToken');
  
      // Use the existing category_id from the post if no new category is selected
      const categoryId = selectedCategory || post.category_id;
  
      const requestData = {
        post_id: post.id,
        title: editedTitle,
        content: editedContent,
        category_id: categoryId,
      };
  
      const response = await api.put('/post_content/post/update', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const updatedPost = {
          ...post,
          title: editedTitle,
          content: editedContent,
          ...response.data,
        };
  
        setPost(updatedPost);
        setIsEditing(false);
        toast.success('Post updated successfully');
  
        if (onPostUpdated) {
          onPostUpdated(updatedPost);
        }
      }
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post');
    } finally {
      setIsSubmitting(false);
    }
  };
  

// const handleUpdatePost = async () => {
//   if (!editedContent.trim() || !editedTitle.trim()) {
//     toast.error('Title and content cannot be empty');
//     return;
//   }

//   setIsSubmitting(true);

//   try {
//     const token = localStorage.getItem('authToken');

//     // Find the selected category's ID before sending the request
//     const categoryObj = categories.find(cat => cat.name === post.category);
//     const categoryId = categoryObj ? categoryObj.id : selectedCategory;

//     if (!categoryId) {
//       toast.error('Invalid category selection');
//       return;
//     }

//     const requestData = {
//       post_id: post.id,
//       title: editedTitle,
//       content: editedContent,
//       category_id: categoryId, // Use category ID from the array
//     };

//     const response = await api.put('/post_content/post/update', requestData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.status === 200) {
//       const updatedPost = {
//         ...post,
//         title: editedTitle,
//         content: editedContent,
//         category: categoryObj?.name || post.category, // Update category name if changed
//         ...response.data,
//       };

//       setPost(updatedPost);
//       setIsEditing(false);
//       toast.success('Post updated successfully');

//       if (onPostUpdated) {
//         onPostUpdated(updatedPost);
//       }
//     }
//   } catch (error) {
//     console.error('Error updating post:', error);
//     toast.error('Failed to update post');
//   } finally {
//     setIsSubmitting(false);
//   }
// };


  // const handleUpdatePost = async () => {
  //   if (!editedContent.trim() || !editedTitle.trim()) {
  //     toast.error('Title and content cannot be empty');
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     const token = localStorage.getItem('authToken');
  //     const categoryObj = categories.find(cat => cat.name === post.category);
  //     const categoryId = categoryObj ? categoryObj.id : selectedCategory;

  //     const requestData = {
  //       post_id: post.id,
  //       title: editedTitle,
  //       content: editedContent,
  //       category_id: categoryId,
  //     };

  //     const response = await api.put('/post_content/post/update', requestData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.status === 200) {
  //       const updatedPost = {
  //         ...post,
  //         title: editedTitle,
  //         content: editedContent,
  //         category: categoryObj?.name || post.category,
  //         ...response.data,
  //       };

  //       setPost(updatedPost);
  //       setIsEditing(false);
  //       toast.success('Post updated successfully');

  //       if (onPostUpdated) {
  //         onPostUpdated(updatedPost);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error updating post:', error);
  //     toast.error('Failed to update post');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(post.title);
    setEditedContent(post.content);
    setNewMediaFile(null);
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 100 * 1024 * 1024; // 100MB limit

      if (file.size > maxSize) {
        toast.error('File size must be less than 100MB', {
          position: 'top-right',
        });
        return;
      }

      setNewMediaFile(file);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
  
    setIsSubmitting(true);
  
    try {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      
      if (!userId || !token) return;

      const response = await api.post(
        `/auth/posts/${post.id}/comments`,
        { 
          text: newComment,
          user_id: userId 
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setComments(prev => [...prev, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = () => {
    if (post.isVideo) {
      if (post.isVideoRejected) {
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            Rejected
          </span>
        );
      }
      if (!post.isVideoApproved) {
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Pending
          </span>
        );
      }
    }
    return null;
  };

  const getMediaIcon = () => {
    if (post.isVideo) return <Video className="w-5 h-5 text-blue-500" />;
    if (post.isImage) return <ImageIcon className="w-5 h-5 text-green-500" />;
    if (post.isAudio) return <FileAudio className="w-5 h-5 text-purple-500" />;
    if (post.isNoMedia) return <FileText className="w-5 h-5 text-gray-500" />;
    return <AlertCircle className="w-5 h-5 text-gray-500" />;
  };

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-grow">
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl font-semibold"
              />
            ) : (
              <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
            )}
            <p className="text-sm text-gray-500 mt-1">
              <time dateTime={post.updated_at}>
                {format(new Date(post.updated_at), "MMM d, h:mm a")}
              </time>
            </p>
          </div>
          <div className="flex items-center gap-3">
            {getMediaIcon()}
            {getStatusBadge()}
            {isOwner && (
              <div className="relative" ref={optionsRef}>
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
                {showOptions && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setShowOptions(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      disabled={isDeleting}
                    >
                      <Edit className="w-4 h-4" />
                      Edit Post
                    </button>
                    <button
                      onClick={handleDeletePost}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4" />
                      {isDeleting ? 'Deleting...' : 'Delete Post'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="mb-4 space-y-4">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Post content"
            />
            
            {getMediaPreview()}

            <div className="flex items-center gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Change Media
              </button>
              {newMediaFile && (
                <span className="text-sm text-gray-600">
                  Selected: {newMediaFile.name}
                </span>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleUpdatePost}
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <>
            <p className="text-gray-700 mb-4">{post.content}</p>
            {getMediaPreview()}
          </>
        )}
      </div>


      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center gap-6">
          <button 
            className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : 'text-gray-600'} transition-colors`}
            onClick={handleToggleLike}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">
              {isLiked ? 'Unlike' : 'Like'} ({likeCount})
            </span>
          </button>
          <button 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">
              Comment {comments.length > 0 && `(${comments.length})`}
            </span>
          </button>
        </div>
      </div>

      {showComments && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <form onSubmit={handleSubmitComment} className="mb-6">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex-grow">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={2}
                />
                <button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </form>

          <div className="space-y-6">
            {comments.map((comment) => (
              <CommentComponent 
                key={comment.id} 
                comment={comment}
              />
            ))}

            {comments.length === 0 && (
              <p className="text-center text-gray-500 text-sm py-4">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default PostItem;






