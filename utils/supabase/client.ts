// utils/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true, // ✅ Mantiene sesión tras recargar o navegar
        autoRefreshToken: true, // 🔁 Renueva el token automáticamente
        detectSessionInUrl: true, // ⚙️ Necesario para el flujo de magic link
      },
    }
  );
}