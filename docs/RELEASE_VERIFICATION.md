# Release verification

## Current run (2026-07-15, Windows x64)

- VS Code detected: 1.128.0 (installed executable); Node.js 24.16.0; npm 11.13.0.
- `npm ci`, typecheck, lint, format check, build, manifest check, unit/integration/webview/accessibility/
  performance suites, and `npm audit --omit=dev --audit-level=high` passed.
- The real `@vscode/test-electron` harness downloaded VS Code 1.128.1 but launch was blocked by the local
  VS Code update mutex (`Code is currently being updated`). The E2E result is therefore **untested**, not passed.
- VSIX listing/package was blocked before file creation because `package.json.publisher` and repository owner are
  intentionally placeholders. No installation, clean-profile, uninstall, or checksum claim is made.

Before the first release, repeat this document in an isolated VS Code profile after configuring the real publisher:
Reopen Editor With..., visual edit, save, native source reopen, undo/redo, themes, math, Mermaid, image URI handling,
uninstall, reinstall, and SHA-256 verification of the published VSIX.
