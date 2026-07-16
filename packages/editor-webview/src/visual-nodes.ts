import { Node, mergeAttributes } from '@tiptap/core';
import katex from 'katex';
import mermaid from 'mermaid';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import type { EditorView, NodeView } from '@tiptap/pm/view';

type VisualNodeKind = 'math-inline' | 'math-block' | 'mermaid';

function sourceFrom(node: ProseMirrorNode): string {
  return typeof node.attrs.source === 'string' ? node.attrs.source : '';
}

function editSource(
  view: EditorView,
  getPos: (() => number | undefined) | undefined,
  node: ProseMirrorNode,
  kind: VisualNodeKind,
): void {
  const position = getPos?.();
  if (position === undefined) return;
  const label = kind === 'mermaid' ? 'Mermaid source' : 'Math source';
  const next = window.prompt(`Edit ${label}`, sourceFrom(node));
  if (next === null) return;
  const transaction = view.state.tr.setNodeMarkup(position, undefined, { ...node.attrs, source: next });
  view.dispatch(transaction);
}

function createNodeView(
  kind: VisualNodeKind,
  node: ProseMirrorNode,
  view: EditorView,
  getPos: (() => number | undefined) | undefined,
): NodeView {
  const dom = document.createElement(kind === 'math-inline' ? 'span' : 'div');
  dom.className = `markora-${kind}-node`;
  dom.setAttribute('contenteditable', 'false');
  dom.setAttribute('role', kind === 'mermaid' ? 'img' : 'math');
  dom.setAttribute('aria-label', kind === 'mermaid' ? 'Mermaid diagram' : 'Mathematical expression');

  const source = document.createElement('code');
  source.className = 'markora-visual-source';
  const content = document.createElement('div');
  content.className = 'markora-visual-content';
  const edit = document.createElement('button');
  edit.type = 'button';
  edit.className = 'markora-visual-edit';
  edit.textContent = 'Edit source';
  edit.setAttribute('aria-label', `Edit ${kind === 'mermaid' ? 'Mermaid diagram' : 'math'} source`);
  edit.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    editSource(view, getPos, node, kind);
  });
  dom.append(content, source, edit);

  const render = (current: ProseMirrorNode): void => {
    const value = sourceFrom(current);
    source.textContent = value;
    content.replaceChildren();
    if (kind === 'math-inline' || kind === 'math-block') {
      try {
        content.innerHTML = katex.renderToString(value || '\\text{empty}', {
          displayMode: kind === 'math-block',
          throwOnError: false,
          strict: 'ignore',
          output: 'html',
        });
        dom.classList.remove('is-error');
      } catch (error) {
        dom.classList.add('is-error');
        content.textContent = error instanceof Error ? error.message : 'Unable to render equation';
      }
      return;
    }
    const id = `markora-mermaid-${Math.random().toString(36).slice(2)}`;
    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'base' });
    void mermaid
      .render(id, value || 'flowchart TD\n  empty[Empty diagram]')
      .then(({ svg }) => {
        if (dom.isConnected) content.innerHTML = svg;
        dom.classList.remove('is-error');
      })
      .catch((error: unknown) => {
        dom.classList.add('is-error');
        content.textContent = error instanceof Error ? error.message : 'Unable to render Mermaid diagram';
      });
  };
  render(node);
  return {
    dom,
    update: (nextNode) => {
      if (nextNode.type !== node.type) return false;
      node = nextNode;
      render(nextNode);
      return true;
    },
    selectNode: () => dom.classList.add('ProseMirror-selectednode'),
    deselectNode: () => dom.classList.remove('ProseMirror-selectednode'),
    stopEvent: (event) => event.type === 'mousedown' || event.type === 'click',
    ignoreMutation: () => true,
  };
}

function visualNode(
  name: string,
  renderTag: string,
  parseTag: string,
  kind: VisualNodeKind,
  inline: boolean,
) {
  return Node.create({
    name,
    inline,
    group: inline ? 'inline' : 'block',
    atom: true,
    selectable: true,
    draggable: false,
    addAttributes: () => ({ source: { default: '' } }),
    parseHTML: () => [
      {
        tag: parseTag,
        priority: 1_000,
        getAttrs: (element) => ({ source: element.getAttribute('data-source') ?? '' }),
      },
    ],
    renderHTML: ({ HTMLAttributes }) => [
      renderTag,
      mergeAttributes(HTMLAttributes, { 'data-source': HTMLAttributes.source ?? '' }),
      HTMLAttributes.source ?? '',
    ],
    addNodeView() {
      return ({ node, view, getPos }) =>
        createNodeView(kind, node, view, typeof getPos === 'function' ? getPos : undefined);
    },
  });
}

export const MathInline = visualNode(
  'mathInline',
  'span',
  'span[data-markora-math-inline]',
  'math-inline',
  true,
);
export const MathBlock = visualNode('mathBlock', 'div', 'div[data-markora-math-block]', 'math-block', false);
export const MermaidBlock = visualNode(
  'mermaidBlock',
  'div',
  'div[data-markora-mermaid-block]',
  'mermaid',
  false,
);
