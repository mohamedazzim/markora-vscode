# Release completion audit

Audit date: 2026-07-15

The repository is a prerelease extension, not a published release. This audit records what is implemented and what was actually verified.

## Complete and verified locally

- MIT repository separation and public-safe source layout.
- Custom editor manifest and provider registration contracts.
- Typed Zod webview messages and strict nonce-based CSP.
- Markdown core parser/serializer with 49 fixture cases.
- GFM tables, tasks, links, images, front matter, Unicode, math source, and Mermaid source preservation.
- Dedicated Tiptap math inline, math block, and Mermaid atom nodes with strict Mermaid rendering and source editing.
- Runtime axe-core scan of the webview control shell (0 violations).
- `npm run typecheck`, `npm run lint`, `npm run format:check`, and Vitest suites.

## Implemented but not fully verified

- Real custom editor launch harness with isolated user-data and extension directories. The installed VS Code instance could not launch during this run because its updater mutex reported `vscode-updating`; no E2E pass is claimed.
- Image insertion has workspace-relative routing, but clipboard paste, remote workspaces, conflict handling, and remote downloads need live VS Code coverage.
- HTML export is available; full KaTeX SVG/CSS and Mermaid SVG export parity needs a dedicated export renderer.

## Blocked by external identity or machine state

- GitHub owner and remote: `gh auth status` reports not logged in.
- Marketplace publisher: package.json still contains the required placeholder and no publisher identity was invented.
- Public GitHub repository, GitHub release, and Marketplace listing therefore remain uncreated.
- Clean-profile installation and release upgrade testing require a successful VS Code launch and a real VSIX publisher field.

## Security and licensing

No Electron main-process code, installer binaries, user documents, secrets, tokens, or Typora assets are included. The extension uses MIT licensing and keeps the webview behind CSP, runtime message validation, URI validation, and workspace APIs.
