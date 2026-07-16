import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMath from 'remark-math';
import remarkStringify from 'remark-stringify';
import type { Root } from 'mdast';

export interface HeadingAnchor {
  depth: number;
  text: string;
  line: number;
  id: string;
}
export type MarkdownTree = Root;

const parser = unified().use(remarkParse).use(remarkGfm).use(remarkFrontmatter, ['yaml']).use(remarkMath);
const serializer = unified()
  .use(remarkStringify)
  .use(remarkGfm)
  .use(remarkFrontmatter, ['yaml'])
  .use(remarkMath);

export function parseMarkdown(source: string): MarkdownTree {
  return parser.runSync(parser.parse(source)) as Root;
}
export function serializeMarkdown(tree: MarkdownTree): string {
  return String(serializer.stringify(tree));
}
export function normalizeMarkdown(source: string): string {
  return serializeMarkdown(parseMarkdown(source));
}

export function headingAnchors(source: string): HeadingAnchor[] {
  const seen = new Map<string, number>();
  const anchors: HeadingAnchor[] = [];
  const append = (depth: number, text: string, line: number) => {
    const base =
      text
        .toLocaleLowerCase()
        .replace(/<[^>]*>/g, '')
        .replace(/[`*_~]/g, '')
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .trim()
        .replace(/\s+/g, '-') || 'section';
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    anchors.push({ depth, text, line, id: count ? `${base}-${count}` : base });
  };
  const lines = source.split(/\r?\n/);
  lines.forEach((line, index) => {
    const atx = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (atx) {
      append(atx[1].length, atx[2], index + 1);
      return;
    }
    if (index === 0 || !line.trim()) return;
    const setext = /^ {0,3}(=+|-+)\s*$/.exec(line);
    const title = lines[index - 1].trim();
    if (setext && title && !/^(?:```|~~~|>|[-+*]\s)/.test(title))
      append(setext[1][0] === '=' ? 1 : 2, title, index);
  });
  return anchors;
}

const allowedTags = [
  ...sanitizeHtml.defaults.allowedTags,
  'img',
  'figure',
  'figcaption',
  'input',
  'details',
  'summary',
  'mark',
  'u',
  'del',
  'kbd',
];
const allowedAttributes = {
  ...sanitizeHtml.defaults.allowedAttributes,
  '*': [
    'class',
    'title',
    'data-align',
    'data-markora-fence',
    'data-markora-inline',
    'data-markora-math-block',
    'data-markora-math-inline',
    'data-markora-mermaid-block',
    'data-source',
  ],
  a: ['href', 'name', 'target', 'rel', 'title'],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
  input: ['type', 'checked', 'disabled'],
};
export function sanitizeMarkdownHtml(html: string): string {
  const relative: string[] = [];
  const protectedHtml = html.replace(
    /\b(src|href)="([^"<>]+)"/gi,
    (all, attribute: string, value: string) => {
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) return all;
      if (!/^[^"'<>\r\n]+$/.test(value)) return all;
      const id = relative.push(value) - 1;
      return `${attribute}="https://markora.invalid/markora-relative/${id}"`;
    },
  );
  const sanitized = sanitizeHtml(protectedHtml, {
    allowedTags,
    allowedAttributes,
    allowedSchemes: ['http', 'https', 'mailto', 'data'],
    allowProtocolRelative: false,
  });
  return sanitized.replace(
    /https:\/\/markora\.invalid\/markora-relative\/(\d+)/g,
    (_all, index: string) => relative[Number(index)] ?? '',
  );
}

export function markdownToHtml(source: string): string {
  const transformed = protectVisualBlocks(source);
  const html = marked.parse(transformed, { gfm: true, breaks: true }) as string;
  return sanitizeMarkdownHtml(html);
}

function escapeAttribute(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll("'", '&#39;');
}

function escapeText(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

/** Convert supported math/Mermaid source into lossless, editable HTML nodes. */
function protectVisualBlocks(source: string): string {
  let result = source.replace(
    /^ {0,3}(?:```|~~~)\s*(math|mermaid)\s*\r?\n([\s\S]*?)\r?\n {0,3}(?:```|~~~)\s*$/gim,
    (_all, language: string, body: string) => {
      const encoded = escapeAttribute(body.replace(/\r\n/g, '\n').replace(/\n$/, ''));
      return `<div data-markora-${language.toLowerCase()}-block="true" data-source="${encoded}">${escapeText(
        body.replace(/\r\n/g, '\n').replace(/\n$/, ''),
      )}</div>`;
    },
  );
  const fencedBlocks: string[] = [];
  const lines = result.split(/(\r?\n)/);
  const protectedLines: string[] = [];
  let fenceMarker = '';
  let fenceBuffer = '';
  for (const line of lines) {
    const opening = /^ {0,3}(`{3,}|~{3,})/.exec(line);
    if (!fenceMarker && opening) {
      fenceMarker = opening[1][0];
      fenceBuffer = line;
      continue;
    }
    if (fenceMarker) {
      fenceBuffer += line;
      if (new RegExp(`^ {0,3}${fenceMarker}{3,}\\s*$`).test(line)) {
        const placeholder = `@@MARKORA_FENCE_${fencedBlocks.length}@@`;
        fencedBlocks.push(fenceBuffer);
        protectedLines.push(placeholder);
        fenceMarker = '';
        fenceBuffer = '';
      }
      continue;
    }
    protectedLines.push(line);
  }
  if (fenceMarker) protectedLines.push(fenceBuffer);
  result = protectedLines.join('');
  result = result.replace(/(?<!\\)\$\$([\s\S]+?)(?<!\\)\$\$/g, (_all, body: string) => {
    const value = body.trim();
    return `<div data-markora-math-block="true" data-source="${escapeAttribute(value)}">${escapeText(value)}</div>`;
  });
  result = result.replace(/\\\[([\s\S]+?)\\\]/g, (_all, body: string) => {
    const value = body.trim();
    return `<div data-markora-math-block="true" data-source="${escapeAttribute(value)}">${escapeText(value)}</div>`;
  });
  result = result.replace(
    /(?<!\\)\\\(([^\n]+?)\\\)/g,
    (_all, body: string) =>
      `<span data-markora-math-inline="true" data-source="${escapeAttribute(body)}">${escapeText(body)}</span>`,
  );
  result = result.replace(
    /(?<!\\)(?<!\$)\$([^\n$]+?)(?<!\\)\$(?!\$)/g,
    (_all, body: string) =>
      `<span data-markora-math-inline="true" data-source="${escapeAttribute(body)}">${escapeText(body)}</span>`,
  );
  fencedBlocks.forEach((block, index) => {
    result = result.replace(`@@MARKORA_FENCE_${index}@@`, () => block);
  });
  return result;
}

export function structuredHtmlToMarkdown(html: string): string {
  const service = new TurndownService({
    codeBlockStyle: 'fenced',
    emDelimiter: '_',
    bulletListMarker: '-',
    headingStyle: 'atx',
    hr: '---',
  });
  service.use(gfm);
  service.addRule('markoraImage', {
    filter: ['img'],
    replacement: (_content, node) => {
      const source = node.getAttribute('src') || '';
      if (!source) return '';
      const alt = node.getAttribute('alt') || '';
      const title = node.getAttribute('title');
      const optionalTitle = title ? ` "${title.replace(/(["\\])/g, '\\$1')}"` : '';
      const destination = /[\s()]/.test(source) ? `<${source}>` : source;
      return `![${alt.replace(/([\[\]])/g, '\\$1')}](${destination}${optionalTitle})`;
    },
  });
  service.addRule('markoraMathBlock', {
    filter: (node) => node.nodeName.toLowerCase() === 'div' && node.hasAttribute('data-markora-math-block'),
    replacement: (_content, node) => `\n\n$$\n${node.getAttribute('data-source') || ''}\n$$\n\n`,
  });
  service.addRule('markoraMathInline', {
    filter: (node) => node.nodeName.toLowerCase() === 'span' && node.hasAttribute('data-markora-math-inline'),
    replacement: (_content, node) => `$${node.getAttribute('data-source') || ''}$`,
  });
  service.addRule('markoraMermaidBlock', {
    filter: (node) =>
      node.nodeName.toLowerCase() === 'div' && node.hasAttribute('data-markora-mermaid-block'),
    replacement: (_content, node) =>
      `\n\n\`\`\`mermaid\n${node.getAttribute('data-source') || ''}\n\`\`\`\n\n`,
  });
  service.addRule('mark', { filter: ['mark'], replacement: (content) => `<mark>${content}</mark>` });
  service.addRule('underline', { filter: ['u'], replacement: (content) => `<u>${content}</u>` });
  service.addRule('fencedCode', {
    filter: (node) => node.nodeName.toLowerCase() === 'pre',
    replacement: (_content, node) => {
      const language =
        node
          .querySelector('code')
          ?.getAttribute('class')
          ?.match(/language-([\w-]+)/)?.[1] || '';
      const body = node.textContent?.replace(/\n$/, '') || '';
      return `\n\n\`\`\`${language}\n${body}\n\`\`\`\n\n`;
    },
  });
  const result = service
    .turndown(sanitizeMarkdownHtml(html))
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd();
  return result ? `${result}\n` : '';
}

export const markdownCoreVersion = '0.1.0';
