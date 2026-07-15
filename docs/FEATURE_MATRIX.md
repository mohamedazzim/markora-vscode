# Feature matrix

| Feature                      | Status  | Verification                                                                                                 |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| Custom Markdown editor       | Partial | Provider, manifest, and isolated Extension Development Host harness; local launch blocked                    |
| TextDocument synchronization | Tested  | Synchronizer/message tests                                                                                   |
| Structured editing           | Tested  | Webview contract, 49 Markdown fixtures, and visual node source round trips                                   |
| GFM/tables/tasks/images      | Partial | Fixture and core tests; live image picker/webview flow remains pending                                       |
| Math/Mermaid rendering       | Partial | Dedicated strict visual nodes and source-preservation tests; live VS Code run blocked by local updater mutex |
| CSP/message/HTML security    | Tested  | Static security tests and publish scan                                                                       |
| VS Code E2E                  | Blocked | Harness is real and isolated; local VS Code updater mutex blocked launch during this run                     |
| Marketplace publication      | Blocked | Real publisher identity required                                                                             |
