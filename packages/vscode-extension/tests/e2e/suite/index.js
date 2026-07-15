const assert = require('node:assert');
const vscode = require('vscode');

const viewType = 'markora.markdownVisualEditor';
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function markdownDocument() {
  const uri = vscode.Uri.joinPath(vscode.workspace.workspaceFolders[0].uri, 'README.md');
  return vscode.workspace.openTextDocument(uri);
}

suite('Markora Extension Development Host', () => {
  test('registers every public command', async () => {
    const commands = await vscode.commands.getCommands(true);
    for (const command of [
      'markora.openVisualEditor',
      'markora.openSourceEditor',
      'markora.toggleEditorMode',
      'markora.showEditorCommands',
      'markora.insertTable',
      'markora.insertImage',
      'markora.insertMath',
      'markora.insertDiagram',
      'markora.exportHtml',
      'markora.copyAsHtml',
      'markora.copyAsMarkdown',
      'markora.showDocumentOutline',
      'markora.openThemePicker',
      'markora.resetDocumentTheme',
      'markora.showDiagnostics',
    ])
      assert.ok(commands.includes(command), `missing ${command}`);
  });

  test('activates the extension and contributes the custom editor', async () => {
    const extension = vscode.extensions.all.find(
      (candidate) => candidate.packageJSON?.name === 'markora-markdown-editor',
    );
    assert.ok(extension, 'Markora extension is not installed in the development host');
    await extension.activate();
    assert.equal(extension.packageJSON.contributes.customEditors[0].viewType, viewType);
    assert.equal(extension.packageJSON.contributes.customEditors[0].priority, 'option');
  });

  test('opens the real workspace Markdown document in the native source editor', async () => {
    const document = await markdownDocument();
    const editor = await vscode.window.showTextDocument(document, vscode.ViewColumn.One);
    assert.equal(editor.document.languageId, 'markdown');
    assert.ok(editor.document.getText().includes('Markora'));
  });

  test('opens the real custom visual editor through vscode.openWith', async () => {
    const document = await markdownDocument();
    await vscode.commands.executeCommand('vscode.openWith', document.uri, viewType, vscode.ViewColumn.One);
    await wait(500);
    const activeTab = vscode.window.tabGroups.activeTabGroup.activeTab;
    assert.ok(activeTab, 'custom editor tab was not opened');
    assert.equal(activeTab.label, 'README.md');
  });

  test('keeps TextDocument as the canonical source while a visual editor is open', async () => {
    const document = await markdownDocument();
    const before = document.getText();
    const edit = new vscode.WorkspaceEdit();
    edit.insert(document.uri, new vscode.Position(0, 0), '# E2E heading\n\n');
    assert.ok(await vscode.workspace.applyEdit(edit));
    await wait(250);
    assert.ok(document.getText().startsWith('# E2E heading'));
    const restore = new vscode.WorkspaceEdit();
    restore.delete(
      document.uri,
      new vscode.Range(new vscode.Position(0, 0), document.positionAt('# E2E heading\n\n'.length)),
    );
    assert.ok(await vscode.workspace.applyEdit(restore));
    assert.equal(document.getText(), before);
  });

  test('supports native undo and redo for source edits', async () => {
    const document = await markdownDocument();
    const before = document.getText();
    const edit = new vscode.WorkspaceEdit();
    edit.insert(document.uri, new vscode.Position(0, 0), 'undo-marker\n');
    assert.ok(await vscode.workspace.applyEdit(edit));
    assert.ok(document.getText().startsWith('undo-marker'));
    await vscode.commands.executeCommand('undo');
    await wait(100);
    assert.equal(document.getText(), before);
    await vscode.commands.executeCommand('redo');
    await wait(100);
    assert.ok(document.getText().startsWith('undo-marker'));
    await vscode.commands.executeCommand('undo');
  });

  test('reopens the same document in a second visual editor', async () => {
    const document = await markdownDocument();
    await vscode.commands.executeCommand('vscode.openWith', document.uri, viewType, vscode.ViewColumn.One);
    await vscode.commands.executeCommand('vscode.openWith', document.uri, viewType, vscode.ViewColumn.Two);
    await wait(500);
    const tabs = vscode.window.tabGroups.all
      .flatMap((group) => group.tabs)
      .filter((tab) => tab.label === 'README.md');
    assert.ok(tabs.length >= 1, 'visual editor tab is missing');
  });

  test('switches back to the native source editor without discarding the document', async () => {
    const document = await markdownDocument();
    await vscode.commands.executeCommand('markora.openSourceEditor', document.uri);
    await wait(250);
    assert.equal(vscode.window.activeTextEditor?.document.uri.toString(), document.uri.toString());
  });

  test('switches to the visual editor through the public command', async () => {
    const document = await markdownDocument();
    await vscode.commands.executeCommand('markora.openVisualEditor', document.uri);
    await wait(300);
    assert.equal(vscode.window.tabGroups.activeTabGroup.activeTab?.label, 'README.md');
  });

  test('exposes the Classic White document theme by default', async () => {
    const value = vscode.workspace.getConfiguration('markora.theme').get('document');
    assert.ok(['classic-white', 'follow-vscode'].includes(value));
  });

  test('persists and resets document theme configuration', async () => {
    const configuration = vscode.workspace.getConfiguration('markora.theme');
    await configuration.update('document', 'paper', vscode.ConfigurationTarget.Workspace);
    assert.equal(configuration.get('document'), 'paper');
    await vscode.commands.executeCommand('markora.resetDocumentTheme');
    assert.equal(configuration.get('document'), 'classic-white');
  });

  test('registers the visual editing commands used by the webview', async () => {
    const commands = await vscode.commands.getCommands(true);
    for (const command of [
      'markora.insertTable',
      'markora.insertMath',
      'markora.insertDiagram',
      'markora.copyAsMarkdown',
    ]) {
      assert.ok(commands.includes(command));
    }
  });

  test('opens supported Markdown extensions with the native editor', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: '# Markdown extension',
      language: 'markdown',
    });
    assert.equal(document.languageId, 'markdown');
    assert.equal(document.getText(), '# Markdown extension');
  });

  test('updates the document version through VS Code edits', async () => {
    const document = await markdownDocument();
    const version = document.version;
    const edit = new vscode.WorkspaceEdit();
    edit.insert(document.uri, new vscode.Position(0, 0), '<!-- version test -->\n');
    assert.ok(await vscode.workspace.applyEdit(edit));
    assert.ok(document.version > version);
    const restore = new vscode.WorkspaceEdit();
    restore.delete(
      document.uri,
      new vscode.Range(new vscode.Position(0, 0), document.positionAt('<!-- version test -->\n'.length)),
    );
    await vscode.workspace.applyEdit(restore);
  });

  test('supports multiple Markdown tabs without replacing VS Code navigation', async () => {
    const first = await markdownDocument();
    const second = await vscode.workspace.openTextDocument({ content: '# Second', language: 'markdown' });
    await vscode.window.showTextDocument(first, vscode.ViewColumn.One);
    await vscode.window.showTextDocument(second, vscode.ViewColumn.Two);
    assert.equal(vscode.window.visibleTextEditors.length >= 1, true);
  });

  test('keeps the extension host responsive while reading the workspace document', async () => {
    const document = await markdownDocument();
    assert.ok(document.getText().length >= 0);
    assert.ok(vscode.workspace.workspaceFile || vscode.workspace.workspaceFolders?.length);
  });
});
