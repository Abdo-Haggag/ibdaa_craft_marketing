import { createClient } from '@supabase/supabase-js'

export function getSupabaseClient() {
  // ❌ لو مش في المتصفح → ممنوع Supabase
  if (typeof window === 'undefined') {
    return null
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // ❌ لو المتغيرات مش موجودة
  if (!url || !key) {
    return null
  }

  // ✅ دلوقتي نعمل Supabase
  return createClient(url, key)
}
