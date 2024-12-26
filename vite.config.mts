import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import typescript from '@rollup/plugin-typescript'
import { typescriptPaths } from 'rollup-plugin-typescript-paths'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: {
        index: resolve('src', 'index.ts'),
        styles: resolve('src/lib', 'Timeline.scss'),
        'resize-detector': resolve('src/resize-detector', 'index.ts'),
      },
      name: 'react-calendar-timeline',
      fileName: (format, entryName) => `react-calendar-timeline.${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client'],
      output: {
        globals: {
          react: 'React',
        },
      },
      plugins: [
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          outDir: 'dist',
          declaration: true,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      index: resolve(__dirname, 'src', 'index.ts'),
      'react-calendar-timeline/lib/Timeline.css': resolve(__dirname, 'src/lib', 'Timeline.scss'),
      'react-calendar-timeline/resize-detector': resolve(__dirname, 'src/resize-detector', 'index.ts'),
    },
  },
  server: {
    port: 3000,
  },
  plugins: [react(), libInjectCss()],
})
