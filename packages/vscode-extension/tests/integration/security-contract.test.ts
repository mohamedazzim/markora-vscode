import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

describe('webview security contract', () => {
  it('uses a nonce CSP and extension-scoped resource roots', async () => {
    const source = await readFile(
      path.join(process.cwd(), 'packages/vscode-extension/src/security.ts'),
      'utf8',
    );
    expect(source).toContain("script-src 'nonce-");
    expect(source).toContain('webview.cspSource');
    expect(source).toContain('asWebviewUri');
    expect(source).not.toContain('unsafe-eval');
  });

  it('allows only safe external URL protocols', async () => {
    const source = await readFile(
      path.join(process.cwd(), 'packages/vscode-extension/src/security.ts'),
      'utf8',
    );
    expect(source).toContain("['https:', 'mailto:']");
  });
});
