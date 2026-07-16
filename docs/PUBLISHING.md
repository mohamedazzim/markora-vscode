# Publishing

Run `npm run publish:check`, `npx @vscode/vsce ls`, and `npm run package:vsix`. The manifest uses the permanent
Marketplace publisher ID `MohamedAzzimJ`. Version `0.1.0` was published on 2026-07-15 and remains publicly available at
[the Marketplace listing](https://marketplace.visualstudio.com/items?itemName=MohamedAzzimJ.markora-markdown-editor).
The public Gallery API independently verified the publisher, version, categories, tags, repository, issues URL,
license, changelog, icon and README/details assets. The published VSIX SHA-256 is
`14c12ab70017f8f3209d04042cc111ff4aa301cd398971ce255d374909303dd3`.

The Marketplace installation command is:

```powershell
code --install-extension MohamedAzzimJ.markora-markdown-editor
```

Never commit a PAT or place credentials in source or workflow YAML. Future releases must increment the version and
repeat `publish:check`, VSIX inspection, checksum generation, clean-profile installation, and public listing review.

## 0.1.1 patch release

The `0.1.1` VSIX was built and verified locally on 2026-07-16. Marketplace publication is currently blocked because
the cached `vsce` Personal Access Token failed verification (`TF400813`). No credential was written to the repository.
After authenticating `vsce` with a valid publisher-owned token, publish the validated artifact with:

```powershell
npx @vscode/vsce publish --packagePath release\markora-markdown-editor-0.1.1.vsix --skip-duplicate
```
