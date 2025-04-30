/*
  # Admin Users Management

  1. Functions
    - Creates a function to check admin status
    - Adds helper functions for admin management
    
  2. Security
    - Updates admin_users table policies
    - Ensures proper access control for admin operations
*/

-- Function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = $1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is first user
CREATE OR REPLACE FUNCTION is_first_user()
RETURNS boolean AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM auth.users
    WHERE deleted_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Admins can manage admin users" ON public.admin_users;
  DROP POLICY IF EXISTS "Admins can manage other admins" ON public.admin_users;
  DROP POLICY IF EXISTS "Anyone can read admin users" ON public.admin_users;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Enable RLS on admin_users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create new policies for admin_users table
CREATE POLICY "Anyone can read admin users"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage other admins"
  ON public.admin_users
  FOR ALL
  TO authenticated
  USING (
    -- Can't modify own admin status
    user_id != auth.uid() 
    AND 
    -- Must be an admin to manage other admins
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    -- Can't modify own admin status
    user_id != auth.uid() 
    AND 
    -- Must be an admin to manage other admins
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- Trigger function to make first user an admin
CREATE OR REPLACE FUNCTION handle_first_user_admin()
RETURNS trigger AS $$
BEGIN
  IF (SELECT is_first_user()) THEN
    INSERT INTO public.admin_users (user_id)
    VALUES (NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to handle first user
DO $$ 
BEGIN
  DROP TRIGGER IF EXISTS first_user_admin ON auth.users;
  CREATE TRIGGER first_user_admin
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_first_user_admin();
EXCEPTION
  WHEN undefined_column THEN NULL;
END $$;