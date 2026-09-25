import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cpSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));

function copyProductionAssets() {
  return {
    name: 'copy-production-assets',
    apply: 'build',
    closeBundle() {
      const outputDirectory = resolve(projectRoot, 'dist');
      const sourceAssets = resolve(projectRoot, 'assets');
      const outputAssets = resolve(outputDirectory, 'assets');

      mkdirSync(outputAssets, { recursive: true });
      for (const entry of readdirSync(sourceAssets)) {
        cpSync(resolve(sourceAssets, entry), resolve(outputAssets, entry), {
          recursive: true,
          force: true,
        });
      }

      for (const file of ['robots.txt', 'sitemap.xml']) {
        cpSync(resolve(projectRoot, file), resolve(outputDirectory, file), { force: true });
      }

      writeFileSync(resolve(outputDirectory, '.htaccess'), [
        'RewriteEngine On',
        'RewriteBase /',
        'RewriteCond %{REQUEST_FILENAME} !-f',
        'RewriteCond %{REQUEST_FILENAME} !-d',
        'RewriteRule ^ index.html [L]',
        '',
      ].join('\n'));
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), copyProductionAssets()],
  server: {
    host: '127.0.0.1',
    port: 5173
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
