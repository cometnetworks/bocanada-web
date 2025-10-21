"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // ❌ Si no hay sesión, redirige al login
        router.replace("/auth/login");
      } else {
        // ✅ Si hay sesión, guarda el usuario y deja de cargar
        setUser(session.user);
        setLoading(false);
      }
    };

    checkSession();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <p>Cargando tu información...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-8">
      <h1 className="text-3xl font-extrabold mb-2">🔥 Bocanada Club</h1>
      <p className="text-gray-300 mb-8 text-center">
        Bienvenido, <span className="text-red-500 font-semibold">{user?.email}</span>
        <br /> Ya eres parte del programa de recompensas Bocanada.
      </p>

      {/* Tarjeta de puntos */}
      <div className="bg-zinc-900 border border-red-600 rounded-2xl p-6 w-full max-w-md text-center shadow-lg shadow-red-700/20">
        <h2 className="text-xl font-semibold mb-2">Tu saldo de puntos</h2>
        <p className="text-5xl font-bold text-red-500 mb-4">0</p>
        <p className="text-sm text-gray-400 mb-6">
          Escanea este código al pagar y comienza a ganar recompensas 🍽️
        </p>

        <img
          src="/qr-sample.png"
          alt="QR Bocanada Club"
          className="mx-auto mb-4 w-40 h-40 border border-red-500 rounded-lg shadow-md"
        />

        <p className="text-sm text-gray-400 mb-6">
          Código de cliente: <span className="text-white font-semibold">#B0CANADA123</span>
        </p>
      </div>

      <button
        onClick={() => supabase.auth.signOut().then(() => router.replace("/"))}
        className="mt-10 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-md"
      >
        Cerrar sesión
      </button>
    </div>
  );
}