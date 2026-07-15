import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { markdownToHtml, structuredHtmlToMarkdown } from '../../markdown-core/src/index.js';
import type { ExtensionToWebviewMessage } from '../../markdown-core/src/messages.js';
import { documentThemes, type DocumentTheme } from '../../markdown-core/src/themes.js';
import { MathBlock, MathInline, MermaidBlock } from './visual-nodes.js';

declare function acquireVsCodeApi(): {
  postMessage(message: unknown): void;
  getState(): unknown;
  setState(state: unknown): void;
};
const vscode = acquireVsCodeApi();
const extensions = [
  StarterKit,
  Underline,
  Highlight.configure({ multicolor: true }),
  Link.configure({ openOnClick: false }),
  Image.configure({ allowBase64: false }),
  Table.configure({ resizable: true }),
  TableRow,
  TableHeader,
  TableCell,
  TaskList,
  TaskItem.configure({ nested: true }),
  MathInline,
  MathBlock,
  MermaidBlock,
];

function App(): React.JSX.Element {
  const [version, setVersion] = useState(0);
  const [theme, setTheme] = useState<DocumentTheme>('classic-white');
  const [vscodeTheme, setVsCodeTheme] = useState<'light' | 'dark' | 'high-contrast'>('light');
  const [message, setMessage] = useState('');
  const [slashOpen, setSlashOpen] = useState(false);
  const enableSlashCommands = true;
  const applying = useRef(false);
  const versionRef = useRef(0);
  versionRef.current = version;
  const editor = useEditor({
    extensions,
    content: '<p></p>',
    autofocus: 'end',
    editorProps: {
      handleKeyDown: (_view, event) => {
        if (enableSlashCommands && event.key === '/') {
          setSlashOpen(true);
          return false;
        }
        if (event.key === 'Escape') setSlashOpen(false);
        return false;
      },
    },
    onUpdate: ({ editor: instance }) => {
      if (applying.current) return;
      const transactionId = crypto.randomUUID();
      vscode.postMessage({
        type: 'document.update',
        transactionId,
        documentVersion: versionRef.current,
        markdown: structuredHtmlToMarkdown(instance.getHTML()),
      });
    },
  });

  useEffect(() => {
    const listener = (event: MessageEvent<ExtensionToWebviewMessage>) => {
      const incoming = event.data;
      if (incoming.type === 'document.set' && incoming.version >= version) {
        setVersion(incoming.version);
        setMessage('');
        if (editor) {
          applying.current = true;
          editor.commands.setContent(markdownToHtml(incoming.markdown), { emitUpdate: false });
          applying.current = false;
        }
      } else if (incoming.type === 'theme.set') {
        setTheme(incoming.theme as DocumentTheme);
        setVsCodeTheme(incoming.vscodeTheme);
      } else if (incoming.type === 'command.run') {
        if (incoming.command === 'insertTable')
          editor?.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run();
        else if (incoming.command === 'insertMath')
          editor
            ?.chain()
            .focus()
            .insertContent({ type: 'mathBlock', attrs: { source: '\\text{equation}' } })
            .run();
        else if (incoming.command === 'insertDiagram')
          editor
            ?.chain()
            .focus()
            .insertContent({
              type: 'mermaidBlock',
              attrs: { source: 'flowchart TD\n  A[Start] --> B[End]' },
            })
            .run();
        else if (
          incoming.command === 'insertImage' &&
          typeof incoming.payload === 'object' &&
          incoming.payload &&
          'src' in incoming.payload
        ) {
          const payload = incoming.payload as { src: string; alt?: string };
          editor
            ?.chain()
            .focus()
            .setImage({ src: payload.src, alt: payload.alt ?? '' })
            .run();
        } else if (incoming.command === 'setTheme' && typeof incoming.payload === 'string')
          setTheme(incoming.payload as DocumentTheme);
      } else if (incoming.type === 'error') setMessage(incoming.message);
    };
    window.addEventListener('message', listener);
    vscode.postMessage({ type: 'ready', instanceId: crypto.randomUUID() });
    return () => window.removeEventListener('message', listener);
  }, [editor, version]);

  const tokens =
    theme !== 'follow-vscode' ? documentThemes[theme as Exclude<DocumentTheme, 'follow-vscode'>] : undefined;
  const style = tokens
    ? ({
        '--doc-bg': tokens.background,
        '--doc-surface': tokens.surface,
        '--doc-toolbar': tokens.toolbar,
        '--doc-text': tokens.text,
        '--doc-heading': tokens.heading,
        '--doc-muted': tokens.muted,
        '--doc-border': tokens.border,
        '--doc-accent': tokens.accent,
        '--doc-link': tokens.link,
        '--doc-code': tokens.code,
        '--doc-code-text': tokens.codeText,
        '--doc-selection': tokens.selection,
        '--doc-quote': tokens.quote,
        '--doc-table-header': tokens.tableHeader,
      } as React.CSSProperties)
    : undefined;
  const exec = (command: string, payload?: unknown) =>
    vscode.postMessage({ type: 'command.execute', command, payload });
  return (
    <main className={`markora-webview theme-${theme} vscode-${vscodeTheme}`} style={style}>
      <header className="context-bar" aria-label="Markora document controls">
        <span className="wordmark">Markora</span>
        <button onClick={() => editor?.chain().focus().toggleBold().run()} aria-label="Bold">
          <strong>B</strong>
        </button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()} aria-label="Italic">
          <em>I</em>
        </button>
        <button onClick={() => editor?.chain().focus().toggleStrike().run()} aria-label="Strikethrough">
          <s>S</s>
        </button>
        <button onClick={() => editor?.chain().focus().toggleCode().run()} aria-label="Inline code">
          &lt;/&gt;
        </button>
        <button onClick={() => exec('insertTable')} aria-label="Insert table">
          Table
        </button>
        <button onClick={() => exec('insertImage')} aria-label="Insert image">
          Image
        </button>
        <button onClick={() => exec('insertMath')} aria-label="Insert math">
          Math
        </button>
        <button onClick={() => exec('insertDiagram')} aria-label="Insert Mermaid diagram">
          Diagram
        </button>
        <label className="theme-select">
          Document theme
          <select
            value={theme}
            onChange={(event) => {
              const value = event.target.value as DocumentTheme;
              setTheme(value);
              vscode.postMessage({ type: 'command.execute', command: 'setTheme', payload: value });
            }}
          >
            <option value="follow-vscode">Follow VS Code</option>
            {Object.keys(documentThemes).map((id) => (
              <option value={id} key={id}>
                {id
                  .split('-')
                  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                  .join(' ')}
              </option>
            ))}
          </select>
        </label>
      </header>
      {message && (
        <div role="alert" className="status-message">
          {message}
        </div>
      )}
      <section className="document-surface">
        <EditorContent editor={editor} aria-label="Markora visual Markdown editor" />
        {slashOpen && (
          <div className="slash-menu" role="menu" aria-label="Markora slash commands">
            {[
              'Paragraph',
              'Heading 1',
              'Bullet list',
              'Numbered list',
              'Task list',
              'Quote',
              'Code block',
              'Table',
              'Math',
              'Mermaid',
              'Image',
              'Horizontal rule',
            ].map((label) => (
              <button
                key={label}
                role="menuitem"
                onClick={() => {
                  setSlashOpen(false);
                  if (label === 'Heading 1') editor?.chain().focus().toggleHeading({ level: 1 }).run();
                  else if (label === 'Bullet list') editor?.chain().focus().toggleBulletList().run();
                  else if (label === 'Numbered list') editor?.chain().focus().toggleOrderedList().run();
                  else if (label === 'Task list') editor?.chain().focus().toggleTaskList().run();
                  else if (label === 'Quote') editor?.chain().focus().toggleBlockquote().run();
                  else if (label === 'Code block') editor?.chain().focus().toggleCodeBlock().run();
                  else if (label === 'Horizontal rule') editor?.chain().focus().setHorizontalRule().run();
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
