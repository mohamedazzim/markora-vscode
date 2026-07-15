import * as vscode from 'vscode';
import { randomUUID } from 'node:crypto';
import {
  webviewToExtensionSchema,
  type AllowedCommand,
  type ExtensionToWebviewMessage,
} from '../../markdown-core/src/messages.js';
import { DocumentSynchronizer } from './DocumentSynchronizer.js';
import { buildWebviewHtml } from './security.js';

export class WebviewManager implements vscode.Disposable {
  private static activeManager: WebviewManager | undefined;
  public readonly instanceId = randomUUID();
  private readonly subscriptions: vscode.Disposable[] = [];
  private readonly synchronizer: DocumentSynchronizer;

  public constructor(
    private readonly document: vscode.TextDocument,
    private readonly panel: vscode.WebviewPanel,
    private readonly context: vscode.ExtensionContext,
  ) {
    panel.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(context.extensionUri, 'dist'),
        vscode.Uri.joinPath(context.extensionUri, 'media'),
      ],
    };
    panel.webview.html = buildWebviewHtml(panel.webview, context.extensionUri);
    this.synchronizer = new DocumentSynchronizer(document, { send: (message) => this.send(message) });
    this.subscriptions.push(panel.webview.onDidReceiveMessage((message) => void this.handleMessage(message)));
    this.subscriptions.push(
      panel.onDidChangeViewState(() => {
        if (panel.active) WebviewManager.activeManager = this;
      }),
    );
    if (panel.active) WebviewManager.activeManager = this;
    this.subscriptions.push(panel.onDidDispose(() => this.dispose()));
  }

  public static sendToActive(command: AllowedCommand, payload?: unknown): boolean {
    const manager = WebviewManager.activeManager;
    if (!manager) return false;
    manager.send({ type: 'command.run', command, payload });
    return true;
  }

  public static activeDocument(): vscode.TextDocument | undefined {
    return WebviewManager.activeManager?.document;
  }

  public static sendThemeToActive(theme: string): boolean {
    const manager = WebviewManager.activeManager;
    if (!manager) return false;
    manager.send({ type: 'theme.set', theme, vscodeTheme: manager.currentVsCodeTheme() });
    return true;
  }

  private async handleMessage(raw: unknown): Promise<void> {
    const parsed = webviewToExtensionSchema.safeParse(raw);
    if (!parsed.success) {
      this.send({ type: 'error', message: 'Invalid editor message.' });
      return;
    }
    if (parsed.data.type === 'command.execute') {
      if (parsed.data.command === 'setTheme' && typeof parsed.data.payload === 'string') {
        await vscode.workspace
          .getConfiguration('markora.theme')
          .update('document', parsed.data.payload, vscode.ConfigurationTarget.Workspace);
        this.sendCurrentTheme();
      } else if (parsed.data.command === 'insertImage') {
        const selected = await vscode.window.showOpenDialog({
          canSelectMany: false,
          openLabel: 'Insert Image',
          filters: { Images: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'] },
        });
        const image = selected?.[0];
        if (image) {
          this.send({
            type: 'command.run',
            command: 'insertImage',
            payload: {
              src: vscode.workspace.asRelativePath(image, false).replaceAll('\\', '/'),
              alt: image.path.split(/[\\/]/).pop() ?? 'Image',
            },
          });
        }
      } else this.send({ type: 'command.run', command: parsed.data.command, payload: parsed.data.payload });
      return;
    }
    await this.synchronizer.handle(parsed.data);
    if (parsed.data.type === 'ready') this.sendCurrentTheme();
  }

  private sendCurrentTheme(): void {
    const theme = vscode.workspace.getConfiguration('markora.theme').get<string>('document', 'follow-vscode');
    this.send({ type: 'theme.set', theme, vscodeTheme: this.currentVsCodeTheme() });
  }

  private currentVsCodeTheme(): 'light' | 'dark' | 'high-contrast' {
    const kind = vscode.window.activeColorTheme.kind;
    return kind === vscode.ColorThemeKind.HighContrast || kind === vscode.ColorThemeKind.HighContrastLight
      ? 'high-contrast'
      : kind === vscode.ColorThemeKind.Dark
        ? 'dark'
        : 'light';
  }

  public send(message: ExtensionToWebviewMessage): void {
    void this.panel.webview.postMessage(message);
  }
  public dispose(): void {
    if (WebviewManager.activeManager === this) WebviewManager.activeManager = undefined;
    this.synchronizer.dispose();
    for (const subscription of this.subscriptions.splice(0)) subscription.dispose();
  }
}
