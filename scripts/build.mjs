import { build } from 'esbuild';
import { mkdir, cp, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
await mkdir('dist', { recursive: true });
await build({
  entryPoints: ['packages/vscode-extension/src/extension.ts'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node18',
  outfile: 'dist/extension.js',
  sourcemap: true,
  external: ['vscode'],
});
await build({
  entryPoints: ['packages/editor-webview/src/index.tsx'],
  bundle: true,
  platform: 'browser',
  format: 'iife',
  target: 'es2020',
  outfile: 'dist/webview.js',
  sourcemap: true,
  loader: { '.css': 'text' },
});
await cp('packages/editor-webview/src/styles.css', 'dist/webview.css');
const html = await readFile('packages/editor-webview/src/index.html', 'utf8');
await writeFile('dist/webview.html', html, 'utf8');
console.log('Built extension host and webview bundles.');
