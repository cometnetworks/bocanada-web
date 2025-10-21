"use client";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center h-screen text-white text-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/brasas.mp4" type="video/mp4" />
        Tu navegador no soporta video.
      </video>

      <div className="relative z-10">
        <img
          src="/bocanada-logo.png"
          alt="Bocanada Cocina de Brasa"
          className="mx-auto mb-4 w-36"
        />
        <h1 className="text-4xl font-bold mb-2">Bocanada Club</h1>
        <p className="max-w-md mx-auto text-lg mb-6">
          Acumula puntos, desbloquea recompensas y disfruta de la mejor
          experiencia a la brasa 🔥
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/auth/login"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Iniciar sesión
          </a>
          <a
            href="/auth/register"
            className="border border-white hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold"
          >
            Registrarse
          </a>
        </div>
      </div>
    </main>
  );
}