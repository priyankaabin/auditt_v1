/*
  # Fix Video Posts Table and Relationships

  1. Changes
    - Creates video_posts table with proper foreign key relationships
    - Adds RLS policies for video management
    - Adds trigger for video approval notifications
    
  2. Security
    - Enables RLS on video_posts table
    - Adds policies for user and admin access
*/

-- Drop existing video_posts table if it exists
DROP TABLE IF EXISTS video_posts;

-- Create video_posts table
CREATE TABLE video_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  video_url text NOT NULL,
  thumbnail_url text,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  approved boolean DEFAULT false,
  approval_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE video_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can upload their own videos"
  ON video_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view approved videos"
  ON video_posts
  FOR SELECT
  TO authenticated
  USING (
    approved = true OR 
    user_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update video status"
  ON video_posts
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- Create function for video approval notifications
CREATE OR REPLACE FUNCTION create_video_approval_notification()
RETURNS trigger AS $$
BEGIN
  IF NEW.approval_status <> OLD.approval_status THEN
    INSERT INTO notifications (
      user_id,
      content,
      type,
      reference_id
    )
    VALUES (
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
CREATE TRIGGER on_video_approval_status_change
  AFTER UPDATE OF approval_status ON video_posts
  FOR EACH ROW
  EXECUTE FUNCTION create_video_approval_notification();