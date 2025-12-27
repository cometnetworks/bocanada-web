"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Reserva = {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  fecha: string;
  hora: string;
  comensales: number;
  ocasion?: string;
  grupo_grande?: boolean;
  creado_en: string;
};

export default function DashboardReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [filtroFecha, setFiltroFecha] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔗 Inicializa conexión a Supabase usando el cliente compartido
  const supabase = createClient();

  // 🚀 Cargar reservas al iniciar
  useEffect(() => {
    cargarReservas();

    // 🔄 Suscripción en tiempo real a nuevas reservas
    const channel = supabase
      .channel("reservas-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reservas" },
        () => cargarReservas()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const cargarReservas = async () => {
    setLoading(true);
    let query = supabase.from("reservas").select("*").order("fecha", { ascending: true });

    if (filtroFecha) query = query.eq("fecha", filtroFecha);
    if (busqueda) query = query.ilike("nombre", `%${busqueda}%`);

    const { data, error } = await query;
    if (!error && data) setReservas(data);
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-neutral-950 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-[#d4a373]">
          📅 Panel de Reservas — Bocanada Cocina de Brassa
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-sm w-full sm:w-1/3"
          />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-sm w-full sm:w-1/3"
          />
          <button
            onClick={cargarReservas}
            className="bg-[#a22e2e] hover:bg-[#8b2626] px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            🔄 Actualizar
          </button>
        </div>

        {loading ? (
          <p className="text-slate-400 text-center mt-12">Cargando reservas...</p>
        ) : reservas.length === 0 ? (
          <p className="text-slate-400 text-center mt-12">No hay reservas registradas.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-neutral-800">
            <table className="min-w-full text-sm border-collapse">
              <thead className="bg-neutral-800 text-slate-300">
                <tr>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">Fecha</th>
                  <th className="px-4 py-3 text-left">Hora</th>
                  <th className="px-4 py-3 text-left">Comensales</th>
                  <th className="px-4 py-3 text-left">Teléfono</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Ocasión</th>
                  <th className="px-4 py-3 text-left">Creado</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t border-neutral-800 hover:bg-neutral-800/50 transition-colors"
                  >
                    <td className="px-4 py-2">{r.nombre}</td>
                    <td className="px-4 py-2">{r.fecha}</td>
                    <td className="px-4 py-2">{r.hora}</td>
                    <td className="px-4 py-2">{r.comensales}</td>
                    <td className="px-4 py-2">{r.telefono}</td>
                    <td className="px-4 py-2">{r.email}</td>
                    <td className="px-4 py-2">{r.ocasion || "-"}</td>
                    <td className="px-4 py-2">
                      {new Date(r.creado_en).toLocaleString("es-MX", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}