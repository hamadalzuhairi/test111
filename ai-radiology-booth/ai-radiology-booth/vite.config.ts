import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Static kiosk build — no server-side code, no runtime env vars.
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2019",
    sourcemap: false
  }
});
