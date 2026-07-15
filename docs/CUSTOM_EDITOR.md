# Custom editor

`markora.markdownVisualEditor` is an option-priority `CustomTextEditorProvider` for Markdown extensions. The
native editor remains available through Reopen Editor With… and the Markora source command. The provider uses
`supportsMultipleEditorsPerDocument` and does not replace VS Code's explorer, tabs, menus, or source-control UI.
