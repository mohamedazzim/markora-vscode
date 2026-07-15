import { describe, expect, it } from 'vitest';
import { webviewToExtensionSchema } from '../src/messages.js';

describe('webview message protocol', () => {
  it('accepts bounded document updates', () => {
    expect(
      webviewToExtensionSchema.safeParse({
        type: 'document.update',
        transactionId: 't1',
        documentVersion: 3,
        markdown: '# hi',
      }).success,
    ).toBe(true);
  });
  it('rejects unknown commands and oversized payloads', () => {
    expect(webviewToExtensionSchema.safeParse({ type: 'command.execute', command: 'runShell' }).success).toBe(
      false,
    );
    expect(
      webviewToExtensionSchema.safeParse({
        type: 'document.update',
        transactionId: 't1',
        documentVersion: 1,
        markdown: 'x'.repeat(20_000_001),
      }).success,
    ).toBe(false);
  });
});
