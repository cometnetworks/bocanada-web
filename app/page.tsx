export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* 🎥 Video de fondo principal */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/brasa-bg.jpg" // Imagen de respaldo si el video no carga
      >
        <source src="/brasas.mp4" type="video/mp4" />
        Tu navegador no soporta reproducción de video.
      </video>

      {/* 🔲 Capa de contraste */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 🔥 Contenido principal */}
      <div className="relative z-10 flex flex-col items-center text-center p-8">
        <img
          src="/bocanada-logo.png"
          alt="Bocanada Cocina de Brassa"
          className="w-auto h-12 mx-auto mb-4"
        />

        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Bocanada Club
        </h1>
        <p className="text-lg mb-6 max-w-md">
          Acumula puntos, desbloquea recompensas y disfruta de la mejor
          experiencia a la brasa 🔥
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col md:flex-row gap-4">
          <a
            href="/auth/login"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Iniciar sesión
          </a>
          <a
            href="/auth/register"
            className="border border-white hover:bg-white hover:text-black font-semibold px-6 py-3 rounded-lg transition"
          >
            Registrarse
          </a>
        </div>

        {/* 🔗 Enlaces secundarios */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
          <a
            href="https://www.ubereats.com/mx/store/bocanada-cocina-de-brassa/FSlEl8NzWxuw0LJ49jfXYA"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            📦 Delivery (Uber Eats)
          </a>
          <a href="#menu" className="hover:text-white transition">
            🍽️ Menú
          </a>
          <a href="#reservar" className="hover:text-white transition">
            📅 Reservar mesa
          </a>
          <a
            href="https://www.instagram.com/bocanadamerida/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            📸 Instagram
          </a>
        </div>
      </div>

      {/* 🧾 Footer */}
      <footer className="absolute bottom-4 text-sm text-gray-400">
        Bocanada Cocina de Brassa © {new Date().getFullYear()}
      </footer>
    </div>
  );
}