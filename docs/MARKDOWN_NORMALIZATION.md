# Markdown normalization

Source Mode is not rewritten when a document opens. A visual edit serializes the current Tiptap HTML through the
shared core. Normalization uses GFM bullet/list conventions, fenced code blocks, ATX headings, `---` rules, and
portable relative image links. Unsupported constructs are not silently deleted; users can reopen the native
source editor to preserve exact source formatting.
