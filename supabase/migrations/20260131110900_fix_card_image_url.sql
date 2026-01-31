-- Migration: Fix card_image_url to use existing image
-- Description: Update card_image_url to point to an existing image file
-- Timestamp: 20260131110900

-- Update existing customer_cards to use the existing business card image
UPDATE public.customer_cards
SET card_image_url = '/assets/images/Copy_of_Black_and_Gold_Classy_Business_Card_1_-1769730611123.png'
WHERE card_image_url = '/assets/images/gold-card.png'
   OR card_image_url IS NULL
   OR card_image_url = '';

-- Add a comment to document the change
COMMENT ON COLUMN public.customer_cards.card_image_url IS 'URL or path to the card image. Should point to an existing image file in public/assets/images/';