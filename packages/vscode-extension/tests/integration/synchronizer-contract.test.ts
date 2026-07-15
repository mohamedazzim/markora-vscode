import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

describe('extension-host synchronization contract', () => {
  it('uses VS Code WorkspaceEdit rather than direct filesystem writes', async () => {
    const source = await readFile(
      path.join(process.cwd(), 'packages/vscode-extension/src/DocumentSynchronizer.ts'),
      'utf8',
    );
    expect(source).toContain('vscode.workspace.applyEdit');
    expect(source).not.toMatch(/from ['\"]node:fs/);
    expect(source).not.toMatch(/writeFile\(/);
  });

  it('has explicit transaction and revision guards', async () => {
    const source = await readFile(
      path.join(process.cwd(), 'packages/vscode-extension/src/DocumentSynchronizer.ts'),
      'utf8',
    );
    expect(source).toContain('lastAckTransaction');
    expect(source).toContain('documentVersion');
    expect(source).toContain('transactionId');
  });
});
