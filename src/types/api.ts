export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

export interface Post {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  category?: string;
  pinned?: boolean;
  likes_count?: number;
  comments_count?: number;
  media_url?: string;
  media_type?: string;
  user: {
    email: string;
    avatar_url?: string;
    tier?: string;
  };
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user: {
    email: string;
    avatar_url?: string;
    tier?: string;
  };
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string;
  user_id: string;
  approved: boolean;
  approval_status: string;
  created_at: string;
  updated_at: string;
  user: {
    email: string;
    avatar_url?: string;
  };
}

export interface Notification {
  id: string;
  user_id: string;
  content: string;
  read: boolean;
  type?: string;
  reference_id?: string;
  created_at: string;
  user: {
    email: string;
  };
  reference?: any;
}

export interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  bio: string;
  banner_color: string;
  avatar_url?: string;
  avatar_type?: string;
  points?: number;
  tier?: string;
  created_at: string;
  updated_at: string;
}

export interface InviteRequest {
  id: string;
  email: string;
  name: string;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface HomeRequest {
  id: string;
  email: string;
  name: string;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}