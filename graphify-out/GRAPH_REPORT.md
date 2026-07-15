# Graph Report - C:\Markora_VSCode  (2026-07-15)

## Corpus Check
- Corpus is ~44,620 words - fits in a single context window. You may not need a graph.

## Summary
- 593 nodes · 632 edges · 109 communities (47 shown, 62 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `34a4185`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- extension.ts
- devDependencies
- package.json
- WebviewManager
- index.tsx
- Markdown normalization
- scripts
- enum
- compilerOptions
- Markdown support
- Release completion audit
- Release process
- Performance report
- dependencies
- Markora visual Markdown editor
- Cross-platform CI verify job
- markora.images.destination
- properties
- Bug report template
- Extension host CustomTextEditorProvider ->
- Markora logo icon
- markora.editor.contentWidth
- markora.editor.fontSize
- markora.editor.lineHeight
- manifest-check.mjs
- markora.images.assetFolder
- markora.theme.followVsCode
- run.mjs
- Electron IPC, recovery packaging,
- esbuild.config.mjs
- markora.editor.enableSlashCommands
- markora.editor.fontFamily
- markora.editor.showSelectionToolbar
- markora.images.allowRemote
- markora.images.useRelativePaths
- build.mjs
- Native controls, keyboard focus,
- Classic White default theme
- katex
- marked
- mermaid
- react-dom
- remark-frontmatter
- remark-gfm
- remark-math
- remark-parse
- remark-stringify
- sanitize-html
- @tiptap core
- @tiptap extension-highlight
- @tiptap extension-image
- @tiptap extension-link
- @tiptap extension-table
- @tiptap extension-table-cell
- @tiptap extension-table-header
- @tiptap extension-table-row
- @tiptap extension-task-item
- @tiptap extension-task-list
- @tiptap extension-underline
- @tiptap react
- turndown
- turndown-plugin-gfm
- zod
- No telemetry or document-content
- run-vscode-tests.mjs
- Workspace Trust respected; future
- root
- graphify query path explain
- Repeat benchmark before release
- Themes
- Paper Academic Sepia Graphite
- Document-scoped CSS variables
- follow-vscode theme
- No external theme CSS
- VSIX content audit
- Forbidden VSIX contents
- Package metadata files
- Publisher and GitHub owner
- Production dist bundles
- publish-check.ps1 enforcement
- vsce package no-dependencies
- .vscodeignore exclusions
- Dependabot monthly npm updates
- Blank issues disabled
- Private security advisory link
- Feature request problem solution
- CodeQL JavaScript TypeScript analysis
- Light dark color scheme
- HTML webview shell
- Root mount element
- Responsive viewport
- Test workspace README
- Theme showcase fixture
- Theme showcase front matter
- Link task and table
- Write to Save workflow

## God Nodes (most connected - your core abstractions)
1. `scripts` - 28 edges
2. `compilerOptions` - 14 edges
3. `WebviewManager` - 13 edges
4. `keywords` - 11 edges
5. `markdownToHtml()` - 11 edges
6. `activate()` - 11 edges
7. `Markdown support` - 11 edges
8. `Release completion audit` - 10 edges
9. `enum` - 9 edges
10. `structuredHtmlToMarkdown()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Mermaid Write Save flowchart` --semantically_similar_to--> `Math delimiters and Mermaid fences`  [INFERRED] [semantically similar]
  test-workspace/theme-showcase.md → docs/MARKDOWN_SUPPORT.md
- `Classic White default theme` --semantically_similar_to--> `Bold italic and inline code fixture`  [INFERRED] [semantically similar]
  docs/THEMES.md → test-workspace/theme-showcase.md
- `media/icon.png package asset` --references--> `Markora icon image`  [EXTRACTED]
  docs/VSIX_CONTENT_AUDIT.md → media/icon.png
- `Initial custom editor, sync, webview, themes, math/Mermaid, tests, security controls` --references--> `Markora visual Markdown editor`  [INFERRED]
  CHANGELOG.md → README.md
- `Respect, actionable feedback, no harassment/discrimination/private-data disclosure` --rationale_for--> `Search issues; report VS Code/Markora versions, OS, reproduction, fixture; no private docs/credentials`  [INFERRED]
  CODE_OF_CONDUCT.md → SUPPORT.md
- `Structured editing, Source Mode, themes, offline core, CSP, validated messages, sanitized HTML` --conceptually_related_to--> `Webview messages, HTML, URLs, image URIs, workspace paths untrusted`  [INFERRED]
  README.md → SECURITY.md
- `Validated typed messages and nonce CSP; no Node fs writes` --conceptually_related_to--> `Webview messages, HTML, URLs, image URIs, workspace paths untrusted`  [INFERRED]
  docs/ARCHITECTURE.md → SECURITY.md
- `Reopen Editor With Markora Visual Editor` --references--> `Custom Markdown editor`  [INFERRED]
  test-workspace/README.md → docs/FEATURE_MATRIX.md
- `Search issues; report VS Code/Markora versions, OS, reproduction, fixture; no private docs/credentials` --references--> `Bug report template`  [EXTRACTED]
  SUPPORT.md → .github/ISSUE_TEMPLATE/bug_report.yml
- `PR checks: verify, security/workspace trust, fixtures` --references--> `Node.js 20+, VS Code 1.90+, npm ci, verify, package VSIX`  [EXTRACTED]
  .github/pull_request_template.md → CONTRIBUTING.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Required bug fields** — github_issue_template_bug_report_reproduction, github_issue_template_bug_report_vscode_version [EXTRACTED 1.00]
- **Feature verification scope** — docs_feature_matrix_custom_markdown_editor, docs_feature_matrix_structured_editing, docs_feature_matrix_vscode_e2e [EXTRACTED 1.00]
- **Markdown normalization components** — docs_markdown_normalization_tiptap_html_serialization, docs_markdown_normalization_gfm_conventions, docs_markdown_normalization_relative_image_links [EXTRACTED 1.00]
- **External release blockers** — docs_release_verification_updater_mutex, docs_release_verification_vsix_blocked, docs_release_completion_audit_external_blockers [EXTRACTED 1.00]
- **Webview security controls** — docs_security_nonce_csp, docs_security_zod_allowlist, docs_security_html_sanitization [EXTRACTED 1.00]
- **Theme showcase Markdown fixture** — test_workspace_theme_showcase_front_matter, test_workspace_theme_showcase_link_task_table, test_workspace_theme_showcase_mermaid_flowchart [EXTRACTED 1.00]

## Communities (109 total, 62 thin omitted)

### Community 0 - "extension.ts"
Cohesion: 0.07
Nodes (37): allowedAttributes, allowedTags, escapeAttribute(), escapeText(), HeadingAnchor, headingAnchors(), markdownToHtml(), MarkdownTree (+29 more)

### Community 1 - "devDependencies"
Cohesion: 0.04
Nodes (47): axe-core, esbuild, eslint, eslint-config-prettier, jsdom, devDependencies, axe-core, esbuild (+39 more)

### Community 2 - "package.json"
Cohesion: 0.06
Nodes (35): activationEvents, bugs, url, categories, contributes, commands, customEditors, keybindings (+27 more)

### Community 3 - "WebviewManager"
Cohesion: 0.11
Nodes (11): allowedCommands, ExtensionToWebviewMessage, WebviewToExtensionMessage, webviewToExtensionSchema, DocumentSynchronizer, SynchronizerHost, buildWebviewHtml(), WebviewManager (+3 more)

### Community 4 - "index.tsx"
Cohesion: 0.08
Nodes (25): keywords, App(), extensions, postMessage(), vscode, createNodeView(), editSource(), MathBlock (+17 more)

### Community 5 - "Markdown normalization"
Cohesion: 0.07
Nodes (28): CSP message HTML security, Known limitations, PDF export not bundled, Remote image download disabled, Lossless source formatting, Visual edit normalization, Opt-in VS Code E2E, Workspace trust checks (+20 more)

### Community 6 - "scripts"
Cohesion: 0.07
Nodes (28): scripts, build, clean, compile, dev, dev:clean, format, format:check (+20 more)

### Community 7 - "enum"
Cohesion: 0.07
Nodes (27): default, enum, type, default, description, enum, type, default (+19 more)

### Community 8 - "compilerOptions"
Cohesion: 0.09
Nodes (21): DOM, ES2022, node, packages/**/*.ts, packages/**/*.tsx, scripts/**/*.ts, compilerOptions, allowSyntheticDefaultImports (+13 more)

### Community 9 - "Markdown support"
Cohesion: 0.10
Nodes (20): Feature matrix, Custom Markdown editor, GFM tables tasks images, Math and Mermaid rendering, Structured editing, TextDocument synchronization, Markdown support, CommonMark (+12 more)

### Community 10 - "Release completion audit"
Cohesion: 0.11
Nodes (19): Release completion audit, Axe-core webview scan, Dedicated Tiptap math and Mermaid nodes, GitHub and Marketplace identity blockers, HTML export, Workspace-relative image insertion, Custom editor manifest and provider, Markdown core 49 fixtures (+11 more)

### Community 11 - "Release process"
Cohesion: 0.12
Nodes (16): Marketplace publication, Publishing, Marketplace publisher ID, package:vsix command, Credential and PAT handling, publish:check command, Publisher authentication flow, vsce ls command (+8 more)

### Community 12 - "Performance report"
Cohesion: 0.12
Nodes (16): VS Code end-to-end testing, Performance report, 100 KB to 5 MB benchmark documents, Sanitized HTML conversion, Ten second fixture budget, Unmeasured E2E performance metrics, VS Code updater mutex, Vitest duration 2.63 seconds (+8 more)

### Community 13 - "dependencies"
Cohesion: 0.22
Nodes (9): dompurify, dependencies, dompurify, react, @tiptap/starter-kit, unified, react, @tiptap/starter-kit (+1 more)

### Community 14 - "Markora visual Markdown editor"
Cohesion: 0.25
Nodes (8): Initial custom editor, sync, webview, themes, math/Mermaid, tests, security controls, Focused security tests; document CSS variables; high-contrast review, Validated typed messages and nonce CSP; no Node fs writes, Structured editing, Source Mode, themes, offline core, CSP, validated messages, sanitized HTML, Markora visual Markdown editor, Reversible Markdown round trips; unsupported constructs remain Source Mode text, VS Code TextDocument authoritative, Webview messages, HTML, URLs, image URIs, workspace paths untrusted

### Community 15 - "Cross-platform CI verify job"
Cohesion: 0.25
Nodes (8): Node.js 20+, VS Code 1.90+, npm ci, verify, package VSIX, Node/npm/VS Code requirements; npm ci, verify, build dist bundles, package VSIX, launch Extension Host, PR checks: verify, security/workspace trust, fixtures, CI typecheck, lint, format, test, build, manifest checks, Cross-platform CI verify job, Tag-triggered VSIX release with checksums, React/Tiptap; Markdown stack; Mermaid/KaTeX/sanitizers/Zod; build/test toolchain, npm lock metadata and complete transitive notice bundle; no Typora assets

### Community 16 - "markora.images.destination"
Cohesion: 0.29
Nodes (7): default, enum, type, markora.images.destination, assets, document-sibling, workspace-assets

### Community 17 - "properties"
Cohesion: 0.33
Nodes (6): properties, title, configuration, default, type, markora.images.downloadRemoteOnInsert

### Community 18 - "Bug report template"
Cohesion: 0.40
Nodes (5): Respect, actionable feedback, no harassment/discrimination/private-data disclosure, Bug report template, Reproduction steps and Markdown fixture, VS Code version field, Search issues; report VS Code/Markora versions, OS, reproduction, fixture; no private docs/credentials

### Community 19 - "Extension host CustomTextEditorProvider ->"
Cohesion: 0.40
Nodes (5): VS Code TextDocument authority and WorkspaceEdit synchronization, VS Code owns dirty state, undo/redo, save, hot exit, source control, remotes, watchers; stale revisions rejected, Extension host CustomTextEditorProvider -> WebviewManager -> DocumentSynchronizer -> React/Tiptap -> markdown-core parser/serializer -> Markdown, Multiple editors per document; native editor/source command and VS Code UI preserved, Option-priority markora.markdownVisualEditor CustomTextEditorProvider

### Community 20 - "Markora logo icon"
Cohesion: 0.40
Nodes (5): media/icon.png package asset, Markora icon image, Document with terminal prompt symbol, Green command chevron, Markora logo icon

### Community 21 - "markora.editor.contentWidth"
Cohesion: 0.40
Nodes (5): default, maximum, minimum, type, markora.editor.contentWidth

### Community 22 - "markora.editor.fontSize"
Cohesion: 0.40
Nodes (5): default, maximum, minimum, type, markora.editor.fontSize

### Community 23 - "markora.editor.lineHeight"
Cohesion: 0.40
Nodes (5): default, maximum, minimum, type, markora.editor.lineHeight

### Community 24 - "manifest-check.mjs"
Cohesion: 0.40
Nodes (4): commands, manifest, missing, requiredCommands

### Community 25 - "markora.images.assetFolder"
Cohesion: 0.50
Nodes (4): default, description, type, markora.images.assetFolder

### Community 26 - "markora.theme.followVsCode"
Cohesion: 0.50
Nodes (4): default, description, type, markora.theme.followVsCode

### Community 27 - "run.mjs"
Cohesion: 0.50
Nodes (3): extensionDevelopmentPath, extensionTestsPath, here

### Community 28 - "Electron IPC, recovery packaging,"
Cohesion: 0.67
Nodes (3): Desktop Electron repository is not a source dependency, Electron IPC, recovery/packaging, private artifacts, Typora assets excluded; public core smaller, Desktop audit: refactor parser/themes, reuse GFM concepts/tests, reimplement Tiptap/sanitization

### Community 30 - "markora.editor.enableSlashCommands"
Cohesion: 0.67
Nodes (3): default, type, markora.editor.enableSlashCommands

### Community 31 - "markora.editor.fontFamily"
Cohesion: 0.67
Nodes (3): default, type, markora.editor.fontFamily

### Community 32 - "markora.editor.showSelectionToolbar"
Cohesion: 0.67
Nodes (3): default, type, markora.editor.showSelectionToolbar

### Community 33 - "markora.images.allowRemote"
Cohesion: 0.67
Nodes (3): default, type, markora.images.allowRemote

### Community 34 - "markora.images.useRelativePaths"
Cohesion: 0.67
Nodes (3): default, type, markora.images.useRelativePaths

## Knowledge Gaps
- **322 isolated node(s):** `root`, `watch`, `name`, `displayName`, `description` (+317 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **62 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `keywords` connect `index.tsx` to `package.json`?**
  _High betweenness centrality (0.205) - this node is a cross-community bridge._
- **Why does `contributes` connect `package.json` to `properties`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Why does `properties` connect `properties` to `markora.editor.showSelectionToolbar`, `markora.images.allowRemote`, `markora.images.useRelativePaths`, `enum`, `markora.images.destination`, `markora.editor.contentWidth`, `markora.editor.fontSize`, `markora.editor.lineHeight`, `markora.images.assetFolder`, `markora.theme.followVsCode`, `markora.editor.enableSlashCommands`, `markora.editor.fontFamily`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **What connects `root`, `watch`, `name` to the rest of the system?**
  _322 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `extension.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06676342525399129 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
