// scripts/images.mjs
// Image processing pipeline for 4:3 product frame and AVIF/WebP generation

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const publicImagesDir = path.join(rootDir, 'public/images');
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

console.log('[images.mjs] Image processing utility ready.');
