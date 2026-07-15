# Markora – Visual Markdown Editor for VS Code

An open-source visual Markdown editor for Visual Studio Code. Markora adds a focused, Typora-inspired
writing surface inside VS Code while keeping VS Code's `TextDocument` authoritative for saving, undo,
source control, hot exit, diffing, remote workspaces, and file watching.

This repository is a pre-release package (`0.1.0`). A real Marketplace publisher ID and GitHub owner must be
configured before a VSIX can be published; placeholders are intentionally retained in `package.json`.

![Markora document icon](media/icon.png)

## Features

- Reopen `.md`, `.markdown`, `.mdown`, and `.mkd` files with **Markora Visual Editor**.
- Structured editing for headings, paragraphs, emphasis, links, images, lists, tasks, quotes, code,
  tables, math blocks, Mermaid fences, and horizontal rules.
- Native VS Code Source Mode through **Markora: Open Source Editor**.
- Document themes: **Classic White (the default)**, Paper, Academic, Sepia, Graphite, Midnight, High Contrast, or follow VS Code.
- Offline core editing, strict webview CSP, validated messages, sanitized HTML, and no telemetry by default.
- Reversible Markdown round trips; unsupported constructs remain text in Source Mode.

## Install

From a verified VSIX:

```powershell
code --install-extension .\markora-markdown-editor-0.1.0.vsix
```

Open a Markdown file, right-click its tab, choose **Reopen Editor With…**, then select **Markora Visual Editor**.
To make it the default, choose **Configure Default Editor for…** in that same picker.

## Commands

Use the Command Palette (`Ctrl+Shift+P`) and search for `Markora`. Important commands include Open Visual
Editor, Open Source Editor, Toggle Visual/Source Editor, Insert Table, Insert Image, Insert Math, Insert
Mermaid Diagram, Copy as HTML, Copy as Markdown, Open Theme Picker, and Show Document Outline.

## Security and privacy

The extension does not collect document content or telemetry by default. Webviews use a per-load nonce CSP,
restricted local resource roots, runtime-validated message envelopes, safe external URL checks, and sanitized
HTML. Remote images are disabled by default. See [SECURITY.md](SECURITY.md) and [PRIVACY.md](PRIVACY.md).

## Supported Markdown

The shared core covers CommonMark/GFM, front matter, tables, task lists, fenced code, images, links, footnotes,
math delimiters, Mermaid fences, Unicode, emoji, CRLF/LF, and safe HTML. See [docs/MARKDOWN_SUPPORT.md](docs/MARKDOWN_SUPPORT.md).

## Development

```powershell
npm ci
npm run verify
npm run package:vsix
```

The desktop Electron application is private and is not a dependency of this repository. See
[docs/DESKTOP_CODE_REUSE_AUDIT.md](docs/DESKTOP_CODE_REUSE_AUDIT.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

## Limitations

PDF export is intentionally not included in the first VS Code release. Large documents can be opened in the
native Source Editor. Real VS Code E2E uses an isolated Extension Development Host and requires a local VS Code
installation that is not in the middle of an update.

## License

MIT. Third-party notices are in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
