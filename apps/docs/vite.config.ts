import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import path from "path";

export default defineConfig({
  plugins: [react()],
  //alias: {
  //  "@vincero/ui": path.resolve(__dirname, "../../packages/ui"),
  //},
});
