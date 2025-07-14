import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["b76d02b37020.ngrok-free.app"],
    host: true,
    port: 5173,
    strictPort: true,
  },
});
