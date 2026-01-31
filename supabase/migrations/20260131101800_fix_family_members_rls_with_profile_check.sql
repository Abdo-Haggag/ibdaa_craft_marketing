-- Fix family_members RLS policy - Validate through user_profiles
-- Issue: RLS policy failing because it doesn't verify user_id exists in user_profiles
-- Solution: Create policy that explicitly checks user_profiles table

-- Drop existing policies
DROP POLICY IF EXISTS "family_members_select_policy" ON public.family_members;
DROP POLICY IF EXISTS "family_members_insert_policy" ON public.family_members;
DROP POLICY IF EXISTS "family_members_update_policy" ON public.family_members;
DROP POLICY IF EXISTS "family_members_delete_policy" ON public.family_members;
DROP POLICY IF EXISTS "users_manage_own_family_members" ON public.family_members;

-- Ensure RLS is enabled
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;

-- Create helper function to validate user has profile
CREATE OR REPLACE FUNCTION public.user_has_profile()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid()
  )
$$;

-- Create comprehensive policy for SELECT operations
CREATE POLICY "family_members_select_policy"
ON public.family_members
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid() AND public.user_has_profile()
);

-- Create comprehensive policy for INSERT operations
-- This validates that the user exists in user_profiles before allowing insert
CREATE POLICY "family_members_insert_policy"
ON public.family_members
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid() AND public.user_has_profile()
);

-- Create comprehensive policy for UPDATE operations
CREATE POLICY "family_members_update_policy"
ON public.family_members
FOR UPDATE
TO authenticated
USING (
  user_id = auth.uid() AND public.user_has_profile()
)
WITH CHECK (
  user_id = auth.uid() AND public.user_has_profile()
);

-- Create comprehensive policy for DELETE operations
CREATE POLICY "family_members_delete_policy"
ON public.family_members
FOR DELETE
TO authenticated
USING (
  user_id = auth.uid() AND public.user_has_profile()
);

-- Verify the policies are created
DO $$
BEGIN
  RAISE NOTICE 'Family members RLS policies updated with user_profiles validation';
  RAISE NOTICE 'Users must have a profile in user_profiles table to manage family members';
END $$;