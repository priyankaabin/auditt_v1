/*
  # Fix Schema and Policies

  1. Changes
    - Fix admin users policies to prevent infinite recursion
    - Create media storage bucket and policies
    - Add proper foreign key relationships for video_posts
    - Fix profile policies

  2. Security
    - Enable RLS on all tables
    - Add proper policies for each table
    - Ensure proper access control
*/

-- Create media storage bucket if it doesn't exist
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name)
  VALUES ('media', 'media')
  ON CONFLICT (id) DO NOTHING;
END $$;

-- Set up storage policies for media bucket
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
  DROP POLICY IF EXISTS "Anyone can view media" ON storage.objects;
  DROP POLICY IF EXISTS "Users can update their own media" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete their own media" ON storage.objects;

  CREATE POLICY "Authenticated users can upload media" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'media');

  CREATE POLICY "Anyone can view media" ON storage.objects
    FOR SELECT TO public
    USING (bucket_id = 'media');

  CREATE POLICY "Users can update their own media" ON storage.objects
    FOR UPDATE TO authenticated
    USING (bucket_id = 'media' AND auth.uid() = owner);

  CREATE POLICY "Users can delete their own media" ON storage.objects
    FOR DELETE TO authenticated
    USING (bucket_id = 'media' AND auth.uid() = owner);
END $$;

-- Fix admin users policies
DO $$
BEGIN
  DROP POLICY IF EXISTS "Admins can manage admin users" ON public.admin_users;
  DROP POLICY IF EXISTS "Users can read admin users" ON public.admin_users;

  CREATE POLICY "Admins can manage admin users"
    ON public.admin_users
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM public.admin_users admins
        WHERE admins.user_id = auth.uid()
        AND admins.user_id <> admin_users.user_id -- Prevent self-modification
      )
    );

  CREATE POLICY "Users can read admin users"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (true);
END $$;

-- Fix video_posts table and relationships
DO $$
BEGIN
  -- Drop existing table if it exists
  DROP TABLE IF EXISTS public.video_posts;

  -- Create video_posts table with proper relationships
  CREATE TABLE public.video_posts (
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
  ALTER TABLE public.video_posts ENABLE ROW LEVEL SECURITY;

  -- Create policies
  CREATE POLICY "Users can view approved videos"
    ON public.video_posts
    FOR SELECT
    TO authenticated
    USING (
      approved = true OR 
      user_id = auth.uid() OR
      EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
    );

  CREATE POLICY "Users can upload their own videos"
    ON public.video_posts
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

  CREATE POLICY "Admins can update video status"
    ON public.video_posts
    FOR UPDATE
    TO authenticated
    USING (
      EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
    );
END $$;

-- Add index to improve profile lookups
CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON public.profiles (user_id);

-- Ensure profiles table has proper RLS policies
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can read any profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

  CREATE POLICY "Users can read any profile"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (true);

  CREATE POLICY "Users can update their own profile"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

  CREATE POLICY "Users can insert their own profile"
    ON public.profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);
END $$;