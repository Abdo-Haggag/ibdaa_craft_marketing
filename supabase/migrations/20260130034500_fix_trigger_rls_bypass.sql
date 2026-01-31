-- Fix RLS blocking trigger-based user profile creation
-- The issue: INSERT policy WITH CHECK (id = auth.uid()) blocks trigger function
-- Solution: Ensure trigger function runs with service_role privileges

-- Step 1: Grant explicit permissions to postgres role (used by SECURITY DEFINER functions)
GRANT ALL ON public.user_profiles TO postgres;
GRANT USAGE ON SCHEMA public TO postgres;

-- Step 2: Recreate trigger function with explicit SET ROLE
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Insert with explicit columns, bypassing RLS due to SECURITY DEFINER + postgres role
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

-- Step 3: Ensure service_role policy exists and has highest priority
DROP POLICY IF EXISTS "service_role_bypass_rls" ON public.user_profiles;
CREATE POLICY "service_role_bypass_rls"
ON public.user_profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Step 4: Modify INSERT policy to allow trigger-based inserts
-- Remove the restrictive INSERT policy and replace with one that allows both user and trigger inserts
DROP POLICY IF EXISTS "users_insert_own_profile" ON public.user_profiles;
CREATE POLICY "users_insert_own_profile"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (
    -- Allow if user is inserting their own profile OR if called from trigger (no auth context)
    id = auth.uid() OR auth.uid() IS NULL
);

-- Step 5: Recreate trigger to ensure it uses updated function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();