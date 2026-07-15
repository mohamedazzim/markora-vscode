import esbuild from 'esbuild';

const watch = process.argv.includes('--watch');
const build = await esbuild.build({
  entryPoints: ['packages/vscode-extension/src/extension.ts'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node18',
  outfile: 'dist/extension.js',
  sourcemap: true,
  minify: process.env.NODE_ENV === 'production',
  external: ['vscode'],
  plugins: [
    {
      name: 'webview-bundle',
      setup(buildApi) {
        buildApi.onEnd(async (result) => {
          if (result.errors.length) return;
          await esbuild.build({
            entryPoints: ['packages/editor-webview/src/index.tsx'],
            bundle: true,
            format: 'iife',
            platform: 'browser',
            target: 'es2020',
            outfile: 'dist/webview.js',
            sourcemap: true,
            loader: { '.css': 'text' },
            define: { 'process.env.NODE_ENV': '"production"' },
          });
        });
      },
    },
  ],
});
if (watch)
  console.log(
    'Markora extension build complete; use npm run watch with a file watcher for iterative builds.',
  );
console.log(`Built extension (${build.errors.length} errors).`);
