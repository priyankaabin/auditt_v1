/*
  # Add missing profile columns

  1. New Columns
    - Add `avatar_type` to profiles table
    - Add theme-related columns to profiles table
  
  2. Changes
    - Ensure all required columns exist for proper functionality
*/

-- Add avatar_type to profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'avatar_type'
  ) THEN
    ALTER TABLE profiles ADD COLUMN avatar_type text DEFAULT 'initials';
  END IF;
END $$;

-- Add theme settings to profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'theme_color'
  ) THEN
    ALTER TABLE profiles ADD COLUMN theme_color text DEFAULT 'blue';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'theme_font_size'
  ) THEN
    ALTER TABLE profiles ADD COLUMN theme_font_size text DEFAULT 'medium';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'theme_dark_mode'
  ) THEN
    ALTER TABLE profiles ADD COLUMN theme_dark_mode boolean DEFAULT false;
  END IF;
END $$;