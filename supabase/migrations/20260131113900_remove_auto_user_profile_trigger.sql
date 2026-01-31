-- Migration: Remove automatic user profile creation trigger
-- Purpose: Make user_profiles insertion manual instead of automatic
-- Date: 2026-01-31

-- Step 1: Drop the trigger that auto-creates user profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Step 2: Drop the function that handles new user creation
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Step 3: Add comment to document the change
COMMENT ON TABLE public.user_profiles IS 'User profiles table - manual insertion only (trigger removed 2026-01-31)';

-- Note: user_profiles table structure remains unchanged
-- Administrators must now manually insert records into user_profiles table
-- when creating new users in the auth.users table