import Image from "next/image";
import Link from "next/link";
import MiniReserva from "@/components/MiniReserva";
import HomeMenuSection from "@/components/HomeMenuSection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* 🎥 Video hero */}
      <div className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/brasas.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            Sabor al fuego. Experiencia Bocanada.
          </h1>
          <p className="mt-3 text-lg text-gray-300">
            Cocina artesanal, vinos selectos y cortes a la brasa.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              href="/menu"
              className="px-5 py-2 bg-amber-600 rounded-md text-white font-medium hover:bg-amber-700 transition"
            >
              Ver menú
            </Link>
            <Link
              href="/reservar"
              className="px-5 py-2 border border-white/30 rounded-md hover:bg-white/10 transition"
            >
              Reservar
            </Link>
          </div>
        </div>
      </div>

      {/* 🧑‍🍳 Favoritos del Chef */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Favoritos del Chef</h2>
          <Link href="/menu" className="text-amber-500 hover:underline">
            Ver menú completo →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Canelones",
              desc: "De carne o espinaca, gratinados con queso.",
              img: "/menu/canelones.jpg",
              price: "$185",
            },
            {
              name: "Lasagna Uruguaya",
              desc: "Casera con salsa pomodoro y queso gratinado.",
              img: "/menu/lasagna-uruguaya.jpg",
              price: "$199",
            },
            {
              name: "Milanesa Napolitana",
              desc: "Pollo o res con papas fritas.",
              img: "/menu/milanesa-napolitana-pollo.jpg",
              price: "$199",
            },
          ].map((dish) => (
            <div
              key={dish.name}
              className="bg-neutral-900 rounded-lg overflow-hidden hover:scale-[1.02] transition-transform"
            >
              <Image
                src={dish.img}
                alt={dish.name}
                width={500}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{dish.name}</h3>
                <p className="text-sm text-gray-400">{dish.desc}</p>
                <p className="text-amber-500 mt-2">{dish.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <HomeMenuSection />

      {/* 🎉 Aniversario Banner */}
      <section className="relative w-full h-[50vh] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/newyear-comidas.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <div className="md:block hidden">
            <h2 className="text-3xl md:text-5xl font-bold text-amber-400">
              ¡Cenas de Fin de Año para Empresas!
            </h2>
            <p className="mt-3 text-lg text-gray-200 max-w-2xl">
              Celebra con tu equipo en Bocanada. Menús especiales, ambiente exclusivo y la mejor brasa para despedir el año.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/reservar"
              className="px-8 py-3 bg-amber-600 rounded-md text-white font-bold text-lg hover:bg-amber-700 transition-transform hover:scale-105"
            >
              Reserva tu Lugar
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Promoción */}
      <MiniReserva />

      {/* =======================
      📅 EVENTOS Y PROMOCIONES
      ======================= */}
      <section id="eventos-y-promociones" className="py-16 bg-[#f8f6f5] dark:bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-[#a22e2e]">
            Eventos y Promociones
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-10 text-lg">
            Vive experiencias únicas, celebra con nosotros y descubre las nuevas 
            promociones de <strong>Bocanada Cocina de Brassa</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* 🎉 Aniversario Bocanada */}
            <div className="group bg-white dark:bg-[#2A2A2A] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-56">
                <Image
                  src="/bocaniversary.jpg"
                  alt="Aniversario Bocanada"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#DAA520] text-black font-bold px-3 py-1 rounded-full text-xs uppercase">
                  Evento Especial
                </div>
              </div>
              <div className="p-6 text-left">
                <h3 className="text-lg font-bold mb-2 text-[#a22e2e]">
                  🎉 Aniversario Bocanada 2025
                </h3>
                <p className="text-sm mb-4 text-slate-700 dark:text-slate-300">
                  Celebra con nosotros el lunes 17 de noviembre con música en vivo,
                  menú especial y promociones exclusivas.
                </p>
                <Link
                  href="/reservar"
                  className="text-[#f24a0d] font-bold hover:text-[#d93d0b] transition-colors"
                >
                  Reservar →
                </Link>
              </div>
            </div>

            {/* 🍸 Happy Hour */}
            <div className="group bg-white dark:bg-[#2A2A2A] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-56">
                <Image
                  src="/horafeliz.jpg"
                  alt="Happy Hour Bocanada"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#DAA520] text-black font-bold px-3 py-1 rounded-full text-xs uppercase">
                  Promoción Permanente
                </div>
              </div>
              <div className="p-6 text-left">
                <h3 className="text-lg font-bold mb-2 text-[#a22e2e]">
                  🍸 Happy Hour
                </h3>
                <p className="text-sm mb-4 text-slate-700 dark:text-slate-300">
                  Cocteles 2x1 y botanas especiales de lunes a jueves, de 5:00 p.m. a
                  7:00 p.m.
                </p>
                <Link
                  href="/menu"
                  className="text-[#f24a0d] font-bold hover:text-[#d93d0b] transition-colors"
                >
                  Ver Menú →
                </Link>
              </div>
            </div>

            {/* 🎄 Cena de Fin de Año */}
            <div className="group bg-white dark:bg-[#2A2A2A] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-56">
                <Image
                  src="/eventos/promo-navidad.jpg"
                  alt="Cena de Fin de Año"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#DAA520] text-black font-bold px-3 py-1 rounded-full text-xs uppercase">
                  Cena Especial
                </div>
              </div>
              <div className="p-6 text-left">
                <h3 className="text-lg font-bold mb-2 text-[#a22e2e]">
                  🎄 Cena de Fin de Año
                </h3>
                <p className="text-sm mb-4 text-slate-700 dark:text-slate-300">
                  Despide el año con una cena exclusiva y maridaje especial. ¡Asegura
                  tu mesa antes del 31 de diciembre!...
                </p>
                <Link
                  href="/reservar"
                  className="text-[#f24a0d] font-bold hover:text-[#d93d0b] transition-colors"
                >
                  Reservar →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📸 Momentos de la parrilla */}
      <section id="momentos-de-la-parrilla" className="max-w-7xl mx-auto py-16 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Así se Vive Bocanada</h2>
          <Link href="#" className="text-amber-500 hover:underline">
            Subir foto →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Image
              key={i}
              src={`/ambiente${i + 1}.jpg`}
              alt={`Ambiente ${i + 1}`}
              width={300}
              height={300}
              className="rounded-md object-cover w-full h-48"
            />
          ))}
        </div>
      </section>
    </div>
  );
}