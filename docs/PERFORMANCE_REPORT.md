# Performance report

Current local run (Windows x64, Node 24.16.0, 2026-07-15): the Markdown-core performance suite generated
100 KB, 1 MB, 2 MB, and 5 MB documents and converted each to sanitized HTML under a 10-second per-fixture budget.
The suite completed 2 tests in 1.97 seconds (Vitest process duration 3.25 seconds). This is a transformation
benchmark only; Extension Host startup, webview typing latency, workspace search, memory growth, Mermaid rendering,
and VSIX install performance have not been measured because the real VS Code E2E run was blocked by the local
VS Code update mutex.

Repeat the benchmark on supported Node/VS Code versions before release and record machine details alongside results.
