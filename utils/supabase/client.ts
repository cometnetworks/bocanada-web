import { createBrowserClient } from '@supabase/ssr'

const siteUrl =
  typeof window !== 'undefined'
    ? window.location.origin // Usa el dominio actual del navegador
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://bocanada-web.vercel.app'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        flowType: 'pkce',
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        // 🔥 Aquí forzamos el dominio correcto siempre:
        emailRedirectTo: `${siteUrl}/dashboard`,
      },
    }
  )