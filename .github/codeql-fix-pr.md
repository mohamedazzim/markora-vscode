## Summary

Resolves the two open High-security-severity CodeQL findings in the shared Markdown core:

- Alert #2: `js/incomplete-multi-character-sanitization`
- Alert #1: `js/incomplete-sanitization`

## Root causes

Heading-anchor generation removed tag-shaped text with a multi-character regular expression that could
recreate an unsafe-looking sequence for overlapping input. Image-alt serialization escaped brackets but
not backslashes, allowing Markdown escape boundaries to be altered.

## Fix

- Use parser-aware `sanitize-html` tag removal for heading text.
- Escape every image-alt backslash and bracket with a single global, context-specific Markdown escape.
- Restrict HTML URL schemes by tag and reject non-image data URLs.

## Verification

- `npm run typecheck`
- `npm run lint`
- `npm run test:security`
- `npm run test:unit`
- `npm run test:integration`
- `npm run test:webview`
- `npm run test:accessibility`
- `npm run test:performance`
- `npm run build`
- `npm run verify`
- `npm run publish:check`
- `npm audit --omit=dev --audit-level=high`

The focused security suite has 5 tests; the unit run has 75 tests. Mermaid, math, links, images, tables,
Unicode, entities, and Markdown round trips retain coverage.

## Compatibility and release

The change is confined to shared Markdown transformation and sanitization. It preserves supported Markdown
semantics and strengthens HTML/image URL handling. Because this code ships in the extension, a patch release
is required after merge. No credentials or release artifacts are included in this pull request.

## Remaining risk

Marketplace publication and clean-profile release verification must be completed with a valid publisher-owned
credential after merge. No true-positive alert is being dismissed.
