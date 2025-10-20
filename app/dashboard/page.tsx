"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) {
          router.replace("/auth/login");
          return;
        }
        if (!mounted) return;
        setUserEmail(data.user.email ?? null);
      } catch (e) {
        console.error(e);
        router.replace("/auth/login");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    run();
    return () => { mounted = false; };
  }, [router]);

  if (loading) return <p className="p-8 text-white">Cargando…</p>;

  return (
    <div className="text-white text-center p-8">
      <h1 className="text-2xl font-bold mb-4">¡Bienvenido, {userEmail}!</h1>
      {/* …resto del dashboard… */}
    </div>
  );
}