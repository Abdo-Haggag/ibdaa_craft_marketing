-- Migration to fix NULL constraints on all tables
-- This restores the original NOT NULL constraints that were incorrectly removed
-- IMPORTANT: First set replica identity, then update NULL values, then apply constraints

-- Set replica identity for all tables to enable real-time updates
ALTER TABLE public.customer_cards REPLICA IDENTITY FULL;
ALTER TABLE public.user_profiles REPLICA IDENTITY FULL;
ALTER TABLE public.family_members REPLICA IDENTITY FULL;
ALTER TABLE public.categories REPLICA IDENTITY FULL;
ALTER TABLE public.partners REPLICA IDENTITY FULL;

-- Fix customer_cards table: Update NULL values first
UPDATE public.customer_cards
SET card_image_url = '/assets/images/no_image.png'
WHERE card_image_url IS NULL;

UPDATE public.customer_cards
SET expiry_date = CURRENT_TIMESTAMP + INTERVAL '1 year'
WHERE expiry_date IS NULL;

-- Fix user_profiles table: Update NULL values first
UPDATE public.user_profiles
SET email = 'noemail@example.com'
WHERE email IS NULL;

UPDATE public.user_profiles
SET full_name = 'مستخدم'
WHERE full_name IS NULL;

-- Fix family_members table: Update NULL values first
UPDATE public.family_members
SET member_name = 'عضو عائلة'
WHERE member_name IS NULL;

-- Fix categories table: Update NULL values first
UPDATE public.categories
SET icon = 'question-mark-circle'
WHERE icon IS NULL;

UPDATE public.categories
SET discount_range = '0-0%'
WHERE discount_range IS NULL;

UPDATE public.categories
SET color = '#gray'
WHERE color IS NULL;

-- Fix partners table: Update NULL values first
UPDATE public.partners
SET name = 'شريك'
WHERE name IS NULL;

UPDATE public.partners
SET logo_url = '/assets/images/no_image.png'
WHERE logo_url IS NULL;

UPDATE public.partners
SET logo_alt = 'شعار الشريك'
WHERE logo_alt IS NULL;

UPDATE public.partners
SET discount_percentage = 0
WHERE discount_percentage IS NULL;

UPDATE public.partners
SET address = 'غير محدد'
WHERE address IS NULL;

UPDATE public.partners
SET phone = '0000000000'
WHERE phone IS NULL;

UPDATE public.partners
SET location_city = 'غير محدد'
WHERE location_city IS NULL;

-- Now apply NOT NULL constraints after cleaning data

-- Fix user_profiles table NULL constraints
ALTER TABLE public.user_profiles
ALTER COLUMN email SET NOT NULL,
ALTER COLUMN full_name SET NOT NULL;

-- Fix customer_cards table NULL constraints
ALTER TABLE public.customer_cards
ALTER COLUMN user_id SET NOT NULL,
ALTER COLUMN card_type SET NOT NULL,
ALTER COLUMN card_image_url SET NOT NULL,
ALTER COLUMN expiry_date SET NOT NULL;

-- Fix family_members table NULL constraints
ALTER TABLE public.family_members
ALTER COLUMN user_id SET NOT NULL,
ALTER COLUMN member_name SET NOT NULL;

-- Fix categories table NULL constraints
ALTER TABLE public.categories
ALTER COLUMN icon SET NOT NULL,
ALTER COLUMN discount_range SET NOT NULL,
ALTER COLUMN color SET NOT NULL;

-- Fix partners table NULL constraints
ALTER TABLE public.partners
ALTER COLUMN name SET NOT NULL,
ALTER COLUMN logo_url SET NOT NULL,
ALTER COLUMN logo_alt SET NOT NULL,
ALTER COLUMN discount_percentage SET NOT NULL,
ALTER COLUMN address SET NOT NULL,
ALTER COLUMN phone SET NOT NULL,
ALTER COLUMN location_city SET NOT NULL;

-- Verification: Log the changes
DO $$
BEGIN
    RAISE NOTICE 'Replica identity set to FULL for all tables to support real-time updates';
    RAISE NOTICE 'NULL values have been cleaned and NOT NULL constraints restored on all tables:';
    RAISE NOTICE '- user_profiles: email, full_name';
    RAISE NOTICE '- customer_cards: user_id, card_type, card_image_url, expiry_date';
    RAISE NOTICE '- family_members: user_id, member_name';
    RAISE NOTICE '- categories: icon, discount_range, color';
    RAISE NOTICE '- partners: name, logo_url, logo_alt, discount_percentage, address, phone, location_city';
END $$;