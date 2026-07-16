import { describe, expect, it } from 'vitest';
import { headingAnchors, markdownToHtml, structuredHtmlToMarkdown } from '../src/index.js';

describe('security-sensitive Markdown transformations', () => {
  it('does not recreate executable markup while deriving heading anchors', () => {
    const payloads = [
      '<script>alert(1)</script>',
      '<scr<script>ipt>alert(1)</script>',
      '<!--><script>alert(1)</script>',
      '<<<<',
      '>>>>',
      '%3cscript%3e',
      '%253cscript%253e',
    ];

    for (const payload of payloads) {
      const [heading] = headingAnchors(`# ${payload}`);
      expect(heading.id).not.toMatch(/<script|<img|onerror|onload/i);
      expect(heading.id).not.toContain('<');
      expect(heading.id).not.toContain('>');
    }
  });

  it('escapes every Markdown image-alt metacharacter without losing safe text', () => {
    const html = '<p><img src="assets/photo.png" alt="back\\slash [square]" /></p>';
    const markdown = structuredHtmlToMarkdown(html);

    expect(markdown).toContain('![back\\\\slash \\[square\\]](assets/photo.png)');
    expect(markdown).not.toContain('![back\\slash [square]');
  });

  it('keeps safe URLs and removes dangerous URL/HTML execution surfaces', () => {
    const source = [
      '[safe](https://example.com/?q=<script>)',
      '[bad](javascript:alert(1))',
      '![bad](data:text/html,<script>alert(1)</script>)',
      '<img src=x onerror=alert(1)>',
      '<svg onload=alert(1)>x</svg>',
      '<script>alert(1)</script>',
    ].join('\n\n');
    const html = markdownToHtml(source);

    expect(html).toContain('https://example.com/');
    expect(html).not.toMatch(/<script|javascript:|onerror\s*=|onload\s*=/i);
    expect(html).not.toContain('data:text/html');
  });

  it('preserves Mermaid arrows, math backslashes, Unicode, and entities', () => {
    const unicodeAlt = '\u0928\u092e\u0938\u094d\u0924\u0947';
    const source = [
      'A & B',
      '',
      '$\\\\alpha + \\beta$',
      '',
      '```mermaid',
      'flowchart TD',
      '  A["<img src=x onerror=alert(1)>"] --> B',
      '```',
      '',
      `![${unicodeAlt}](My%20Document.png)`,
    ].join('\n');
    const markdown = structuredHtmlToMarkdown(markdownToHtml(source));

    expect(markdown).toContain('A & B');
    expect(markdown).toContain('\\\\alpha + \\beta');
    expect(markdown).toContain('A["<img src=x onerror=alert(1)>"] --> B');
    expect(markdown).toContain(unicodeAlt);
    expect(markdown).toContain('My%20Document.png');
  });

  it('is stable for repeated adversarial transformations', () => {
    const payloads = ['....//', '..../', '../', '..\\', '\\\\', '&&&&', '""""', "''''", '%252e%252e%252f'];
    for (const payload of payloads) {
      const source = `# ${payload}`;
      const once = headingAnchors(source)[0]?.id;
      const twice = headingAnchors(`# ${once ?? ''}`)[0]?.id;
      expect(twice).toBe(once);
    }
  });
});
