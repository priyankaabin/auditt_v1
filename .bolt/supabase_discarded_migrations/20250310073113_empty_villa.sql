/*
  # Initial Schema Setup
  
  1. Tables Created:
    - users: Core user accounts
    - profiles: User profile information 
    - admin_users: Admin role tracking
    
  2. Initial Data:
    - Creates admin user if none exists
    - Sets up admin profile
    - Assigns admin role
*/

-- Create tables if they don't exist (safeguard)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name text,
  bio text,
  banner_color text DEFAULT 'from-purple-500 via-blue-500 to-orange-500',
  avatar_url text,
  avatar_type text DEFAULT 'initials',
  points integer DEFAULT 0,
  tier text DEFAULT 'bronze',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Insert initial admin user if none exists
DO $$ 
DECLARE
  v_user_id uuid;
  v_email text := 'admin@familycreatives.com';
BEGIN
  -- Check if admin user already exists
  SELECT id INTO v_user_id
  FROM users
  WHERE email = v_email;
  
  -- If admin doesn't exist, create everything
  IF v_user_id IS NULL THEN
    -- Insert admin user
    INSERT INTO users (email)
    VALUES (v_email)
    RETURNING id INTO v_user_id;
    
    -- Create admin profile
    INSERT INTO profiles (
      user_id,
      display_name,
      bio,
      avatar_type,
      tier,
      points
    ) VALUES (
      v_user_id,
      'Admin',
      'System Administrator',
      'initials',
      'diamond',
      1000
    );
    
    -- Assign admin role
    INSERT INTO admin_users (user_id)
    VALUES (v_user_id);
  END IF;
END $$;