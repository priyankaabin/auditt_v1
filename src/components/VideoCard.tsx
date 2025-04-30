
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { User, Calendar, Check, X, Video } from 'lucide-react';
import { format } from "date-fns";

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

interface VideoCardProps {
  video: VideoData;
  onAction: (postId: number, action: 'approve' | 'reject') => void;
  status: 'pending' | 'approved' | 'rejected';
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onAction, status }) => {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{video.username}</h3>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                    <time dateTime={video.created_at}>
                  {format(new Date(video.created_at), "MMM d, h.mm a")}
                </time>
                {/* <time dateTime={video.created_at}>
                  {formatDistanceToNow(new Date(video.created_at), { addSuffix: true })}
                </time> */}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Video className="w-4 h-4 text-blue-500" />
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
              status === 'approved' ? 'bg-green-100 text-green-700' :
              'bg-red-100 text-red-700'
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mb-3">
          <h2 className="text-base font-semibold text-gray-900 mb-1">{video.title}</h2>
          <p className="text-sm text-gray-600 line-clamp-2">{video.content}</p>
          <div className="mt-1 text-xs text-gray-500">
            Category: <span className="font-medium">{video.category_name}</span>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-gray-900 rounded-md overflow-hidden mb-3">
          <iframe
            src={video.media_path}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Actions */}
        {status === 'pending' && (
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <button
              onClick={() => onAction(video.id, 'approve')}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 text-sm text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
            >
              <Check className="w-3 h-3" />
              Approve
            </button>
            <button
              onClick={() => onAction(video.id, 'reject')}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
              Reject
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

