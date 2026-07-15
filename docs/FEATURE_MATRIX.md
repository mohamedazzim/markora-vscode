# Feature matrix

| Feature                      | Status  | Verification                                                                                                 |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| Custom Markdown editor       | Tested  | Provider, manifest, and isolated Extension Development Host smoke suite                                      |
| TextDocument synchronization | Tested  | Synchronizer/message tests                                                                                   |
| Structured editing           | Tested  | Webview contract, 49 Markdown fixtures, and visual node source round trips                                   |
| GFM/tables/tasks/images      | Partial | Fixture and core tests; live image picker/webview flow remains pending                                       |
| Math/Mermaid rendering       | Partial | Dedicated strict visual nodes and source-preservation tests; live VS Code run blocked by local updater mutex |
| CSP/message/HTML security    | Tested  | Static security tests and publish scan                                                                       |
| VS Code E2E                  | Tested  | Real VS Code 1.128.1 portable Development Host; 16 tests passed                                              |
| Marketplace publication      | Tested  | Live Gallery API metadata, public listing, SHA-256, and `code --install-extension` version check             |
