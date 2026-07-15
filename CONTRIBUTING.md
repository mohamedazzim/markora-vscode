# Contributing

1. Install Node.js 20 or newer and VS Code 1.90 or newer.
2. Run `npm ci`.
3. Run `npm run verify` before opening a pull request.
4. Use `npm run package:vsix` to inspect a local package.

Markdown fixtures belong in `packages/markdown-core/tests`. Security-sensitive changes require a focused
message, URI, CSP, and sanitization test. New themes must use document-scoped CSS variables and include a
high-contrast review. The desktop Electron repository is not a source dependency.
