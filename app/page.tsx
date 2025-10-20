"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [message, setMessage] = useState("Verificando conexión...");

  useEffect(() => {
    async function checkConnection() {
      const { data, error } = await supabase.from("users").select("*").limit(1);
      if (error) {
        setMessage("❌ Error de conexión: " + error.message);
      } else {
        setMessage("✅ Conexión exitosa con Supabase (" + data.length + " registros encontrados)");
      }
    }
    checkConnection();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">Prueba de conexión Supabase</h1>
      <p className="mt-4">{message}</p>
    </main>
  );
}