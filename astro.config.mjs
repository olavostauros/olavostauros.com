// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://olavostauros.com",
  output: "static",
  trailingSlash: "ignore",
  build: { format: "directory" },
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
