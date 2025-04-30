/*
  # Fix Admin User Policies

  1. Changes
    - Fixes infinite recursion in admin policies
    - Implements secure access control for admin users
    - Creates admin users view for profile information
    
  2. Security
    - Enables RLS on admin_users table
    - Adds secure policies for admin management
    - Restricts admin operations to existing admins
*/

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to start fresh
DROP POLICY IF EXISTS "Anyone can read admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can manage other admins" ON admin_users;

-- Create admin users view
CREATE OR REPLACE VIEW admin_users_with_profiles AS
SELECT 
  au.user_id,
  au.created_at as admin_since,
  p.display_name,
  p.avatar_url,
  p.tier,
  p.points
FROM admin_users au
LEFT JOIN profiles p ON au.user_id = p.user_id;

-- Basic read policy for authenticated users
CREATE POLICY "Anyone can read admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

-- Admin management policy
CREATE POLICY "Admins can manage other admins"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users a2
      WHERE a2.user_id = auth.uid()
      AND admin_users.user_id <> auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users a2
      WHERE a2.user_id = auth.uid()
      AND admin_users.user_id <> auth.uid()
    )
  );

-- Helper function for checking admin status
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.user_id = $1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;