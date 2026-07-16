import { describe, expect, it } from 'vitest';
import {
  headingAnchors,
  markdownToHtml,
  normalizeMarkdown,
  parseMarkdown,
  structuredHtmlToMarkdown,
} from '../src/index.js';

describe('public Markdown core', () => {
  it('parses and normalizes GFM/front matter/math without losing semantic blocks', () => {
    const source =
      '---\ntitle: Demo\n---\n\n# Hello\n\n- [ ] Task\n\n| A | B |\n| --- | --- |\n| x\\|y | z |\n\n$$x^2$$\n';
    const tree = parseMarkdown(source);
    expect(tree.type).toBe('root');
    const normalized = normalizeMarkdown(source);
    expect(normalized).toContain('title: Demo');
    expect(normalized).toContain('x\\|y');
  });

  it('creates stable duplicate heading anchors', () => {
    expect(headingAnchors('# Hello\n\n## Hello\n\n# Hello').map((heading) => heading.id)).toEqual([
      'hello',
      'hello-1',
      'hello-2',
    ]);
  });

  it('sanitizes unsafe HTML while retaining portable Markdown elements', () => {
    const html = markdownToHtml('[safe](https://example.com) <script>alert(1)</script> **bold**');
    expect(html).toContain('https://example.com');
    expect(html).not.toContain('<script>');
    expect(html).toContain('<strong>bold</strong>');
  });

  it('round-trips visual HTML for headings, tables, images, and code fences', () => {
    const html = markdownToHtml('# Title\n\n![Alt](assets/photo.png)\n\n```ts\nconst answer = 42;\n```\n');
    const markdown = structuredHtmlToMarkdown(html);
    expect(markdown).toContain('# Title');
    expect(markdown).toContain('![Alt](assets/photo.png)');
    expect(markdown).toContain('```ts');
  });

  it('creates editable visual nodes for math and Mermaid and restores their sources', () => {
    const source =
      'Inline $x^2$ and \\(y+1\\).\n\n$$\n\\int_0^1 x dx\n$$\n\n```mermaid\nflowchart TD\n  A --> B\n```\n';
    const html = markdownToHtml(source);
    expect(html).toContain('data-markora-math-inline="true"');
    expect(html).toContain('data-markora-math-block="true"');
    expect(html).toContain('data-markora-mermaid-block="true"');
    const markdown = structuredHtmlToMarkdown(html);
    expect(markdown).toContain('$x^2$');
    expect(markdown).toContain('\\int_0^1 x dx');
    expect(markdown).toContain('```mermaid');
    expect(markdown).toContain('A --> B');
  });

  it('recognizes tilde Mermaid fences used by existing Markdown documents', () => {
    const html = markdownToHtml('~~~mermaid\nflowchart LR\n  A --> B\n~~~\n');
    expect(html).toContain('data-markora-mermaid-block="true"');
    expect(structuredHtmlToMarkdown(html)).toContain('```mermaid');
  });
});
