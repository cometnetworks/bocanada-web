"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // 🧩 Si viene con token en la URL (desde el correo)
        const token = searchParams.get("token");
        const type = searchParams.get("type");

        if (token && type === "signup") {
          // Intercambia el token por sesión activa
          const { data, error } = await supabase.auth.exchangeCodeForSession(token);
          if (error) console.error("Error creando sesión desde token:", error);
        }

        // ✅ Verifica si ya existe una sesión activa
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session) {
          // Espera un poco para mostrar pantalla de bienvenida
          setTimeout(() => router.replace("/dashboard"), 2000);
        } else {
          router.replace("/auth/login");
        }
      } catch (error) {
        console.error("Error en callback:", error);
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/brasas-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="relative z-10 text-center px-6">
        <h1 className="text-3xl font-bold mb-4 animate-pulse drop-shadow-lg">
          🔥 ¡Bienvenido a <span className="text-red-500">Bocanada Club</span>!
        </h1>

        <p className="text-lg text-gray-200 mb-6">
          Activando tu cuenta y preparando tu experiencia...
        </p>

        <div className="w-16 h-16 border-4 border-t-red-500 border-gray-400 rounded-full animate-spin mx-auto mb-6"></div>

        <p className="text-sm text-gray-400">
          Serás redirigido automáticamente a tu dashboard.
        </p>
      </div>

      <footer className="absolute bottom-4 text-xs text-gray-500">
        Bocanada Cocina de Brasa © {new Date().getFullYear()}
      </footer>
    </div>
  );
}