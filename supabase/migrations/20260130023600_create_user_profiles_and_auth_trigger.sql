-- Create membership_type enum
DROP TYPE IF EXISTS public.membership_type CASCADE;
CREATE TYPE public.membership_type AS ENUM ('vip', 'family');

-- Create card_status enum
DROP TYPE IF EXISTS public.card_status CASCADE;
CREATE TYPE public.card_status AS ENUM ('active', 'expired', 'suspended');

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    city TEXT,
    membership_type public.membership_type DEFAULT 'vip'::public.membership_type,
    membership_number TEXT UNIQUE,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create customer_cards table
CREATE TABLE IF NOT EXISTS public.customer_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    card_type public.membership_type NOT NULL,
    card_image_url TEXT NOT NULL,
    qr_code_url TEXT,
    card_status public.card_status DEFAULT 'active'::public.card_status,
    issue_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    expiry_date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Add card_status column if it doesn't exist (for existing tables)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'customer_cards' 
        AND column_name = 'card_status'
    ) THEN
        ALTER TABLE public.customer_cards 
        ADD COLUMN card_status public.card_status DEFAULT 'active'::public.card_status;
    END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_membership_number ON public.user_profiles(membership_number);
CREATE INDEX IF NOT EXISTS idx_customer_cards_user_id ON public.customer_cards(user_id);

-- Create index on card_status only if column exists
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'customer_cards' 
        AND column_name = 'card_status'
    ) THEN
        CREATE INDEX IF NOT EXISTS idx_customer_cards_card_status ON public.customer_cards(card_status);
    END IF;
END $$;

-- Function to generate unique membership number
CREATE OR REPLACE FUNCTION public.generate_membership_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_number TEXT;
    counter INTEGER := 0;
BEGIN
    LOOP
        new_number := 'MEM' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
        EXIT WHEN NOT EXISTS (SELECT 1 FROM public.user_profiles WHERE membership_number = new_number);
        counter := counter + 1;
        IF counter > 100 THEN
            RAISE EXCEPTION 'Could not generate unique membership number after 100 attempts';
        END IF;
    END LOOP;
    RETURN new_number;
END;
$$;

-- Function to automatically create user profile when auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
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
END;
$$;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_user_profile_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_customer_card_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_cards ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
DROP POLICY IF EXISTS "users_manage_own_user_profiles" ON public.user_profiles;
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- RLS Policies for customer_cards
DROP POLICY IF EXISTS "users_manage_own_customer_cards" ON public.customer_cards;
CREATE POLICY "users_manage_own_customer_cards"
ON public.customer_cards
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Trigger to auto-create user profile when auth user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Trigger to auto-update updated_at for user_profiles
DROP TRIGGER IF EXISTS update_user_profile_timestamp_trigger ON public.user_profiles;
CREATE TRIGGER update_user_profile_timestamp_trigger
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_user_profile_timestamp();

-- Trigger to auto-update updated_at for customer_cards
DROP TRIGGER IF EXISTS update_customer_card_timestamp_trigger ON public.customer_cards;
CREATE TRIGGER update_customer_card_timestamp_trigger
    BEFORE UPDATE ON public.customer_cards
    FOR EACH ROW
    EXECUTE FUNCTION public.update_customer_card_timestamp();

-- Note: Users should be created through Supabase Authentication API
-- The trigger will automatically create user_profiles entries
-- Example: supabase.auth.signUp({ email, password, options: { data: { full_name, phone, city, membership_type } } })
