# Publishing

Run `npm run publish:check`, `npx @vscode/vsce ls`, and `npm run package:vsix`. The manifest uses the permanent
Marketplace publisher ID `MohamedAzzimJ`. Version `0.1.1` is the current public listing and remains publicly available at
[the Marketplace listing](https://marketplace.visualstudio.com/items?itemName=MohamedAzzimJ.markora-markdown-editor).
The public Gallery API independently verified the publisher, version, categories, tags, repository, issues URL,
license, changelog, icon and README/details assets. The published VSIX SHA-256 is
the public release assets. The repository `main` branch currently contains a local `0.1.2` candidate; it is not
Marketplace-published and no publication is claimed until the publisher-owned credential is refreshed.

The Marketplace installation command is:

```powershell
code --install-extension MohamedAzzimJ.markora-markdown-editor
```

Never commit a PAT or place credentials in source or workflow YAML. Future releases must increment the version and
repeat `publish:check`, VSIX inspection, checksum generation, clean-profile installation, and public listing review.

## 0.1.2 local candidate

The `0.1.2` VSIX was built and verified locally on 2026-07-16. Marketplace publication is currently blocked because
the cached `vsce` Personal Access Token failed verification (`TF400813`). No credential was written to the repository.
After authenticating `vsce` with a valid publisher-owned token, publish the validated artifact with:

```powershell
npx @vscode/vsce publish --packagePath release\markora-markdown-editor-0.1.2.vsix --skip-duplicate
```
