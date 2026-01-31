-- Fix RLS policy for family_members table
-- The issue: RLS policy was preventing inserts even when user_id matched auth.uid()
-- Solution: Recreate policy with explicit checks and ensure proper authentication

-- Drop existing policy
DROP POLICY IF EXISTS "users_manage_own_family_members" ON public.family_members;

-- Create separate policies for better clarity and debugging
-- Policy for SELECT: Users can view their own family members
CREATE POLICY "users_select_own_family_members"
ON public.family_members
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Policy for INSERT: Users can add family members with their own user_id
CREATE POLICY "users_insert_own_family_members"
ON public.family_members
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Policy for UPDATE: Users can update their own family members
CREATE POLICY "users_update_own_family_members"
ON public.family_members
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Policy for DELETE: Users can delete their own family members
CREATE POLICY "users_delete_own_family_members"
ON public.family_members
FOR DELETE
TO authenticated
USING (user_id = auth.uid());