import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const GALLERY_ID = 'virtual:gallery'

function galleryManifest(): Plugin {
  return {
    name: 'gallery-manifest',
    resolveId(id) {
      if (id === GALLERY_ID) return '\0' + GALLERY_ID
    },
    load(id) {
      if (id !== '\0' + GALLERY_ID) return
      const dir = fileURLToPath(new URL('./public/gallery', import.meta.url))
      const files = readdirSync(dir)
        .filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f))
        .sort()
      return `export default ${JSON.stringify(files)}`
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), galleryManifest()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
})