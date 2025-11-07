"use client";
import React, { useState } from "react"; // Import useState
import Image from "next/image";
import { motion } from "framer-motion";
import { MENU_DATA, Dish } from "@/lib/menu-data";

type MenuCategory = {
  title: string;
  items: Dish[];
};

const ALL_MENU_CATEGORIES: MenuCategory[] = Object.keys(MENU_DATA).map((key) => ({
  title: key,
  items: MENU_DATA[key],
}));

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMenu = ALL_MENU_CATEGORIES.map((category) => ({
    ...category,
    items: category.items.filter(
      (dish) =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.desc.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.items.length > 0);

  return (
    <main className="bg-neutral-50 dark:bg-neutral-900 py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.0)_0%,_rgba(255,255,255,0.0)_50%,_rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.0)_0%,_rgba(0,0,0,0.0)_50%,_rgba(0,0,0,0.3)_100%)]" />
      <div className="container mx-auto px-6 relative">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
          Menú
        </h1>

        <div className="mb-12 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Buscar platillo..."
            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#b4362c]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredMenu.map((section, index) => (
          <section key={section.title} className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-[#b4362c] mb-8 border-b border-[#b4362c]/30 pb-2"
            >
              {section.title}
            </motion.h2>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            >
              {section.items.map((dish) => (
                <motion.div
                  key={dish.id}
                  variants={item}
                  className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-all"
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
            </motion.div>
          </section>
        ))}
      </div>
    </main>
  );
}
