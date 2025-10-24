"use client";
import { useEffect } from "react";
import type { Dish } from "../lib/menu-data";
import { slugify } from "../lib/slug";

export default function MenuModal({ dish, onClose }: { dish: Dish|null; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent){ if(e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if(!dish) return null;
  const img = dish.img || `https://placehold.co/800x600/222/FFF?text=${encodeURIComponent(dish.name)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-[92vw] max-w-3xl rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
        <div className="aspect-[4/3] w-full bg-center bg-cover" style={{ backgroundImage:`url(${img})` }} />
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">{dish.name}</h3>
              <p className="text-white/70 text-sm mt-1">{dish.desc}</p>
            </div>
            <div className="text-orange-300 font-bold whitespace-nowrap">{dish.price}</div>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <a href={`/menu/${slugify(dish.name)}`} className="px-4 py-2 rounded-lg border border-white/20 hover:border-white/50">Ver detalle completo</a>
            <a href="#delivery" className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-red-600">Pedir (Delivery)</a>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-black/60 border border-white/20">✕</button>
      </div>
    </div>
  );
}