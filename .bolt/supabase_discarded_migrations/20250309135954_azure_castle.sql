/*
  # Initial Database Schema

  1. Tables
    - users: Core user accounts
    - profiles: User profile information
    - posts: User posts/content
    - post_likes: Post like tracking
    - post_comments: Post comments
    - video_posts: Video content
    - notifications: User notifications
    - invite_requests: Join request management
    - admin_users: Admin user tracking

  2. Security
    - UUID primary keys for all tables
    - Foreign key constraints with CASCADE delete
    - Timestamps for auditing
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  display_name TEXT,
  bio TEXT,
  banner_color TEXT DEFAULT 'from-purple-500 via-blue-500 to-orange-500',
  avatar_url TEXT,
  avatar_type TEXT DEFAULT 'initials',
  points INTEGER DEFAULT 0,
  tier TEXT DEFAULT 'bronze',
  theme_color TEXT DEFAULT 'blue',
  theme_font_size TEXT DEFAULT 'medium',
  theme_dark_mode BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  category TEXT,
  pinned BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  media_url TEXT,
  media_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Post likes table
CREATE TABLE IF NOT EXISTS post_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Post comments table
CREATE TABLE IF NOT EXISTS post_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Video posts table
CREATE TABLE IF NOT EXISTS video_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  approved BOOLEAN DEFAULT false,
  approval_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  type TEXT,
  reference_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Invite requests table
CREATE TABLE IF NOT EXISTS invite_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  reason TEXT,
  status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Create functions for triggers
CREATE OR REPLACE FUNCTION update_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_user_points()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Add points based on action type
    IF TG_TABLE_NAME = 'post_likes' THEN
      UPDATE profiles SET points = points + 1 WHERE user_id = NEW.user_id;
    ELSIF TG_TABLE_NAME = 'post_comments' THEN
      UPDATE profiles SET points = points + 2 WHERE user_id = NEW.user_id;
    END IF;
    
    -- Update tier based on points
    UPDATE profiles
    SET tier = 
      CASE 
        WHEN points >= 600 THEN 'diamond'
        WHEN points >= 400 THEN 'gold'
        WHEN points >= 200 THEN 'silver'
        ELSE 'bronze'
      END
    WHERE user_id = NEW.user_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_video_approval_notification()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.approval_status != OLD.approval_status THEN
    INSERT INTO notifications (
      user_id,
      content,
      type,
      reference_id
    ) VALUES (
      NEW.user_id,
      CASE 
        WHEN NEW.approval_status = 'approved' THEN 'Your video has been approved!'
        WHEN NEW.approval_status = 'rejected' THEN 'Your video was not approved.'
        ELSE 'Your video status has been updated.'
      END,
      'video_approval',
      NEW.id
    );
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_invite_request_notification()
RETURNS TRIGGER AS $$
DECLARE
  admin_id UUID;
BEGIN
  -- Get first admin user
  SELECT user_id INTO admin_id FROM admin_users LIMIT 1;
  
  IF admin_id IS NOT NULL THEN
    INSERT INTO notifications (
      user_id,
      content,
      type,
      reference_id
    ) VALUES (
      admin_id,
      'New join request from ' || NEW.name,
      'invite_request',
      NEW.id
    );
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER after_post_like_insert
  AFTER INSERT ON post_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_post_like_count();

CREATE TRIGGER after_post_like_delete
  AFTER DELETE ON post_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_post_like_count();

CREATE TRIGGER after_post_comment_insert
  AFTER INSERT ON post_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_post_comment_count();

CREATE TRIGGER after_post_comment_delete
  AFTER DELETE ON post_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_post_comment_count();

CREATE TRIGGER after_post_like_insert_points
  AFTER INSERT ON post_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_user_points();

CREATE TRIGGER after_post_comment_insert_points
  AFTER INSERT ON post_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_user_points();

CREATE TRIGGER on_video_approval_status_change
  AFTER UPDATE OF approval_status ON video_posts
  FOR EACH ROW
  EXECUTE FUNCTION create_video_approval_notification();

CREATE TRIGGER after_invite_request_insert
  AFTER INSERT ON invite_requests
  FOR EACH ROW
  EXECUTE FUNCTION create_invite_request_notification();