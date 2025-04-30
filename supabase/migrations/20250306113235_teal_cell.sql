/*
  # Fix Admin Policies

  1. Changes
    - Fixes infinite recursion in admin policies
    - Simplifies admin access control
    - Adds proper RLS policies for admin users
    
  2. Security
    - Enables RLS on admin_users table
    - Adds secure policies for admin management
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Super admins can manage other admins" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Anyone can read admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage other admins"
  ON admin_users
  FOR ALL 
  TO authenticated
  USING (
    -- Must be an admin to manage other admins
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
    -- Can't modify your own admin status
    AND user_id <> auth.uid()
  )
  WITH CHECK (
    -- Must be an admin to manage other admins
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
    -- Can't modify your own admin status
    AND user_id <> auth.uid()
  );

-- Create helper function for checking admin status
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = $1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;