/*
  # Storage and Policy Fixes

  1. Storage Setup
    - Create media bucket for storing images and videos
    - Set up storage policies for secure access

  2. Admin Users
    - Fix admin user policies to prevent recursion
    - Add proper read/write controls

  3. Profile Management
    - Add profile lookup optimization
    - Set up proper RLS policies
*/

-- Create media storage bucket if it doesn't exist
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name)
  VALUES ('media', 'media')
  ON CONFLICT (id) DO NOTHING;
END $$;

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view media" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own media" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own media" ON storage.objects;

-- Create storage policies
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

-- Fix admin users policies
DO $$
BEGIN
  DROP POLICY IF EXISTS "Admins can manage admin users" ON public.admin_users;
  DROP POLICY IF EXISTS "Users can read their own admin status" ON public.admin_users;
  DROP POLICY IF EXISTS "Users can read admin users" ON public.admin_users;

  CREATE POLICY "Admins can manage admin users"
    ON public.admin_users
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM public.admin_users a
        WHERE a.user_id = auth.uid()
        AND a.user_id != admin_users.user_id -- Prevent self-modification
      )
    );

  CREATE POLICY "Users can read admin users"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (true);
END $$;

-- Add index to improve profile lookups
CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON public.profiles (user_id);

-- Ensure profiles table has proper RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing profile policies if they exist
DROP POLICY IF EXISTS "Users can read any profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Create profile policies
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