"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function MiniReserva() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");

  const handleReserve = () => {
    if (selectedDate) {
      router.push(`/reservar?fecha=${selectedDate}`);
    } else {
      router.push("/reservar");
    }
  };

  return (
    <section className="max-w-6xl mx-auto my-16 px-6">
      <div className="bg-neutral-900 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-lg border border-neutral-800">
        
        {/* 🥂 Columna Izquierda */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Cena de Fin de Año 🎄🍷
          </h3>
          <p className="text-slate-300 mb-6">
            Reserva tu mesa y disfruta una noche especial con vino de cortesía.
          </p>

          {/* 📅 Calendario rápido */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <input
              type="date"
              className="w-full sm:w-auto bg-neutral-800 text-white rounded-lg px-4 py-2 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#a22e2e]"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
            <button
              onClick={handleReserve}
              className="bg-[#a22e2e] hover:bg-[#8b2626] transition-colors text-white font-semibold rounded-lg px-6 py-2 shadow-md"
            >
              Reservar
            </button>
          </div>

          {/* 📞 Llamar */}
          <a
            href="tel:5593163674"
            className="inline-flex items-center text-[#d4a373] font-medium hover:underline"
          >
            📞 Llamar al restaurante
          </a>
        </div>

        {/* 🎁 Imagen Derecha */}
        <div className="flex-1 w-full md:w-auto">
          <Image
            src="/promo-navidad.jpg"
            alt="Cena de Fin de Año Bocanada"
            width={800}
            height={400}
            className="rounded-xl shadow-lg object-cover w-full"
          />
        </div>
      </div>
    </section>
  );
}