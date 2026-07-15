# Testing

`npm test` runs Vitest suites for the Markdown core, message protocol, webview contracts, accessibility
contracts, and performance fixtures. `npm run test:e2e` launches a real VS Code Extension Development Host
with isolated user-data and extension directories; it never substitutes a browser-only test. If the local VS Code
installation is updating, the command fails with the updater message and must be repeated after the update completes.
`npm run package:vsix` and `npx @vscode/vsce ls` are required before release.

The Markdown fixture matrix currently contains 49 cases. The local run on 2026-07-15 passed 71 Vitest tests,
including two runtime accessibility checks and two performance checks. A successful test count does not imply that
the real VS Code E2E suite passed; its result is recorded separately in `docs/RELEASE_VERIFICATION.md`.
