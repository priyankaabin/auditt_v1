
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VideoStatusTabs } from '../components/VideoStatusTabs';
import { VideoGrid } from '../components/VideoGrid';
import toast from 'react-hot-toast';


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

interface VideoApprovalProps {
  pendingVideos: VideoData[];
  approvedVideos: VideoData[];
  rejectedVideos: VideoData[];
  onStatusUpdate: () => void;
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

export default function VideoApproval({ 
  pendingVideos: initialPendingVideos, 
  approvedVideos: initialApprovedVideos, 
  rejectedVideos: initialRejectedVideos, 
  onStatusUpdate 
}: VideoApprovalProps) {
  const [activeStatus, setActiveStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [pendingVideos, setPendingVideos] = useState(initialPendingVideos);
  const [approvedVideos, setApprovedVideos] = useState(initialApprovedVideos);
  const [rejectedVideos, setRejectedVideos] = useState(initialRejectedVideos);
  
  const token = localStorage.getItem('authToken');

  const updateVideoStatus = async (videoId: number, action: 'approve' | 'reject') => {
    try {
      await api.put(`/auth/videos/${videoId}/approve_reject?action=${action}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Update local state immediately
      const videoToMove = pendingVideos.find(v => v.id === videoId);
      if (videoToMove) {
        const updatedVideo = { ...videoToMove, isVideoApproved: action === 'approve', isVideoRejected: action === 'reject' };
        setPendingVideos(pendingVideos.filter(v => v.id !== videoId));
        if (action === 'approve') setApprovedVideos([updatedVideo, ...approvedVideos]);
        if (action === 'reject') setRejectedVideos([updatedVideo, ...rejectedVideos]);
      }
      
      toast.success(`Video ${action}d successfully!`);
      onStatusUpdate(); // Update parent state
    } catch (error) {
      console.error(`Error ${action}ing video:`, error);
      toast.error(`Failed to ${action} the video.`);
    }
  };

  useEffect(() => {
    setPendingVideos(initialPendingVideos);
    setApprovedVideos(initialApprovedVideos);
    setRejectedVideos(initialRejectedVideos);
  }, [initialPendingVideos, initialApprovedVideos, initialRejectedVideos]);

  const counts = {
    pending: pendingVideos.length,
    approved: approvedVideos.length,
    rejected: rejectedVideos.length
  };

  const getActiveVideos = () => {
    switch (activeStatus) {
      case 'pending':
        return pendingVideos;
      case 'approved':
        return approvedVideos;
      case 'rejected':
        return rejectedVideos;
      default:
        return [];
    }
  };

  return (
    <div>
      <VideoStatusTabs
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        counts={counts}
      />
      
      <VideoGrid
        videos={getActiveVideos()}
        status={activeStatus}
        onApprove={activeStatus === 'pending' ? (id) => updateVideoStatus(id, 'approve') : undefined}
        onReject={activeStatus === 'pending' ? (id) => updateVideoStatus(id, 'reject') : undefined}
      />
    </div>
  );
}

