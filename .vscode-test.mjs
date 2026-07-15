import { defineConfig } from '@vscode/test-cli';
import os from 'node:os';
import path from 'node:path';
import { cpSync, existsSync, mkdtempSync } from 'node:fs';

const root = mkdtempSync(path.join(os.tmpdir(), 'markora-vscode-e2e-'));
const workspaceFolder = path.join(root, 'workspace');
cpSync(path.resolve('test-workspace'), workspaceFolder, { recursive: true });
const channel = process.env.MARKORA_VSCODE_CHANNEL === 'insiders' ? 'insiders' : 'stable';
const installedPath =
  process.env.MARKORA_VSCODE_PATH ??
  path.join(process.env.LOCALAPPDATA ?? '', 'Programs', 'Microsoft VS Code', 'Code.exe');

export default defineConfig({
  label: `Markora VS Code ${channel}`,
  files: 'packages/vscode-extension/tests/e2e/suite/index.js',
  version: channel,
  extensionDevelopmentPath: path.resolve('.'),
  workspaceFolder,
  mocha: {
    timeout: 30_000,
    reporter: 'dot',
  },
  launchArgs: [
    '--disable-gpu',
    '--disable-updates',
    '--disable-telemetry',
    '--skip-welcome',
    '--skip-release-notes',
    `--user-data-dir=${path.join(root, 'user-data')}`,
    `--extensions-dir=${path.join(root, 'extensions')}`,
  ],
  env: {
    MARKORA_E2E: '1',
  },
  useInstallation: existsSync(installedPath) ? { fromPath: installedPath } : { fromMachine: false },
});
