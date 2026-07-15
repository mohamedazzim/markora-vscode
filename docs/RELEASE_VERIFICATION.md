# Release verification

## Current run (2026-07-15, Windows x64)

- VS Code detected: 1.128.0 (installed executable); Node.js 24.16.0; npm 11.13.0.
- `npm ci`, typecheck, lint, format check, build, manifest check, unit/integration/webview/accessibility/
  performance suites, `npm run verify`, `npm run publish:check`, and `npm audit --omit=dev --audit-level=high` passed.
- The real isolated `@vscode/test-cli` harness used portable VS Code 1.128.1 after a stale installed updater
  process was stopped. All 16 Development Host tests passed.
- VSIX package: `release\markora-markdown-editor-0.1.0.vsix` (15 production files, 3,210,909 bytes).
- SHA-256: `958d239d21d4139df0e494c884401cb43f0b2790c68255b9d99727d19b1dd68c`.
- The VSIX installed successfully in the normal profile and in an isolated profile at
  `%TEMP%\markora-vscode-clean-profile`; both profiles reported `mohamedazzimj.markora-markdown-editor@0.1.0`.

Remaining manual checks are Marketplace upload, clean-profile visual interaction screenshots, uninstall/reinstall,
and upgrade testing against the prior published version.
