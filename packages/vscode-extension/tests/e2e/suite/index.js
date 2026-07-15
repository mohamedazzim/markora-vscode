const assert = require('node:assert');
const vscode = require('vscode');

suite('Markora Extension Development Host', () => {
  test('registers the visual editor provider and commands', async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(commands.includes('markora.openVisualEditor'));
    assert.ok(commands.includes('markora.openSourceEditor'));
    assert.ok(commands.includes('markora.exportHtml'));
  });
});
