"use client";

import Image from "next/image";
import { DISHES } from "@/lib/menu-data";

export default function MenuGrid() {
  return (
    <section className="py-20 bg-black text-white" id="menu">
      <h2 className="text-4xl font-bold text-center text-amber-500 mb-10">
        Nuestro Menú
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {DISHES.map((dish, index) => (
          <div
            key={index}
            className="bg-zinc-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
          >
            <Image
              src={dish.img}
              alt={dish.name}
              width={400}
              height={300}
              className="object-cover w-full h-56"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                {dish.name}
              </h3>
              <p className="text-gray-400 text-sm">{dish.desc}</p>
              <p className="text-amber-400 font-semibold mt-3">{dish.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}