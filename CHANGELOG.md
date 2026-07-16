# Changelog

## Unreleased

- Fixed Mermaid visual-node recognition for indented and tilde-fenced `mermaid` blocks so existing diagrams render instead of falling back to generic code blocks.
- Added secure relative Markdown-link routing from the webview to VS Code's native document APIs, including heading-anchor navigation and clear warnings for unsupported targets.
- Reworked the public README with a public-safe webview screenshot, current `0.1.1` Marketplace links, and explicit separation from the local `0.1.2` candidate.
- Added the open-source documentation audit and retained the no-embedded-logo presentation requested for the GitHub README.
- Replaced incomplete heading-tag and image-alt sanitization with context-specific, parser-aware handling and added adversarial security regression tests.

## 0.1.2 - 2026-07-16

- Refreshed the Marketplace README without an embedded logo image. The extension icon remains available through the Marketplace manifest metadata.

## 0.1.1 - 2026-07-16

- Fixed Mermaid visual-node recognition for indented and tilde-fenced `mermaid` blocks.
- Added secure relative Markdown-link routing, heading-anchor navigation, and safe handling for unsupported targets.
- Added synchronization and webview regression contracts for both fixes.

## 0.1.0 - 2026-07-15

- Initial open-source VS Code custom text editor provider.
- Native TextDocument synchronization and VS Code Source Mode commands.
- Structured Markdown webview with Tiptap, GFM tables, tasks, images, code, themes, and contextual commands.
- Classic White is now the default document theme, with a Typora-inspired white writing canvas and document-scoped typography tokens.
- Added dedicated KaTeX-backed math inline/block nodes and strict Mermaid visual nodes with editable source controls.
- Added a 49-fixture Markdown round-trip matrix, runtime axe-core webview accessibility coverage, and a real isolated VS Code E2E harness.
- Added stable/Insiders E2E scripts with isolated user-data and extension directories; the validated VSIX is ready for release.
- Strict CSP, runtime message validation, safe URL policy, sanitized Markdown HTML, CI, packaging, and community files.
- Published to the Visual Studio Marketplace as `MohamedAzzimJ.markora-markdown-editor` on 2026-07-15; the live listing and `0.1.0` installation were independently verified on 2026-07-16.
- GitHub release [v0.1.0](https://github.com/mohamedazzim/markora-vscode/releases/tag/v0.1.0) is public. The published VSIX SHA-256 is `14c12ab70017f8f3209d04042cc111ff4aa301cd398971ce255d374909303dd3`.
