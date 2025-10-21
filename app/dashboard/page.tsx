"use client";

import { useEffect, useState, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

function DashboardInner() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [coupon, setCoupon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Obtener perfil del usuario
        const { data: profileData } = await supabase
          .from("users")
          .select("id, qr_code")
          .eq("id", user.id)
          .single();

        // Obtener cupón activo
        const { data: couponData } = await supabase
          .from("coupons")
          .select("type, reward")
          .eq("user_id", user.id)
          .eq("active", true)
          .maybeSingle();

        setProfile(profileData);
        setCoupon(couponData);
        setLoading(false);

        // Redirigir automáticamente al home después de unos segundos
        setTimeout(() => {
          window.location.href = "/";
        }, 7000);
      }
    };

    fetchUserData();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-lg">
        Cargando tu información...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://bocanada-web.vercel.app/background-brasas.jpg')", // actualiza con la imagen real en /public/
      }}
    >
      <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center w-[90%] max-w-md">
        <Image
          src="/bocanada-logo.png" // agrega el logo en /public/
          alt="Bocanada Logo"
          width={180}
          height={80}
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold mb-2">
          ¡Bienvenido, {profile?.id?.slice(0, 6)}!
        </h1>
        <p className="text-gray-300 mb-4">
          Tu código QR personal para validar tu visita:
        </p>
        <div className="bg-white p-2 rounded-lg inline-block mb-4">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${profile?.qr_code}`}
            alt="QR Code"
          />
        </div>
        <p className="text-lg font-semibold text-yellow-400 mb-2">
          {coupon?.reward || "Cupón no disponible"}
        </p>
        <p className="text-sm text-gray-300 mb-6">
          Código: {profile?.qr_code}
        </p>
        <a
          href="/dashboard/history"
          className="text-sm text-orange-400 underline hover:text-orange-300 transition"
        >
          Ver historial →
        </a>
        <p className="text-xs text-gray-400 mt-4">
          Serás redirigido al inicio en unos segundos...
        </p>
      </div>
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