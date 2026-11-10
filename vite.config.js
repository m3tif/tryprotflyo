import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Keep animation libraries in their own cacheable chunk.
        manualChunks(id) {
          if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis') || id.includes('@gsap')) return 'motion';
          if (id.includes('node_modules/react')) return 'react';
        },
      },
    },
  },
});
