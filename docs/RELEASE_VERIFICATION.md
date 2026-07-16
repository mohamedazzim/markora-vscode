# Release verification

## Patch candidate 0.1.1 (2026-07-16)

- Version and lockfile were updated to `0.1.1`; publisher remains `MohamedAzzimJ`.
- `npm ci`, `npm run verify`, real VS Code E2E (16 passing), `npm run publish:check`, and
  `npm audit --omit=dev --audit-level=high` passed.
- VSIX: `release\markora-markdown-editor-0.1.1.vsix`, 15 files, SHA-256
  `a56066b99e0d7cbed9a4f17f197e1b356299fe7d6b26b466fa01eeab22dcb307`.
- Publication attempt was rejected by the cached `vsce` credential with `TF400813`; no Marketplace publication is claimed.
- The prior `0.1.0` VSIX and public listing were not modified.

## Current run (2026-07-16, Windows x64)

- VS Code detected: 1.128.0 (installed executable); Node.js 24.16.0; npm 11.13.0.
- `npm ci`, typecheck, lint, format check, build, manifest check, unit/integration/webview/accessibility/
  performance suites, `npm run verify`, `npm run publish:check`, and `npm audit --omit=dev --audit-level=high` passed.
- The real isolated `@vscode/test-cli` harness used portable VS Code 1.128.1 after a stale installed updater
  process was stopped. All 16 Development Host tests passed.
- VSIX package: `release\markora-markdown-editor-0.1.0.vsix` (15 production files; the downloaded public release asset is 3,210,912 bytes).
- The final published SHA-256 is `14c12ab70017f8f3209d04042cc111ff4aa301cd398971ce255d374909303dd3`; it is recorded in
  `release\\SHA256SUMS.txt`, `release\\release-manifest.json`, and the Marketplace version properties.
- The VSIX installed successfully in the normal profile and in an isolated profile at
  `%TEMP%\markora-vscode-clean-profile`; both profiles reported `mohamedazzimj.markora-markdown-editor@0.1.0`.
- GitHub Release: [v0.1.0](https://github.com/mohamedazzim/markora-vscode/releases/tag/v0.1.0), with the published VSIX,
  checksum, release manifest, and third-party notices. The downloaded VSIX matched both published SHA-256 values.

## Marketplace verification (2026-07-16)

- Public listing: [MohamedAzzimJ.markora-markdown-editor](https://marketplace.visualstudio.com/items?itemName=MohamedAzzimJ.markora-markdown-editor).
- Gallery API returned a validated, public extension with display name **Markora – Visual Markdown Editor**,
  publisher **Mohamed Azzim J**, publisher ID `MohamedAzzimJ`, extension ID
  `MohamedAzzimJ.markora-markdown-editor`, and version `0.1.0`.
- Marketplace publication timestamp: `2026-07-15T18:41:39.253Z` (UTC). Last metadata update:
  `2026-07-15T18:48:22.287Z` (UTC).
- The live manifest exposes the expected categories (`Programming Languages`, `Visualization`), tags, repository,
  issues URL, MIT license, changelog and icon assets. The README/details asset is live and links to the public
  repository, security policy, privacy policy and Markdown support documentation.
- Installation command:
  `code --install-extension MohamedAzzimJ.markora-markdown-editor --force`
  completed successfully and reported the extension was already installed.
- Installed-version check returned:
  `mohamedazzimj.markora-markdown-editor@0.1.0`.
- `npx @vscode/vsce show MohamedAzzimJ.markora-markdown-editor` reports `0 installs` for this newly published listing;
  the README also carries the official Marketplace installs badge, which resolves dynamically.
- The `0.1.0` listing currently contains the original icon as its only image. A screenshot gallery is intentionally
  deferred until a clean, public-safe VS Code capture is available; private desktop screenshots are not published.

The packaged Extension Development Host suite remains 16 passing tests. A separate Marketplace-installed UI run is
not claimed: the local VS Code updater mutex prevented launching the isolated host during this verification window.
Uninstall/reinstall and upgrade testing remain future release checks.
