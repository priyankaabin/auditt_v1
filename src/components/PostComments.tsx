// import React, { useState, useEffect } from 'react';
// import { usePostStore } from '../store/postStore';
// import { useAuthStore } from '../store/authStore';
// import { Avatar } from './Avatar';
// import { formatDistanceToNow } from 'date-fns';
// import { Send, Trash2 } from 'lucide-react';

// interface PostCommentsProps {
//   postId: string;
// }

// export const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
//   const { user } = useAuthStore();
//   const { fetchComments, addComment, deleteComment, comments } = usePostStore();
//   const [newComment, setNewComment] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
  
//   const postComments = comments[postId] || [];
  
//   useEffect(() => {
//     const loadComments = async () => {
//       setIsLoading(true);
//       await fetchComments(postId);
//       setIsLoading(false);
//     };
    
//     loadComments();
//   }, [fetchComments, postId]);
  
//   const handleSubmitComment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;
    
//     const success = await addComment(postId, newComment);
//     if (success) {
//       setNewComment('');
//     }
//   };
  
//   const handleDeleteComment = async (commentId: string) => {
//     await deleteComment(commentId, postId);
//   };
  
//   return (
//     <div className="border-t border-gray-100 p-4">
//       {/* Comment Form */}
//       <form onSubmit={handleSubmitComment} className="flex gap-3 mb-4">
//         <Avatar size="sm" />
//         <div className="flex-1 relative">
//           <input
//             type="text"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Write a comment..."
//             className="w-full px-4 py-2 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
//           />
//           <button
//             type="submit"
//             disabled={!newComment.trim()}
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 disabled:text-gray-300"
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//       </form>
      
//       {/* Comments List */}
//       <div className="space-y-4">
//         {isLoading ? (
//           <div className="text-center py-4">
//             <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
//             <p className="text-sm text-gray-500 mt-2">Loading comments...</p>
//           </div>
//         ) : postComments.length === 0 ? (
//           <p className="text-center text-gray-500 py-2">No comments yet. Be the first to comment!</p>
//         ) : (
//           postComments.map((comment) => (
//             <div key={comment.id} className="flex gap-3">
//               <Avatar 
//                 src={comment.user.avatar_url} 
//                 seed={comment.user.email}
//                 size="sm"
//                 tier={comment.user.tier}
//               />
//               <div className="flex-1">
//                 <div className="bg-gray-100 rounded-lg p-3">
//                   <div className="font-semibold text-sm">{comment.user.email}</div>
//                   <p className="text-gray-700">{comment.content}</p>
//                 </div>
//                 <div className="flex items-center mt-1 text-xs text-gray-500">
//                   <span>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                  
//                   {user?.id === comment.user_id && (
//                     <button
//                       onClick={() => handleDeleteComment(comment.id)}
//                       className="ml-2 text-gray-400 hover:text-red-500"
//                     >
//                       <Trash2 className="w-3 h-3" />
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };




import React, { useState, useEffect } from 'react';
import { usePostStore } from '../store/postStore';
import { useAuthStore } from '../store/authStore';
import { Avatar } from './Avatar';
import { formatDistanceToNow } from 'date-fns';
import { Send, Trash2 } from 'lucide-react';
import { format } from 'date-fns';


interface PostCommentsProps {
  postId: string;
}

export const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
  const { user } = useAuthStore();
  const { fetchComments, addComment, deleteComment, comments } = usePostStore();
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const postComments = comments[postId] || [];
  
  useEffect(() => {
    const loadComments = async () => {
      setIsLoading(true);
      await fetchComments(postId);
      setIsLoading(false);
    };
    
    loadComments();
  }, [fetchComments, postId]);
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const success = await addComment(postId, newComment);
    if (success) {
      setNewComment('');
    }
  };
  
  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(commentId, postId);
  };
  
  return (
    <div className="border-t border-gray-100 p-4">
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="flex gap-3 mb-4">
        <Avatar size="sm" />
        <div className="flex-1 relative">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-4 py-2 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 disabled:text-gray-300"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
      
      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
            <p className="text-sm text-gray-500 mt-2">Loading comments...</p>
          </div>
        ) : postComments.length === 0 ? (
          <p className="text-center text-gray-500 py-2">No comments yet. Be the first to comment!</p>
        ) : (
          postComments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar 
                src={comment.user.avatar_url} 
                seed={comment.user.email}
                size="sm"
                tier={comment.user.tier}
              />
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="font-semibold text-sm">{comment.user.email}</div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                <span>{format(new Date(comment.created_at), "MMM d, h:mm a")}</span>


                  
                  {user?.id === comment.user_id && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="ml-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};