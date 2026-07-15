import { runTests } from '@vscode/test-electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { existsSync } from 'node:fs';

const here = path.dirname(fileURLToPath(import.meta.url));
const extensionDevelopmentPath = path.resolve(here, '../../../..');
const extensionTestsPath = path.join(here, 'suite/index.js');
const installedCode =
  process.env.MARKORA_VSCODE_PATH ??
  path.join(process.env.LOCALAPPDATA ?? '', 'Programs/Microsoft VS Code/Code.exe');
await runTests({
  vscodeExecutablePath: existsSync(installedCode) ? installedCode : undefined,
  extensionDevelopmentPath,
  extensionTestsPath,
  launchArgs: ['--disable-extensions', '--disable-gpu', '--disable-updates'],
});
