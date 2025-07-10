// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import pagefind from "astro-pagefind";


// https://astro.build/config
export default defineConfig({
    site: "https://keralaservicerules.com",
    build: {
        assets: "_assets",
    },
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [pagefind()],
});
