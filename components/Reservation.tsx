"use client";

import React, { useState, useMemo, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function Reservation() {
  const params = useSearchParams();
  const preselectedDate = params.get("fecha") || "";

  const [date, setDate] = useState(preselectedDate);
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState("");
  const [isLargeGroup, setIsLargeGroup] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const timeOptions = [
    "13:00", "13:30", "14:00", "14:30", "15:00",
    "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00",
    "20:30", "21:00", "21:30",
  ];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!date) newErrors.date = "Selecciona una fecha.";
    if (date < today) newErrors.date = "La fecha no puede ser en el pasado.";
    if (!time) newErrors.time = "Selecciona una hora.";
    if (!name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!email.trim()) newErrors.email = "El email es obligatorio.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Formato de email inválido.";
    if (!phone.trim()) newErrors.phone = "El teléfono es obligatorio.";
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Introduce un número de 10 dígitos.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) setStep(2);
  };

  const handleConfirm = async () => {
    const res = await fetch("/api/reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        date,
        time,
        guests,
        occasion,
      }),
    });

    const data = await res.json();
    if (data.success) {
      setStep(3); // mostrar pantalla de confirmación
    } else {
      alert("Hubo un problema al enviar tu reserva. Inténtalo más tarde.");
    }
  };

  const handleEdit = () => setStep(1);

  return (
    <section className="py-16 px-6 lg:py-24 bg-neutral-950 min-h-screen">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Reserva tu Mesa 🍷
        </h2>
        <p className="text-slate-400 mt-2">
          Asegura tu lugar en <span className="text-[#d4a373] font-semibold">Bocanada Cocina de Brassa</span>.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-8 md:p-12">
        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Fecha y Hora */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-slate-300 mb-2 font-medium">
                  Fecha
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full p-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#a22e2e]"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={today}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>
              <div>
                <label htmlFor="time" className="block text-slate-300 mb-2 font-medium">
                  Hora
                </label>
                <select
                  id="time"
                  className="w-full p-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#a22e2e]"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  {timeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comensales */}
            <div>
              <label htmlFor="guests" className="block text-slate-300 mb-2 font-medium">
                Número de comensales
              </label>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                disabled={isLargeGroup}
                className="w-full p-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg disabled:opacity-60"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} persona{i > 0 ? "s" : ""}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  id="large-group"
                  checked={isLargeGroup}
                  onChange={(e) => setIsLargeGroup(e.target.checked)}
                  className="accent-[#a22e2e]"
                />
                <label htmlFor="large-group" className="text-slate-400 text-sm">
                  ¿Es para un grupo de más de 12 personas?
                </label>
              </div>
            </div>

            {/* Datos de contacto */}
            <hr className="border-neutral-700 my-6" />
            <h3 className="text-xl font-semibold text-white mb-4">Datos de contacto</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-slate-300 mb-2 font-medium">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="w-full p-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#a22e2e]"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-slate-300 mb-2 font-medium">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full p-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#a22e2e]"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-slate-300 mb-2 font-medium">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10 dígitos (ej. 5593163674)"
                  className="w-full p-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#a22e2e]"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="occasion" className="block text-slate-300 mb-2 font-medium">
                  Ocasión especial (opcional)
                </label>
                <input
                  type="text"
                  id="occasion"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  placeholder="Ej: Aniversario, Cumpleaños"
                  className="w-full p-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#a22e2e]"
                />
              </div>
            </div>

            <p className="text-sm text-slate-500 mt-6 text-center">
              Horario: Lunes a Domingo de 13:00 a 22:00. Última reserva 21:30.
            </p>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-[#a22e2e] hover:bg-[#8b2626] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all"
              >
                Revisar Reserva
              </button>
            </div>
          </form>
        )}

        {/* Confirmación paso 2 */}
        {step === 2 && (
          <div className="text-center text-white">
            <h3 className="text-2xl font-bold mb-6">Confirma tu Reserva</h3>
            <div className="bg-neutral-800 rounded-lg p-6 text-left space-y-3 text-slate-300">
              <p><b>Nombre:</b> {name}</p>
              <p><b>Correo:</b> {email}</p>
              <p><b>Teléfono:</b> {phone}</p>
              <p><b>Fecha:</b> {date}</p>
              <p><b>Hora:</b> {time}</p>
              <p><b>Comensales:</b> {isLargeGroup ? "12+" : guests}</p>
              {occasion && <p><b>Ocasión:</b> {occasion}</p>}
            </div>

            <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
              <button
                onClick={handleEdit}
                className="px-6 py-3 rounded-lg border border-slate-500 text-slate-300 hover:bg-slate-700"
              >
                Editar
              </button>
              <button
                onClick={handleConfirm}
                className="px-6 py-3 rounded-lg bg-[#a22e2e] hover:bg-[#8b2626] text-white font-semibold shadow-md"
              >
                Confirmar
              </button>
            </div>
          </div>
        )}

        {/* Paso 3 */}
        {step === 3 && (
          <div className="text-center text-white py-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">¡Reserva Confirmada!</h3>
            <p className="text-slate-400">
              Te hemos enviado un correo con los detalles.  
              ¡Te esperamos pronto en Bocanada Cocina de Brassa!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}