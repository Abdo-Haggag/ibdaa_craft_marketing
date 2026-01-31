-- Fix RLS policy for user_profiles to allow trigger-based inserts
-- This migration resolves "new row violates row-level security policy" error

-- Step 1: Ensure the trigger function can bypass RLS by using SECURITY DEFINER
-- and explicitly granting permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.user_profiles TO postgres, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_profiles TO authenticated;

-- Step 2: Recreate the trigger function with proper security context
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Insert with explicit columns, bypassing RLS due to SECURITY DEFINER
    INSERT INTO public.user_profiles (
        id,
        email,
        full_name,
        phone,
        city,
        membership_type,
        membership_number,
        category
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
        COALESCE(NEW.raw_user_meta_data->>'city', NULL),
        COALESCE((NEW.raw_user_meta_data->>'membership_type')::public.membership_type, 'vip'::public.membership_type),
        public.generate_membership_number(),
        COALESCE(NEW.raw_user_meta_data->>'category', NULL)
    );
    RETURN NEW;
EXCEPTION
    WHEN unique_violation THEN
        -- Profile already exists, skip
        RAISE NOTICE 'Profile already exists for user %', NEW.id;
        RETURN NEW;
    WHEN OTHERS THEN
        -- Log error but don't fail auth user creation
        RAISE NOTICE 'Error creating profile for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$;

-- Step 3: Add a policy specifically for service_role to bypass RLS
DROP POLICY IF EXISTS "service_role_bypass_rls" ON public.user_profiles;
CREATE POLICY "service_role_bypass_rls"
ON public.user_profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Step 4: Ensure authenticated users can still insert their own profiles
DROP POLICY IF EXISTS "users_insert_own_profile" ON public.user_profiles;
CREATE POLICY "users_insert_own_profile"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

-- Step 5: Keep other policies intact
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

-- Step 6: Recreate the trigger to use updated function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();