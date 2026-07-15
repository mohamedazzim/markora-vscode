# Extension security design

- Per-load nonce CSP; no inline script or `eval`.
- `localResourceRoots` is limited to extension `dist` and `media`.
- All webview envelopes are parsed with Zod and command names are allowlisted.
- HTML is sanitized before Tiptap consumes it.
- External URLs accept only HTTPS and mailto schemes.
- No Electron APIs, shell execution, raw Node access, or direct filesystem writes from the webview.
