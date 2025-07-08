import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["28bacef7b6fa.ngrok-free.app"],
    host: true,
    port: 5173,
    strictPort: true,
  },
});
