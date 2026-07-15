# Development

Requirements: Node.js 20+, npm 10+, and VS Code 1.90+. Run `npm ci`, then `npm run verify`. `npm run build`
creates extension-host and webview bundles in `dist/`; `npm run package:vsix` creates the installable VSIX.
Use the VS Code Extension Development Host launch configuration in `.vscode/launch.json` for interactive work.
