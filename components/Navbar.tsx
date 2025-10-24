// components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { UserCircle2 } from "lucide-react";

const LINKS = [
  { href: "/menu", label: "Menú" },
  { href: "/#promo", label: "Promos" },
  { href: "/#galeria", label: "Galería" },
  { href: "/reservar", label: "Reservar" },
  { href: "https://www.ubereats.com/mx/store/bocanada-cocina-de-brassa/FSlEl8NzWxuw0LJ49jfXYA", label: "Delivery", external: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/50 border-b border-white/5">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/bocanada-logo.png" alt="Bocanada Cocina de Brassa" width={120} height={28} priority />
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          {LINKS.map((l) =>
            l.external ? (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300">
                {l.label}
              </a>
            ) : (
              <Link key={l.label} href={l.href} className="hover:text-amber-300">
                {l.label}
              </Link>
            )
          )}
          <Link href="/auth/register" className="px-3 py-1.5 rounded-md bg-gradient-to-r from-orange-600 to-amber-500 text-black font-semibold">
            Únete al Club
          </Link>

          {/* Avatar */}
          <div className="relative">
            <button onClick={() => setOpen((v) => !v)} className="rounded-full w-8 h-8 overflow-hidden ring-2 ring-amber-400/40">
              <Image src="/avatar.jpg" alt="Avatar" width={32} height={32} />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-44 rounded-lg bg-neutral-900 border border-white/10 shadow-lg">
                <Link className="block px-3 py-2 hover:bg-white/5" href="/dashboard">Mi panel</Link>
                <Link className="block px-3 py-2 hover:bg-white/5" href="/auth/login">Iniciar sesión</Link>
                <Link className="block px-3 py-2 hover:bg-white/5" href="/auth/register">Crear cuenta</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}