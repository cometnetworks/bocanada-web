# 🧠 Product Requirements Prompt (PRP)
**Proyecto:** Bocanada Cocina de Brassa  
**Versión:** v1.0 (Frontend + Supabase Auth)  
**Autor:** Miguel Cedillo  
**Repositorio:** https://github.com/cometnetworks/bocanada-web  
**Fecha:** Octubre 2025  

---

## 🤖 1. Rol del Agente

Actúa como un **Arquitecto Full Stack Senior especializado en Next.js 15, Supabase y Tailwind CSS**, con experiencia en diseño UX/UI moderno y despliegues en Vercel.

Tu misión es implementar, mantener y escalar el proyecto **Bocanada Cocina de Brassa**, siguiendo exactamente las reglas, arquitectura y contexto definidos en:
- `PRD.md`
- `architecture.md`
- `.cursorrules` / `rules.md`

La prioridad es **mantener fidelidad visual, coherencia técnica y compatibilidad con Vercel/Supabase**.

---

## 🧩 2. Contexto del Proyecto

**Bocanada Cocina de Brassa** es un restaurante gourmet ubicado en CDMX que busca un sitio web moderno, rápido y visualmente atractivo que:
- Permita ver el menú y fotos sin registro.
- Facilite reservas directas por teléfono.
- Ofrezca un programa de fidelización (Bocanada Club) con QR y puntos.
- Sea completamente responsive y optimizado.

---

## 🧱 3. Stack Tecnológico (confirmado)

| Capa | Tecnología | Descripción |
|------|-------------|-------------|
| Frontend | **Next.js 15 (App Router + TypeScript)** | Framework base con soporte SSR y client components. |
| Estilos | **TailwindCSS + PostCSS** | Utilidades reactivas, diseño adaptativo. |
| Autenticación | **Supabase Auth** | Registro, login, y persistencia de sesión. |
| Base de datos | **Supabase Postgres** | (Planeado v1.1) puntos, cupones y referidos. |
| Hosting | **Vercel** | Despliegue con optimización automática. |
| Iconografía | **Lucide React** | Íconos modernos SVG. |
| Media | **next/image** + `/public` | Gestión de imágenes y video local. |

---

## 🚀 4. Estructura Base del Proyecto

### Estructura de carpetas esperada:


app/
├─ layout.tsx
├─ page.tsx # Home (Hero + Favoritos + Promo + Galería)
├─ menu/page.tsx # Menú completo
├─ reservar/page.tsx # Llamada directa
├─ dashboard/page.tsx # Panel del socio
└─ auth/
├─ register/page.tsx
└─ login/page.tsx

components/
├─ Navbar.tsx
├─ Footer.tsx
├─ AvatarMenu.tsx
├─ MenuGrid.tsx
├─ FabContact.tsx
└─ PointsProgress.tsx

lib/
├─ menu-data.ts
└─ slug.ts

public/
├─ bocanada-logo.png
├─ brasas.mp4
├─ brasa-bg.jpg
├─ promo-navidad.jpg
├─ ambiente1.jpg ... ambiente7.jpg
└─ menu/*.jpg


---

## 🧠 5. Instrucciones para la IA

### 🎨 Etapa 1: UI/UX Frontend
1. **Hero Section (Home):**
   - Video de fondo (`brasas.mp4`) con fallback (`brasa-bg.jpg`).
   - Overlay con título: “Bocanada Cocina de Brassa”.
   - Botones: Ver Menú, Reservar, Únete al Club.

2. **Sección Favoritos del Chef:**
   - Mostrar 4 platillos principales (`Canelones`, `Lasagna Uruguaya`, `Milanesa Napolitana`, `Papa Parrilla`).
   - Usar imágenes de `/public/menu/`.

3. **Promoción de la Semana:**
   - Imagen: `/public/promo-navidad.jpg`
   - Título: “Cena de Fin de Año 🎄🍷”
   - Botón “Reservar” → `tel:5593163674`

4. **Momentos de la Parrilla (Galería):**
   - Carrusel de imágenes `ambiente1.jpg` a `ambiente7.jpg`.

5. **Navbar / Footer:**
   - Navbar global con logo (link a `/`) y avatar del usuario.
   - Footer con dirección, horario, redes sociales, botones Tel/WhatsApp.

---

### 💾 Etapa 2: Autenticación (Supabase)
1. Configurar conexión con `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. Crear flujo:
   - `/auth/register`: registro + redirección automática a `/dashboard`.
   - `/auth/login`: login + persistencia de sesión.
   - `/dashboard`: muestra QR de ejemplo (`qr-sample.png`), puntos (placeholder) y CTA “Volver al Home”.
3. Si el usuario está logueado → mostrar avatar (con menú desplegable):
   - Mi Panel (/dashboard)
   - Cerrar Sesión

---

### 🔗 Etapa 3: Navegación y comportamiento
| Componente | Acción esperada |
|-------------|-----------------|
| Logo Navbar | Redirige a `/` |
| Botón “Ver Menú” | Redirige a `/menu` |
| Botón “Reservar” | Abre `tel:5593163674` |
| “Únete al Club” | Redirige a `/auth/register` |
| Avatar | Abre menú con opciones de sesión |
| Footer redes | Enlaces a Instagram, Facebook, UberEats y Google Maps |

---

### 🧰 Etapa 4: Integración de componentes
- Centralizar `<Navbar />` y `<Footer />` en `app/layout.tsx`.
- Prohibido duplicar headers/footers locales.
- `MenuGrid.tsx` debe renderizar dinámicamente desde `lib/menu-data.ts`.
- Usar `next/image` en todas las cards del menú.
- Implementar props genéricas para escalabilidad (por ejemplo, `MenuGrid category="Entradas"`).

---

### 🔒 Etapa 5: Seguridad y estándares
- Nunca exponer claves Supabase.
- No hardcodear `redirect_to` → usar variable `NEXT_PUBLIC_SITE_URL`.
- Verificar rutas:
  - `http://localhost:3000/*` para desarrollo.
  - `https://bocanada-web.vercel.app/*` en producción.
- `.env.local` debe permanecer en `.gitignore`.

---

### 🧱 Etapa 6: Extensiones futuras (planificadas)
| Versión | Nueva Función | Descripción |
|----------|----------------|-------------|
| v1.1 | Sistema de puntos | Registro en DB, sumar puntos y generar cupones |
| v1.2 | QR compartible | Tracking de referidos con miniapp de staff |
| v1.3 | Delivery API | Integración con UberEats, Rappi, Didi Food |
| v1.4 | Dashboard Admin | Control de promociones, staff y fidelización |

---

## 🧩 6. Directrices para agentes de IA

Los agentes deben **leer primero `architecture.md` y `PRD.md` antes de generar código.**  
Cada modificación debe seguir este flujo:

1. Analizar PRD y arquitectura antes de escribir una sola línea de código.
2. Crear archivos y rutas según estructura propuesta.
3. Seguir reglas visuales y naming exactos.
4. Confirmar que no existan duplicados de Navbar/Footer.
5. Mantener consistencia visual y tipográfica en todos los layouts.

---

## 📘 7. Plantilla de comando (para usar con Cursor / Claude / Gemini CLI)

> 🧠 *Prompt de arranque recomendado:*



Actúa como un desarrollador senior Next.js + Supabase.
Usando los archivos PRD.md, architecture.md y PRP.md del proyecto “Bocanada Cocina de Brassa”,
construye paso a paso la aplicación completa:

Configura Supabase con las variables de entorno.

Genera los componentes de Navbar, Footer, MenuGrid y Dashboard según los requerimientos.

Implementa las rutas y comportamientos descritos en architecture.md.

Asegúrate de que las imágenes y videos de /public carguen correctamente.

Implementa un flujo de autenticación funcional con redirección automática al dashboard.


---

## ✅ 8. Criterio de Éxito
El proyecto se considera funcional (v1.0) cuando:
- Todos los enlaces y botones redirigen correctamente.
- Las imágenes y videos cargan sin 404.
- Registro/login funcionan sin duplicidad de sesión.
- Navbar y Footer aparecen una sola vez por página.
- Deploy en Vercel compila sin errores (build success).