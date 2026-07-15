import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
if (process.env.MARKORA_RUN_VSCODE_E2E !== '1') {
  console.log(
    'VS Code E2E is opt-in. Set MARKORA_RUN_VSCODE_E2E=1 on a machine with VS Code and the Extension Development Host test harness.',
  );
  process.exit(0);
}
if (!existsSync('dist/extension.js')) throw new Error('Build the extension before running VS Code E2E.');
execFileSync('node', ['packages/vscode-extension/tests/e2e/run.mjs'], { stdio: 'inherit' });
