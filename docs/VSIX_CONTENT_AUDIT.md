# VSIX content audit

The production package is generated with `vsce package --no-dependencies` after `npm run build`. `.vscodeignore` excludes tests, source TypeScript, desktop code, private documentation, CI files, maps, and local configuration. The intended package contains:

- `dist/extension.js` and `dist/webview.js` with their production bundles;
- `dist/webview.html` and `dist/webview.css`;
- `media/icon.png`;
- `package.json`, `README.md`, `LICENSE`, and `CHANGELOG.md`.

Run `npx @vscode/vsce ls` before publishing and review every path. The package metadata is configured for the
`MohamedAzzimJ` Marketplace publisher and the `mohamedazzim/markora-vscode` repository.

The package must not contain the private desktop repository, user names, `.env` files, tokens, release binaries, test-workspace fixtures, screenshots with personal data, or Electron desktop files. `scripts/publish-check.ps1` enforces these checks before a publish attempt.
