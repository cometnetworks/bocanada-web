// components/FabContact.tsx
"use client";

export default function FabContact() {
  return (
    <div className="fixed right-4 bottom-4 flex flex-col gap-3 z-50">
      <a
        href="tel:5593163674"
        className="px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
        aria-label="Llamar a Bocanada"
        title="Llamar a Bocanada"
      >
        📞
      </a>
      <a
        href="https://wa.me/525593163674?text=Hola%2C%20quiero%20hacer%20una%20reservaci%C3%B3n%20en%20Bocanada%20Cocina%20de%20Brassa"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-3 rounded-full bg-green-500 text-white hover:opacity-90 transition"
        aria-label="Reservar por WhatsApp"
        title="Reservar por WhatsApp"
      >
        💬
      </a>
    </div>
  );
}