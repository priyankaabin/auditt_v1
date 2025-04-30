/*
  # Fix video_posts foreign key relationship

  1. Changes
    - Add proper foreign key relationship for user_id in video_posts table
*/

-- Fix the foreign key relationship for video_posts
ALTER TABLE video_posts DROP CONSTRAINT IF EXISTS video_posts_user_id_fkey;

-- Re-add the constraint with proper reference
ALTER TABLE video_posts 
  ADD CONSTRAINT video_posts_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;