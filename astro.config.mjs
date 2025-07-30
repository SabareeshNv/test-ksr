// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import pagefind from "astro-pagefind";


// https://astro.build/config
export default defineConfig({
    site: "https://test-ksr.netlify.app",
    // markdown: {
    //     // Enable raw HTML in markdown files
    //     rehypePlugins: [],
    //     remarkPlugins: [],
    //     syntaxHighlight: false, // optional
    // },
    build: {
        assets: "_assets",
    },
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [pagefind()],
});
