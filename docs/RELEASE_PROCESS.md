# Release process

Update `package.json` and `CHANGELOG.md`, run all verification commands, review `vsce ls`, create a clean commit,
tag `v<version>`, and let the guarded GitHub release workflow attach the VSIX and SHA-256. Marketplace publishing
is a separate credential-gated step.
