"use client";

import { useState } from "react";
import Link from "next/link";

export default function AvatarMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="focus:outline-none">
        <img
          src="/avatar.jpg"
          alt="Avatar"
          className="w-10 h-10 rounded-full border-2 border-amber-500 hover:ring-2 hover:ring-amber-400 transition"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-lg border border-zinc-700">
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800"
          >
            Ver perfil
          </Link>
          <Link
            href="/dashboard#puntos"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800"
          >
            Mis puntos
          </Link>
          <button
            onClick={() => alert('Función de cierre de sesión próximamente')}
            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}