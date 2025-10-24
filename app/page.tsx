import Image from "next/image";
import Link from "next/link";

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

      {/* 🎄 Promoción de la semana */}
      <section className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row gap-6 items-center bg-neutral-900/60 rounded-xl">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">Cena de Fin de Año 🎄🍷</h2>
          <p className="text-gray-400 mt-2">
            Reserva tu mesa y disfruta una noche especial con vino de cortesía.
          </p>
          <a
            href="tel:5593163674"
            className="inline-block mt-4 px-5 py-2 bg-amber-600 rounded-md hover:bg-amber-700 transition"
          >
            Reservar
          </a>
        </div>
        <div className="flex-1">
          <Image
            src="/promo-navidad.jpg"
            alt="Promoción de la semana"
            width={600}
            height={300}
            className="rounded-lg object-cover w-full"
          />
        </div>
      </section>

      {/* 📸 Momentos de la parrilla */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Momentos de la parrilla</h2>
          <Link href="#" className="text-amber-500 hover:underline">
            Subir foto →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
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