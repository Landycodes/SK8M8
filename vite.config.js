import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["SK8M8.ico", "sk8m8-logo.png"],
      manifest: {
        display: "standalone",
        name: "SK8M8",
        short_name: "SK8M8",
        icons: [
          {
            src: "/SK8M8/icons/sk8m8-logo.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/SK8M8/icons/sk8m8-logo.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  base: "/SK8M8/",
});
