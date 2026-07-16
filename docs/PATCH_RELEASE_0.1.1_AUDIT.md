# Markora for VS Code 0.1.1 patch-release audit

Date: 2026-07-16

## Scope

This audit covers the Mermaid/math fence recognition and secure relative Markdown-link routing fixes after the published 0.1.0 release. The 0.1.0 VSIX and Marketplace artifact remain unchanged.

## Fixed defects and source files

- Tilde and indented Mermaid/math fence protection: `packages/markdown-core/src/index.ts`.
- Visual-node parser priority: `packages/editor-webview/src/visual-nodes.ts`.
- Typed `link.open` message validation: `packages/markdown-core/src/messages.ts`.
- Webview anchor handling: `packages/editor-webview/src/index.tsx`.
- VS Code external-link, heading-anchor, and relative-document routing: `packages/vscode-extension/src/WebviewManager.ts`.
- Regression contracts: `packages/markdown-core/tests/roundtrip.test.ts`, `packages/editor-webview/tests/webview-contract.test.ts`, and `packages/vscode-extension/tests/integration/synchronizer-contract.test.ts`.

## Release configuration

- Target version: `0.1.1`.
- Publisher: `MohamedAzzimJ`.
- Extension ID: `MohamedAzzimJ.markora-markdown-editor`.
- Existing 0.1.0 VSIX and Marketplace listing are not overwritten.

## Verification

- `npm run verify`: passed (73 tests across 10 files).
- Unit: 70 passed; integration: 8 passed; webview: 3 passed; accessibility: 2 passed; performance: 2 passed.
- Real VS Code Development Host E2E: 16 passed.
- `npm run publish:check`: passed.
- `npx @vscode/vsce ls`: passed.
- Dependency audit: 0 vulnerabilities.

## Regression risks

- Relative links are intentionally restricted to Markdown documents when opened in the visual editor.
- Heading anchors depend on the shared heading-anchor normalization.
- Remote workspaces use VS Code URI APIs; no Node filesystem assumptions are permitted.

## Artifacts

Packaging will produce `release/markora-markdown-editor-0.1.1.vsix`, `SHA256SUMS.txt`, and `release-manifest.json`. The package will be published only after local verification succeeds.

## Remaining limitations

PDF export remains desktop-only, and the extension's remote image download workflow remains disabled by default.
