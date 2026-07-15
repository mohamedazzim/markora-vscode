import { spawn } from 'node:child_process';

const channel = process.argv[2] === 'insiders' ? 'insiders' : 'stable';
const command = process.platform === 'win32' ? 'vscode-test.cmd' : 'vscode-test';
const child = spawn(command, [], {
  stdio: 'inherit',
  env: { ...process.env, MARKORA_VSCODE_CHANNEL: channel },
  shell: false,
});
child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
