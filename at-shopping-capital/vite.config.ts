import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

import react from '@vitejs/plugin-react'
// import react from 'vitejs/plugins-react'
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
