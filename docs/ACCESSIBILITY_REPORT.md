# Accessibility report

Audit date: 2026-07-15

The webview uses native buttons, labelled controls, keyboard-focusable editor content, an accessible slash-menu role, alert announcements, and visible focus styles. The test suite includes a runtime axe-core scan against the rendered control shell and a source contract test.

Current result: 2 accessibility tests passed, including axe-core with zero reported violations. The scan is a webview-shell test in jsdom; a full Chromium/Extension Development Host axe run remains required before release. Contrast should be rechecked against each VS Code theme and custom document theme. Screen-reader behavior for ProseMirror transactions, table navigation, math errors, and Mermaid errors still needs manual verification.
