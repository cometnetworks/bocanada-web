"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* 🔥 Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
      >
        <source src="/brasas.mp4" type="video/mp4" />
      </video>

      {/* 🔳 Capa de calor/sombra */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90" />

      {/* 🌟 Contenido principal */}
      <div className="relative z-10 text-center px-6 max-w-lg animate-fadeIn">
        <Image
          src="/bocanada-logo.png"
          alt="Bocanada Cocina de Brasa"
          width={320}
          height={110}
          priority
          className="mx-auto drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] mb-6"
        />

        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-wide font-serif">
          Bocanada Club
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
          Acumula puntos, desbloquea recompensas y disfruta de la mejor experiencia a la brasa 🔥
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.push("/auth/login")}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 transition-all rounded-xl font-semibold shadow-md hover:shadow-lg"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => router.push("/auth/register")}
            className="px-8 py-3 bg-transparent border border-white/70 hover:bg-white/10 transition-all rounded-xl font-semibold"
          >
            Registrarse
          </button>
        </div>
      </div>
    </main>
  );
}