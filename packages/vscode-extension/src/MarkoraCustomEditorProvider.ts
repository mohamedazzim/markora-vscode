import type * as vscode from 'vscode';
import { WebviewManager } from './WebviewManager.js';

export class MarkoraCustomEditorProvider implements vscode.CustomTextEditorProvider {
  public static readonly viewType = 'markora.markdownVisualEditor';
  private readonly managers = new Set<WebviewManager>();

  public constructor(private readonly context: vscode.ExtensionContext) {}

  public resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    token: vscode.CancellationToken,
  ): void {
    void token;
    const manager = new WebviewManager(document, webviewPanel, this.context);
    this.managers.add(manager);
    webviewPanel.onDidDispose(() => this.managers.delete(manager), undefined, this.context.subscriptions);
  }

  public dispose(): void {
    for (const manager of this.managers) manager.dispose();
    this.managers.clear();
  }
}
