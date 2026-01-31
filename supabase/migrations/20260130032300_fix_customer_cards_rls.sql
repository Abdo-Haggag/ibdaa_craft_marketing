-- Fix RLS policies for customer_cards table
-- Split combined policy into separate operation-specific policies

-- Drop existing combined policy
DROP POLICY IF EXISTS "users_manage_own_customer_cards" ON public.customer_cards;

-- Drop all individual policies if they exist (for idempotency)
DROP POLICY IF EXISTS "users_select_own_customer_cards" ON public.customer_cards;
DROP POLICY IF EXISTS "users_insert_own_customer_cards" ON public.customer_cards;
DROP POLICY IF EXISTS "users_update_own_customer_cards" ON public.customer_cards;
DROP POLICY IF EXISTS "users_delete_own_customer_cards" ON public.customer_cards;

-- Create separate policies for each operation

-- Policy for SELECT: Users can view their own cards
CREATE POLICY "users_select_own_customer_cards"
ON public.customer_cards
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Policy for INSERT: Users can create their own cards
CREATE POLICY "users_insert_own_customer_cards"
ON public.customer_cards
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Policy for UPDATE: Users can update their own cards
CREATE POLICY "users_update_own_customer_cards"
ON public.customer_cards
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Policy for DELETE: Users can delete their own cards
CREATE POLICY "users_delete_own_customer_cards"
ON public.customer_cards
FOR DELETE
TO authenticated
USING (user_id = auth.uid());