import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { markdownToHtml, structuredHtmlToMarkdown } from '../src/index.js';

interface Fixture {
  id: string;
  source: string;
  contains: string[];
}

const fixtures = JSON.parse(
  readFileSync(path.join(process.cwd(), 'test-workspace/fixtures/markdown/fixtures.json'), 'utf8'),
) as Fixture[];

describe('Markdown fixture matrix', () => {
  it('contains a broad, explicit syntax matrix', () => {
    expect(fixtures.length).toBeGreaterThanOrEqual(40);
    expect(new Set(fixtures.map((fixture) => fixture.id)).size).toBe(fixtures.length);
  });

  for (const fixture of fixtures) {
    it(`round-trips ${fixture.id}`, () => {
      const html = markdownToHtml(fixture.source);
      const markdown = structuredHtmlToMarkdown(html);
      const searchable = `${html}\n${markdown}`
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&');
      for (const token of fixture.contains) {
        expect(searchable, `${fixture.id} lost ${token}`).toContain(token);
      }
    });
  }
});
