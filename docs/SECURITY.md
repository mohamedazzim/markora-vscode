# Extension security design

- Per-load nonce CSP; no inline script or `eval`.
- `localResourceRoots` is limited to extension `dist` and `media`.
- All webview envelopes are parsed with Zod and command names are allowlisted.
- HTML is sanitized before Tiptap consumes it.
- External URL helper accepts only HTTPS and mailto schemes; remote image loading is not enabled by the default CSP.
- No Electron APIs, shell execution, raw Node access, or direct filesystem writes from the webview.
- Heading anchors use parser-aware HTML sanitization rather than tag-shaped regular-expression removal.
- Markdown image alt text escapes backslashes and brackets globally in its Markdown context.
- HTML URL schemes are restricted by tag; non-image `data:` payloads are rejected.

See [the CodeQL sanitization audit](security/CODEQL_SANITIZATION_ALERTS.md) for the complete source-to-sink
analysis, alert identifiers, regression coverage, and release decision.
