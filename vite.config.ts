import { defineConfig } from 'vite'
import { TanStackStartVite } from '@tanstack/start/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    TanStackStartVite({
      server: {
        preset: 'azure' // Instructs Nitro to build an Azure-compatible server
      }
    })
  ]
})