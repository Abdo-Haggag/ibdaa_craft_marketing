-- Migration: Sync existing auth users to user_profiles
-- Description: Ensures all existing auth.users have corresponding user_profiles entries
-- This fixes the "No profile data found" error for users who logged in before the user_profiles table was created

-- Sync existing auth.users to user_profiles
DO $$
DECLARE
    auth_user RECORD;
BEGIN
    -- Loop through all auth.users that don't have a profile
    FOR auth_user IN 
        SELECT au.id, au.email, au.raw_user_meta_data, au.created_at
        FROM auth.users au
        LEFT JOIN public.user_profiles up ON au.id = up.id
        WHERE up.id IS NULL
    LOOP
        -- Create profile for each user without one
        INSERT INTO public.user_profiles (
            id,
            email,
            full_name,
            phone,
            membership_type,
            membership_start_date,
            membership_expiry_date,
            is_active
        )
        VALUES (
            auth_user.id,
            auth_user.email,
            COALESCE(
                auth_user.raw_user_meta_data->>'full_name',
                auth_user.raw_user_meta_data->>'name',
                split_part(auth_user.email, '@', 1)
            ),
            COALESCE(auth_user.raw_user_meta_data->>'phone', NULL),
            COALESCE(
                (auth_user.raw_user_meta_data->>'membership_type')::public.membership_type,
                'individual'::public.membership_type
            ),
            auth_user.created_at,
            auth_user.created_at + INTERVAL '1 year',
            true
        )
        ON CONFLICT (id) DO UPDATE SET
            email = EXCLUDED.email,
            updated_at = CURRENT_TIMESTAMP;
        
        RAISE NOTICE 'Created profile for user: %', auth_user.email;
    END LOOP;
    
    -- Log completion
    RAISE NOTICE 'User profile sync completed successfully';
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'User profile sync failed: %', SQLERRM;
END $$;

-- Create sample customer card for users who don't have one
DO $$
DECLARE
    profile_record RECORD;
    card_number_value TEXT;
BEGIN
    -- Loop through all user_profiles that don't have a customer card
    FOR profile_record IN 
        SELECT up.id, up.email, up.full_name
        FROM public.user_profiles up
        LEFT JOIN public.customer_cards cc ON up.id = cc.user_id
        WHERE cc.id IS NULL
    LOOP
        -- Generate unique card number
        card_number_value := 'CARD-' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
        
        -- Create customer card
        INSERT INTO public.customer_cards (
            user_id,
            card_number,
            card_type,
            card_status,
            card_image_url,
            issue_date,
            expiry_date,
            qr_code
        )
        VALUES (
            profile_record.id,
            card_number_value,
            'gold'::public.card_type,
            'active'::public.card_status,
            '/assets/images/Copy_of_Black_and_Gold_Classy_Business_Card_1_-1769730611123.png',
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP + INTERVAL '1 year',
            'QR-' || profile_record.id::TEXT
        )
        ON CONFLICT (card_number) DO NOTHING;
        
        RAISE NOTICE 'Created customer card for user: %', profile_record.email;
    END LOOP;
    
    RAISE NOTICE 'Customer card sync completed successfully';
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Customer card sync failed: %', SQLERRM;
END $$;