"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MENU_DATA, Dish } from "@/lib/menu-data";

export default function HomeMenuSection() {
  const categories = Object.keys(MENU_DATA);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
          Menú Bocanada
        </h2>

        {/* Navbar de categorías */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all border",
                activeCategory === cat
                  ? "bg-[#b4362c] text-white border-[#b4362c]"
                  : "bg-white/10 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-[#b4362c]/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Platillos destacados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {MENU_DATA[activeCategory].map((dish) => (
            <div
              key={dish.id}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 shadow-lg transition-all hover:shadow-xl"
            >
              <Image
                src={dish.image}
                alt={dish.name}
                width={400}
                height={300}
                className="object-cover w-full h-56 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {dish.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                  {dish.desc}
                </p>
                <p className="text-primary font-semibold text-base">
                  ${dish.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/menu"
            className="inline-block px-8 py-3 bg-[#b4362c] text-white rounded-full font-semibold hover:bg-[#93291b] transition-colors"
          >
            Ver Menú Completo
          </a>
        </div>
      </div>
    </section>
  );
}
