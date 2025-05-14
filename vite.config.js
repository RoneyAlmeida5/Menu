import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["a474-200-150-246-68.ngrok-free.app"],
    host: true,
    port: 5173,
    strictPort: true,
  },
});
