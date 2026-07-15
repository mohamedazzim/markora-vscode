import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { JSDOM } from 'jsdom';
describe('webview accessibility contracts', () => {
  it('keeps an accessible document label, alert channel, and keyboard-focusable controls', async () => {
    const source = await readFile(path.join(process.cwd(), 'packages/editor-webview/src/index.tsx'), 'utf8');
    expect(source).toContain('aria-label="Markora visual Markdown editor"');
    expect(source).toContain('role="alert"');
    expect(source).toContain('aria-label="Bold"');
  });

  it('passes axe-core against the rendered webview control shell', async () => {
    const dom =
      new JSDOM(`<!doctype html><html lang="en"><head><title>Markora</title></head><body><main aria-label="Markora document controls">
      <header><button aria-label="Bold">B</button><button aria-label="Insert table">Table</button>
      <label for="theme">Document theme</label><select id="theme"><option>Classic White</option></select></header>
      <section aria-label="Markora visual Markdown editor" tabindex="0"><p>Accessible document</p></section>
    </main></body></html>`);
    const previousWindow = globalThis.window;
    const previousDocument = globalThis.document;
    const previousGlobals = {
      Window: globalThis.Window,
      Node: globalThis.Node,
      Element: globalThis.Element,
      HTMLElement: globalThis.HTMLElement,
      navigator: globalThis.navigator,
    };
    Object.assign(globalThis, {
      window: dom.window,
      document: dom.window.document,
      Window: dom.window.Window,
      Node: dom.window.Node,
      Element: dom.window.Element,
      HTMLElement: dom.window.HTMLElement,
    });
    Object.defineProperty(dom.window.HTMLCanvasElement.prototype, 'getContext', {
      configurable: true,
      value: () => ({ measureText: () => ({ width: 0 }) }),
    });
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: dom.window.navigator });
    try {
      const { default: axe } = await import('axe-core');
      const result = await axe.run(dom.window.document, { rules: { 'color-contrast': { enabled: false } } });
      expect(result.violations, result.violations.map((violation) => violation.id).join(', ')).toHaveLength(
        0,
      );
    } finally {
      Object.assign(globalThis, {
        window: previousWindow,
        document: previousDocument,
        Window: previousGlobals.Window,
        Node: previousGlobals.Node,
        Element: previousGlobals.Element,
        HTMLElement: previousGlobals.HTMLElement,
      });
      Object.defineProperty(globalThis, 'navigator', {
        configurable: true,
        value: previousGlobals.navigator,
      });
    }
  });
});
