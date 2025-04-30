/*
  # Fix Admin Access and Policies

  1. Changes
    - Adds proper RLS policies for admin users
    - Creates helper functions for admin checks
    - Fixes admin user management
    
  2. Security
    - Enables RLS on admin_users table
    - Adds secure policies for admin management
*/

-- Drop existing policies and functions
DROP POLICY IF EXISTS "Admins can manage other admins" ON admin_users;
DROP POLICY IF EXISTS "Anyone can read admin users" ON admin_users;
DROP FUNCTION IF EXISTS is_admin_secure;

-- Create secure admin check function
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = $1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on admin_users if not already enabled
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users table
CREATE POLICY "Admins can view all admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Super admins can manage other admins"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    -- Can't modify your own admin status
    user_id <> auth.uid() AND 
    -- Must be an admin to manage other admins
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    -- Can't modify your own admin status
    user_id <> auth.uid() AND 
    -- Must be an admin to manage other admins
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- Create view for admin users with profiles
CREATE OR REPLACE VIEW admin_users_with_profiles AS
SELECT 
  au.user_id,
  au.created_at as admin_since,
  p.display_name,
  p.avatar_url,
  p.tier,
  p.points
FROM public.admin_users au
LEFT JOIN public.profiles p ON au.user_id = p.user_id;

-- Grant access to the view
GRANT SELECT ON admin_users_with_profiles TO authenticated;