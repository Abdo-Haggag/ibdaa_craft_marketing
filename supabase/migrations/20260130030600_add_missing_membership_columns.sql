-- Add missing membership_type column to user_profiles table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'user_profiles' 
        AND column_name = 'membership_type'
    ) THEN
        ALTER TABLE public.user_profiles 
        ADD COLUMN membership_type public.membership_type DEFAULT 'vip'::public.membership_type;
    END IF;
END $$;

-- Add missing card_type column to customer_cards table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'customer_cards' 
        AND column_name = 'card_type'
    ) THEN
        ALTER TABLE public.customer_cards 
        ADD COLUMN card_type public.membership_type NOT NULL DEFAULT 'vip'::public.membership_type;
    END IF;
END $$;

-- Recreate the trigger function to ensure it works with the new columns
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