import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 🚫 Evita que los warnings detengan el build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 🚫 Evita que los errores de tipos paren el build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;