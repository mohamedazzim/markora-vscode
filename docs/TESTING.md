# Testing

`npm test` runs Vitest suites for the Markdown core, message protocol, webview contracts, accessibility
contracts, and performance fixtures. `npm run test:e2e` is an opt-in real-VS-Code harness and never substitutes
a browser-only test for Extension Development Host validation. `npm run package:vsix` and `npx @vscode/vsce ls`
are required before release.
