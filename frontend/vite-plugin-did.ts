import type { Plugin } from 'vite';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export default function didPlugin(): Plugin {
  return {
    name: 'vite-plugin-did',
    resolveId(id) {
      if (id.endsWith('.did')) {
        return id;
      }
    },
    load(id) {
      if (id.endsWith('.did')) {
        const filePath = resolve(process.cwd(), id);
        const content = readFileSync(filePath, 'utf-8');
        return `export const idlFactory = ${JSON.stringify(content)};`;
      }
    },
  };
} 