import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration for the Isuzume Pharma front-end.
// "base" is relative so the production build also works when it is
// uploaded inside a sub-folder (for example on a university server).
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: "dist",
    sourcemap: false
  }
});
