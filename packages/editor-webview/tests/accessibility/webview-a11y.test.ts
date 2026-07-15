import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
describe('webview accessibility contracts', () => {
  it('keeps an accessible document label, alert channel, and keyboard-focusable controls', async () => {
    const source = await readFile(path.join(process.cwd(), 'packages/editor-webview/src/index.tsx'), 'utf8');
    expect(source).toContain('aria-label="Markora visual Markdown editor"');
    expect(source).toContain('role="alert"');
    expect(source).toContain('aria-label="Bold"');
  });
});
