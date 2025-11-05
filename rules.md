# 🧭 Reglas Generales y Buenas Prácticas
**Proyecto:** Bocanada Cocina de Brassa  
**Versión:** v1.0  
**Autor:** Miguel Cedillo  
**Objetivo:** Mantener consistencia, calidad visual y orden en el desarrollo del proyecto.

---

## ⚙️ 1. Stack Oficial

| Capa | Tecnología | Uso |
|------|-------------|-----|
| Framework | **Next.js 15 (App Router + TypeScript)** | Estructura del frontend |
| Estilos | **TailwindCSS + PostCSS** | Diseño visual adaptable |
| Autenticación | **Supabase** | Registro, login y sesiones |
| Base de Datos | **Supabase PostgreSQL** | (v1.1+) Sistema de puntos y cupones |
| Hosting | **Vercel** | Despliegue y hosting global |
| Iconos | **Lucide React** | Íconos SVG ligeros y uniformes |
| Imágenes/Videos | **next/image + /public/** | Gestión de medios locales |

---

## 📂 2. Estructura de Carpetas

```bash
/app
  layout.tsx        # Layout global, incluye Navbar y Footer
  page.tsx          # Home (hero, menú destacado, promo, galería)
  /menu/page.tsx    # Menú completo
  /reservar/page.tsx# Llamada telefónica
  /dashboard/page.tsx
  /auth/login/page.tsx
  /auth/register/page.tsx

/components
  Navbar.tsx
  Footer.tsx
  MenuGrid.tsx
  AvatarMenu.tsx
  FabContact.tsx
  PointsProgress.tsx

/lib
  menu-data.ts
  slug.ts

/public
  bocanada-logo.png
  brasas.mp4
  brasa-bg.jpg
  promo-navidad.jpg
  ambiente1.jpg … ambiente7.jpg
  /menu/*.jpg
```

📍 Regla:
El layout global (app/layout.tsx) es el único que debe incluir <Navbar /> y <Footer />.
Nunca deben duplicarse en otras páginas.

🎨 3. Estilo Visual (TailwindCSS)

Paleta oficial:

VariableColorUso
primary#a22e2eColor vino, marca principal
secondary#d4a373Dorado/bronce cálido
background#0e0e0eFondo principal
text#ffffffTexto general

Reglas:

No usar CSS externo; todo en Tailwind.

Usar transition en botones e interacciones.

No usar <img>; usar next/image.

Usar fuentes sobrias y legibles (sans-serif, peso medio).

🧩 4. Comportamiento del Sitio
ElementoAcción Esperada
LogoRedirige a /
Botón Ver MenúRedirige a /menu
Botón ReservarAbre tel:5593163674
Botón Únete al ClubRedirige a /auth/register
AvatarAbre /dashboard
Footer: Instagramhttps://www.instagram.com/bocanada.cocinadebrassa/
Footer: Facebookhttps://www.facebook.com/BocanadaParrilla/
Footer: UberEatshttps://www.ubereats.com/mx/store/bocanada-cocina-de-brassa/...
Footer: MapsDirección física del restaurante
🧠 5. Autenticación Supabase

Variables en .env.local:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=https://bocanada-web.vercel.app


Redirección tras registro: /dashboard

Flujo:

/auth/register → correo de verificación

Confirmación → Dashboard (sesión activa)

Dashboard muestra: QR, puntos, botón “Volver al Home”

🔒 6. Seguridad y Buenas Prácticas

Nunca subir .env.local a GitHub.

Nunca exponer claves ni IDs.

Verificar permisos en Supabase (RLS activa).

Controlar errores con try/catch en llamadas Supabase.

Probar siempre en entorno local antes del deploy.

🧩 7. Reglas de Componentes

Cada componente debe tener props tipadas.

No usar any.

Exportar funciones nombradas, no default.

Evitar duplicación de lógica.

Mantener carpetas limpias y sin archivos huérfanos.

📸 8. Naming de Medios
TipoEjemploUbicación
Videobrasas.mp4/public
Fallbackbrasa-bg.jpg/public
Logobocanada-logo.png/public
Avataravatar.jpg/public
Ambientesambiente1.jpg a ambiente7.jpg/public
Menúcanelones.jpg, lasagna-uruguaya.jpg.../public/menu

📍 Importante: Los nombres deben coincidir exactamente con los definidos en menu-data.ts.

🧱 9. Deploys y Entorno

Local: npm run dev

Producción: Deploy automático en Vercel (rama main)

Build: npm run build (debe compilar sin errores)

Revisar logs: vercel logs bocanada-web

URL final: https://bocanada-web.vercel.app

📜 10. Control de Versiones

Estandariza tus commits:

feat: agrega nuevo componente o funcionalidad
fix: corrige bug o comportamiento
refactor: mejora código sin alterar funcionalidad
style: ajustes visuales
docs: cambios en documentación


Ejemplo:

feat: agrega carrusel “Momentos de la Parrilla”
fix: corrige rutas de imágenes del menú

🔄 11. QA (Checklist antes de cada deploy)
VerificaciónEstado esperado
Navbar/Footer aparecen solo una vez✅
Todas las imágenes cargan sin 404✅
Video brasas.mp4 carga correctamente✅
Supabase login/registro funcionan✅
Footer muestra dirección y redes✅
Página /menu renderiza dinámicamente✅
Botón “Reservar” abre llamada✅
Responsive probado (móvil + desktop)✅
Build en Vercel exitoso✅
🧭 12. Filosofía del Proyecto

“Cada detalle importa.
La elegancia no está en el exceso, sino en la precisión.”
— Bocanada Cocina de Brassa Dev Team 🥩🔥

📍 Ubicación recomendada: raíz del repositorio, junto a architecture.md y .cursorrules.