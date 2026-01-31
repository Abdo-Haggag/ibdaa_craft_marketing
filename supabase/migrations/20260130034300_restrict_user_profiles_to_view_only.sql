-- Restrict user_profiles RLS to view-only access
-- Users can only SELECT their own data, cannot UPDATE or DELETE
-- This migration removes edit permissions while keeping view access

-- Drop existing UPDATE and DELETE policies
DROP POLICY IF EXISTS "users_update_own_profile" ON public.user_profiles;
DROP POLICY IF EXISTS "users_delete_own_profile" ON public.user_profiles;

-- Keep SELECT policy (view-only access)
-- This policy already exists from previous migration, ensuring it's in place
DROP POLICY IF EXISTS "users_select_own_profile" ON public.user_profiles;
CREATE POLICY "users_select_own_profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Keep INSERT policy for initial profile creation
-- This is needed for signup flow
DROP POLICY IF EXISTS "users_insert_own_profile" ON public.user_profiles;
CREATE POLICY "users_insert_own_profile"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

-- Keep service_role bypass for system operations
DROP POLICY IF EXISTS "service_role_bypass_rls" ON public.user_profiles;
CREATE POLICY "service_role_bypass_rls"
ON public.user_profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
