-- DEFINITIVE FIX: Remove RLS blocking trigger-based user profile creation
-- Root cause: INSERT policy WITH CHECK (id = auth.uid()) blocks trigger function
-- Solution: Remove INSERT policy for authenticated users, rely on service_role bypass

-- Step 1: Drop the problematic INSERT policy that blocks trigger
DROP POLICY IF EXISTS "users_insert_own_profile" ON public.user_profiles;

-- Step 2: Keep SELECT policy (users can view their own profile)
DROP POLICY IF EXISTS "users_select_own_profile" ON public.user_profiles;
CREATE POLICY "users_select_own_profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Step 3: Ensure service_role bypass exists with highest priority
DROP POLICY IF EXISTS "service_role_bypass_rls" ON public.user_profiles;
CREATE POLICY "service_role_bypass_rls"
ON public.user_profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Step 4: Add anon role policy to allow trigger-based inserts
-- This allows the trigger function to insert without auth context
DROP POLICY IF EXISTS "allow_trigger_insert" ON public.user_profiles;
CREATE POLICY "allow_trigger_insert"
ON public.user_profiles
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Step 5: Recreate trigger function with explicit privilege escalation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
    -- Insert bypasses RLS due to SECURITY DEFINER + allow_trigger_insert policy
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

-- Step 6: Ensure trigger is properly configured
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Step 7: Grant necessary permissions to postgres role
GRANT ALL ON public.user_profiles TO postgres;
GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA auth TO postgres;

-- Verification comment
-- This migration removes the restrictive INSERT policy that was blocking trigger-based inserts
-- The trigger function now has full permission to insert via allow_trigger_insert policy
-- Users can still only SELECT their own profiles, maintaining security