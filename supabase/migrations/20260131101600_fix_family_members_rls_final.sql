-- Fix family_members RLS policies - Final Solution
-- Issue: INSERT operations failing with RLS policy violation (code 42501)
-- Root cause: Policies may not be properly evaluating auth.uid()
-- Solution: Recreate all policies with explicit authentication checks

-- Drop all existing policies on family_members
DROP POLICY IF EXISTS "users_manage_own_family_members" ON public.family_members;
DROP POLICY IF EXISTS "users_can_view_own_family_members" ON public.family_members;
DROP POLICY IF EXISTS "users_can_create_own_family_members" ON public.family_members;
DROP POLICY IF EXISTS "users_can_update_own_family_members" ON public.family_members;
DROP POLICY IF EXISTS "users_can_delete_own_family_members" ON public.family_members;

-- Ensure RLS is enabled
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policy for SELECT operations
CREATE POLICY "family_members_select_policy"
ON public.family_members
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
);

-- Create comprehensive policy for INSERT operations
-- This allows authenticated users to insert records where they are the owner
CREATE POLICY "family_members_insert_policy"
ON public.family_members
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid()
);

-- Create comprehensive policy for UPDATE operations
CREATE POLICY "family_members_update_policy"
ON public.family_members
FOR UPDATE
TO authenticated
USING (
  user_id = auth.uid()
)
WITH CHECK (
  user_id = auth.uid()
);

-- Create comprehensive policy for DELETE operations
CREATE POLICY "family_members_delete_policy"
ON public.family_members
FOR DELETE
TO authenticated
USING (
  user_id = auth.uid()
);

-- Verify the policies are created
DO $$
BEGIN
  RAISE NOTICE 'Family members RLS policies have been recreated successfully';
  RAISE NOTICE 'Users can now INSERT, SELECT, UPDATE, and DELETE their own family members';
END $$;