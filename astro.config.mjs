// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://test-ksr.netlify.app",
  build: {
    assets: "_assets",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    // https://docs.astro.build/en/guides/integrations-guide/sitemap/
    sitemap({
      namespaces: {
        xhtml: false,
        news: false,
        video: false,
      },
    }),
    ,
    pagefind(),
  ],
});
