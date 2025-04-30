/*
  # Database Schema Migration

  1. Changes
    - Drops existing objects in correct order
    - Creates tables with proper dependencies
    - Sets up RLS policies
    - Creates trigger functions
    - Creates triggers
    
  2. Security
    - Enables RLS on all tables
    - Sets up appropriate policies
*/

-- Drop existing objects in correct order
DROP TRIGGER IF EXISTS on_video_approval_status_change ON video_posts;
DROP TRIGGER IF EXISTS after_invite_request_insert ON invite_requests;
DROP TRIGGER IF EXISTS after_post_comment_insert_points ON post_comments;
DROP TRIGGER IF EXISTS after_post_like_insert_points ON post_likes;
DROP TRIGGER IF EXISTS after_post_comment_delete ON post_comments;
DROP TRIGGER IF EXISTS after_post_comment_insert ON post_comments;
DROP TRIGGER IF EXISTS after_post_like_delete ON post_likes;
DROP TRIGGER IF EXISTS after_post_like_insert ON post_likes;

DROP FUNCTION IF EXISTS create_video_approval_notification();
DROP FUNCTION IF EXISTS create_invite_request_notification();
DROP FUNCTION IF EXISTS update_user_points();
DROP FUNCTION IF EXISTS update_post_comment_count();
DROP FUNCTION IF EXISTS update_post_like_count();

DROP TABLE IF EXISTS video_posts CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS invite_requests CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS post_comments CASCADE;
DROP TABLE IF EXISTS post_likes CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create base tables first (no foreign key dependencies)
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE admin_users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Now create tables that depend on users and admin_users
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name text,
  bio text,
  banner_color text DEFAULT 'from-purple-500 via-blue-500 to-orange-500',
  avatar_url text,
  avatar_type text DEFAULT 'initials',
  points integer DEFAULT 0,
  tier text DEFAULT 'bronze',
  theme_color text DEFAULT 'blue',
  theme_font_size text DEFAULT 'medium',
  theme_dark_mode boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  content text NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  category text,
  pinned boolean DEFAULT false,
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  media_url text,
  media_type text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE post_likes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

CREATE TABLE post_comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  read boolean DEFAULT false,
  type text,
  reference_id uuid,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE invite_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  reason text,
  status text DEFAULT 'pending',
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE video_posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  video_url text NOT NULL,
  thumbnail_url text,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  approved boolean DEFAULT false,
  approval_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE invite_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for users
CREATE POLICY "Users can read any user"
  ON users FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for admin_users
CREATE POLICY "Anyone can read admin status"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only first user or existing admin can create admin"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    NOT EXISTS (SELECT 1 FROM admin_users)
    OR EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid()
    )
  );

-- Create policies for profiles
CREATE POLICY "Users can read any profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for posts
CREATE POLICY "Users can read all posts"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for post_likes
CREATE POLICY "Users can read all likes"
  ON post_likes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own likes"
  ON post_likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes"
  ON post_likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for post_comments
CREATE POLICY "Users can read all comments"
  ON post_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own comments"
  ON post_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON post_comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for notifications
CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for invite_requests
CREATE POLICY "Anyone can create invite requests"
  ON invite_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read invite requests"
  ON invite_requests FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Admins can update invite requests"
  ON invite_requests FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  ));

-- Create policies for video_posts
CREATE POLICY "Users can read approved videos"
  ON video_posts FOR SELECT
  TO authenticated
  USING (approved = true OR auth.uid() = user_id);

CREATE POLICY "Users can create own videos"
  ON video_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update video status"
  ON video_posts FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  ));

-- Create functions
CREATE OR REPLACE FUNCTION update_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts 
    SET likes_count = likes_count + 1
    WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts 
    SET likes_count = GREATEST(likes_count - 1, 0)
    WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts 
    SET comments_count = comments_count + 1
    WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts 
    SET comments_count = GREATEST(comments_count - 1, 0)
    WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_user_points()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles 
  SET 
    points = points + 1,
    tier = CASE
      WHEN points + 1 >= 600 THEN 'diamond'
      WHEN points + 1 >= 400 THEN 'gold'
      WHEN points + 1 >= 200 THEN 'silver'
      ELSE 'bronze'
    END
  WHERE user_id = NEW.user_id;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_invite_request_notification()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (user_id, content, type, reference_id)
  SELECT 
    admin_users.user_id,
    'New join request from ' || NEW.name || ' (' || NEW.email || ')',
    'invite_request',
    NEW.id
  FROM admin_users;
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
        WHEN NEW.approval_status = 'approved' THEN 'Your video "' || NEW.title || '" has been approved!'
        WHEN NEW.approval_status = 'rejected' THEN 'Your video "' || NEW.title || '" was not approved.'
        ELSE 'Your video status has been updated.'
      END,
      'video_approval',
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

CREATE TRIGGER after_invite_request_insert
  AFTER INSERT ON invite_requests
  FOR EACH ROW
  EXECUTE FUNCTION create_invite_request_notification();

CREATE TRIGGER on_video_approval_status_change
  AFTER UPDATE OF approval_status ON video_posts
  FOR EACH ROW
  EXECUTE FUNCTION create_video_approval_notification();