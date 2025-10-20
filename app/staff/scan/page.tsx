"use client";
import { useState } from "react";

export default function StaffScan() {
  const [qr, setQr] = useState("");
  const [pin, setPin] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("Validando...");
    const res = await fetch("/api/validate-qr", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ qr, secret: pin }),
    });
    const j = await res.json();
    if (!res.ok) setMsg("❌ " + (j.error || "Error desconocido"));
    else setMsg(`✅ Asistencia confirmada para ${j.userId}. Puntos ahora: ${j.newPoints}.`);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 animate-fadeIn">
      <div className="bg-white/5 p-8 rounded-2xl shadow-xl backdrop-blur-md max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6 text-center font-serif">Staff: Validar QR</h1>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input 
            className="p-3 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
            placeholder="Código QR (BCN-XXXXXX)" 
            value={qr} 
            onChange={e=>setQr(e.target.value)} 
            required
          />
          <input 
            className="p-3 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
            placeholder="PIN de Staff" 
            type="password" 
            value={pin} 
            onChange={e=>setPin(e.target.value)} 
            required
          />
          <button 
            className="bg-emerald-600 hover:bg-emerald-700 transition-all text-white py-3 rounded-lg font-semibold text-lg disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Validando..." : "Confirmar Asistencia"}
          </button>
        </form>
        {msg && <p className="mt-4 text-center text-sm">{msg}</p>}
      </div>
    </main>
  );
}