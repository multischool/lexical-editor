import{useEffect as t}from"react";import{useLexicalComposerContext as o}from"../../../../node_modules/@lexical/react/LexicalComposerContext.mjs.js";import{SELECTION_CHANGE_COMMAND as r,$getSelection as e,COMMAND_PRIORITY_CRITICAL as n}from"lexical";import{useToolbarContext as i}from"../context/toolbar-context.js";function a(a){var c=o()[0],m=i().activeEditor;t((function(){return m.registerCommand(r,(function(){var t=e();return t&&a(t),!1}),n)}),[c,a]),t((function(){m.getEditorState().read((function(){var t=e();t&&a(t)}))}),[m,a])}export{a as useUpdateToolbarHandler};
//# sourceMappingURL=use-update-toolbar.js.map
