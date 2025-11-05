# PRD — Bocanada Cocina de Brassa (Versión 1.0)
**Autor:** Miguel Cedillo  
**Fecha:** Octubre 2025  
**Repositorio:** [bocanada-web](https://github.com/cometnetworks/bocanada-web)  
**Hosting:** Vercel  
**Sitio:** https://bocanada-web.vercel.app  

---

## 🎯 1. Propósito del Proyecto
Rediseñar y modernizar la presencia digital del restaurante **Bocanada Cocina de Brassa**, un concepto gourmet ubicado en la Ciudad de México, con el objetivo de:

- Transmitir la identidad del restaurante (calidez, brasa, experiencia gourmet).  
- Ofrecer una experiencia fluida desde el acceso al menú hasta la reserva.  
- Introducir un sistema de fidelización (Bocanada Club) con puntos, QR y recompensas.  
- Permitir la expansión futura hacia una red de socios y programas de referidos.

---

## 👨‍🍳 2. Descripción General
**Bocanada Cocina de Brassa** es un restaurante especializado en cocina al carbón con un menú artesanal.  
El sitio web debe reflejar el ambiente del lugar: elegante, cálido y moderno, combinando video, fotografía y contenido visual del menú real.

---

## 🧩 3. Alcance de la Versión 1.0
### Funcionalidades actuales
1. **Home interactivo**  
   - Hero con video de fondo (`brasas.mp4`) y fallback (`brasa-bg.jpg`).  
   - Botones principales: Ver Menú / Reservar / Unirse al Club.  
   - Secciones: Favoritos del Chef, Promoción de la Semana, Momentos de la Parrilla (galería).  
   - Botones flotantes: Teléfono directo y WhatsApp.  
   - Footer con redes sociales, dirección, horario y derechos.

2. **Menú completo**  
   - Página `/menu` con categorías, descripciones y precios.  
   - Imágenes de platillos desde `/public/menu/`.  
   - Soporte para futuras rutas dinámicas `/menu/[slug]`.

3. **Autenticación básica (Supabase)**  
   - Registro y Login funcionales.  
   - Redirección automática al Dashboard tras registro.  
   - Avatar en Navbar cuando el usuario está logueado.

4. **Dashboard de usuario**  
   - Muestra puntos, QR de ejemplo y mensaje de bienvenida.  
   - Redirección manual al Home desde botón o logo.

5. **Reservar Mesa (demo)**  
   - Página `/reservar` con botón de llamada directa:  
     `tel:5593163674`.

6. **Promoción activa**
   - “Cena de Fin de Año 🎄🍷” con botón de llamada.  
   - Imagen: `promo-navidad.jpg`.

7. **Galería**
   - Sección “Momentos de la Parrilla” con imágenes `ambiente1.jpg` a `ambiente7.jpg`.

---

## 🔮 4. Próximas versiones (planeadas)
| Versión | Objetivo | Características |
|----------|-----------|----------------|
| **v1.1** | Fidelización | Sistema de puntos, QR compartible, referidos, historial de cupones. |
| **v1.2** | Staff / Scanner | Mini-app para validar QR y registrar visitas. |
| **v1.3** | Delivery API | Conexión con UberEats, Rappi, Didi Food mediante webhooks. |

---

## 👥 5. Público Objetivo
- Clientes actuales del restaurante (mayores de 25 años).  
- Nuevos visitantes que llegan desde Google Maps, UberEats, Instagram o Facebook.  
- Clientes frecuentes interesados en beneficios del **Bocanada Club**.

---

## 💡 6. Historias de Usuario (principales)
| ID | Historia | Criterio de Aceptación |
|----|-----------|-------------------------|
| H1 | Como visitante, quiero ver el menú sin registrarme. | Acceso libre a `/menu` desde Home. |
| H2 | Como usuario, quiero registrarme en el Club para acumular puntos. | Registro con Supabase + Dashboard con puntos visibles. |
| H3 | Como cliente, quiero reservar una mesa fácilmente. | Botón directo de llamada desde Home o Reservar. |
| H4 | Como usuario logueado, quiero ver mi QR y compartirlo. | Dashboard muestra QR; al escanear, puede usarse para referidos. |
| H5 | Como visitante, quiero ver fotos del lugar y su ambiente. | Galería en “Momentos de la Parrilla”. |

---

## 🧠 7. Requisitos Funcionales
- El sitio debe ser **responsive** y funcionar sin errores en móvil, tablet y desktop.  
- Los videos e imágenes deben tener **carga progresiva y fallback**.  
- Navbar y Footer deben ser **únicos y globales** (definidos en `layout.tsx`).  
- Los botones de WhatsApp y Teléfono deben estar **fijos y funcionales**.

---

## 🧱 8. Requisitos No Funcionales
- **Performance:** LCP < 2.5s, CLS < 0.1.  
- **Seguridad:** No exponer claves; `.env` ignorado en Git.  
- **Escalabilidad:** Preparado para autenticación de socios y referidos.  
- **Compatibilidad:** Navegadores modernos (Chrome, Safari, Edge, Firefox).

---

## 🛠️ 9. Integraciones Técnicas
| Área | Servicio | Descripción |
|------|-----------|-------------|
| Autenticación | Supabase Auth | Registro/Login + sesiones persistentes |
| Base de Datos | Supabase Postgres | Usuarios, puntos, cupones (futuro) |
| Hosting | Vercel | Deploy y CDN |
| Media | Next/Image + public/ | Optimización automática de imágenes |
| Comunicación | WhatsApp API + `tel:` | Acceso directo desde botones flotantes |

---

## 🎨 10. Identidad Visual
- **Paleta:** negro carbón, rojo brasa, dorado cálido.  
- **Tipografía:** Sans moderna con alto contraste.  
- **Estilo:** parrilla gourmet contemporánea.  
- **Logo:** `bocanada-logo.png`.  
- **Video Hero:** `brasas.mp4`.  
- **Fallback Hero:** `brasa-bg.jpg`.

---

## 📍 11. Ubicación y Contacto
**Dirección:** Calle Bahía de Sta. Bárbara 64, Verónica Anzúres, Miguel Hidalgo, CDMX  
**Teléfono:** 55 9316 3674  
**Horario:** Lunes a Domingo — 1:00 p.m. a 10:00 p.m.  
**Redes sociales:**  
- [Instagram](https://www.instagram.com/bocanada.cocinadebrassa/?hl=es-la)  
- [Facebook](https://www.facebook.com/BocanadaParrilla/)  
- [Google Maps](https://goo.gl/maps/ZP3Tpt5kxy6QvVRb9)  
- [UberEats](https://www.ubereats.com/mx/store/bocanada-cocina-de-brassa/FSlEl8NzWxuw0LJ49jfXYA)

---

## 📈 12. KPIs de Éxito
- Tiempo promedio de sesión > 45 s  
- 25% de usuarios que visitan “Menú” también hacen clic en “Reservar”  
- 10% de visitantes registrados en Bocanada Club en el primer mes  
- < 1% tasa de error (404, 500)

---

## 🔐 13. Restricciones
- No se permiten cambios de branding sin aprobación del cliente.  
- No se usarán frameworks de pago.  
- Los assets deben conservar los nombres originales para evitar errores en Vercel.

---

## 🚀 14. Criterio de Cierre v1.0
✅ Home completo (video, menú, galería, footer unificado).  
✅ Sistema de registro/login Supabase funcional.  
✅ Dashboard visible y operativo (mínimo QR + puntos).  
✅ Deploy exitoso en Vercel sin errores 404.  
✅ Footer y Navbar únicos y globales.  
✅ Documentación base (PRD, architecture, PRP, rules).

---

## 🏁 15. Próximos pasos
- **v1.1 (Fidelización):** puntos y recompensas visibles.  
- **v1.2 (Referidos):** QR compartible con tracking.  
- **v1.3 (Staff):** miniapp para validación QR.  
- **v1.4 (Delivery API):** integración con UberEats/Rappi.