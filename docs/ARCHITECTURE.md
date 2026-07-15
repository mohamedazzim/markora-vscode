# Architecture

```text
VS Code TextDocument (authority)
        │ WorkspaceEdit / onDidChangeTextDocument
Extension host: CustomTextEditorProvider → WebviewManager → DocumentSynchronizer
        │ validated typed messages + nonce CSP
Webview: React + Tiptap → shared markdown-core parser/serializer → Markdown text
```

The extension never writes files with Node `fs`. Every visual edit becomes a VS Code `WorkspaceEdit`; VS Code
therefore owns dirty state, undo/redo, save, hot exit, source control, remote documents, and file watchers.
Multiple custom-editor panels receive newer document revisions and stale webview messages are rejected.
