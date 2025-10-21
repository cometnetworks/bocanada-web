// utils/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Este cliente se ejecuta solo en el navegador (no en el server)
  if (typeof window === "undefined") {
    console.warn("createClient() solo se usa en cliente");
    return undefined as any;
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        storageKey: "bocanada-auth", // ✅ clave única
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    }
  );
}