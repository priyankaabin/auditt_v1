/*
  # Fix Admin Functionality

  1. Admin Users Table
    - Recreate admin_users table with proper structure
    - Add proper foreign key constraints
    - Set up correct RLS policies

  2. Admin Views
    - Create admin view for better data access
    - Add secure policies
*/

-- Drop existing admin policies and table
DROP POLICY IF EXISTS "Admins can manage admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Users can read admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Anyone can read admin users" ON public.admin_users;

-- Recreate admin_users table
DROP TABLE IF EXISTS public.admin_users CASCADE;
CREATE TABLE public.admin_users (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create admin policies
CREATE POLICY "Enable read access for authenticated users"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Enable insert for authenticated users with admin check"
    ON public.admin_users
    FOR INSERT
    TO authenticated
    WITH CHECK (
        -- Allow if no admins exist (first admin) or if user is already admin
        NOT EXISTS (SELECT 1 FROM public.admin_users)
        OR 
        EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Enable delete for admins only"
    ON public.admin_users
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE user_id = auth.uid()
        )
    );

-- Create function to handle first user as admin
CREATE OR REPLACE FUNCTION public.handle_first_user_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.admin_users) THEN
    INSERT INTO public.admin_users (user_id)
    VALUES (NEW.id);
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for first user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_first_user_admin();

-- Create admin view for better data access
CREATE OR REPLACE VIEW public.admin_users_view AS
SELECT 
    au.id,
    au.user_id,
    au.created_at,
    p.display_name,
    p.avatar_url,
    u.email
FROM public.admin_users au
JOIN auth.users u ON au.user_id = u.id
LEFT JOIN public.profiles p ON au.user_id = p.user_id;

-- Grant access to the view
GRANT SELECT ON public.admin_users_view TO authenticated;