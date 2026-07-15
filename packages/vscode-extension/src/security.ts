import * as vscode from 'vscode';
import { randomBytes } from 'node:crypto';

export function buildWebviewHtml(webview: vscode.Webview, extensionUri: vscode.Uri): string {
  const nonce = randomBytes(16).toString('base64url');
  const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'dist', 'webview.js'));
  const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'dist', 'webview.css'));
  const htmlUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'dist', 'webview.html'));
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https: data:; style-src ${webview.cspSource}; script-src 'nonce-${nonce}'; font-src ${webview.cspSource} https:;"><link rel="stylesheet" href="${styleUri}"><title>Markora Visual Editor</title></head><body data-template="${htmlUri}"><main id="root"></main><script nonce="${nonce}" src="${scriptUri}"></script></body></html>`;
}

export function isSafeExternalUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return ['https:', 'mailto:'].includes(url.protocol);
  } catch {
    return false;
  }
}
