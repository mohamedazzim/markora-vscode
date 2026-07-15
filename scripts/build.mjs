import { build, context } from 'esbuild';
import { mkdir, cp, readFile, writeFile } from 'node:fs/promises';

await mkdir('dist', { recursive: true });
const hostOptions = {
  entryPoints: ['packages/vscode-extension/src/extension.ts'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node18',
  outfile: 'dist/extension.js',
  sourcemap: true,
  external: ['vscode'],
};
const webviewOptions = {
  entryPoints: ['packages/editor-webview/src/index.tsx'],
  bundle: true,
  platform: 'browser',
  format: 'iife',
  target: 'es2020',
  outfile: 'dist/webview.js',
  sourcemap: true,
  loader: { '.css': 'text' },
};

if (process.argv.includes('--watch')) {
  const host = await context(hostOptions);
  const webview = await context(webviewOptions);
  await host.watch();
  await webview.watch();
  await cp('packages/editor-webview/src/styles.css', 'dist/webview.css');
  const html = await readFile('packages/editor-webview/src/index.html', 'utf8');
  await writeFile('dist/webview.html', html, 'utf8');
  console.log('Watching extension host and webview bundles.');
  await new Promise(() => undefined);
}

await build(hostOptions);
await build(webviewOptions);
await cp('packages/editor-webview/src/styles.css', 'dist/webview.css');
const html = await readFile('packages/editor-webview/src/index.html', 'utf8');
await writeFile('dist/webview.html', html, 'utf8');
console.log('Built extension host and webview bundles.');
