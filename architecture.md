# Arquitectura Técnica — Bocanada Cocina de Brassa (v1.0)

**Stack base**
- Framework: Next.js 15 (App Router, TypeScript)
- UI: Tailwind CSS + PostCSS
- Deploy & CDN: Vercel
- Auth & DB (presente y futuro): Supabase (Auth + Postgres)
- Imágenes/Media: `/public` + `next/image` (optimización automática)
- Linting: ESLint (reglas ajustadas para ergonomía en v1.0)
- Iconos: Lucide (o Heroicons) + SVG propios

---

## 1) Estructura de carpetas



bocanada-web/
├─ app/
│ ├─ layout.tsx # Inyecta <Navbar /> y <Footer /> globales
│ ├─ page.tsx # Home
│ ├─ menu/
│ │ └─ page.tsx # Menú completo con filtros/scroll a secciones
│ ├─ reservar/
│ │ └─ page.tsx # CTA de reserva (tel:+52...)
│ ├─ dashboard/
│ │ └─ page.tsx # Panel de socio (puntos, QR demo)
│ └─ auth/
│ ├─ register/
│ │ └─ page.tsx # Registro Supabase
│ └─ login/
│ └─ page.tsx # Login Supabase
│
├─ components/
│ ├─ Navbar.tsx # Logo, navegación, avatar (si sesión)
│ ├─ Footer.tsx # Footer único global
│ ├─ AvatarMenu.tsx # Menú del avatar (perfil, dashboard, salir)
│ ├─ MenuGrid.tsx # Grilla de platillos (cards)
│ ├─ MenuModal.tsx # (opcional) Modal para foto/descripcion ampliada
│ ├─ FabContact.tsx # Botones flotantes (Tel/WhatsApp)
│ └─ PointsProgress.tsx # Barra/indicador de puntos (dashboard)
│
├─ lib/
│ ├─ menu-data.ts # Fuente de verdad del menú (nombres + descripciones + precios + imágenes)
│ └─ slug.ts # Utilidades para slugs/anchors
│
├─ public/
│ ├─ bocanada-logo.png
│ ├─ avatar.jpg
│ ├─ brasas.mp4 # Hero video (principal)
│ ├─ brasa-bg.jpg # Fallback del hero (si no carga video)
│ ├─ promo-navidad.jpg # Promoción activa (home)
│ ├─ ambiente1.jpg ... ambiente7.jpg # Galería “Momentos de la Parrilla”
│ └─ menu/
│ ├─ canelones.jpg
│ ├─ lasagna-uruguaya.jpg
│ ├─ milanesa-napolitana-pollo.jpg
│ ├─ milanesa-napolitana-res.jpg
│ ├─ papa-parrilla.jpg
│ ├─ queso-provoleta.jpg
│ ├─ esparragos-envueltos.jpg
│ ├─ aguachile-camaron.jpg
│ ├─ tostadas-atun.jpg
│ ├─ empanada-carne.jpg
│ ├─ empanada-elote.jpg
│ ├─ empanada-espinaca.jpg
│ ├─ empanada-chistorra.jpg
│ ├─ ensalada-tropical.jpg
│ ├─ ensalada-bocanada.jpg
│ ├─ burrata.jpg
│ ├─ fettuccini.jpg
│ ├─ fusilli.jpg
│ ├─ ravioles.jpg
│ ├─ hamburguesa-bocanada.jpg
│ ├─ hamburguesa-hawaiana.jpg
│ ├─ tacos-sirloin.jpg
│ ├─ tacos-arrachera.jpg
│ ├─ choripan.jpg
│ ├─ queso-fundido-chistorra.jpg
│ ├─ queso-fundido-arrachera.jpg
│ ├─ mojito.jpg
│ ├─ aperol.jpg
│ └─ limonada-hierbabuena.jpg
│
├─ styles/ # (opcional) estilos globales adicionales
├─ .env.local # Variables locales (no se commitea)
├─ next.config.ts # Config de Next (ruta base, imágenes, etc.)
├─ tailwind.config.ts
├─ postcss.config.mjs
└─ eslint.config.mjs


**Decisión clave:** `<Navbar />` y `<Footer />` **solo** se renderizan desde `app/layout.tsx`.  
Ninguna página debe renderizar `header`/`footer` locales para evitar duplicados.

---

## 2) Rutas y comportamiento

| Ruta                     | Propósito                                                | Notas clave                                  |
|-------------------------|----------------------------------------------------------|-----------------------------------------------|
| `/` (Home)              | Hero con video, Favoritos del Chef, Promo activa, Galería | Botones: **Ver Menú**, **Reservar**, **Únete al Club** |
| `/menu`                 | Menú completo (grid con categorías)                      | Cards con imagen, nombre, descripción y precio |
| `/reservar`             | Llamada directa                                          | Botón: `tel:5593163674`                       |
| `/dashboard`            | Panel del socio                                          | Puntos + QR demo; CTA volver al Home          |
| `/auth/register`        | Registro Supabase                                        | Redirigir a `/dashboard` tras confirmar       |
| `/auth/login`           | Login Supabase                                           | Redirigir a `/dashboard` tras iniciar sesión  |

**Navbar**
- Logo → siempre regresa a `/`.
- Ítems: Menú, Reservar, Promociones/Galería (opcional), Únete al Club (si no hay sesión).
- Avatar (si hay sesión) → abre `AvatarMenu` con (Dashboard / Perfil / Cerrar sesión).

**Footer**
- Dirección, horario, links a Instagram/Facebook/Maps/UberEats.
- Copyright.

**FABs (flotantes)**
- Teléfono (tel:5593163674)
- WhatsApp (número del restaurante)

---

## 3) Medios y naming (reglas duras)

- **Video principal:** `public/brasas.mp4`
- **Fallback imagen:** `public/brasa-bg.jpg`
- **Logo:** `public/bocanada-logo.png`
- **Avatar:** `public/avatar.jpg`
- **Galería:** `public/ambiente1.jpg ... ambiente7.jpg`
- **Promo:** `public/promo-navidad.jpg`
- **Menú (platillos):** `public/menu/<nombre-normalizado>.jpg` (ver listado en la estructura)

> **No cambiar** estos nombres; muchos componentes asumen estas rutas.

---

## 4) Tipos y helpers

**`lib/menu-data.ts`** — fuente de verdad del menú:
```ts
export type Dish = {
  name: string;
  desc: string;
  price: string;    // Mantener string para no depender de currency locales
  category: string; // Debe existir en CATEGORIES
  img: string;      // Ruta absoluta desde /public (p. ej. "/menu/canelones.jpg")
};

export const CATEGORIES = [
  "Favoritos del Chef",
  "Entradas",
  "Empanadas",
  "Ensaladas",
  "Pastas",
  "Hamburguesas",
  "Tacos y Sándwiches",
  "Quesos Fundidos",
  "Bebidas y Cocteles",
] as const;

export const DISHES: Dish[] = [/* ... (catálogo completo v1.0) ... */];


lib/slug.ts:

export const toSlug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
   .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

5) Componentes clave
Navbar.tsx

Muestra logo a la izquierda, navegación centrada/derecha.

Si hay sesión → AvatarMenu (hover/click).

En mobile → menú hamburguesa.

Footer.tsx

Único, global. Reutilizable en todas las páginas vía layout.tsx.

MenuGrid.tsx

Recibe DISHES y opcionalmente un filtro por categoría.

Renderiza cards responsive (imagen next/image, nombre, desc, precio).

Click (opcional) abre MenuModal.

AvatarMenu.tsx

“Mi panel” → /dashboard

“Cerrar sesión”

(Futuro) “Mis cupones”, “Mis visitas”

FabContact.tsx

Botones circulares fijos (inferior derecha): Tel & WhatsApp.

6) Autenticación (Supabase)

Flujo recomendado (v1.0 estable)

Registro en /auth/register → Supabase envía email de verificación.

El enlace de verificación debe traer redirect_to=https://bocanada-web.vercel.app/dashboard (producción) o http://localhost:3000/dashboard (local).

Al abrir el enlace, el usuario queda autenticado y llega al Dashboard.

Desde el Navbar/Avatar puede volver al Home.

Variables de entorno locales (.env.local, no commitear):

NEXT_PUBLIC_SUPABASE_URL=https://<PROJECT_ID>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<ANON_KEY>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_UBER_EATS_URL=https://www.ubereats.com/mx/store/bocanada-cocina-de-brassa/FSlEl8NzWxuw0LJ49jfXYA


Vercel → Project Settings → Environment Variables (Production)

NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=https://bocanada-web.vercel.app
NEXT_PUBLIC_UBER_EATS_URL=...


Supabase → Authentication → URL Configuration

http://localhost:3000/*

https://bocanada-web.vercel.app/*

Asegurar que el mensaje de verificación usa redirect_to=${NEXT_PUBLIC_SITE_URL}/dashboard.

7) Dashboard (v1.0)

Mostrar: Bienvenida (email o nombre), puntos actuales (placeholder), QR demo (imagen local o Canvas).

CTA: “Ver historial” (placeholder), “Volver al Home”.

No bloquear la navegación al Home.

Nota: El QR dinámico y puntos reales llegan en v1.1 (ya planificado).

8) Estilos (Tailwind + PostCSS)

postcss.config.mjs:

export default {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
  },
}


tailwind.config.ts: registrar rutas de app/**/*.{ts,tsx}, components/**/*.{ts,tsx}, lib/**/*.{ts,tsx}.

Evitar utilidades tailwind dentro de @layer si no es necesario.
Usar next/image en todas las cards del menú (mejora LCP).

9) SEO & Metadatos

Título global: Bocanada Cocina de Brassa — Parrilla Gourmet en CDMX

Descripción: Cocina a la brasa, menú artesanal, reservas fáciles y club de fidelización.

Open Graph: imagen (poster) del hero o logo en fondo oscuro.

Favicon: agregar en /public.

10) Datos de negocio (v1.0)

Nombre correcto: Bocanada Cocina de Brassa (doble “s”).

Dirección: Calle Bahía de Sta. Bárbara 64, Verónica Anzúres, Miguel Hidalgo, CDMX.

Teléfono: 55 9316 3674.

Horario: L–D, 1:00 p.m. – 10:00 p.m.

Redes: Instagram, Facebook, Google Maps, UberEats (en Footer + Navbar si aplica).

11) Buenas prácticas / “Do & Don’t”

Do

Mantener los nombres de assets exactamente como están listados.

Centralizar Navbar y Footer en layout.tsx.

Usar DISHES de lib/menu-data.ts como fuente única del menú.

Probar / y /menu siempre que se suba media nueva.

Don’t

Duplicar header/footer dentro de páginas.

Renombrar archivos en /public sin actualizar referencias.

Commitear .env.local.

12) Roadmap técnico (resumen)

v1.0 (hoy): Home, Menú, Reservar (tel), Auth básica, Dashboard de cortesía.

v1.1: Puntos, QR real por usuario, historial, cupón de bienvenida (RLS Supabase).

v1.2: Referidos (QR compartible), staff scanner (mini-webapp).

v1.3: Webhooks de Delivery (UberEats/Rappi/Didi) → notificaciones (Telegram/Email).