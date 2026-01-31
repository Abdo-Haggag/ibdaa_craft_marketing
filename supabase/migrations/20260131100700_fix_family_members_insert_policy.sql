-- Fix family_members RLS policy for INSERT operations
-- Issue: FOR ALL policy may not properly handle INSERT operations
-- Solution: Use separate policies for each operation type

-- Drop existing policy
DROP POLICY IF EXISTS "users_manage_own_family_members" ON public.family_members;

-- Create separate policies for each operation
CREATE POLICY "users_can_view_own_family_members"
ON public.family_members
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "users_can_create_own_family_members"
ON public.family_members
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_can_update_own_family_members"
ON public.family_members
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_can_delete_own_family_members"
ON public.family_members
FOR DELETE
TO authenticated
USING (user_id = auth.uid());