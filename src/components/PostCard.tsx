
// import React, { useState, useEffect } from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import { PostService } from '../services';
// import { format } from "date-fns";
// import { 
//   User, Calendar, Heart, MessageCircle, Share2, Image as ImageIcon, 
//   Video, FileAudio, FileText,AlertCircle, Send 
// } from 'lucide-react';
// import axios from 'axios';
// import { CommentComponent } from './commentComponent';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface Comment {
//   id: number;
//   user_id: number;
//   username: string;
//   text: string;
//   created_at: string;
// }

// interface PostCardProps {
//   post: {
//     id: number;
//     user_id: number;
//     username: string;
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
//     comments?: Comment[];
//   };
//   currentUserId: number;
// }

// export const PostCard: React.FC<PostCardProps> = ({ post, currentUserId }) => {
//   const [likeCount, setLikeCount] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [newComment, setNewComment] = useState('');
//   const [comments, setComments] = useState<Comment[]>(post.comments || []);
//   const [isSubmitting, setIsSubmitting] = useState(false);

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

//   const getMediaIcon = () => {
//     if (post.isVideo) return <Video className="w-5 h-5 text-blue-500" />;
//     if (post.isImage) return <ImageIcon className="w-5 h-5 text-green-500" />;
//     if (post.isAudio) return <FileAudio className="w-5 h-5 text-purple-500" />;
//     if (post.isNoMedia) return <FileText className="w-5 h-5 text-gray-500" />;
//     return <AlertCircle className="w-5 h-5 text-gray-500" />;
//   };

//   return (
//     <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
//       <div className="p-6 pb-0">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
//               {/* <User className="w-6 h-6 text-gray-500" /> */}
//               {post.username ? post.username.substring(0, 2) : <User className="w-6 h-6 text-gray-500" />}
//             </div>
//             <div>
//               <h3 className="font-medium text-gray-900">{post.username}</h3>
//               <div className="flex items-center gap-2 text-sm text-gray-500">
//                 {/* <time dateTime={post.created_at}>
//                   {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
//                 </time> */}
//                <time dateTime={post.created_at}>
//   {format(new Date(post.created_at), "MMM d, h.mm a")}
// </time>
//                 {post.is_public && <span className="text-green-600">• Public</span>}
//               </div>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-2">
//             {getMediaIcon()}
//           </div>
//         </div>

//         <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
//         <p className="text-gray-600 mb-4">{post.content}</p>
//       </div>

      

// {post.media_path && (post.isImage || post.isVideo) && (
//   <div className="relative bg-gray-100">
//     {post.isImage ? (
//       <img
//         src={post.media_path}
//         alt={post.title}
//         className="w-full h-auto object-contain max-h-[400px]"
//         loading="lazy"
//       />
//     ) : post.isVideo ? (
//       <div className="relative bg-gray-100">
//         {post.media_path.includes("vimeo.com") ? (
//           <iframe
//             src={post.media_path}
//             className="w-full h-[400px] object-cover"
//             allow="autoplay; fullscreen"
//             allowFullScreen
//           />
//         ) : post.media_path.includes("youtube.com") || post.media_path.includes("youtu.be") ? (
//           <iframe
//             src={`https://www.youtube.com/embed/${new URL(post.media_path).searchParams.get("v")}`}
//             className="w-full h-[400px] object-cover"
//             allow="autoplay; encrypted-media"
//             allowFullScreen
//           />
//         ) : (
//           <iframe
//             src={post.media_path}
//             className="w-full h-[400px] object-cover"
//             allow="autoplay; fullscreen"
//             allowFullScreen
//           />
//         )}
//       </div>
//     ) : null}
//   </div>
// )}




//       {post.media_path && post.isAudio && (
//         <div className="px-6 py-4 bg-gray-50">
//           <audio src={post.media_path} controls className="w-full" />
//         </div>
//       )}

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






// import React, { useState, useEffect } from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import { PostService } from '../services';
// import { format } from "date-fns";
// import { 
//   User, Calendar, Heart, MessageCircle, Share2, Image as ImageIcon, 
//   Video, FileAudio, FileText,AlertCircle, Send 
// } from 'lucide-react';
// import axios from 'axios';
// import { CommentComponent } from './commentComponent';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface Comment {
//   id: number;
//   user_id: number;
//   username: string;
//   text: string;
//   created_at: string;
// }

// interface PostCardProps {
//   post: {
//     id: number;
//     user_id: number;
//     username: string;
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
//     comments?: Comment[];
//   };
//   currentUserId: number;
// }

// export const PostCard: React.FC<PostCardProps> = ({ post, currentUserId }) => {
//   const [likeCount, setLikeCount] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [newComment, setNewComment] = useState('');
//   const [comments, setComments] = useState<Comment[]>(post.comments || []);
//   const [isSubmitting, setIsSubmitting] = useState(false);

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

//   const getMediaIcon = () => {
//     if (post.isVideo) return <Video className="w-5 h-5 text-blue-500" />;
//     if (post.isImage) return <ImageIcon className="w-5 h-5 text-green-500" />;
//     if (post.isAudio) return <FileAudio className="w-5 h-5 text-purple-500" />;
//     if (post.isNoMedia) return <FileText className="w-5 h-5 text-gray-500" />;
//     return <AlertCircle className="w-5 h-5 text-gray-500" />;
//   };

//   return (
//      <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
//       <div className="p-6 pb-0">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
//               {post.username ? post.username.substring(0, 2) : <User className="w-6 h-6 text-gray-500" />}
//             </div>
//             <div>
//               <h3 className="font-medium text-gray-900">{post.username}</h3>
//               <div className="flex items-center gap-2 text-sm text-gray-500">
//                 <time dateTime={post.created_at}>
//                   {format(new Date(post.created_at), "MMM d, h:mm a")}
//                 </time>
//                 {post.is_public && <span className="text-green-600">• Public</span>}
//               </div>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-2">
//             {getMediaIcon()}
//           </div>
//         </div>

//         <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
//         <p className="text-gray-600 mb-4">{post.content}</p>
//       </div>

//       {post.media_path && (post.isImage || post.isVideo) && (
//         <div className="relative bg-gray-100">
//           {post.isImage ? (
//             <img
//               src={post.media_path}
//               alt={post.title}
//               className="w-full h-auto object-contain max-h-[400px]"
//               loading="lazy"
//             />
//           ) : post.isVideo && (
//             <div className="relative bg-gray-100">
//               {post.media_path.includes("vimeo.com") ? (
//                 <iframe
//                   src={post.media_path}
//                   className="w-full h-[400px] object-cover"
//                   allow="autoplay; fullscreen"
//                   allowFullScreen
//                 />
//               ) : post.media_path.includes("youtube.com") || post.media_path.includes("youtu.be") ? (
//                 <iframe
//                   src={`https://www.youtube.com/embed/${new URL(post.media_path).searchParams.get("v")}`}
//                   className="w-full h-[400px] object-cover"
//                   allow="autoplay; encrypted-media"
//                   allowFullScreen
//                 />
//               ) : (
//                 <iframe
//                   src={post.media_path}
//                   className="w-full h-[400px] object-cover"
//                   allow="autoplay; fullscreen"
//                   allowFullScreen
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       )}




//       {post.media_path && post.isAudio && (
//         <div className="px-6 py-4 bg-gray-50">
//           <audio src={post.media_path} controls className="w-full" />
//         </div>
//       )}

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




// import React, { useState, useEffect } from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import { PostService } from '../services';
// import { format } from "date-fns";
// import { 
//   User, Calendar, Heart, MessageCircle, Share2, Image as ImageIcon, 
//   Video, FileAudio, FileText, AlertCircle, Send 
// } from 'lucide-react';
// import axios from 'axios';
// import { CommentComponent } from './commentComponent';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface Comment {
//   id: number;
//   user_id: number;
//   username: string;
//   text: string;
//   created_at: string;
// }

// interface PostCardProps {
//   post: {
//     id: number;
//     user_id: number;
//     username: string;
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
//     comments?: Comment[];
//   };
//   currentUserId: number;
// }

// export const PostCard: React.FC<PostCardProps> = ({ post, currentUserId }) => {
//   const [likeCount, setLikeCount] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [newComment, setNewComment] = useState('');
//   const [comments, setComments] = useState<Comment[]>(post.comments || []);
//   const [isSubmitting, setIsSubmitting] = useState(false);

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

//   const getMediaIcon = () => {
//     if (post.isVideo) return <Video className="w-5 h-5 text-blue-500" />;
//     if (post.isImage) return <ImageIcon className="w-5 h-5 text-green-500" />;
//     if (post.isAudio) return <FileAudio className="w-5 h-5 text-purple-500" />;
//     if (post.isNoMedia) return <FileText className="w-5 h-5 text-gray-500" />;
//     return <AlertCircle className="w-5 h-5 text-gray-500" />;
//   };

//   const renderMedia = () => {
//     if (!post.media_path) return null;

//     if (post.isImage) {
//       return (
//         <div className="w-full bg-gray-100">
//           <img
//             src={post.media_path}
//             alt={post.title}
//             className="w-full h-auto object-contain max-h-[400px]"
//             loading="lazy"
//           />
//         </div>
//       );
//     }

//     if (post.isVideo) {
//       return (
//         <div className="w-full bg-gray-100">
//           {post.media_path.includes("vimeo.com") ? (
//             <iframe
//               src={post.media_path}
//               className="w-full h-[400px] object-cover"
//               allow="autoplay; fullscreen"
//               allowFullScreen
//             />
//           ) : post.media_path.includes("youtube.com") || post.media_path.includes("youtu.be") ? (
//             <iframe
//               src={`https://www.youtube.com/embed/${new URL(post.media_path).searchParams.get("v")}`}
//               className="w-full h-[400px] object-cover"
//               allow="autoplay; encrypted-media"
//               allowFullScreen
//             />
//           ) : (
//             <iframe
//               src={post.media_path}
//               className="w-full h-[400px] object-cover"
//               allow="autoplay; fullscreen"
//               allowFullScreen
//             />
//           )}
//         </div>
//       );
//     }

//     if (post.isAudio) {
//       return (
//         <div className="px-6 py-4 bg-gray-50">
//           <audio src={post.media_path} controls className="w-full" />
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
//       <div className="p-6 pb-0">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
//               {post.username ? post.username.substring(0, 2) : <User className="w-6 h-6 text-gray-500" />}
//             </div>
//             <div>
//               <h3 className="font-medium text-gray-900">{post.username}</h3>
//               <div className="flex items-center gap-2 text-sm text-gray-500">
//                 <time dateTime={post.created_at}>
//                   {format(new Date(post.created_at), "MMM d, h:mm a")}
//                 </time>
//                 {post.is_public && <span className="text-green-600">• Public</span>}
//               </div>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-2">
//             {getMediaIcon()}
//           </div>
//         </div>

//         <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
//         <p className="text-gray-600 mb-4">{post.content}</p>
//       </div>

//       {renderMedia()}

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



// import React, { useState, useEffect } from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import { PostService } from '../services';
// import { format } from "date-fns";
// import { 
//   User, Calendar, Heart, MessageCircle, Share2, Image as ImageIcon, 
//   Video, FileAudio, FileText, AlertCircle, Send 
// } from 'lucide-react';
// import axios from 'axios';
// import { CommentComponent } from './commentComponent';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface Comment {
//   id: number;
//   user_id: number;
//   username: string;
//   text: string;
//   created_at: string;
// }

// interface PostCardProps {
//   post: {
//     id: number;
//     user_id: number;
//     username: string;
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
//     comments?: Comment[];
//   };
//   currentUserId: number;
// }

// export const PostCard: React.FC<PostCardProps> = ({ post, currentUserId }) => {
//   const [likeCount, setLikeCount] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [newComment, setNewComment] = useState('');
//   const [comments, setComments] = useState<Comment[]>(post.comments || []);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);


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

//   const getMediaIcon = () => {
//     if (post.isVideo) return <Video className="w-5 h-5 text-blue-500" />;
//     if (post.isImage) return <ImageIcon className="w-5 h-5 text-green-500" />;
//     if (post.isAudio) return <FileAudio className="w-5 h-5 text-purple-500" />;
//     if (post.isNoMedia) return <FileText className="w-5 h-5 text-gray-500" />;
//     return <AlertCircle className="w-5 h-5 text-gray-500" />;
//   };

//   const renderMedia = () => {
//     if (!post.media_path) return null;

//     if (post.isImage) {
//       return (
//         <div className="w-full bg-gray-100">
//           <img
//             src={post.media_path}
//             alt={post.title}
//             className="w-full h-auto object-contain max-h-[400px]"
//             loading="lazy"
//           />
//         </div>
//       );
//     }

//     if (post.isVideo) {
//       return (
//         <div className="w-full bg-gray-100">
//           {post.media_path.includes("vimeo.com") ? (
//             <iframe
//               src={post.media_path}
//               className="w-full h-[400px] object-cover"
//               allow="autoplay; fullscreen"
//               allowFullScreen
//             />
//           ) : post.media_path.includes("youtube.com") || post.media_path.includes("youtu.be") ? (
//             <iframe
//               src={`https://www.youtube.com/embed/${new URL(post.media_path).searchParams.get("v")}`}
//               className="w-full h-[400px] object-cover"
//               allow="autoplay; encrypted-media"
//               allowFullScreen
//             />
//           ) : (
//             <iframe
//               src={post.media_path}
//               className="w-full h-[400px] object-cover"
//               allow="autoplay; fullscreen"
//               allowFullScreen
//             />
//           )}
//         </div>
//       );
//     }

//     if (post.isAudio) {
//       return (
//         <div className="px-6 py-4 bg-gray-50">
//           <audio src={post.media_path} controls className="w-full" />
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
//       <div className="p-6 pb-0">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
//               {post.username ? post.username.substring(0, 2) : <User className="w-6 h-6 text-gray-500" />}
//             </div>
//             <div>
//               <h3 className="font-medium text-gray-900">{post.username}</h3>
//               <div className="flex items-center gap-2 text-sm text-gray-500">
//                 <time dateTime={post.created_at}>
//                   {format(new Date(post.created_at), "MMM d, h:mm a")}
//                 </time>
//                 {post.is_public && <span className="text-green-600">• Public</span>}
//               </div>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-2">
//             {getMediaIcon()}
//           </div>
//         </div>

//         <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
//         <p className="text-gray-600 mb-4">{post.content}</p>
//       </div>

//       {renderMedia()}

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

// corect above


// import React, { useState, useEffect } from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import { PostService } from '../services';
// import { format } from "date-fns";
// import { 
//   User, Calendar, Heart, MessageCircle, Share2, Image as ImageIcon, 
//   Video, FileAudio, FileText, AlertCircle, Send 
// } from 'lucide-react';
// import axios from 'axios';
// import { CommentComponent } from './commentComponent';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface Comment {
//   id: number;
//   user_id: number;
//   username: string;
//   text: string;
//   created_at: string;
// }

// // interface PostCardProps {
// //   post: {
// //     id: number;
// //     user_id: number;
// //     username: string;
// //     title: string;
// //     category: string;
// //     content: string;
// //     media_path?: string;
// //     isVideo: boolean;
// //     isImage: boolean;
// //     isAudio: boolean;
// //     isNoMedia: boolean;
// //     isVideoApproved: boolean;
// //     isVideoRejected: boolean;
// //     is_public: boolean;
// //     created_at: string;
// //     comments?: Comment[];
// //   };
// //   currentUserId: number;
// // }

// interface PostCardProps {
//   post: {
//     id: number;
//     user_id: number;
//     username: string;
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
//     comments?: Comment[];
//   };
//   currentUserId?: number; // Made optional
// }

// export const PostCard: React.FC<PostCardProps> = ({ post, currentUserId }) => {
//   const [likeCount, setLikeCount] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [newComment, setNewComment] = useState('');
//   const [comments, setComments] = useState<Comment[]>(post.comments || []);
//   const [isSubmitting, setIsSubmitting] = useState(false);

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

//   const getMediaIcon = () => {
//     if (post.isVideo) return <Video className="w-5 h-5 text-blue-500" />;
//     if (post.isImage) return <ImageIcon className="w-5 h-5 text-green-500" />;
//     if (post.isAudio) return <FileAudio className="w-5 h-5 text-purple-500" />;
//     if (post.isNoMedia) return <FileText className="w-5 h-5 text-gray-500" />;
//     return <AlertCircle className="w-5 h-5 text-gray-500" />;
//   };

//   const renderMedia = () => {
//     if (!post.media_path) return null;

//     if (post.isImage) {
//       return (
//         <div className="w-full bg-gray-100">
//           <img
//             src={post.media_path}
//             alt={post.title}
//             className="w-full h-auto object-contain max-h-[400px]"
//             loading="lazy"
//           />
//         </div>
//       );
//     }

//     if (post.isVideo) {
//       return (
//         <div className="w-full bg-gray-100">
//           {post.media_path.includes("vimeo.com") ? (
//             <iframe
//               src={post.media_path}
//               className="w-full h-[400px] object-cover"
//               allow="autoplay; fullscreen"
//               allowFullScreen
//             />
//           ) : post.media_path.includes("youtube.com") || post.media_path.includes("youtu.be") ? (
//             <iframe
//               src={`https://www.youtube.com/embed/${new URL(post.media_path).searchParams.get("v")}`}
//               className="w-full h-[400px] object-cover"
//               allow="autoplay; encrypted-media"
//               allowFullScreen
//             />
//           ) : (
//             <iframe
//               src={post.media_path}
//               className="w-full h-[400px] object-cover"
//               allow="autoplay; fullscreen"
//               allowFullScreen
//             />
//           )}
//         </div>
//       );
//     }

//     if (post.isAudio) {
//       return (
//         <div className="px-6 py-4 bg-gray-50">
//           <audio src={post.media_path} controls className="w-full" />
//         </div>
//       );
//     }

//     return null;
//   };

//   const getUserInitials = (username: string) => {
//     if (!username || typeof username !== 'string') return '';
//     const trimmedName = username.trim();
//     if (!trimmedName) return '';
    
//     const names = trimmedName.split(' ').filter(Boolean);
//     if (names.length >= 2) {
//       return `${names[0][0]}${names[1][0]}`.toUpperCase();
//     }
//     return trimmedName.substring(0, 2).toUpperCase();
//   };

//   return (
//     <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
//       <div className="p-6 pb-0">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
//               {post.username ? (
//                 <span className="text-gray-600 font-medium">
//                   {getUserInitials(post.username)}
//                 </span>
//               ) : (
//                 <User className="w-6 h-6 text-gray-400" />
//               )}
//             </div>
//             <div>
//               <h3 className="font-medium text-gray-900">
//                 {post.username || 'Anonymous User'}
//               </h3>
//               <time className="text-sm text-gray-500" dateTime={post.created_at}>
//                 {format(new Date(post.created_at), "MMM d, h:mm a")}
//               </time>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-2">
//             {getMediaIcon()}
//             {post.is_public && <span className="text-xs text-green-600 font-medium">Public</span>}
//           </div>
//         </div>

//         <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
//         <p className="text-gray-600 mb-4">{post.content}</p>
//       </div>

//       {renderMedia()}

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



// trial



import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { PostService } from '../services';
import { format } from "date-fns";
import { 
  User, Calendar, Heart, MessageCircle, Share2, Image as ImageIcon, 
  Video, FileAudio, FileText, AlertCircle, Send 
} from 'lucide-react';
import axios from 'axios';
import { CommentComponent } from './commentComponent';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

interface Comment {
  id: number;
  user_id: number;
  username: string;
  text: string;
  created_at: string;
}

interface PostCardProps {
  post: {
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
    isVideoApproved: boolean;
    isVideoRejected: boolean;
    is_public: boolean;
    created_at: string;
    comments?: Comment[];
  };
  currentUserId?: number;
}

export const PostCard: React.FC<PostCardProps> = ({ post, currentUserId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');
  
        if (!userId || !token) return;
  
        const response = await api.get(`/auth/posts/${post.id}/likes/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setLikeCount(response.data.likeCount);
        setIsLiked(response.data.liked);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };
  
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem('authToken');
  
        if (!token) return;
  
        const response = await api.get(`/auth/posts/${post.id}/comments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchLikes();
    fetchComments();
  }, [post.id]);

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

  const getMediaIcon = () => {
    if (post.isVideo) return <Video className="w-5 h-5 text-blue-500" />;
    if (post.isImage) return <ImageIcon className="w-5 h-5 text-green-500" />;
    if (post.isAudio) return <FileAudio className="w-5 h-5 text-purple-500" />;
    if (post.isNoMedia) return <FileText className="w-5 h-5 text-gray-500" />;
    return <AlertCircle className="w-5 h-5 text-gray-500" />;
  };

  const renderMedia = () => {
    if (!post.media_path) return null;

    if (post.isImage) {
      return (
        <div className="w-full bg-gray-100">
          <img
            src={post.media_path}
            alt={post.title}
            className="w-full h-auto object-contain max-h-[400px]"
            loading="lazy"
          />
        </div>
      );
    }

    if (post.isVideo) {
      return (
        <div className="w-full bg-gray-100">
          {post.media_path.includes("vimeo.com") ? (
            <iframe
              src={post.media_path}
              className="w-full h-[400px] object-cover"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : post.media_path.includes("youtube.com") || post.media_path.includes("youtu.be") ? (
            <iframe
              src={`https://www.youtube.com/embed/${new URL(post.media_path).searchParams.get("v")}`}
              className="w-full h-[400px] object-cover"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <iframe
              src={post.media_path}
              className="w-full h-[400px] object-cover"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          )}
        </div>
      );
    }

    if (post.isAudio) {
      return (
        <div className="px-6 py-4 bg-gray-50">
          <audio src={post.media_path} controls className="w-full" />
        </div>
      );
    }

    return null;
  };

  const getUserInitials = (username: string | null) => {
    if (!username) return null;
    const trimmedName = username.trim();
    if (!trimmedName) return null;
    
    const names = trimmedName.split(' ').filter(Boolean);
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return trimmedName.substring(0, 2).toUpperCase();
  };

  const initials = getUserInitials(post.username);

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 pb-0">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              {post.username && initials ? (
                <span className="text-gray-600 font-medium">{initials}</span>
              ) : (
                <User className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {post.username || 'Anonymous User'}
              </h3>
              <time className="text-sm text-gray-500" dateTime={post.created_at}>
                {format(new Date(post.created_at), "MMM d, h:mm a")}
              </time>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {getMediaIcon()}
            {post.is_public && <span className="text-xs text-green-600 font-medium">Public</span>}
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.content}</p>
      </div>

      {renderMedia()}

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