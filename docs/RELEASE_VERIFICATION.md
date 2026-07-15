# Release verification

## Current run (2026-07-15, Windows x64)

- VS Code detected: 1.128.0 (installed executable); Node.js 24.16.0; npm 11.13.0.
- `npm ci`, typecheck, lint, format check, build, manifest check, unit/integration/webview/accessibility/
  performance suites, `npm run verify`, `npm run publish:check`, and `npm audit --omit=dev --audit-level=high` passed.
- The real isolated `@vscode/test-cli` harness used portable VS Code 1.128.1 after a stale installed updater
  process was stopped. All 16 Development Host tests passed.
- VSIX package: `release\markora-markdown-editor-0.1.0.vsix` (15 production files, 3,210,909 bytes).
- SHA-256 is recorded in `release\\SHA256SUMS.txt` and repeated in `release\\release-manifest.json`.
- The VSIX installed successfully in the normal profile and in an isolated profile at
  `%TEMP%\markora-vscode-clean-profile`; both profiles reported `mohamedazzimj.markora-markdown-editor@0.1.0`.
- GitHub Release: [v0.1.0](https://github.com/mohamedazzim/markora-vscode/releases/tag/v0.1.0), with the published VSIX,
  checksum, release manifest, and third-party notices. The downloaded VSIX matched both published SHA-256 values.

Remaining checks are Marketplace upload, clean-profile visual interaction screenshots, uninstall/reinstall, and
upgrade testing against the prior published version.
