-- Migration: Create user_profiles, customer_cards, and family_members tables
-- Description: 3 interconnected tables for customer profiles, cards, and family members
-- Each user can only see their own data (RLS policies)

-- 1. Create ENUMs
DROP TYPE IF EXISTS public.card_type CASCADE;
CREATE TYPE public.card_type AS ENUM ('gold', 'silver', 'platinum', 'basic');

DROP TYPE IF EXISTS public.card_status CASCADE;
CREATE TYPE public.card_status AS ENUM ('active', 'expired', 'suspended', 'pending');

DROP TYPE IF EXISTS public.membership_type CASCADE;
CREATE TYPE public.membership_type AS ENUM ('individual', 'family', 'corporate');

-- 2. Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    city TEXT,
    membership_type public.membership_type DEFAULT 'individual'::public.membership_type,
    membership_start_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    membership_expiry_date TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create customer_cards table
CREATE TABLE IF NOT EXISTS public.customer_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    card_number TEXT UNIQUE,
    card_type public.card_type DEFAULT 'basic'::public.card_type,
    card_status public.card_status DEFAULT 'active'::public.card_status,
    card_image_url TEXT NOT NULL,
    issue_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    expiry_date TIMESTAMPTZ NOT NULL,
    qr_code TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create family_members table
CREATE TABLE IF NOT EXISTS public.family_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    member_name TEXT NOT NULL,
    relationship TEXT,
    phone TEXT,
    email TEXT,
    date_of_birth DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_membership_type ON public.user_profiles(membership_type);
CREATE INDEX IF NOT EXISTS idx_customer_cards_user_id ON public.customer_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_customer_cards_card_number ON public.customer_cards(card_number);
CREATE INDEX IF NOT EXISTS idx_customer_cards_card_status ON public.customer_cards(card_status);
CREATE INDEX IF NOT EXISTS idx_family_members_user_id ON public.family_members(user_id);

-- 6. Create trigger function for user_profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, phone, membership_type)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
        COALESCE((NEW.raw_user_meta_data->>'membership_type')::public.membership_type, 'individual'::public.membership_type)
    );
    RETURN NEW;
END;
$$;

-- 7. Create trigger for auto-creating user_profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- 8. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;

-- 9. Create RLS policies for user_profiles
DROP POLICY IF EXISTS "users_manage_own_user_profiles" ON public.user_profiles;
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- 10. Create RLS policies for customer_cards
DROP POLICY IF EXISTS "users_manage_own_customer_cards" ON public.customer_cards;
CREATE POLICY "users_manage_own_customer_cards"
ON public.customer_cards
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 11. Create RLS policies for family_members
DROP POLICY IF EXISTS "users_manage_own_family_members" ON public.family_members;
CREATE POLICY "users_manage_own_family_members"
ON public.family_members
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 12. Create mock data
DO $$
DECLARE
    existing_user_id UUID;
    card_id_1 UUID := gen_random_uuid();
    card_id_2 UUID := gen_random_uuid();
BEGIN
    -- Get existing user from auth.users (with LIMIT 1 for safety)
    SELECT id INTO existing_user_id FROM auth.users LIMIT 1;
    
    IF existing_user_id IS NOT NULL THEN
        -- Check if user_profile already exists (trigger should create it)
        IF EXISTS (SELECT 1 FROM public.user_profiles WHERE id = existing_user_id) THEN
            -- Update existing profile with sample data
            UPDATE public.user_profiles
            SET 
                phone = COALESCE(phone, '+20 100 123 4567'),
                address = COALESCE(address, '123 شارع النيل، المعادي'),
                city = COALESCE(city, 'القاهرة'),
                membership_type = 'family'::public.membership_type,
                membership_expiry_date = CURRENT_TIMESTAMP + INTERVAL '1 year'
            WHERE id = existing_user_id;
            
            -- Create customer card for existing user
            INSERT INTO public.customer_cards (
                id, user_id, card_number, card_type, card_status, 
                card_image_url, expiry_date, qr_code
            )
            VALUES (
                card_id_1,
                existing_user_id,
                'CARD-' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0'),
                'gold'::public.card_type,
                'active'::public.card_status,
                '/assets/images/gold-card.png',
                CURRENT_TIMESTAMP + INTERVAL '1 year',
                'QR-' || existing_user_id::TEXT
            )
            ON CONFLICT (id) DO NOTHING;
            
            -- Create family members for existing user
            INSERT INTO public.family_members (user_id, member_name, relationship, phone, email)
            VALUES 
                (existing_user_id, 'أحمد محمد', 'ابن', '+20 100 111 2222', 'ahmed@example.com'),
                (existing_user_id, 'فاطمة محمد', 'ابنة', '+20 100 333 4444', 'fatima@example.com')
            ON CONFLICT (id) DO NOTHING;
            
            RAISE NOTICE 'Mock data created for existing user';
        ELSE
            RAISE NOTICE 'User profile does not exist yet for user %', existing_user_id;
        END IF;
    ELSE
        RAISE NOTICE 'No users found in auth.users table';
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Mock data insertion failed: %', SQLERRM;
END $$;