/*
  # Fix posts RLS policies and add missing fields

  1. Changes
    - Update RLS policies for posts table
    - Ensure proper user access control
  
  2. Security
    - Fix policies for authenticated users to create their own posts
*/

-- Drop existing policies if they're causing issues
DROP POLICY IF EXISTS "Users can create their own posts" ON posts;

-- Create new policy with proper checks
CREATE POLICY "Users can create their own posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Ensure posts table has the right columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'posts' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE posts ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'posts' AND column_name = 'category'
  ) THEN
    ALTER TABLE posts ADD COLUMN category text;
  END IF;
END $$;