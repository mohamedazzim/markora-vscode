import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

describe('editor webview contract', () => {
  it('uses the canonical update protocol and keeps controls contextual', async () => {
    const source = await readFile(path.join(process.cwd(), 'packages/editor-webview/src/index.tsx'), 'utf8');
    expect(source).toContain("type: 'document.update'");
    expect(source).toContain('aria-label="Markora visual Markdown editor"');
    expect(source).toContain('enableSlashCommands');
    expect(source).toContain('Insert table');
  });
});
