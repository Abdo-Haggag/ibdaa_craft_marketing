-- Fix user_profiles INSERT permissions
-- This migration ensures both trigger-based and manual profile creation work

-- Grant necessary permissions to the trigger function
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.user_profiles TO postgres, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_profiles TO authenticated;

-- Ensure the trigger function has proper security context
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
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

-- Recreate the trigger to ensure it uses the updated function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Update RLS policies to be more permissive for INSERT
-- The key is to allow authenticated users to insert rows where id matches their auth.uid()
DROP POLICY IF EXISTS "users_insert_own_profile" ON public.user_profiles;
CREATE POLICY "users_insert_own_profile"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

-- Ensure other policies remain intact
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