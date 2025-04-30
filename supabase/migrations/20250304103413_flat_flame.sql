/*
  # Fix admin_users policy recursion

  1. Changes
    - Fix infinite recursion in admin_users policy
    - Add direct access policy for admin_users table
*/

-- Drop the problematic policy if it exists
DROP POLICY IF EXISTS "Only admins can read admin_users" ON admin_users;

-- Create a new policy that doesn't cause recursion
CREATE POLICY "Users can read their own admin status"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create a policy for admins to see all admin users
CREATE POLICY "Admins can manage admin users"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  );