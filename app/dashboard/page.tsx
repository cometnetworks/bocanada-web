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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Bienvenido, {user?.email}</h1>
      <p className="text-lg text-gray-300 mb-6">
        🎉 Tienes 0 puntos acumulados
      </p>

      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md text-center">
        <p className="text-sm text-gray-400 mb-3">
          Escanea este código en caja para ganar tus primeras recompensas:
        </p>
        <img src="/qr-sample.png" alt="QR Bocanada Club" className="mx-auto mb-4 w-40 h-40" />
        <p className="text-sm text-gray-400">
          O presenta tu código: <strong>#B0CANADA123</strong>
        </p>
      </div>

      <button
        onClick={() => supabase.auth.signOut().then(() => router.replace("/"))}
        className="mt-8 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
      >
        Cerrar sesión
      </button>
    </div>
  );
}