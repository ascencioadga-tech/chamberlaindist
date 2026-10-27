import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A plain static site: `npm run build` writes it to `out/`, which Netlify publishes.
  output: "export",
  experimental: {
    agentUpgrade: "security",
  },
  turbopack: {
    // This folder is the project root (a stray lockfile in the home folder would otherwise win).
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
