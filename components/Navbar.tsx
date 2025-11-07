// components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { UserCircle2, Menu, X } from "lucide-react"; // Import Menu and X

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menú" },
  { href: "/#eventos-y-promociones", label: "Promos" },
  { href: "/#momentos-de-la-parrilla", label: "Galería" },
  { href: "/eventos", label: "Eventos" },
  { href: "/reservar", label: "Reservar" },
  { href: "https://www.ubereats.com/mx/store/bocanada-cocina-de-brassa/FSlEl8NzWxuw0LJ49jfXYA", label: "Delivery", external: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/50 border-b border-white/5">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/bocanada-logo.png" alt="Bocanada Cocina de Brassa" width={120} height={28} priority />
        </Link>

        {/* Desktop Menu */}
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-lg z-50">
            <div className="flex justify-end p-4">
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-6 text-lg">
              {LINKS.map((l) =>
                l.external ? (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300">
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.label} href={l.href} className="hover:text-amber-300" onClick={() => setIsMobileMenuOpen(false)}>
                    {l.label}
                  </Link>
                )
              )}
              <Link href="/auth/register" className="px-4 py-2 rounded-md bg-gradient-to-r from-orange-600 to-amber-500 text-black font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                Únete al Club
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}