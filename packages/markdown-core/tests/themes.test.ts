import { describe, expect, it } from 'vitest';
import { documentThemes } from '../src/themes.js';

describe('document themes', () => {
  it('defines complete token sets for every built-in theme', () => {
    const required = [
      'background',
      'text',
      'muted',
      'border',
      'accent',
      'code',
      'selection',
      'quote',
    ] as const;
    for (const [id, tokens] of Object.entries(documentThemes)) {
      expect(id).toMatch(/^[a-z-]+$/);
      for (const token of required) expect(tokens[token]).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it('includes high contrast colors with a visible accent', () => {
    expect(documentThemes['high-contrast'].background).toBe('#000000');
    expect(documentThemes['high-contrast'].text).toBe('#ffffff');
    expect(documentThemes['high-contrast'].accent).not.toBe(documentThemes['high-contrast'].background);
  });
});
