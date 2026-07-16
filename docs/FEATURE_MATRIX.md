# Feature matrix

| Feature                      | Status  | Verification                                                                                                                                      |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Custom Markdown editor       | Tested  | Provider, manifest, and isolated Extension Development Host smoke suite                                                                           |
| TextDocument synchronization | Tested  | Synchronizer/message tests                                                                                                                        |
| Structured editing           | Tested  | Webview contract, 49 Markdown fixtures, and visual node source round trips                                                                        |
| GFM/tables/tasks/images      | Partial | Fixture and core tests; live image picker/webview flow remains pending                                                                            |
| Math/Mermaid rendering       | Partial | Dedicated strict visual nodes, tilde/indented fence tests, and real host smoke coverage; full interactive visual fixture remains future work      |
| CSP/message/HTML security    | Tested  | Static security tests and publish scan                                                                                                            |
| VS Code E2E                  | Tested  | Real VS Code 1.128.1 portable Development Host; 16 tests passed                                                                                   |
| Marketplace publication      | Partial | 0.1.1 listing independently verified; 0.1.3 GitHub release is validated, but Marketplace publication is blocked by `vsce` credential verification |
