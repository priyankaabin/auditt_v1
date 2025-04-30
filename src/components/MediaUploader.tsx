
import React, { useState, useRef } from 'react';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import { Image, Video, X } from 'lucide-react';

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

interface MediaUploaderProps {
  onMediaUpload: (url: string, type: 'image' | 'video') => void;
  onCancel: () => void;
  mediaType: 'image' | 'video';
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({ 
  onMediaUpload, 
  onCancel,
  mediaType
}) => {
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  
  
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (mediaType === 'image' && !file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    
    if (mediaType === 'video' && !file.type.startsWith('video/')) {
      setError('Please select a video file');
      return;
    }
    
    // Validate file size (10MB for images, 50MB for videos)
    const maxSize = mediaType === 'image' ? 10 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`File size should be less than ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    // Start upload immediately after file selection
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', mediaType);
      
      const { data } = await api.post('/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        }
      });
      
      if (data?.url) {
        onMediaUpload(data.url, mediaType);
      } else {
        throw new Error(`Failed to upload ${mediaType}`);
      }
    } catch (error: any) {
      console.error("Media upload failed", error);
      setError(error.response?.data?.message || `Failed to upload ${mediaType}`);
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          Upload {mediaType === 'image' ? 'Photo' : 'Video'}
        </h3>
        <button 
          onClick={onCancel}
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
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {mediaType === 'image' ? (
              <Image className="w-12 h-12 mb-3 text-gray-400" />
            ) : (
              <Video className="w-12 h-12 mb-3 text-gray-400" />
            )}
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {mediaType === 'image' 
                ? 'PNG, JPG or GIF (MAX. 10MB)' 
                : 'MP4, WebM or OGG (MAX. 50MB)'}
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={mediaType === 'image' ? 'image/*' : 'video/*'}
            onChange={handleFileSelect}
          />
        </label>
      </div>
      
      {isUploading && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="h-2.5 rounded-full transition-all duration-300" 
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
    </div>
  );
};