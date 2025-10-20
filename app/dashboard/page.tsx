"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import QRCode from "react-qr-code";
import PointsProgress from "@/components/PointsProgress";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [qr, setQr] = useState("");
  const [coupon, setCoupon] = useState("");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const setupUser = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (!authUser) {
          window.location.href = "/auth/login";
          return;
        }
        setUser(authUser);

        // 1. Buscar perfil de usuario
        let { data: userProfile } = await supabase.from("users").select("id, points, qr_code").eq("id", authUser.id).single();

        // 2. Si no hay perfil, crearlo
        if (!userProfile) {
          const { data: newUser, error: insertError } = await supabase.from("users").insert({ id: authUser.id, email: authUser.email, points: 0 }).select().single();
          if (insertError) throw new Error(`Error creating user profile: ${insertError.message}`);
          userProfile = newUser;
        }

        // 3. Manejar el código QR: usar el existente o crear y guardar uno nuevo
        let finalQrCode = userProfile?.qr_code;
        if (!finalQrCode) {
          finalQrCode = `BCN-${authUser.id.slice(0, 6).toUpperCase()}`;
          const { error: updateError } = await supabase.from("users").update({ qr_code: finalQrCode }).eq("id", authUser.id);
          if (updateError) throw new Error(`Error saving QR code: ${updateError.message}`);
        }
        setQr(finalQrCode);
        setPoints(userProfile?.points || 0);

        // 4. Manejar cupón de bienvenida
        const { data: coupons } = await supabase.from("coupons").select("*").eq("user_id", authUser.id).order("created_at", { ascending: false }).limit(1);
        if (coupons?.length) {
          setCoupon(coupons[0].reward);
        } else {
          await supabase.from("coupons").insert([{ user_id: authUser.id, type: "welcome", reward: "Bebida gratis" }]);
          setCoupon("Bebida gratis");
        }

      } catch (e) {
        console.error("Error setting up user:", e);
      }
    };

    setupUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-6 animate-fadeIn">
      {user ? (
        <div className="w-full max-w-sm">
          <Image src="/bocanada-logo.png" alt="Bocanada" width={120} height={120} className="mx-auto mb-4 opacity-90" />
          <div className="bg-white/5 p-6 rounded-2xl shadow-xl backdrop-blur-md w-full">
            <h1 className="text-xl font-semibold mb-2 font-serif">¡Bienvenido, {user.email}!</h1>
            <div className="mx-auto w-fit bg-white p-3 rounded-xl mb-4 border-4 border-white/10">
              <QRCode value={qr || "loading..."} size={150} />
            </div>
            <p className="text-sm mb-1 text-white/80">Tu código QR: <span className="font-mono">{qr}</span></p>
            <p className="text-sm mb-4">
              Cupón activo: <span className="text-[#FFD700] font-semibold">{coupon}</span>
            </p>
            <PointsProgress points={points} />
            <Link href="/dashboard/history" className="block mt-4 text-[#FFD700] hover:underline text-sm">
              Ver historial de puntos y cupones
            </Link>
            <button
              onClick={logout}
              className="mt-6 bg-[#D32F2F] hover:bg-red-700 transition-all text-white py-2 px-6 rounded-lg font-semibold w-full"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </section>
  );
}