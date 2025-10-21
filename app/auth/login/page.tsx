"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    // ✅ Espera que la sesión esté lista antes de redirigir
    const { data: sessionData } = await supabase.auth.getSession();

    if (sessionData.session) {
      router.replace("/dashboard");
    } else {
      setErrorMsg("No se pudo iniciar sesión. Intenta de nuevo.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

      <form onSubmit={handleLogin} className="w-80 space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-zinc-900 border border-gray-700"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-zinc-900 border border-gray-700"
        />
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 p-2 rounded font-semibold"
        >
          Entrar
        </button>
      </form>

      {errorMsg && <p className="text-red-400 mt-4">{errorMsg}</p>}
    </div>
  );
}