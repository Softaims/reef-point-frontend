import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    host: "0.0.0.0", // Allows access from LAN devices like your phone
  },
  plugins: [react(), tailwindcss()],
});
