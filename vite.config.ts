import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const REPOSITORY_NAME = 'github-user-explorer'

// https://vite.dev/config/
export default defineConfig({
  base: `/${REPOSITORY_NAME}/`,
  plugins: [react()],
})
