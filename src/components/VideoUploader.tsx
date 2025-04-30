import React, { useState, useRef } from 'react';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import { Video, X, Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { useVideoStore } from '../store/videoStore';

interface VideoUploaderProps {
  onClose: () => void;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({ onClose }) => {
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);
  const { uploadVideo } = useVideoStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('video/')) {
      setError('Please select a video file');
      return;
    }
    
    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size should be less than 50MB');
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Set default title from filename
    if (!title) {
      setTitle(file.name.split('.')[0]);
    }
    
    // Clear error
    setError('');
  };
  
  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    
    if (!title.trim()) {
      setError('Please enter a title for your video');
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `videos/${fileName}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
          }
        });
      
      if (error) throw error;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);
      
      // Create video post
      const success = await uploadVideo({
        title,
        description,
        video_url: urlData.publicUrl
      });
      
      if (success) {
        onClose();
      } else {
        throw new Error('Failed to create video post');
      }
    } catch (error: any) {
      console.error("Video upload failed", error);
      setError(error.message || 'Failed to upload video');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Upload Video</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Video Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ focusRing: themeColors.primary }}
            placeholder="Enter a title for your video"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent min-h-[80px]"
            style={{ focusRing: themeColors.primary }}
            placeholder="Describe your video (optional)"
          />
        </div>
        
        {preview ? (
          <div className="mb-4">
            <video 
              src={preview} 
              controls 
              className="w-full max-h-[300px] rounded-lg"
            />
          </div>
        ) : (
          <div className="mb-4">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Video className="w-12 h-12 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  MP4, WebM or OGG (MAX. 50MB)
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="video/*"
                onChange={handleFileSelect}
              />
            </label>
          </div>
        )}
        
        {isUploading && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full" 
                style={{ 
                  width: `${uploadProgress}%`,
                  backgroundColor: themeColors.primary
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1 text-center">
              Uploading: {uploadProgress}%
            </p>
          </div>
        )}
        
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            disabled={isUploading}
          >
            Cancel
          </button>
          
          {preview && (
            <button
              onClick={handleUpload}
              className="px-4 py-2 text-white rounded-lg flex items-center gap-2"
              style={{ backgroundColor: themeColors.primary }}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4" />
              {isUploading ? 'Uploading...' : 'Upload Video'}
            </button>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg">
          <p className="text-sm">
            <strong>Note:</strong> All videos require approval before they appear in the public feed. 
            You'll receive a notification once your video has been reviewed.
          </p>
        </div>
      </div>
    </div>
  );
};