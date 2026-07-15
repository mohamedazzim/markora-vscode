import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

describe('extension manifest contract', () => {
  it('contributes the option-priority custom editor for Markdown files', async () => {
    const manifest = JSON.parse(await readFile(path.join(process.cwd(), 'package.json'), 'utf8')) as {
      contributes: {
        customEditors: Array<{
          viewType: string;
          priority: string;
          selector: Array<{ filenamePattern: string }>;
        }>;
      };
    };
    const editor = manifest.contributes.customEditors[0];
    expect(editor.viewType).toBe('markora.markdownVisualEditor');
    expect(editor.priority).toBe('option');
    expect(editor.selector.map((entry) => entry.filenamePattern)).toEqual([
      '*.md',
      '*.markdown',
      '*.mdown',
      '*.mkd',
    ]);
  });

  it('contributes the documented core commands', async () => {
    const manifest = JSON.parse(await readFile(path.join(process.cwd(), 'package.json'), 'utf8')) as {
      contributes: { commands: Array<{ command: string }> };
    };
    const commands = new Set(manifest.contributes.commands.map((entry) => entry.command));
    for (const command of [
      'markora.openVisualEditor',
      'markora.openSourceEditor',
      'markora.toggleEditorMode',
      'markora.exportHtml',
    ]) {
      expect(commands.has(command)).toBe(true);
    }
  });

  it('makes Classic White the default document theme', async () => {
    const manifest = JSON.parse(await readFile(path.join(process.cwd(), 'package.json'), 'utf8')) as {
      contributes: { configuration: { properties: Record<string, { default?: unknown }> } };
    };
    expect(manifest.contributes.configuration.properties['markora.theme.document'].default).toBe(
      'classic-white',
    );
  });
});
