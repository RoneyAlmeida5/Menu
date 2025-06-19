import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["fad9-200-150-246-50.ngrok-free.app"],
    host: true,
    port: 5173,
    strictPort: true,
  },
});
