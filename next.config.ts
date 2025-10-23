/** @type {import('next').NextConfig} */
const nextConfig = {
  // ⚠️ Solo si quieres compilar aunque haya errores de ESLint/TS
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // Evita el warning de raíz con Turbopack
  turbopack: { root: __dirname },
};

module.exports = nextConfig;
