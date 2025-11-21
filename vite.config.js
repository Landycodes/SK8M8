import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        name: "SK8M8",
        short_name: "SK8M8",
        icons: [
          {
            src: "/icons/sk8m8-logo.png",
          },
        ],
      },
    }),
  ],
});
