-- Drop existing combined policy
DROP POLICY IF EXISTS "users_manage_own_user_profiles" ON public.user_profiles;

-- Create separate policies for each operation

-- Policy for SELECT: Users can view their own profile
CREATE POLICY "users_select_own_profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Policy for INSERT: Users can create their own profile
CREATE POLICY "users_insert_own_profile"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

-- Policy for UPDATE: Users can update their own profile
CREATE POLICY "users_update_own_profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Policy for DELETE: Users can delete their own profile
CREATE POLICY "users_delete_own_profile"
ON public.user_profiles
FOR DELETE
TO authenticated
USING (id = auth.uid());