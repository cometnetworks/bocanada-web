"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Iniciando sesión...");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMessage("❌ " + error.message);
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 animate-fadeIn">
      <div className="bg-white/5 p-8 rounded-2xl shadow-xl backdrop-blur-md max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6 text-center font-serif">Iniciar Sesión</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="p-3 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-[#D32F2F] hover:bg-red-700 transition-all text-white py-3 rounded-lg font-semibold text-lg">
            Entrar
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
        <p className="text-center text-sm mt-6 text-white/60">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/register" className="text-orange-400 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </main>
  );
}