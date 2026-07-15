# Desktop code reuse audit

The source audit covered the private Markora desktop repository before this public repository was created.
Only reusable, license-compatible Markdown and presentation concepts were selected.

| Desktop area                                                            | Decision                       | Reason                                                                       |
| ----------------------------------------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| Markdown parser/serializer and heading anchors                          | Refactor before reuse          | Remove DOM/Electron assumptions; expose a small browser/Node-neutral API.    |
| GFM/table/image Markdown transforms                                     | Reuse concept and tests        | Portable Markdown behavior; no private state.                                |
| Tiptap extensions and document styles                                   | Reimplement for VS Code        | The webview needs a smaller, document-only surface.                          |
| Theme token definitions                                                 | Refactor before reuse          | Keep document tokens and VS Code variables separate.                         |
| HTML sanitization rules                                                 | Reuse policy, reimplement code | Webview CSP and browser-safe sanitizer boundary differ.                      |
| Electron main/preload IPC                                               | Desktop-only                   | Not safe or meaningful inside an extension host.                             |
| Recovery, atomic writes, workspace search, installer, Windows packaging | Desktop-only                   | VS Code owns documents, saves, hot exit, explorer, and packaging.            |
| Private screenshots, logs, user paths, release binaries, `.env` files   | Not safe to publish            | May contain personal data or generated/private artifacts.                    |
| Typora assets/CSS/branding                                              | Excluded                       | No permission and not needed; visual research is documented with links only. |

The public core is intentionally smaller than the desktop application. It does not include Electron imports,
private application state, recovery snapshots, user documents, or desktop release metadata.
