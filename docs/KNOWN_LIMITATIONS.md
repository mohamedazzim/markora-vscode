# Known limitations

- PDF export is not bundled; use VS Code or desktop Markora export when PDF is required.
- Full lossless source formatting is preserved until a visual edit, after which supported constructs may normalize.
- Real VS Code Extension Development Host E2E is opt-in and requires VS Code test infrastructure.
- Remote image download is disabled by default and requires explicit future implementation of workspace trust checks.
- The `0.1.0` Marketplace listing has no screenshot gallery yet; only the original icon is published. A clean,
  public-safe VS Code capture is required before adding screenshots.
- The Marketplace currently reports `0 installs` for this newly published listing; the README installs badge is
  dynamic and will update as Marketplace telemetry propagates.
- Marketplace-installed UI interaction (visual edits, math, Mermaid and image insertion) was not claimed in this run
  because the local VS Code updater mutex prevented the isolated host from launching. The development-host suite
  remains available and passed 16 tests with portable VS Code 1.128.1.
- Uninstall/reinstall and upgrade-path verification are still outstanding for a later release cycle.
