# Open-source documentation audit

Audit date: 2026-07-16  
Repository: [mohamedazzim/markora-vscode](https://github.com/mohamedazzim/markora-vscode)  
Marketplace: [MohamedAzzimJ.markora-markdown-editor](https://marketplace.visualstudio.com/items?itemName=MohamedAzzimJ.markora-markdown-editor)

## Findings and actions

| Area        | Finding                                                                                     | Action in this pass                                                                                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| README      | The page still referred to the initial `0.1.0` publication and a future screenshot gallery. | Updated it to describe the public `0.1.1` listing, the local `0.1.2` candidate, current release assets, and public links.                                                            |
| Branding    | The GitHub README is intentionally logo-free after the requested cleanup.                   | No embedded logo was reintroduced; the Marketplace icon remains supplied by manifest metadata.                                                                                       |
| Screenshot  | No public-safe visual editor screenshot was referenced.                                     | Added `media/screenshots/markora-webview.png`, captured from the standalone webview with a Mermaid example and no private paths.                                                     |
| Marketplace | Public Marketplace is `0.1.1`; local `main` is `0.1.2`.                                     | Documentation now clearly separates published state from the unreleased local candidate. A new Marketplace publication is not claimed because the publisher credential was rejected. |
| Licensing   | MIT, security, privacy, and third-party notices already existed.                            | README links make these policies discoverable from the product header.                                                                                                               |
| Community   | Issue forms, PR template, Dependabot, CI, CodeQL, and release workflows already exist.      | Their links and verification expectations are reflected in the README and publishing docs.                                                                                           |
| Separation  | Desktop code is private to its own repository.                                              | README links to the desktop project without copying or bundling desktop source.                                                                                                      |

## Verification boundaries

- GitHub release `v0.1.1` and its VSIX/checksum assets are public and unchanged.
- Local `0.1.2` build and tests remain a candidate; no `0.1.2` Marketplace publication or tag is claimed.
- The Marketplace listing was previously verified at `0.1.1`; a rejected cached `vsce` credential prevented republishing.
- No credentials, private paths, user documents, or desktop installer assets are included.
- Screenshot gallery publication is not claimed merely because a repository screenshot exists; Marketplace
  gallery metadata changes require a separately authenticated publication.

## Future maintenance checklist

When publishing a new extension version, update `package.json`, `package-lock.json`, `CHANGELOG.md`, the
README release links, release verification record, and Marketplace metadata together. Run `npm run publish:check`,
inspect `npx @vscode/vsce ls`, install the VSIX in a clean profile, and independently review the live listing.
