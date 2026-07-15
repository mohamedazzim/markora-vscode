import { describe, expect, it } from 'vitest';
import { markdownToHtml, normalizeMarkdown } from '../../src/index.js';
describe('Markdown core performance', () => {
  it('handles 100KB through 5MB documents within bounded budgets', () => {
    const paragraph =
      'A paragraph with **portable Markdown**, a [link](https://example.com), and Unicode ✓.\n\n';
    for (const targetBytes of [100_000, 1_000_000, 2_000_000, 5_000_000]) {
      const repeats = Math.ceil(targetBytes / Buffer.byteLength(paragraph));
      const source = `${'# Heading\n\n'}${paragraph.repeat(repeats)}`;
      const start = performance.now();
      const html = markdownToHtml(source);
      const elapsed = performance.now() - start;
      expect(Buffer.byteLength(source)).toBeGreaterThanOrEqual(targetBytes);
      expect(html.length).toBeGreaterThan(0);
      expect(elapsed).toBeLessThan(10_000);
    }
  });
  it('normalizes a multi-section document', () => {
    expect(normalizeMarkdown('# A\n\nText')).toContain('# A');
  });
});
