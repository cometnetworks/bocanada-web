"use client";

export default function Reservar() {
  return (
    <main className="relative bg-black text-white min-h-screen flex flex-col justify-center items-center text-center px-4">
      <video
        src="/brasas.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-orange-400 mb-6">
          Reserva tu mesa
        </h1>
        <p className="max-w-md mb-8 text-white/80">
          Llama directamente y asegura tu lugar en Bocanada Cocina de Brassa.
        </p>

        <a
          href="tel:5593163674"
          className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg text-lg font-semibold hover:opacity-90 transition"
        >
          📞 Llamar para reservar
        </a>
      </div>
    </main>
  );
}