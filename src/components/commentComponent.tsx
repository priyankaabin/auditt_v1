// import React from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import { User } from 'lucide-react';

// interface Comment {
//   id: number;
//   user_id: number;
//   username: string;
//   text: string;
//   created_at: string;
// }

// interface CommentComponentProps {
//   comment: Comment;
// }

// export const CommentComponent: React.FC<CommentComponentProps> = ({ comment }) => {
//   return (
//     <div className="flex gap-3">
//       <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
//         <User className="w-4 h-4 text-gray-500" />
//       </div>
//       <div className="flex-grow">
//         <div className="bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <span className="font-semibold text-gray-900">{comment.username}</span>
//               <span className="text-xs text-gray-500 ml-2">
//                 {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
//               </span>
//             </div>
//           </div>
//           <p className="text-gray-700 leading-relaxed">{comment.text}</p>
//         </div>
//       </div>
//     </div>
//   );
// };


// import React, { useState } from 'react';
// import { User, Reply, Send } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';

// interface Comment {
//   id: number;
//   text: string;
//   created_at: string;
//   user_id: string;
//   username: string;
//   replies?: Comment[];
// }

// interface CommentComponentProps {
//   comment: Comment;
//   onReply: (commentId: number, replyText: string) => Promise<void>;
// }

// const handleSubmitReply = async (e: React.FormEvent) => {
//   e.preventDefault();
//   if (!replyText.trim() || isSubmitting) return;

//   setIsSubmitting(true);
//   try {
//     await onReply(comment.id, replyText);
//     setReplyText('');
//     setShowReplyInput(false);
//   } catch (error) {
//     console.error('Error submitting reply:', error);
//   } finally {
//     setIsSubmitting(false);
//   }
// };



// export const CommentComponent: React.FC<CommentComponentProps> = ({ comment, onReply }) => {
//   const [showReplyInput, setShowReplyInput] = useState(false);
//   const [replyText, setReplyText] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmitReply = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!replyText.trim() || isSubmitting) return;

//     setIsSubmitting(true);
//     try {
//       await onReply(comment.id, replyText);
//       setReplyText('');
//       setShowReplyInput(false);
//     } catch (error) {
//       console.error('Error submitting reply:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex gap-3">
//         <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
//           <User className="w-4 h-4 text-gray-500" />
//         </div>
//         <div className="flex-grow">
//           <div className="bg-gray-100 rounded-lg px-4 py-3">
//           <p className="text-sm text-gray-700">
//               <span className="font-bold text-gray-900">{comment.username}</span>{' '}
//               {comment.text}
//             </p>
//             {/* <p className="text-sm text-gray-700">{comment.username}{comment.text}</p> */}
//           </div>
//           <div className="flex items-center gap-4 mt-1">
//             <p className="text-xs text-gray-500">
//               {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
//             </p>
//             <button
//               onClick={() => setShowReplyInput(!showReplyInput)}
//               className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1"
//             >
//               <Reply className="w-3 h-3" />
//               Reply
//             </button>
//           </div>
//         </div>
//       </div>

//       {showReplyInput && (
//         <div className="ml-11">
//           <form onSubmit={handleSubmitReply} className="flex gap-3">
//             <div className="flex-grow">
//               <textarea
//                 value={replyText}
//                 onChange={(e) => setReplyText(e.target.value)}
//                 placeholder="Write a reply..."
//                 className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 rows={2}
//               />
//               <button
//                 type="submit"
//                 disabled={!replyText.trim() || isSubmitting}
//                 className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm hover:bg-blue-600 transition-colors"
//               >
//                 <Send className="w-4 h-4" />
//                 {isSubmitting ? 'Sending...' : 'Post Reply'}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {comment.replies && comment.replies.length > 0 && (
//         <div className="ml-11 space-y-4">
//           {comment.replies.map((reply) => (
//             <div key={reply.id} className="flex gap-3">
//               <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
//                 <User className="w-4 h-4 text-gray-500" />
//               </div>
//               <div className="flex-grow">
//                 <div className="bg-gray-100 rounded-lg px-4 py-3">
//                   <p className="text-sm text-gray-700">{reply.text}</p>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


// import React, { useState } from 'react';
// import { User, Reply, Send } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',  // Changed back to your backend server URL
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface Comment {
//   id: number;
//   text: string;
//   created_at: string;
//   user_id: string;
//   username: string;
//   replies?: Comment[];
// }

// interface CommentComponentProps {
//   comment: Comment;
//   onReply: (commentId: number, replyText: string) => Promise<void>;
// }

// export const CommentComponent: React.FC<CommentComponentProps> = ({ comment, onReply }) => {
//   const [showReplyInput, setShowReplyInput] = useState(false);
//   const [replyText, setReplyText] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // **Submit reply to server**
// //   const handleSubmitReply = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!replyText.trim() || isSubmitting) return;

// //     setIsSubmitting(true);
// //     try {
// //       // Retrieve userId from localStorage
// //       const userId = localStorage.getItem('userId'); // Check the key name

// //       if (!userId) {
// //         throw new Error('User ID not found in localStorage');
// //       }

// //       // Use only the comment_id in the URL
// //       const response = await api.post(`/auth/comments/${comment.id}/replies`, {
// //         user_id: userId,  // Directly send the data in the body
// //         text: replyText
// //       }, {
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
// //         }
// //       });

// //       // Axios does not require checking `response.ok`
// //       const newReply = response.data;  // Axios automatically parses JSON response
// //       console.log('Reply added:', newReply);
// //       setReplyText('');
// //       setShowReplyInput(false);
// //     } catch (error) {
// //       console.error('Error submitting reply:', error);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// // };


// const handleSubmitReply = async (e: React.FormEvent) => {
//   e.preventDefault();
  
//   // Retrieve token and userId from localStorage
//   const token = localStorage.getItem('authToken');
//   const userId = localStorage.getItem('userId');
  
//   // Check if either token or userId is missing
//   if (!token || !userId) {
//       // Redirect to login if either token or userId is missing
//       window.location.href = '/login';
//       return;
//   }

//   // Avoid submitting if reply text is empty or already submitting
//   if (!replyText.trim() || isSubmitting) return;

//   setIsSubmitting(true);

//   try {
//       // Send the reply data to the backend
//       const response = await api.post(`/auth/comments/${comment.id}/replies`, {
//           user_id: userId,  // Directly send the user ID in the body
//           text: replyText    // Send the reply text
//       }, {
//           headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`, // Use the token from localStorage
//           }
//       });

//       // Process the response data
//       const newReply = response.data;
//       console.log('Reply added:', newReply);

//       // Clear the reply input and hide the input form
//       setReplyText('');
//       setShowReplyInput(false);
//   } catch (error) {
//       console.error('Error submitting reply:', error);
//   } finally {
//       setIsSubmitting(false);
//   }
// };


  

//   return (
//     <div className="space-y-4">
//       <div className="flex gap-3">
//         <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
//           <User className="w-4 h-4 text-gray-500" />
//         </div>
//         <div className="flex-grow">
//           <div className="bg-gray-100 rounded-lg px-4 py-3">
//             <p className="text-sm text-gray-700">
//               <span className="font-bold text-gray-900">{comment.username}</span>{' '}
//               {comment.text}
//             </p>
//           </div>
//           <div className="flex items-center gap-4 mt-1">
//             <p className="text-xs text-gray-500">
//               {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
//             </p>
//             <button
//               onClick={() => setShowReplyInput(!showReplyInput)}
//               className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1"
//             >
//               <Reply className="w-3 h-3" />
//               Reply
//             </button>
//           </div>
//         </div>
//       </div>

//       {showReplyInput && (
//         <div className="ml-11">
//           <form onSubmit={handleSubmitReply} className="flex gap-3">
//             <div className="flex-grow">
//               <textarea
//                 value={replyText}
//                 onChange={(e) => setReplyText(e.target.value)}
//                 placeholder="Write a reply..."
//                 className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 rows={2}
//               />
//               <button
//                 type="submit"
//                 disabled={!replyText.trim() || isSubmitting}
//                 className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm hover:bg-blue-600 transition-colors"
//               >
//                 <Send className="w-4 h-4" />
//                 {isSubmitting ? 'Sending...' : 'Post Reply'}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {comment.replies && comment.replies.length > 0 && (
//         <div className="ml-11 space-y-4">
//           {comment.replies.map((reply) => (
//             <div key={reply.id} className="flex gap-3">
//               <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
//                 <User className="w-4 h-4 text-gray-500" />
//               </div>
//               <div className="flex-grow">
//                 <div className="bg-gray-100 rounded-lg px-4 py-3">
//                   <p className="text-sm text-gray-700">{reply.text}</p>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


// import React, { useState, useEffect } from 'react';
// import { User, Reply, Send } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',  // Your backend server URL
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// interface Reply {
//   id: number;
//   user_id: number;
//   text: string;
//   created_at: string;
//   username: string;
// }

// interface Comment {
//   id: number;
//   text: string;
//   created_at: string;
//   user_id: string;
//   username: string;
//   replies?: Reply[];
// }

// interface CommentComponentProps {
//   comment: Comment;
//   onReply: (commentId: number, replyText: string) => Promise<void>;
// }

// export const CommentComponent: React.FC<CommentComponentProps> = ({ comment, onReply }) => {
//   const [showReplyInput, setShowReplyInput] = useState(false);
//   const [replyText, setReplyText] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [replies, setReplies] = useState<Reply[]>([]);

//   // **Load replies when the component mounts**
//   useEffect(() => {
//     const fetchReplies = async () => {
//       try {
//         const response = await api.get(`/auth/comments/${comment.id}/replies`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//           },
//         });

//         setReplies(response.data);  // Set replies state with the fetched data
//       } catch (error) {
//         console.error('Error fetching replies:', error);
//       }
//     };

//     fetchReplies();  // Call the API to load replies
//   }, [comment.id]);  // The effect will re-run when the comment.id changes

//   // **Submit reply to server**
//   const handleSubmitReply = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     const token = localStorage.getItem('authToken');
//     const userId = localStorage.getItem('userId');
  
//     if (!token || !userId) {
//       window.location.href = '/login';
//       return;
//     }

//     if (!replyText.trim() || isSubmitting) return;

//     setIsSubmitting(true);

//     try {
//       const response = await api.post(`/auth/comments/${comment.id}/replies`, {
//         user_id: userId,
//         text: replyText
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         }
//       });

//       const newReply = response.data;  // Get the reply from the response
//       setReplies([...replies, newReply]);  // Add the new reply to the replies state

//       setReplyText('');
//       setShowReplyInput(false);
//     } catch (error) {
//       console.error('Error submitting reply:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex gap-3">
//         <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
//           <User className="w-4 h-4 text-gray-500" />
//         </div>
//         <div className="flex-grow">
//           <div className="bg-gray-100 rounded-lg px-4 py-3">
//             <p className="text-sm text-gray-700">
//               <span className="font-bold text-gray-900">{comment.username}</span>{' '}
//               {comment.text}
//             </p>
//           </div>
//           <div className="flex items-center gap-4 mt-1">
//             <p className="text-xs text-gray-500">
//               {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
//             </p>
//             <button
//               onClick={() => setShowReplyInput(!showReplyInput)}
//               className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1"
//             >
//               <Reply className="w-3 h-3" />
//               Reply
//             </button>
//           </div>
//         </div>
//       </div>

//       {showReplyInput && (
//         <div className="ml-11">
//           <form onSubmit={handleSubmitReply} className="flex gap-3">
//             <div className="flex-grow">
//               <textarea
//                 value={replyText}
//                 onChange={(e) => setReplyText(e.target.value)}
//                 placeholder="Write a reply..."
//                 className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 rows={2}
//               />
//               <button
//                 type="submit"
//                 disabled={!replyText.trim() || isSubmitting}
//                 className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm hover:bg-blue-600 transition-colors"
//               >
//                 <Send className="w-4 h-4" />
//                 {isSubmitting ? 'Sending...' : 'Post Reply'}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {replies.length > 0 && (
//         <div className="ml-11 space-y-4">
//           {replies.map((reply) => (
//             <div key={reply.id} className="flex gap-3">
//               <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
//                 <User className="w-4 h-4 text-gray-500" />
//               </div>
//               <div className="flex-grow">
//                 <div className="bg-gray-100 rounded-lg px-4 py-3">
//                   <p className="text-sm text-gray-700">{reply.text}</p>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


import React, { useState, useEffect, useRef } from 'react';
import { User, Reply, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { format } from "date-fns";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',  // Your backend server URL
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

interface Reply {
  id: number;
  user_id: number;
  text: string;
  created_at: string;
  username: string;
}

interface Comment {
  id: number;
  text: string;
  created_at: string;
  user_id: string;
  username: string;
  replies?: Reply[];
}

interface CommentComponentProps {
  comment: Comment;
  onReply: (commentId: number, replyText: string) => Promise<void>;
}

export const CommentComponent: React.FC<CommentComponentProps> = ({ comment, onReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [hasMoreReplies, setHasMoreReplies] = useState(true); // Flag for more replies
  const [loadingReplies, setLoadingReplies] = useState(false); // Loading flag for replies

  const repliesContainerRef = useRef<HTMLDivElement>(null);

  // Load replies when the component mounts
  useEffect(() => {
    const fetchReplies = async () => {
      setLoadingReplies(true);
      try {
        const response = await api.get(`/auth/comments/${comment.id}/replies`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        setReplies(response.data);
      } catch (error) {
        console.error('Error fetching replies:', error);
      } finally {
        setLoadingReplies(false);
      }
    };

    fetchReplies();
  }, [comment.id]);

  // **Handle scrolling to load more replies when reaching the bottom**
  const handleScroll = () => {
    if (repliesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = repliesContainerRef.current;
      // If scrolled to the bottom, load more replies
      if (scrollTop + clientHeight >= scrollHeight - 10 && hasMoreReplies && !loadingReplies) {
        loadMoreReplies();
      }
    }
  };

  // **Load more replies** (for infinite scrolling)
  const loadMoreReplies = async () => {
    setLoadingReplies(true);
    try {
      const lastReplyId = replies[replies.length - 1]?.id;
      const response = await api.get(`/auth/comments/${comment.id}/replies`, {
        params: { afterId: lastReplyId }, // Assuming the backend supports pagination
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      const newReplies = response.data;
      if (newReplies.length > 0) {
        setReplies((prevReplies) => [...prevReplies, ...newReplies]);
      } else {
        setHasMoreReplies(false); // No more replies available
      }
    } catch (error) {
      console.error('Error loading more replies:', error);
    } finally {
      setLoadingReplies(false);
    }
  };

  // **Submit reply to server**
  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
  
    if (!token || !userId) {
      window.location.href = '/signin';
      return;
    }

    if (!replyText.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await api.post(`/auth/comments/${comment.id}/replies`, {
        user_id: userId,
        text: replyText
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      const newReply = response.data;  // Get the reply from the response
      setReplies((prevReplies) => [...prevReplies, newReply]);  // Add the new reply to the replies state

      setReplyText('');
      setShowReplyInput(false);
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-gray-500" />
        </div>
        <div className="flex-grow">
          <div className="bg-gray-100 rounded-lg px-4 py-3">
            <p className="text-sm text-gray-700">
              <span className="font-bold text-gray-900">{comment.username}</span>{' '}
              {comment.text}
            </p>
          </div>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-xs text-gray-500">
            {format(new Date(comment.created_at), "MMM d, h:mm a")} •{" "}
              {/* {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })} */}
            </p>
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1"
            >
              <Reply className="w-3 h-3" />
              Reply
            </button>
          </div>
        </div>
      </div>

      {showReplyInput && (
        <div className="ml-11">
          <form onSubmit={handleSubmitReply} className="flex gap-3">
            <div className="flex-grow">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                rows={2}
              />
              <button
                type="submit"
                disabled={!replyText.trim() || isSubmitting}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm hover:bg-blue-600 transition-colors"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Sending...' : 'Post Reply'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Scrollable container for replies */}
      <div
        ref={repliesContainerRef}
        onScroll={handleScroll}
        className="ml-11 space-y-4 max-h-96 overflow-y-auto"
      >
        {replies.length > 0 ? (
          replies.map((reply) => (
            <div key={reply.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex-grow">
                <div className="bg-gray-100 rounded-lg px-4 py-3">
                  <p className="text-sm text-gray-700">
                  <span className="font-bold text-gray-900">{reply.username}</span>{' '}{reply.text}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                {format(new Date(reply.created_at), "MMM d, h:mm a")} •{" "}
                  {/* {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })} */}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No replies yet</p>
        )}

        {/* Loading indicator */}
        {loadingReplies && <p className="text-center text-blue-500">Loading more replies...</p>}
      </div>
    </div>
  );
};




