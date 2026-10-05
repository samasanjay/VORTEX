import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import express from 'express';
import cors from 'cors';
import { router as apiRouter } from './server/api.js';
import { seedDatabase } from './server/seed.js';

function vortexApiPlugin(): Plugin {
  return {
    name: 'vortex-api-middleware',
    async configureServer(server) {
      try {
        await seedDatabase();
        const app = express();
        app.use(cors());
        app.use(express.json({ limit: '10mb' }));
        app.use(express.urlencoded({ extended: true, limit: '10mb' }));
        app.use('/api', apiRouter);
        server.middlewares.use(app);
        console.log('[WORKVORTEX Dev] API middleware mounted on /api');
      } catch (err) {
        console.error('[WORKVORTEX Dev] Failed to mount API middleware:', err);
      }
    },
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    vortexApiPlugin(),
  ],
  server: {
    port: 5173,
    host: true,
  },
});
