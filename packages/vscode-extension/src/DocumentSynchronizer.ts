import * as vscode from 'vscode';
import {
  webviewToExtensionSchema,
  type ExtensionToWebviewMessage,
  type WebviewToExtensionMessage,
} from '../../markdown-core/src/messages.js';

export interface SynchronizerHost {
  send(message: ExtensionToWebviewMessage): void;
}

export class DocumentSynchronizer implements vscode.Disposable {
  private disposed = false;
  private applying = false;
  private ready = false;
  private lastSentVersion = -1;
  private lastAckTransaction = '';
  private readonly changeSubscription: vscode.Disposable;

  public constructor(
    private readonly document: vscode.TextDocument,
    private readonly host: SynchronizerHost,
  ) {
    this.changeSubscription = vscode.workspace.onDidChangeTextDocument((event) => {
      if (event.document.uri.toString() !== this.document.uri.toString() || this.disposed) return;
      if (this.applying) return;
      this.sendDocument();
    });
  }

  public async handle(raw: unknown): Promise<void> {
    const parsed = webviewToExtensionSchema.safeParse(raw);
    if (!parsed.success || this.disposed) {
      this.host.send({ type: 'error', message: 'Invalid or unavailable editor message.' });
      return;
    }
    const message = parsed.data as WebviewToExtensionMessage;
    if (message.type === 'ready') {
      this.ready = true;
      this.sendDocument();
      return;
    }
    if (message.type !== 'document.update') return;
    if (message.documentVersion !== this.document.version) {
      this.sendDocument();
      return;
    }
    if (message.transactionId === this.lastAckTransaction) return;
    const edit = new vscode.WorkspaceEdit();
    edit.replace(
      this.document.uri,
      new vscode.Range(this.document.positionAt(0), this.document.positionAt(this.document.getText().length)),
      message.markdown,
    );
    this.applying = true;
    try {
      const applied = await vscode.workspace.applyEdit(edit);
      if (!applied) throw new Error('VS Code rejected the document edit.');
      this.lastAckTransaction = message.transactionId;
      this.host.send({
        type: 'document.ack',
        transactionId: message.transactionId,
        version: this.document.version,
      });
    } catch (error) {
      this.host.send({
        type: 'error',
        message: error instanceof Error ? error.message : 'Could not update the Markdown document.',
      });
    } finally {
      this.applying = false;
    }
  }

  private sendDocument(): void {
    if (this.disposed || !this.ready || this.lastSentVersion === this.document.version) return;
    this.lastSentVersion = this.document.version;
    this.host.send({
      type: 'document.set',
      markdown: this.document.getText(),
      version: this.document.version,
    });
  }

  public dispose(): void {
    this.disposed = true;
    this.changeSubscription.dispose();
  }
}
