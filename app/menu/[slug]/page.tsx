import { getDishBySlug } from "../../../lib/menu-data";
import { slugify } from "../../../lib/slug";

export default function DishDetail({ params }: { params: { slug: string } }){
  const dish = getDishBySlug(params.slug);
  if(!dish){
    return (
      <main className="min-h-screen bg-[#0b0c0e] text-white grid place-items-center p-10 text-center">
        <div>
          <h1 className="text-2xl font-bold">Platillo no encontrado</h1>
          <p className="text-white/70 mt-2">El platillo que buscas no existe o cambió de nombre.</p>
          <a href="/menu" className="inline-block mt-6 px-5 py-2 rounded-lg border border-white/20 hover:border-white/60">Regresar al Menú</a>
        </div>
      </main>
    );
  }

  const img = dish.img || `https://placehold.co/1200x800/222/FFF?text=${encodeURIComponent(dish.name)}`;

  return (
    <main className="min-h-screen bg-[#0b0c0e] text-white">
      <header className="sticky top-0 z-30 bg-black/60 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2"><img src="/bocanada-logo.png" alt="Bocanada" className="h-8"/></a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="/menu" className="text-orange-300">Menú</a>
            <a href="/home#club" className="hover:text-orange-300">Bocanada Club</a>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <img src={img} alt={dish.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{dish.name}</h1>
          <p className="text-white/70 mt-3 max-w-prose">{dish.desc}</p>
          <div className="mt-5 text-2xl text-orange-300 font-semibold">{dish.price}</div>

          <div className="mt-8 flex gap-3">
            <a href="#delivery" className="px-5 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-red-600">Pedir ahora</a>
            <a href="/menu" className="px-5 py-3 rounded-xl border border-white/20 hover:border-white/60">Volver al Menú</a>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-2">Maridajes sugeridos</h2>
            <ul className="list-disc pl-5 text-white/70 space-y-1">
              <li>Vino tinto joven o cerveza ámbar.</li>
              <li>Ensalada fresca o papas a la francesa.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}