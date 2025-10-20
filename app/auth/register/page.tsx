"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Procesando...");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
      },
    });

    if (error) setMessage("❌ Error: " + error.message);
    else setMessage("✅ Revisa tu correo para confirmar tu registro.");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 animate-fadeIn">
      <div className="bg-white/5 p-8 rounded-2xl shadow-xl backdrop-blur-md max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6 text-center font-serif">Crear Cuenta</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña (mín. 6 caracteres)"
            className="p-3 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-[#D32F2F] hover:bg-red-700 transition-all text-white py-3 rounded-lg font-semibold text-lg">
            Registrarme
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
        <p className="text-center text-sm mt-6 text-white/60">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="text-orange-400 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}