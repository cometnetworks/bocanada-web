"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MENU_DATA, Dish } from "@/lib/menu-data";

type MenuCategory = {
  title: string;
  items: Dish[];
};

const MENU_CATEGORIES: MenuCategory[] = Object.keys(MENU_DATA).map((key) => ({
  title: key,
  items: MENU_DATA[key],
}));

export default function MenuPage() {
  return (
    <main className="bg-neutral-50 dark:bg-neutral-900 py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
          Menú Completo — Bocanada Cocina de Brassa
        </h1>

        {MENU_CATEGORIES.map((section, index) => (
          <section key={section.title} className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-[#b4362c] mb-8 border-b border-[#b4362c]/30 pb-2"
            >
              {section.title}
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {section.items.map((dish) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                >
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-52"
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {dish.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {dish.desc}
                    </p>
                    <p className="text-[#b4362c] font-semibold text-base">
                      ${dish.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
