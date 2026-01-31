-- Migration: Drop user_profiles, customer_cards, and family_members tables
-- This migration removes all user-related tables and their dependencies

-- Step 1: Drop child tables first (tables with foreign keys to user_profiles)
DROP TABLE IF EXISTS public.family_members CASCADE;
DROP TABLE IF EXISTS public.customer_cards CASCADE;

-- Step 2: Drop parent table (user_profiles)
DROP TABLE IF EXISTS public.user_profiles CASCADE;

-- Step 3: Drop triggers related to user_profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Step 4: Drop functions related to user_profiles
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Step 5: Drop custom types used by these tables
DROP TYPE IF EXISTS public.membership_type CASCADE;
DROP TYPE IF EXISTS public.card_status CASCADE;

-- Note: This migration completely removes user profile functionality
-- Categories and partners tables remain intact