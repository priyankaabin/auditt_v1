/*
  # Admin User Setup

  1. New Tables
    - `admin_users`
      - `user_id` (uuid, primary key, references auth.users)
      - `created_at` (timestamp)

  2. Functions
    - Create trigger function to make first user an admin
    - Create trigger to handle admin user creation

  3. Security
    - Enable RLS on admin_users table
    - Add policies for admin access
*/

-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is first signup
CREATE OR REPLACE FUNCTION public.is_first_user()
RETURNS boolean AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM auth.users
    WHERE created_at < CURRENT_TIMESTAMP
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger function to make first user an admin
CREATE OR REPLACE FUNCTION public.handle_first_user_admin()
RETURNS trigger AS $$
BEGIN
  IF public.is_first_user() THEN
    INSERT INTO public.admin_users (user_id)
    VALUES (NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'make_first_user_admin'
  ) THEN
    CREATE TRIGGER make_first_user_admin
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION public.handle_first_user_admin();
  END IF;
END $$;

-- Create policies for admin_users table
DO $$
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Admins can read admin users" ON public.admin_users;
  DROP POLICY IF EXISTS "Admins can manage other admins" ON public.admin_users;

  -- Create new policies
  CREATE POLICY "Admins can read admin users"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (true);

  CREATE POLICY "Admins can manage other admins"
    ON public.admin_users
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM public.admin_users admins
        WHERE admins.user_id = auth.uid()
        AND admins.user_id <> admin_users.user_id
      )
    );
END $$;