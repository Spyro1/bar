import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this site from https://<user>.github.io/<repo>/.
// A relative base ('./') makes every asset URL relative to index.html, so the
// same build works at the domain root, under any repo subpath, or locally.
// Override with BASE_PATH=/bar/ if you ever need an absolute base.
export default defineConfig({
  base: process.env.BASE_PATH ?? './',
  plugins: [react(), tailwindcss()],
})
