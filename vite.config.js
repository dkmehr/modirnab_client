import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "پنل مدیریت فاحا",
        short_name: "فاحا",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  build: {
    minify: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    chunkSizeWarningLimit: 500,
    outDir: "./dist",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@libs": fileURLToPath(new URL("./src/libs", import.meta.url)),
      "@core": fileURLToPath(new URL("./src/core", import.meta.url)),
      "@services": fileURLToPath(new URL("./src/services", import.meta.url)),
      "@context": fileURLToPath(new URL("./src/context", import.meta.url)),
    },
  },
  server: {
    port: 8081,
    watch: {},
  },
});
