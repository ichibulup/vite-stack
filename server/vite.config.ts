import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import AppModule from './src/module.ts'

export default defineConfig({
  appType: 'custom',
  plugins: [
    {
      name: 'express-api',
      configureServer(server) {
        server.middlewares.use(AppModule())
      },
    },
    {
      name: 'copy-backend-home',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'index.html',
          source: readFileSync(resolve(process.cwd(), 'index.html')),
        })
      },
    },
  ],
  resolve: { tsconfigPaths: true },
  build: {
    ssr: 'src/main.ts',
    outDir: 'dist',
    target: 'node22',
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
      },
    },
  },
  ssr: {
    noExternal: true,
  },
})
