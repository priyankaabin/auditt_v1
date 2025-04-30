/*
  # Fix Admin Users Policies

  1. Changes
    - Removes recursive policies that were causing infinite recursion
    - Implements proper admin user management policies
    - Adds function to safely check admin status
    
  2. Security
    - Ensures proper access control for admin operations
    - Prevents infinite recursion in policy checks
*/

-- Drop existing policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can read admin users" ON admin_users;
  DROP POLICY IF EXISTS "Admins can manage other admins" ON admin_users;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Create a secure function to check admin status without recursion
CREATE OR REPLACE FUNCTION is_admin_secure(check_user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM admin_users 
    WHERE user_id = check_user_id
  );
$$;

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
  -- Can't modify own admin status AND must be an admin
  user_id <> auth.uid() AND 
  is_admin_secure(auth.uid())
)
WITH CHECK (
  -- Can't modify own admin status AND must be an admin
  user_id <> auth.uid() AND 
  is_admin_secure(auth.uid())
);

-- Ensure first user becomes admin
CREATE OR REPLACE FUNCTION handle_first_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM admin_users
  ) THEN
    INSERT INTO admin_users (user_id)
    VALUES (NEW.id);
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for first user
DROP TRIGGER IF EXISTS make_first_user_admin ON auth.users;
CREATE TRIGGER make_first_user_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_first_user();