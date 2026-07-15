# Security policy

Please do not report vulnerabilities in public issues. Use the repository's GitHub Security Advisory process or
contact the maintainers privately through the address configured in the repository profile.

The extension treats webview messages, HTML, external URLs, image URIs, and workspace paths as untrusted. It does
not execute document code, use Electron APIs, run shell commands, or send document text to online services.
Workspace Trust is respected; future network/import features must remain disabled in untrusted workspaces.
