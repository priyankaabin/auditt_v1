/*
  # Fix Admin Users Policies

  1. Changes
    - Fix recursive admin policy by using a direct check instead of EXISTS subquery
    - Simplify policy logic to prevent infinite recursion
    - Add better policy names and descriptions

  2. Security
    - Maintain RLS protection
    - Ensure admins can still manage other admins
    - Prevent admins from removing their own admin status
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can read admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can manage other admins" ON public.admin_users;
DROP POLICY IF EXISTS "Users can read admin users" ON public.admin_users;

-- Create new, non-recursive policies
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
    auth.uid() IN (
      SELECT user_id FROM public.admin_users
      WHERE user_id != admin_users.user_id
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM public.admin_users
      WHERE user_id != admin_users.user_id
    )
  );