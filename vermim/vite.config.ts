import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // OBRIGATÓRIO para funcionar no Vercel
  plugins: [react()],
})