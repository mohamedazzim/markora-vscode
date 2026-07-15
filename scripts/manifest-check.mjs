import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const manifest = JSON.parse(await readFile('package.json', 'utf8'));
const requiredCommands = [
  'markora.openVisualEditor',
  'markora.openSourceEditor',
  'markora.toggleEditorMode',
  'markora.insertTable',
  'markora.insertImage',
  'markora.insertMath',
  'markora.insertDiagram',
  'markora.exportHtml',
];
const commands = new Set((manifest.contributes?.commands ?? []).map((command) => command.command));
const missing = requiredCommands.filter((command) => !commands.has(command));
if (missing.length) throw new Error(`Manifest is missing commands: ${missing.join(', ')}`);
if (!manifest.main || !existsSync('dist/extension.js'))
  throw new Error('Extension host build output is missing.');
if (!existsSync(manifest.icon)) throw new Error(`Marketplace icon is missing: ${manifest.icon}`);
if (manifest.contributes?.customEditors?.[0]?.viewType !== 'markora.markdownVisualEditor')
  throw new Error('Custom editor view type is incorrect.');
console.log(`Manifest contract passed (${commands.size} commands, ${manifest.version}).`);
if (manifest.publisher !== 'MohamedAzzimJ')
  throw new Error(`Unexpected Marketplace publisher: ${manifest.publisher}`);
