export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
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
        };
        Insert: {
          content: string;
          user_id?: string;
          created_at?: string;
          category?: string;
          pinned?: boolean;
          media_url?: string;
          media_type?: string;
        };
        Update: {
          content?: string;
          category?: string;
          pinned?: boolean;
          media_url?: string;
          media_type?: string;
        };
      };
      video_posts: {
        Row: {
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
        };
        Insert: {
          title: string;
          description?: string;
          video_url: string;
          thumbnail_url?: string;
          user_id?: string;
          approved?: boolean;
          approval_status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          video_url?: string;
          thumbnail_url?: string;
          approved?: boolean;
          approval_status?: string;
          updated_at?: string;
        };
      };
      videos: {
        Row: {
          id: string;
          title: string;
          url: string;
          user_id: string;
          approved: boolean;
          created_at: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          read: boolean;
          created_at: string;
          type?: string;
          reference_id?: string;
        };
        Insert: {
          user_id: string;
          content: string;
          read?: boolean;
          created_at?: string;
          type?: string;
          reference_id?: string;
        };
        Update: {
          read?: boolean;
        };
      };
      profiles: {
        Row: {
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
        };
        Insert: {
          user_id: string;
          display_name?: string;
          bio?: string;
          banner_color?: string;
          avatar_url?: string;
          avatar_type?: string;
          points?: number;
          tier?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          display_name?: string;
          bio?: string;
          banner_color?: string;
          avatar_url?: string;
          avatar_type?: string;
          points?: number;
          tier?: string;
          updated_at?: string;
        };
      };
      post_likes: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          post_id: string;
          user_id?: string;
          created_at?: string;
        };
      };
      post_comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          post_id: string;
          user_id?: string;
          content: string;
          created_at?: string;
        };
        Update: {
          content?: string;
        };
      };
      invite_requests: {
        Row: {
          id: string;
          email: string;
          name: string;
          reason?: string;
          status: string;
          admin_notes?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          email: string;
          name: string;
          reason?: string;
          status?: string;
          admin_notes?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: string;
          admin_notes?: string;
          updated_at?: string;
        };
      };
      admin_users: {
        Row: {
          user_id: string;
          created_at: string;
        };
      };
    };
  };
}