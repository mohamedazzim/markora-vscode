# Publishing

Run `npm run publish:check`, `npx @vscode/vsce ls`, and `npm run package:vsix`. The manifest uses the permanent
Marketplace publisher ID `MohamedAzzimJ`. Version `0.1.1` remains the current public listing and is publicly available at
[the Marketplace listing](https://marketplace.visualstudio.com/items?itemName=MohamedAzzimJ.markora-markdown-editor).
The public Gallery API independently verified the publisher, version, categories, tags, repository, issues URL,
license, changelog, icon and README/details assets. The repository `main` branch contains the merged `0.1.3`
security patch and its public GitHub release; it is not Marketplace-published and no publication is claimed until
the publisher-owned credential is refreshed.

The Marketplace installation command is:

```powershell
code --install-extension MohamedAzzimJ.markora-markdown-editor
```

Never commit a PAT or place credentials in source or workflow YAML. Future releases must increment the version and
repeat `publish:check`, VSIX inspection, checksum generation, clean-profile installation, and public listing review.

## 0.1.3 security patch

The `0.1.3` VSIX was built and verified locally on 2026-07-16. Marketplace publication is currently blocked because
the cached `vsce` Personal Access Token failed verification (`TF400813`). No credential was written to the repository.
The downloaded GitHub release asset has SHA-256
`d57199a96785afa29d99cb2c909d9a0af166d30c0c1168bb00a7ec5fc88c2dee`.
After authenticating `vsce` with a valid publisher-owned token, publish the validated artifact with:

```powershell
npx @vscode/vsce publish --packagePath release\markora-markdown-editor-0.1.3.vsix --skip-duplicate
```
