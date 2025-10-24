"use client";
import { DISHES, CATEGORIES } from "@/lib/menu-data";

export default function MenuPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10 text-orange-400">
          Nuestro Menú
        </h1>

        {CATEGORIES.map((category) => (
          <section key={category} className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-orange-300 border-b border-orange-700 pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DISHES.filter((dish) => dish.category === category).map(
                (dish, index) => (
                  <div
                    key={index}
                    className="bg-[#111] rounded-xl p-4 hover:bg-[#1a1a1a] transition"
                  >
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="rounded-lg w-full h-48 object-cover mb-4"
                    />
                    <h3 className="text-lg font-semibold text-orange-400 mb-1">
                      {dish.name}
                    </h3>
                    <p className="text-sm text-white/70 mb-2">{dish.desc}</p>
                    <p className="text-orange-300 font-bold">{dish.price}</p>
                  </div>
                )
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}