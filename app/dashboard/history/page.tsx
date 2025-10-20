"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

interface PointsLog {
  id: number;
  points: number;
  source: string;
  created_at: string;
}

interface Coupon {
  id: number;
  reward: string;
  status: string;
}

export default function History() {
  const [points, setPoints] = useState<PointsLog[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: p } = await supabase
        .from("points_log")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setPoints(p || []);

      const { data: c } = await supabase
        .from("coupons")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setCoupons(c || []);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
        <p>Cargando historial...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center p-6 text-white animate-fadeIn">
      <div className="bg-white/5 p-6 rounded-2xl shadow-lg backdrop-blur-md max-w-md w-full mt-12">
        <h1 className="text-2xl font-semibold mb-4 text-center font-serif">Historial</h1>
        
        <h2 className="text-lg font-bold mb-3 text-[#FFD700]">Puntos Obtenidos</h2>
        <ul className="space-y-2 mb-6 text-sm text-white/80 max-h-60 overflow-y-auto pr-2">
          {points.length > 0 ? points.map(p => (
            <li key={p.id} className="bg-white/5 rounded-lg p-3 flex justify-between items-center hover:bg-white/10 transition-all">
              <span>
                <span className="font-bold text-green-400">+{p.points} pts</span> — <span className="capitalize">{p.source}</span>
              </span>
              <span className="text-xs text-white/50">{new Date(p.created_at).toLocaleDateString()}</span>
            </li>
          )) : <p className="text-center text-white/50 py-4">Sin movimientos de puntos.</p>}
        </ul>

        <h2 className="text-lg font-bold mb-3 text-[#FFD700]">Cupones Ganados</h2>
        <ul className="space-y-2 text-sm text-white/80">
          {coupons.length > 0 ? coupons.map(c => (
            <li key={c.id} className="bg-white/5 rounded-lg p-3 flex justify-between items-center hover:bg-white/10 transition-all">
              <span className="font-bold">{c.reward}</span>
              <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${c.status === 'active' ? 'bg-green-500 text-green-950' : 'bg-gray-600 text-gray-950'}`}>
                {c.status}
              </span>
            </li>
          )) : <p className="text-center text-white/50 py-4">Sin cupones ganados.</p>}
        </ul>

        <Link href="/dashboard" className="block mt-8 text-center text-[#FFD700] hover:underline">
          ← Volver al Dashboard
        </Link>
      </div>
    </main>
  );
}