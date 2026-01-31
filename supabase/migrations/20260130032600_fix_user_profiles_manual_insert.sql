-- Fix user_profiles manual INSERT by ensuring proper permissions and auto-generation
-- This migration resolves RLS policy violations when creating user profiles

-- Step 1: Grant necessary permissions explicitly
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.user_profiles TO postgres, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_profiles TO authenticated;

-- Step 2: Create a trigger function to auto-generate membership_number before INSERT
CREATE OR REPLACE FUNCTION public.auto_generate_membership_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Only generate if membership_number is NULL
    IF NEW.membership_number IS NULL THEN
        NEW.membership_number := public.generate_membership_number();
    END IF;
    RETURN NEW;
END;
$$;

-- Step 3: Drop existing trigger if it exists
DROP TRIGGER IF EXISTS auto_generate_membership_number_trigger ON public.user_profiles;

-- Step 4: Create trigger that fires BEFORE INSERT to auto-generate membership_number
CREATE TRIGGER auto_generate_membership_number_trigger
    BEFORE INSERT ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.auto_generate_membership_number();

-- Step 5: Recreate RLS policies with proper permissions
DROP POLICY IF EXISTS "users_insert_own_profile" ON public.user_profiles;
CREATE POLICY "users_insert_own_profile"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS "users_select_own_profile" ON public.user_profiles;
CREATE POLICY "users_select_own_profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

DROP POLICY IF EXISTS "users_update_own_profile" ON public.user_profiles;
CREATE POLICY "users_update_own_profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS "users_delete_own_profile" ON public.user_profiles;
CREATE POLICY "users_delete_own_profile"
ON public.user_profiles
FOR DELETE
TO authenticated
USING (id = auth.uid());