# Publishing

Run `npm run publish:check`, `npx @vscode/vsce ls`, and `npm run package:vsix`. The `publisher` field must be a
real Marketplace publisher ID; the placeholder intentionally blocks publication. Authenticate with the current
VS Code Marketplace publisher flow or upload the verified VSIX manually. Never commit a PAT or place credentials
in source or workflow YAML.
