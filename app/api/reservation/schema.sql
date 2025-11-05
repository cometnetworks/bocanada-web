-- ===============================================
-- 📦 Tabla de Reservas — Bocanada Cocina de Brassa
-- Versión 1.0 | Última actualización: 2025-10-30
-- ===============================================

CREATE TABLE IF NOT EXISTS reservas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  fecha DATE NOT NULL,
  hora TEXT NOT NULL,
  comensales INTEGER NOT NULL,
  ocasion TEXT,
  grupo_grande BOOLEAN DEFAULT FALSE,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 🔍 Índices útiles para búsqueda y analítica
CREATE INDEX IF NOT EXISTS idx_reservas_fecha ON reservas (fecha);
CREATE INDEX IF NOT EXISTS idx_reservas_email ON reservas (email);
CREATE INDEX IF NOT EXISTS idx_reservas_creado_en ON reservas (creado_en DESC);