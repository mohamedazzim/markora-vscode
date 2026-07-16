# Release verification

## Security patch release 0.1.3 (2026-07-16)

- Source version: `0.1.3`; publisher remains `MohamedAzzimJ`.
- CodeQL alerts #1 and #2 are fixed on merged commit `32faa857f5806e2de945e20ce135388c760befd9`.
- Local focused security suite: 5 passing; full verification: 78 passing; VS Code host/E2E: 16 passing.
- GitHub Release: [v0.1.3](https://github.com/mohamedazzim/markora-vscode/releases/tag/v0.1.3).
- VSIX: `release\\markora-markdown-editor-0.1.3.vsix`; downloaded release-asset SHA-256
  `d57199a96785afa29d99cb2c909d9a0af166d30c0c1168bb00a7ec5fc88c2dee`.
- The VSIX installed successfully in the normal profile and an isolated clean VS Code profile, both reporting
  `mohamedazzimj.markora-markdown-editor@0.1.3`.
- Marketplace publication was attempted with the verified artifact and blocked by the cached credential
  (`TF400813`); no Marketplace publication is claimed.

## Patch candidate 0.1.1 (2026-07-16)

- Version and lockfile were updated to `0.1.1`; publisher remains `MohamedAzzimJ`.
- `npm ci`, `npm run verify`, real VS Code E2E (16 passing), `npm run publish:check`, and
  `npm audit --omit=dev --audit-level=high` passed.
- VSIX: `release\markora-markdown-editor-0.1.1.vsix`, 15 files, SHA-256
  `47ec1ee89a9ce1150f5f7dfd9a3999c21e988d63ca04db9e5114493876ac7e87`.
- Publication attempt was rejected by the cached `vsce` credential with `TF400813`; no Marketplace publication is claimed.
- The prior `0.1.0` VSIX and public listing were not modified.

## Documentation follow-up (2026-07-16)

- The public Marketplace listing is `0.1.2`; no new release or tag was created for documentation changes.
- Repository `main` contains the merged `0.1.3` security patch and its verification artifacts, but Marketplace
  publication is not claimed because the cached publisher credential returned `TF400813`.
- `media/screenshots/markora-webview.png` is a public-safe repository screenshot. Marketplace screenshot gallery
  metadata remains unchanged until an authenticated publication.

## CodeQL security fix candidate (2026-07-16)

- GitHub alerts #1 (`js/incomplete-sanitization`) and #2 (`js/incomplete-multi-character-sanitization`) were
  retrieved from the public API and reproduced against the shared Markdown core.
- The fixes use parser-aware heading sanitization, global Markdown image-alt escaping, tag-specific URL schemes,
  and rejection of non-image data URLs. Five focused security tests were added.
- This branch is a pull-request candidate. A patch release is required after merge because the affected core ships
  in the extension. Marketplace publication is not claimed until publisher authentication and clean-profile checks
  are complete.

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
- `npx @vscode/vsce show MohamedAzzimJ.markora-markdown-editor` reported 24 downloads during this audit; the README
  also carries the official Marketplace installs badge, which resolves dynamically.
- The `0.1.2` listing currently contains the original icon as its only published image. A public-safe screenshot
  now exists in the repository, but Marketplace screenshot-gallery metadata is intentionally unchanged until an
  authenticated publication; private desktop screenshots are not published.

The packaged Extension Development Host suite remains 16 passing tests. A separate Marketplace-installed UI run is
not claimed: the local VS Code updater mutex prevented launching the isolated host during this verification window.
Uninstall/reinstall and upgrade testing remain future release checks.
