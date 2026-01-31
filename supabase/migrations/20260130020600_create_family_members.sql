-- Create family_members table
CREATE TABLE IF NOT EXISTS public.family_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    member_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_family_members_user_id ON public.family_members(user_id);

-- Enable RLS
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only manage their own family members
DROP POLICY IF EXISTS "users_manage_own_family_members" ON public.family_members;
CREATE POLICY "users_manage_own_family_members"
ON public.family_members
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Function to check family member count limit (10 members max)
CREATE OR REPLACE FUNCTION public.check_family_member_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    member_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO member_count
    FROM public.family_members
    WHERE user_id = NEW.user_id;
    
    IF member_count >= 10 THEN
        RAISE EXCEPTION 'Cannot add more than 10 family members';
    END IF;
    
    RETURN NEW;
END;
$$;

-- Trigger to enforce 10-member limit
DROP TRIGGER IF EXISTS enforce_family_member_limit ON public.family_members;
CREATE TRIGGER enforce_family_member_limit
BEFORE INSERT ON public.family_members
FOR EACH ROW
EXECUTE FUNCTION public.check_family_member_limit();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_family_member_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_family_member_timestamp_trigger ON public.family_members;
CREATE TRIGGER update_family_member_timestamp_trigger
BEFORE UPDATE ON public.family_members
FOR EACH ROW
EXECUTE FUNCTION public.update_family_member_timestamp();