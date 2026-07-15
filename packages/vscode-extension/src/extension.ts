import * as vscode from 'vscode';
import { markdownToHtml, headingAnchors } from '../../markdown-core/src/index.js';
import { MarkoraCustomEditorProvider } from './MarkoraCustomEditorProvider.js';
import { WebviewManager } from './WebviewManager.js';

const activeUri = (): vscode.Uri | undefined => vscode.window.activeTextEditor?.document.uri;

async function openVisual(uri?: vscode.Uri): Promise<void> {
  const target = uri ?? activeUri();
  if (!target) {
    void vscode.window.showInformationMessage('Open a Markdown file first.');
    return;
  }
  await vscode.commands.executeCommand(
    'vscode.openWith',
    target,
    MarkoraCustomEditorProvider.viewType,
    vscode.ViewColumn.Active,
  );
}

async function openSource(uri?: vscode.Uri): Promise<void> {
  const target = uri ?? activeUri();
  if (!target) {
    void vscode.window.showInformationMessage('Open a Markdown file first.');
    return;
  }
  await vscode.commands.executeCommand('vscode.openWith', target, 'default', vscode.ViewColumn.Active);
}

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  await ensureClassicWhiteDefault();
  const provider = new MarkoraCustomEditorProvider(context);
  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(MarkoraCustomEditorProvider.viewType, provider, {
      webviewOptions: { retainContextWhenHidden: true },
      supportsMultipleEditorsPerDocument: true,
    }),
  );
  const command = (id: string, handler: (...args: unknown[]) => unknown) =>
    context.subscriptions.push(vscode.commands.registerCommand(id, (...args: unknown[]) => handler(...args)));
  command('markora.openVisualEditor', (uri) => openVisual(uri as vscode.Uri | undefined));
  command('markora.openSourceEditor', (uri) => openSource(uri as vscode.Uri | undefined));
  command('markora.toggleEditorMode', () => openSource());
  command('markora.showEditorCommands', async () => {
    const selected = await vscode.window.showQuickPick([
      'Insert Table',
      'Insert Image',
      'Insert Math',
      'Insert Mermaid Diagram',
      'Open Theme Picker',
      'Show Outline',
    ]);
    if (selected)
      void vscode.window.showInformationMessage(`${selected} is available in the Markora editor.`);
  });
  command('markora.insertTable', () => sendCommand('insertTable'));
  command('markora.insertImage', () => insertImage());
  command('markora.insertMath', () => sendCommand('insertMath'));
  command('markora.insertDiagram', () => sendCommand('insertDiagram'));
  command('markora.copyAsHtml', () => copyDocumentAsHtml());
  command('markora.copyAsMarkdown', () => copyDocumentAsMarkdown());
  command('markora.showDocumentOutline', () => showOutline());
  command('markora.exportHtml', () => exportHtml());
  command('markora.openThemePicker', () => pickTheme());
  command('markora.resetDocumentTheme', () =>
    vscode.workspace
      .getConfiguration('markora.theme')
      .update('document', 'classic-white', vscode.ConfigurationTarget.Global),
  );
  command('markora.showDiagnostics', () =>
    vscode.commands.executeCommand('workbench.action.showRuntimeExtensions'),
  );
}

async function ensureClassicWhiteDefault(): Promise<void> {
  const configuration = vscode.workspace.getConfiguration('markora.theme');
  const inspection = configuration.inspect<string>('document');
  const hasExplicitTheme =
    inspection?.globalValue !== undefined || inspection?.workspaceFolderValue !== undefined;
  if (!hasExplicitTheme && configuration.get<string>('document') === 'follow-vscode') {
    await configuration.update('document', 'classic-white', vscode.ConfigurationTarget.Global);
  }
}

async function sendCommand(command: string): Promise<void> {
  if (!WebviewManager.sendToActive(command as Parameters<typeof WebviewManager.sendToActive>[0])) {
    void vscode.window.showInformationMessage('Open a Markdown document in Markora first.');
  }
}

async function getDocument(): Promise<vscode.TextDocument | undefined> {
  return WebviewManager.activeDocument() ?? vscode.window.activeTextEditor?.document;
}

async function insertImage(): Promise<void> {
  const selected = await vscode.window.showOpenDialog({
    canSelectMany: false,
    openLabel: 'Insert Image',
    filters: { Images: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'] },
  });
  const image = selected?.[0];
  if (
    image &&
    WebviewManager.sendToActive('insertImage', {
      src: vscode.workspace.asRelativePath(image, false).replaceAll('\\', '/'),
      alt: image.path.split(/[\\/]/).pop() ?? 'Image',
    })
  )
    return;
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.languageId !== 'markdown') {
    void vscode.window.showInformationMessage('Open a Markdown document in Markora first.');
    return;
  }
  if (!image) return;
  const relative = vscode.workspace.asRelativePath(image, false).replaceAll('\\', '/');
  await editor.edit((builder) =>
    builder.insert(editor.selection.active, `![${image.path.split(/[\\/]/).pop() ?? 'Image'}](${relative})`),
  );
}

async function copyDocumentAsMarkdown(): Promise<void> {
  const document = await getDocument();
  if (!document) {
    void vscode.window.showInformationMessage('Open a Markdown document first.');
    return;
  }
  await vscode.env.clipboard.writeText(document.getText());
  void vscode.window.showInformationMessage('Markdown copied to the clipboard.');
}

async function copyDocumentAsHtml(): Promise<void> {
  const document = await getDocument();
  if (!document) {
    void vscode.window.showInformationMessage('Open a Markdown document first.');
    return;
  }
  await vscode.env.clipboard.writeText(markdownToHtml(document.getText()));
  void vscode.window.showInformationMessage('HTML copied to the clipboard.');
}

async function exportHtml(): Promise<void> {
  const document = await getDocument();
  if (!document) {
    void vscode.window.showInformationMessage('Open a Markdown document first.');
    return;
  }
  const target = await vscode.window.showSaveDialog({
    saveLabel: 'Export HTML',
    filters: { HTML: ['html'] },
    defaultUri: vscode.Uri.joinPath(
      document.uri,
      '..',
      `${
        document.uri.path
          .split('/')
          .pop()
          ?.replace(/\.[^.]+$/, '') ?? 'document'
      }.html`,
    ),
  });
  if (!target) return;
  const title =
    document.uri.path
      .split('/')
      .pop()
      ?.replace(/\.[^.]+$/, '') ?? 'Markora document';
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="generator" content="Markora for VS Code"><title>${title.replace(/[<>&"']/g, '')}</title></head><body>${markdownToHtml(document.getText())}</body></html>`;
  await vscode.workspace.fs.writeFile(target, new TextEncoder().encode(html));
  void vscode.window.showInformationMessage(`Exported HTML to ${target.fsPath}.`);
}

async function pickTheme(): Promise<void> {
  const options = [
    'follow-vscode',
    'classic-white',
    'paper',
    'academic',
    'sepia',
    'graphite',
    'midnight',
    'high-contrast',
  ];
  const picked = await vscode.window.showQuickPick(options, {
    placeHolder: 'Choose a Markora document theme',
  });
  if (!picked) return;
  await vscode.workspace
    .getConfiguration('markora.theme')
    .update('document', picked, vscode.ConfigurationTarget.Workspace);
  WebviewManager.sendThemeToActive(picked);
}

async function showOutline(): Promise<void> {
  const document = await getDocument();
  if (!document) {
    void vscode.window.showInformationMessage('Open a Markdown document first.');
    return;
  }
  const headings = headingAnchors(document.getText());
  const picked = await vscode.window.showQuickPick(
    headings.map((heading) => ({
      label: `${'#'.repeat(heading.depth)} ${heading.text}`,
      line: heading.line,
    })),
    { placeHolder: 'Jump to heading' },
  );
  if (!picked) return;
  const editor = await vscode.window.showTextDocument(document, vscode.ViewColumn.Active);
  const position = new vscode.Position(Math.max(0, picked.line - 1), 0);
  editor.selection = new vscode.Selection(position, position);
  editor.revealRange(new vscode.Range(position, position));
}

export function deactivate(): void {
  /* VS Code disposes registered providers and listeners. */
}
