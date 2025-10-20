"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) {
          router.replace("/auth/login");
          return;
        }

        setUser(data.user);
      } catch (err) {
        console.error("Error obteniendo usuario:", err);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [router]);

  if (loading) return <p className="text-white">Cargando...</p>;

  return (
    <div className="text-white text-center p-8">
      <h1 className="text-2xl font-bold mb-4">
        ¡Bienvenido, {user?.email}!
      </h1>
      <p>Tu dashboard se cargó correctamente ✅</p>
    </div>
  );
}