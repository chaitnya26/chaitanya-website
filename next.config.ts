import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,    // Enable React Strict Mode in dev
  // Skip ESLint errors during production build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Skip TypeScript type checks during production build
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    // Merge aliases to avoid overwriting defaults
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
  env: {
    // Example: API_URL: process.env.API_URL
  },
};

export default nextConfig;
