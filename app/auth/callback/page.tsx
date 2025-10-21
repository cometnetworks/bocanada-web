"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const handleAuth = async () => {
      const code = searchParams.get("code");
      const token = searchParams.get("token");
      const type = searchParams.get("type");
      const value = code || token;

      console.log("🔁 Callback recibido:", { type, value });

      if (!value) {
        console.error("⚠️ No se recibió código o token válido.");
        return router.push("/auth/login");
      }

      try {
        // intercambia el código por una sesión
        const { data, error } = await supabase.auth.exchangeCodeForSession(value);
        if (error) {
          console.error("Error al crear sesión:", error.message);
          return router.push("/auth/login");
        }

        console.log("✅ Sesión creada exitosamente:", data);
        router.push("/dashboard");
      } catch (e) {
        console.error("❌ Excepción durante el callback:", e);
        router.push("/auth/login");
      }
    };

    handleAuth();
  }, [router, searchParams, supabase]);

  return (
    <div className="flex items-center justify-center h-screen text-white">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Procesando autenticación...</h1>
        <p className="text-gray-400 mt-2">Por favor espera unos segundos 🔄</p>
      </div>
    </div>
  );
}