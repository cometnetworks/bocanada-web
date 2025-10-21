"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

function DashboardInner() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // Aquí tu lógica para obtener puntos y cupones
    const fetchData = async () => {
      const { data, error } = await supabase.from("points_log").select("*");
      if (!error && data) setPoints(data.length * 20);
    };
    fetchData();
  }, [supabase]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">¡Bienvenido a tu Dashboard!</h1>
      <p>Tienes {points} puntos.</p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Cargando dashboard...</div>}>
      <DashboardInner />
    </Suspense>
  );
}