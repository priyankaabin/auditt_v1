import React, { useState, useEffect } from 'react';
import { useVideoStore } from '../store/videoStore';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import { useProfileStore } from '../store/profileStore';
import { Avatar } from '../components/Avatar';
import { VideoUploader } from '../components/VideoUploader';
import { formatDistanceToNow } from 'date-fns';
import { Play, Plus, Maximize, X } from 'lucide-react';

export default function VideoFeed() {
  const { videos, isLoading, fetchVideos } = useVideoStore();
  const { color } = useThemeStore();
  const { avatarUrl, tier } = useProfileStore();
  const themeColors = getThemeColors(color);
  
  const [showUploader, setShowUploader] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);
  
  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };
  
  const closeVideoModal = () => {
    setSelectedVideo(null);
  };
  
  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Video Feed</h1>
        <button
          onClick={() => setShowUploader(true)}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
          style={{ backgroundColor: themeColors.primary }}
        >
          <Plus className="w-5 h-5" />
          Upload Video
        </button>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading videos...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-gray-600 mb-4">
            No videos available yet. Be the first to share a video!
          </p>
          <button 
            onClick={() => setShowUploader(true)}
            className="inline-flex items-center px-6 py-3 text-white rounded-lg transition-colors font-semibold"
            style={{ backgroundColor: themeColors.primary }}
          >
            <Plus className="w-5 h-5 mr-2" />
            Upload Video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div 
                className="relative h-48 bg-gray-900 flex items-center justify-center cursor-pointer group"
                onClick={() => handleVideoClick(video.video_url)}
              >
                {video.thumbnail_url ? (
                  <img 
                    src={video.thumbnail_url} 
                    alt={video.title} 
                    className="w-full h-full object-cover opacity-70"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
                )}
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white bg-opacity-20 rounded-full p-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black bg-opacity-50 rounded-full p-2">
                    <Maximize className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                
                <div className="flex items-center gap-3 mt-3">
                  <Avatar 
                    src={video.user.avatar_url} 
                    seed={video.user.email}
                    size="sm"
                    tier={tier}
                  />
                  <div>
                    <div className="text-sm font-medium">{video.user.email}</div>
                    <div className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(video.created_at), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showUploader && (
        <VideoUploader onClose={() => setShowUploader(false)} />
      )}
      
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeVideoModal}
        >
          <div 
            className="max-w-4xl max-h-[90vh] bg-black rounded-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
              onClick={closeVideoModal}
            >
              <X className="w-6 h-6" />
            </button>
            <video 
              src={selectedVideo} 
              controls 
              autoPlay
              className="max-w-full max-h-[90vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}