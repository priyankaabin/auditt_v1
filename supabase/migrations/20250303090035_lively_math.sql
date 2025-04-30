/*
  # Social Platform Update

  1. New Tables
    - `video_posts` - For storing video content
    - `user_points` - For tracking user gamification points
    - `invite_requests` - For managing invite requests
  
  2. Updates to Existing Tables
    - Add `points` and `tier` to `profiles`
    - Add `media_url` and `media_type` to `posts`
    - Add `approved` status to `videos`
  
  3. Security
    - Enable RLS on all new tables
    - Add appropriate policies for each table
*/

-- Add media support to posts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'posts' AND column_name = 'media_url'
  ) THEN
    ALTER TABLE posts ADD COLUMN media_url text;
    ALTER TABLE posts ADD COLUMN media_type text;
  END IF;
END $$;

-- Add gamification to profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'points'
  ) THEN
    ALTER TABLE profiles ADD COLUMN points integer DEFAULT 0;
    ALTER TABLE profiles ADD COLUMN tier text DEFAULT 'bronze';
  END IF;
END $$;

-- Create video_posts table
CREATE TABLE IF NOT EXISTS video_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  video_url text NOT NULL,
  thumbnail_url text,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  approved boolean DEFAULT false,
  approval_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create invite_requests table
CREATE TABLE IF NOT EXISTS invite_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  reason text,
  status text DEFAULT 'pending',
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add notification types for video approval and invite requests
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'notifications' AND column_name = 'type'
  ) THEN
    ALTER TABLE notifications ADD COLUMN type text;
    ALTER TABLE notifications ADD COLUMN reference_id uuid;
  END IF;
END $$;

-- Enable RLS on new tables
ALTER TABLE video_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE invite_requests ENABLE ROW LEVEL SECURITY;

-- Video posts policies
CREATE POLICY "Users can view approved videos"
  ON video_posts
  FOR SELECT
  TO authenticated
  USING (approved = true OR auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can upload their own videos"
  ON video_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own videos"
  ON video_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  ));

-- Invite requests policies
CREATE POLICY "Anyone can create invite requests"
  ON invite_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only admins can view invite requests"
  ON invite_requests
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Only admins can update invite requests"
  ON invite_requests
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  ));

-- Create function to update user points when they receive likes or comments
CREATE OR REPLACE FUNCTION update_user_points()
RETURNS TRIGGER AS $$
DECLARE
  post_owner_id uuid;
  current_points integer;
  new_tier text;
BEGIN
  -- Get the post owner's ID
  IF TG_TABLE_NAME = 'post_likes' THEN
    SELECT user_id INTO post_owner_id FROM posts WHERE id = NEW.post_id;
  ELSIF TG_TABLE_NAME = 'post_comments' THEN
    SELECT user_id INTO post_owner_id FROM posts WHERE id = NEW.post_id;
  END IF;
  
  -- Update points
  UPDATE profiles 
  SET points = points + 1
  WHERE user_id = post_owner_id
  RETURNING points INTO current_points;
  
  -- Update tier based on points
  IF current_points >= 600 THEN
    new_tier := 'diamond';
  ELSIF current_points >= 400 THEN
    new_tier := 'gold';
  ELSIF current_points >= 200 THEN
    new_tier := 'silver';
  ELSE
    new_tier := 'bronze';
  END IF;
  
  -- Update tier if changed
  IF new_tier IS NOT NULL THEN
    UPDATE profiles SET tier = new_tier WHERE user_id = post_owner_id;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for updating points
CREATE TRIGGER after_post_like_insert_points
AFTER INSERT ON post_likes
FOR EACH ROW
EXECUTE FUNCTION update_user_points();

CREATE TRIGGER after_post_comment_insert_points
AFTER INSERT ON post_comments
FOR EACH ROW
EXECUTE FUNCTION update_user_points();

-- Create function to create notifications for video approval
CREATE OR REPLACE FUNCTION create_video_approval_notification()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.approval_status != NEW.approval_status THEN
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
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for video approval notifications
CREATE TRIGGER after_video_approval_update
AFTER UPDATE OF approval_status ON video_posts
FOR EACH ROW
EXECUTE FUNCTION create_video_approval_notification();

-- Create function to create notifications for invite requests
CREATE OR REPLACE FUNCTION create_invite_request_notification()
RETURNS TRIGGER AS $$
BEGIN
  -- Notify all admins about new invite request
  IF TG_OP = 'INSERT' THEN
    INSERT INTO notifications (
      user_id,
      content,
      type,
      reference_id
    )
    SELECT 
      admin_users.user_id,
      'New invite request from ' || NEW.name || ' (' || NEW.email || ')',
      'invite_request',
      NEW.id
    FROM admin_users;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for invite request notifications
CREATE TRIGGER after_invite_request_insert
AFTER INSERT ON invite_requests
FOR EACH ROW
EXECUTE FUNCTION create_invite_request_notification();