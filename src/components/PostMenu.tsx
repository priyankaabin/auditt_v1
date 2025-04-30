import React, { useState } from 'react';
import { Post } from '../config/environment';
import { usePostStore } from '../store/postStore';
import { CATEGORIES } from '../store/postStore';
import { Edit, Trash2, Pin, X } from 'lucide-react';

interface PostMenuProps {
  post: Post;
  onClose: () => void;
}

export const PostMenu: React.FC<PostMenuProps> = ({ post, onClose }) => {
  const { updatePost, deletePost, togglePinPost } = usePostStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [editCategory, setEditCategory] = useState(post.category || 'Community and Leadership');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSaveEdit = async () => {
    if (editContent.trim()) {
      const success = await updatePost(post.id, editContent, editCategory);
      if (success) {
        setIsEditing(false);
        onClose();
      }
    }
  };
  
  const handleDelete = async () => {
    if (isDeleting) {
      const success = await deletePost(post.id);
      if (success) {
        onClose();
      }
    } else {
      setIsDeleting(true);
    }
  };
  
  const handleTogglePin = async () => {
    await togglePinPost(post.id, !post.pinned);
    onClose();
  };
  
  if (isEditing) {
    return (
      <div className="absolute right-0 top-8 w-80 bg-white rounded-lg shadow-lg z-10 p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Edit Post</h3>
          <button 
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:border-transparent min-h-[120px] text-gray-700 mb-3"
        />
        
        <div className="mb-3">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none"
          >
            {CATEGORIES.slice(1).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveEdit}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    );
  }
  
  if (isDeleting) {
    return (
      <div className="absolute right-0 top-8 w-64 bg-white rounded-lg shadow-lg z-10 p-4">
        <p className="text-sm mb-3">Are you sure you want to delete this post?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsDeleting(false)}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg z-10">
      <ul className="py-2">
        <li>
          <button
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            onClick={handleEdit}
          >
            <Edit className="w-4 h-4" />
            Edit Post
          </button>
        </li>
        <li>
          <button
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            onClick={handleTogglePin}
          >
            <Pin className="w-4 h-4" />
            {post.pinned ? 'Unpin from Profile' : 'Pin to Profile'}
          </button>
        </li>
        <li>
          <button
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" />
            Delete Post
          </button>
        </li>
      </ul>
    </div>
  );
};