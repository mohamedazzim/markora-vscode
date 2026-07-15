import { rm } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await rm('*.vsix', { force: true });
console.log('Cleaned build outputs.');
