"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const confirmUser = async () => {
      try {
        // Intentamos recuperar el usuario autenticado
        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) {
          console.error("Error obteniendo usuario:", error);
          router.replace("/auth/login");
          return;
        }

        console.log("Usuario autenticado:", data.user.email);

        // Pequeña pausa estética antes del redireccionamiento
        setTimeout(() => {
          router.replace("/dashboard");
        }, 2000);
      } catch (err) {
        console.error("Error general:", err);
        router.replace("/auth/login");
      }
    };

    confirmUser();
  }, [router]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/brasas-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Filtro de color cálido */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-3xl font-bold mb-4 animate-pulse drop-shadow-lg">
          🔥 ¡Bienvenido a <span className="text-red-500">Bocanada Club</span>!
        </h1>

        <p className="text-lg text-gray-200 mb-6">
          Verificando tu cuenta y preparando tu experiencia a la brasa...
        </p>

        <div className="w-16 h-16 border-4 border-t-red-500 border-gray-400 rounded-full animate-spin mx-auto mb-6"></div>

        <p className="text-sm text-gray-400">
          Serás redirigido automáticamente en unos segundos.
        </p>
      </div>

      {/* Marca al pie */}
      <footer className="absolute bottom-4 text-xs text-gray-500">
        Bocanada Cocina de Brasa © {new Date().getFullYear()}
      </footer>
    </div>
  );
}