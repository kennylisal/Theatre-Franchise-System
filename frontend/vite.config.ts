import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/auth": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/movies": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/movieSchedule": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/workSchedule": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
