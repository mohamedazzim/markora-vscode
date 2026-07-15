import { describe, expect, it } from 'vitest';
import { markdownToHtml, normalizeMarkdown } from '../../src/index.js';
describe('Markdown core performance', () => {
  it('handles a 100KB document within a bounded test budget', () => {
    const source = `${'# Heading\n\n'}${'A paragraph with **portable Markdown**.\n\n'.repeat(2500)}`;
    const start = performance.now();
    const html = markdownToHtml(source);
    const elapsed = performance.now() - start;
    expect(html.length).toBeGreaterThan(0);
    expect(elapsed).toBeLessThan(3000);
  });
  it('normalizes a multi-section document', () => {
    expect(normalizeMarkdown('# A\n\nText')).toContain('# A');
  });
});
