import * as assert from 'node:assert';
import * as vscode from 'vscode';
declare function suite(name: string, callback: () => void): void;
declare function test(name: string, callback: () => Promise<void> | void): void;
suite('Markora Extension Development Host', () => {
  test('registers the visual editor provider and commands', async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(commands.includes('markora.openVisualEditor'));
    assert.ok(commands.includes('markora.openSourceEditor'));
  });
});
