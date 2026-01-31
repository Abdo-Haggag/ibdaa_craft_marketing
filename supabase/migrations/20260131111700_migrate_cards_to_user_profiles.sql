-- Migration: Move card data from customer_cards to user_profiles
-- Drop customer_cards table and add card_type and card_image to user_profiles

-- Step 1: Create new ENUM type for card_type (vip and family only)
DROP TYPE IF EXISTS public.card_type_simple CASCADE;
CREATE TYPE public.card_type_simple AS ENUM ('vip', 'family');

-- Step 2: Add new columns to user_profiles
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS card_type public.card_type_simple DEFAULT 'vip'::public.card_type_simple,
ADD COLUMN IF NOT EXISTS card_image TEXT;

COMMENT ON COLUMN public.user_profiles.card_type IS 'Type of membership card: vip or family';
COMMENT ON COLUMN public.user_profiles.card_image IS 'URL or path to the membership card image that will be displayed and downloadable';

-- Step 3: Migrate existing data from customer_cards to user_profiles (if any)
DO $$
BEGIN
    -- Check if customer_cards table exists
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'customer_cards'
    ) THEN
        -- Migrate card_image_url from customer_cards to user_profiles
        UPDATE public.user_profiles up
        SET card_image = cc.card_image_url,
            card_type = CASE 
                WHEN cc.card_type = 'vip' THEN 'vip'::public.card_type_simple
                WHEN cc.card_type = 'family' THEN 'family'::public.card_type_simple
                ELSE 'vip'::public.card_type_simple
            END
        FROM public.customer_cards cc
        WHERE up.id = cc.user_id;
        
        RAISE NOTICE 'Data migrated from customer_cards to user_profiles';
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Migration skipped or failed: %', SQLERRM;
END $$;

-- Step 4: Drop customer_cards table and all its dependencies
DO $$
BEGIN
    -- Drop all policies on customer_cards
    DROP POLICY IF EXISTS "users_manage_own_customer_cards" ON public.customer_cards;
    DROP POLICY IF EXISTS "users_can_view_own_customer_cards" ON public.customer_cards;
    DROP POLICY IF EXISTS "users_can_create_own_customer_cards" ON public.customer_cards;
    DROP POLICY IF EXISTS "users_can_update_own_customer_cards" ON public.customer_cards;
    DROP POLICY IF EXISTS "users_can_delete_own_customer_cards" ON public.customer_cards;
    
    -- Drop the table
    DROP TABLE IF EXISTS public.customer_cards CASCADE;
    
    -- Drop old card_type enum if it exists
    DROP TYPE IF EXISTS public.card_type CASCADE;
    
    -- Drop old card_status enum if it exists
    DROP TYPE IF EXISTS public.card_status CASCADE;
    
    RAISE NOTICE 'customer_cards table and related objects dropped successfully';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Drop operation failed: %', SQLERRM;
END $$;

-- Step 5: Update existing user_profiles with default card image if null
DO $$
BEGIN
    UPDATE public.user_profiles
    SET card_image = '/assets/images/Copy_of_Black_and_Gold_Classy_Business_Card_1_-1769730611123.png'
    WHERE card_image IS NULL;
    
    RAISE NOTICE 'Default card images set for existing users';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Default card image update failed: %', SQLERRM;
END $$;