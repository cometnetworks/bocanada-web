"use client";

import Image from "next/image";
import Link from "next/link";

type Item = { name: string; price: string; desc?: string; badge?: string };

function Section({ id, title, subtitle, items }: { id: string; title: string; subtitle?: string; items: Item[] }) {
  return (
    <section id={id} className="relative py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-1 font-serif">{title}</h2>
        {subtitle && <p className="text-white/70 mb-6">{subtitle}</p>}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <div key={i} className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 hover:bg-white/10 transition-all">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{it.name}</h3>
                <span className="text-brand-gold font-semibold">{it.price}</span>
              </div>
              {it.desc && <p className="text-sm text-white/70 mt-2">{it.desc}</p>}
              {it.badge && (
                <span className="inline-block mt-3 text-xs uppercase tracking-wide bg-white/10 border border-white/10 rounded px-2 py-1">
                  {it.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const favoritos: Item[] = [
    { name: "Canelones", price: "$185.00", desc: "Carne o espinaca, pomodoro, Gouda y parmesano gratinado." },
    { name: "Lasagna Uruguaya", price: "$199.00", desc: "Casera de carne o espinaca con pomodoro y quesos." },
    { name: "Milanesa Napolitana de Pollo", price: "$199.00", desc: "Con pomodoro, jamón y Gouda. Incluye papas fritas." },
    { name: "Milanesa Napolitana de Res", price: "$199.00", desc: "Res gratinada con Gouda y papas fritas." },
  ];

  const empanadas: Item[] = [
    { name: "Empanada de Carne", price: "$52.00" },
    { name: "Empanada de Espinaca", price: "$52.00" },
    { name: "Empanada de Chistorra", price: "$52.00" },
    { name: "Empanada de Elote", price: "$52.00" },
  ];

  const hamburguesas: Item[] = [
    { name: "Hamburguesa Bocanada", price: "$199.00", desc: "Gouda, chorizo argentino y huevo estrellado. Con papas.", badge: "🌶️ Picante" },
    { name: "Hamburguesa Hawaiana", price: "$189.00", desc: "Jamón de pavo, piña y Gouda. Con papas.", badge: "🌶️ Picante" },
    { name: "Sándwich Bocanada", price: "$189.00", desc: "Arrachera + chorizo argentino + Gouda. Con papas." },
    { name: "Choriqueso", price: "$130.00", desc: "Chorizo argentino gratinado con Gouda. Con papas.", badge: "🌶️" },
  ];

  const parrillaYPastas: Item[] = [
    { name: "Salmón a las Brasas", price: "$340.00", desc: "Con puré, espárragos y reducción balsámica. 🐟" },
    { name: "Camarones a las Brasas", price: "$340.00", desc: "U15 con mayo chipotle y ensalada mixta. 🦐 🌶️" },
    { name: "Steak de Atún", price: "$249.00", desc: "Medallón a la parrilla con salsa de chipotle. 🐟 🌶️" },
    { name: "Ravioles", price: "$199.00", desc: "7 pzas. Salsa a elegir (4 quesos, bolognesa, pesto, burro)." },
  ];

  return (
    <main className="relative min-h-screen text-white">
      <video autoPlay muted loop playsInline className="fixed inset-0 w-full h-full object-cover brightness-[0.35] -z-10">
        <source src="/brasas.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 -z-10" />

      <header className="sticky top-0 z-20 backdrop-blur-sm bg-black/40 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/bocanada-logo.png" alt="Bocanada" width={120} height={40} className="opacity-90" />
            <span className="hidden md:inline text-white/70 text-sm">Cocina de Brasa & Parrilla</span>
          </div>
          <nav className="flex items-center gap-5 text-sm">
            <a href="#favoritos" className="hover:underline">Favoritos</a>
            <a href="#empanadas" className="hover:underline">Empanadas</a>
            <a href="#hamburguesas" className="hover:underline">Hamburguesas</a>
            <a href="#parrilla" className="hover:underline">Parrilla & Pastas</a>
            <Link href="/auth/login" className="rounded-lg border border-white/20 px-3 py-1 hover:bg-white/10">Bocanada Club</Link>
          </nav>
        </div>
      </header>

      <section className="relative pt-16">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide font-serif">El fuego también se saborea</h1>
          <p className="mt-4 text-white/80 text-lg md:text-xl">Brasas, cortes, pastas y mixología — en el corazón de Bocanada.</p>
          <div className="mt-8 flex gap-4 justify-center">
            <a href="#favoritos" className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold">Ver menú</a>
            <Link href="/reservas" className="px-6 py-3 bg-transparent border border-white/40 hover:bg-white/10 rounded-xl font-semibold">Reservar</Link>
          </div>
        </div>
      </section>

      <Section id="favoritos" title="Los Favoritos del Chef" subtitle="Nuestra selección más pedida en sala y a domicilio." items={favoritos} />
      <Section id="empanadas" title="Empanadas Artesanales" subtitle="Horneadas con el toque de la casa." items={empanadas} />
      <Section id="hamburguesas" title="Hamburguesas & Sándwiches" subtitle="Jugosas, con Gouda gratinado y papas crujientes." items={hamburguesas} />
      <Section id="parrilla" title="Parrilla & Pastas" subtitle="Del mar y de la tierra, directo a la brasa." items={parrillaYPastas} />

      <section id="delivery" className="relative py-12 px-6">
        <div className="mx-auto max-w-6xl rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 font-serif">Delivery & Reservas</h2>
          <p className="text-white/70 mb-6">Pide a domicilio o reserva tu mesa. ¡Te esperamos!</p>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.ubereats.com/mx/store/bocanada-cocina-de-brassa/FSlEl8NzWxuw0LJ49jfXYA" target="_blank" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10">Uber Eats</a>
            <a href="#" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10">Didi Food</a>
            <a href="#" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10">Rappi</a>
            <Link href="/reservas" className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700">Reservar ahora</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-white/60">
        <p>Calle Bahia de Sta. Barbara 64, Ciudad de México</p>
        <div className="mt-4 space-y-1">
          <p className="font-bold text-white/80">Horarios</p>
          <p>Lunes - Jueves: 13:00 - 22:00</p>
          <p>Viernes: 13:00 - 23:00</p>
          <p>Sábado - Domingo: 13:00 - 22:00</p>
        </div>
      </footer>
    </main>
  );
}
