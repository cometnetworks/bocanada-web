import { Facebook, Instagram, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white py-10 border-t border-orange-600 relative">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Dirección */}
        <div>
          <h3 className="text-orange-400 font-semibold mb-2">Dirección</h3>
          <p className="text-sm">
            Calle Bahía de Sta. Bárbara 64 <br />
            Verónica Anzúres, Miguel Hidalgo <br />
            11300 Ciudad de México, CDMX
          </p>
        </div>

        {/* Horarios */}
        <div>
          <h3 className="text-orange-400 font-semibold mb-2">Horario</h3>
          <p className="text-sm">
            Lunes a Domingo <br />
            1:00 p.m. — 10:00 p.m.
          </p>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="text-orange-400 font-semibold mb-2">Síguenos</h3>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/bocanada.cocinadebrassa"
              target="_blank"
              className="hover:text-orange-400"
            >
              <Instagram size={22} />
            </a>
            <a
              href="https://www.facebook.com/BocanadaParrilla/"
              target="_blank"
              className="hover:text-orange-400"
            >
              <Facebook size={22} />
            </a>
            <a
              href="https://goo.gl/maps/VxeEbbyr2w52"
              target="_blank"
              className="hover:text-orange-400"
            >
              <MapPin size={22} />
            </a>
            <a
              href="tel:5593163674"
              className="hover:text-orange-400"
            >
              <Phone size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* BOTONES FLOTANTES */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <a
          href="tel:5593163674"
          className="w-12 h-12 flex items-center justify-center bg-green-600 rounded-full shadow-lg hover:bg-green-700 transition"
        >
          📞
        </a>
        <a
          href="https://wa.me/525593163674"
          target="_blank"
          className="w-12 h-12 flex items-center justify-center bg-[#25D366] rounded-full shadow-lg hover:bg-[#20b857] transition"
        >
          💬
        </a>
      </div>

      <p className="text-center text-xs mt-8 text-white/50">
        © 2025 Bocanada Cocina de Brassa — Todos los derechos reservados.
      </p>
    </footer>
  );
}