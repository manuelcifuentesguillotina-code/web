import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  outputFileTracingIncludes: {
    "/compartir/*": [
      "./public/artwork/*.svg",
      "./public/fonts/anton-regular.ttf",
      "./src/contexts/commercial-presence/presentation/styles/tokens.css",
    ],
    "/apple-icon": [
      "./public/artwork/*.svg",
      "./public/fonts/anton-regular.ttf",
      "./src/contexts/commercial-presence/presentation/styles/tokens.css",
    ],
  },
  turbopack: {
    rules: {
      "globals.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
