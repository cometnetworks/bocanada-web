# Estado del Proyecto: Bocanada Web

**Última actualización:** 24 de Octubre de 2025

---

## 1. Estructura base del proyecto

- **Framework:** Next.js 14 (App Router)
- **Librerías:** React Icons, TailwindCSS, Next/Image
- **Hosting:** Vercel
- **Lenguaje:** TypeScript
- **Arquitectura:** App Router con layout global

```
/app
 ├── layout.tsx
 ├── page.tsx (Home)
 ├── menu/
 │   └── page.tsx
 ├── reservar/
 │   └── page.tsx
/components
 ├── Navbar.tsx
 ├── Footer.tsx
 ├── FabContact.tsx
 ├── AvatarMenu.tsx
 ├── MenuGrid.tsx
/lib
 ├── menu-data.ts
/public
 ├── brasas.mp4
 ├── promo-navidad.jpg
 ├── ambiente1-7.jpg
 ├── bocanada-logo.png
 ├── avatar.jpg
 ├── /menu/*.jpg (todas las imágenes del menú)
```

---

## 2. Arquitectura funcional actual

| Sección | Estado | Descripción |
| :--- | :--- | :--- |
| Navbar Global | ✅ Activo | Limpio, único, visible en todas las páginas. Logo y links funcionales. |
| Footer Global | ✅ Activo | Unificado con redes, teléfono, WhatsApp, dirección, copyright. |
| Home (page.tsx) | ⚙️ Parcialmente completo | Hero con video activo, botones funcionales, promo visible, galería aún sin imágenes. |
| Menú (menu/page.tsx) | ✅ Funcional | Cards con imágenes, precios, categorías y layout visual consistente. |
| Reservar (reservar/page.tsx) | ⚙️ Base creada | Estructura cargada, pendiente video hero + formulario visual. |
| Galería / Promos | 🕓 Pendiente | Links ya existen en Navbar, contenido en desarrollo. |
| Autenticación / Club | ✅ Implementada parcialmente | “Únete al Club” redirige correctamente al registro (Supabase). |
| Responsive / Mobile UX | ⚙️ Parcial | Navbar adaptativo correcto, hero y secciones principales aún sin media queries detalladas. |

---

## 3. Diseño y Branding

| Elemento | Estado | Detalles |
| :--- | :--- | :--- |
| Nombre oficial: | ✅ Bocanada Cocina de Brassa | |
| Colores base: | 🟤 Negro (#000) / Ámbar (#ffb347) / Blanco | |
| Tipografía: | Sans-serif (Tailwind default) | |
| Video principal: | /public/brasas.mp4 | |
| Imagen principal: | bocanada-logo.png | |
| Galería del restaurante: | ambiente1.jpg a ambiente7.jpg | |
| Promoción activa: | 🎄 “Cena de Fin de Año” — reserva vía tel:5593163674 | |

---

## 4. Cambios recientes aplicados (bitácora técnica)

| Fecha | Cambio aplicado | Archivo |
| :--- | :--- | :--- |
| 22 oct 2025 | Integración de autenticación con Supabase (login / register / dashboard) | /auth/* |
| 23 oct 2025 | Unificación de Navbar y Footer globales | layout.tsx |
| 23 oct 2025 | Eliminación de Header.tsx redundante | /components/Header.tsx |
| 23 oct 2025 | Corrección de rutas de imágenes y nombres (brasas.mp4, /menu/*.jpg) | /public |
| 23 oct 2025 | Limpieza de archivos duplicados y estructura final estable | Proyecto completo |
| 24 oct 2025 | Deploy exitoso en Vercel (build sin errores) | bocanada-web.vercel.app |
| 29 oct 2025 | Configuración de credenciales de correo electrónico para Nodemailer | .env.local |
| 29 oct 2025 | Refactorización de página de eventos/promociones y actualización de Navbar | /app/promos/page.tsx, /components/Navbar.tsx |

---

## 5. Próximas tareas (para la versión 1.1)

| Prioridad | Tarea | Detalle |
| :--- | :--- | :--- |
| 🔥 Alta | Corregir visualización de imágenes en Home (Favoritos / Momentos / Promo) | Rutas y permisos estáticos |
| 🔥 Alta | Unificar contenido visual del menú (fotos, descripción, precios) | Integrar con menu-data.ts |
| 🔥 Alta | Implementar hero con video en /reservar | Reutilizar bloque del Home |
| 🟠 Media | Añadir formulario de reservas (Nombre / Teléfono / Fecha / Hora / Personas) | Simulado o conectado a Supabase |
| 🟢 Media | Galería dinámica de “Momentos de la Parrilla” | Cargar desde /public/ambiente*.jpg |
| 🟢 Media | Ajustar responsive (tablet / móvil) | Hero + Grid + Footer |
| 🟣 Baja | Añadir animación hover y aro dorado al avatar (Socio Premium) | AvatarMenu.tsx |
| 🟣 Baja | Integrar favicon y SEO meta-tags actualizados | /app/head.tsx |

---

## 6. Notas para continuidad

*   Todos los avances están versionados en GitHub, rama main.
*   Evitar insertar `<Navbar>` o `<Footer>` en páginas locales.
*   Toda imagen nueva debe ir dentro de `/public` (no `/assets`).
*   En futuras versiones, se recomienda añadir:
    *   `/api/reservas` con Supabase o Formspree.
    *   `/api/promos` para promociones dinámicas.
    *   CMS ligero (ej. Notion API o Contentlayer) para texto editable.

---

## 7. Sistema de Reservaciones

| Módulo | Estado | Descripción |
| :--- | :--- | :--- |
| Formulario de Reservas | 🟢 Funcional | Captura nombre, fecha, hora, comensales, contacto y ocasión. Validaciones y confirmación visual. |
| Envío de Correo Automático | 🟢 Funcional | Usa reservacionesbocanada@gmail.com con App Password SMTP. Plantilla HTML profesional. |
| Reenvío de Correos (Cliente) | 🟢 En progreso | Reenvío directo desde Gmail al correo personal del cliente. Solo falta confirmación del destinatario. |
| Integración segura (.env.local) | 🟢 Listo | Credenciales protegidas (Gmail + futuras integraciones como Telegram). |
| Página /reservar | 🟢 OK | UI responsiva, incluye formulario funcional. |
| Próxima fase | ⚙️ Pendiente | Integración de Bot de Telegram y dashboard de reservas. |
