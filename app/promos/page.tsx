"use client";
import Image from "next/image";
import Link from "next/link";

export default function PromosPage() {
  const eventos = [
    {
      title: "🎉 Aniversario Bocanada 2025",
      desc: "Celebra con nosotros el lunes 17 de noviembre con música en vivo, menú especial y promociones exclusivas para nuestros socios.",
      img: "/eventos/bocanada-aniversario.jpg",
      badge: "Evento Especial",
      link: "/reservar",
    },
    {
      title: "🎄 Cena de Fin de Año",
      desc: "Despedimos el año con una experiencia gastronómica única, maridaje especial y música en vivo. ¡Reserva tu mesa con anticipación!",
      img: "/eventos/promo-navidad.jpg",
      badge: "Cena Especial",
      link: "/reservar",
    },
    {
      title: "🍸 Happy Hour",
      desc: "Disfruta nuestras bebidas y cocteles 2x1 de lunes a jueves, de 5:00 p.m. a 7:00 p.m. Ideal para relajarte después del trabajo.",
      img: "/eventos/happy-hour.jpg",
      badge: "Promoción Permanente",
      link: "/menu",
    },
  ];

  return (
    <main className="bg-[#f8f6f5] dark:bg-[#1A1A1A] text-[#2E2E2E] dark:text-white py-16 px-4 sm:px-8">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-4 text-[#a22e2e]">
          Eventos y Promociones
        </h1>
        <p className="text-center text-slate-600 dark:text-slate-300 mb-12 text-lg">
          Vive experiencias únicas en{" "}
          <strong>Bocanada Cocina de Brassa</strong>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {eventos.map((ev, i) => (
            <div
              key={i}
              className="group bg-white dark:bg-[#2A2A2A] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-56">
                <Image
                  src={ev.img}
                  alt={ev.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#DAA520] text-black font-bold px-3 py-1 rounded-full text-xs uppercase">
                  {ev.badge}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 text-[#a22e2e]">
                  {ev.title}
                </h3>
                <p className="text-sm mb-4">{ev.desc}</p>
                <Link
                  href={ev.link}
                  className="text-[#f24a0d] font-bold hover:text-[#d93d0b] transition-colors"
                >
                  Reservar →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg mb-4">
            ¿Quieres enterarte primero de nuestros próximos eventos?
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] focus:ring-2 focus:ring-[#f24a0d] outline-none"
            />
            <button
              type="submit"
              className="bg-[#f24a0d] hover:bg-[#d93d0b] text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}