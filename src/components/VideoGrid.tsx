
import React from 'react';
import { VideoCard } from './VideoCard';
import toast, { Toaster } from 'react-hot-toast';

interface VideoData {
  id: number;
  user_id: number;
  username: string;
  title: string;
  category: string;
  content: string;
  media_path: string;
  category_id: number;
  isVideo: boolean;
  isImage: boolean;
  isVideoApproved: boolean;
  isVideoRejected: boolean;
  created_at: string;
  updated_at: string;
  category_name: string;
}

interface VideoGridProps {
  videos: VideoData[];
  status: 'pending' | 'approved' | 'rejected';
  onApprove?: (videoId: number) => Promise<void>;
  onReject?: (videoId: number) => Promise<void>;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ videos, status, onApprove, onReject }) => {
  const handleAction = async (videoId: number, action: 'approve' | 'reject') => {
    try {
      if (action === 'approve' && onApprove) {
        await onApprove(videoId);
      } else if (action === 'reject' && onReject) {
        await onReject(videoId);
      }
    } catch (error: any) {
      console.error(`Error updating video status:`, error);
      toast.error(error.message || `Failed to ${action} the video.`);
    }
  };

  if (videos.length === 0) {
    return <div className="text-center py-8 text-gray-500">No {status} videos found.</div>;
  }

  return (
    <div>
      <Toaster position="top-right" />
      <div className="grid grid-cols-1 gap-6">
        {videos.map((video) => (
          <VideoCard 
            key={video.id} 
            video={video} 
            status={status} 
            onAction={handleAction} 
          />
        ))}
      </div>
    </div>
  );
};

