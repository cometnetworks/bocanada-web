"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

function CallbackInner() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const token = searchParams.get("token");
  const type = searchParams.get("type");
  const supabase = createClient();

  useEffect(() => {
    const handleAuth = async () => {
      const value = code || token;
      if (value) {
        try {
          const { data, error } = await supabase.auth.exchangeCodeForSession(value);
          console.log("Sesión intercambiada:", data, error);
          if (!error) window.location.href = "/dashboard";
        } catch (err) {
          console.error("Error al intercambiar token:", err);
        }
      }
    };

    handleAuth();
  }, [code, token, type, supabase]);

  return (
    <div className="flex items-center justify-center h-screen text-white">
      <p>Verificando tu sesión...</p>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Cargando...</div>}>
      <CallbackInner />
    </Suspense>
  );
}