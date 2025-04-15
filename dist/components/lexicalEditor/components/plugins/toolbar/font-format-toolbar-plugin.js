import{useState as e}from"react";import{$isTableSelection as o}from"@lexical/table";import{FORMAT_TEXT_COMMAND as t,$isRangeSelection as r}from"lexical";import{Toggle as i}from"../../../ui/toggle.js";import{useToolbarContext as s}from"../../context/toolbar-context.js";import{useUpdateToolbarHandler as m}from"../../editor-hooks/use-update-toolbar.js";import a from"../../../../../node_modules/lucide-react/dist/esm/icons/bold.js";import d from"../../../../../node_modules/lucide-react/dist/esm/icons/italic.js";import c from"../../../../../node_modules/lucide-react/dist/esm/icons/underline.js";import l from"../../../../../node_modules/lucide-react/dist/esm/icons/strikethrough.js";import n from"../../../../../node_modules/lucide-react/dist/esm/icons/code.js";var u={bold:a,italic:d,underline:c,strikethrough:l,code:n};function f(a){var d=a.format,c=s().activeEditor,l=e(!1),n=l[0],f=l[1];m((function(e){(r(e)||o(e))&&f(e.hasFormat(d))}));var p=u[d];return React.createElement(i,{"aria-label":"Toggle bold",variant:"outline",size:"sm",defaultPressed:n,pressed:n,onPressedChange:f,onClick:function(){c.dispatchCommand(t,d)}},React.createElement(p,{className:"h-4 w-4"}))}export{f as FontFormatToolbarPlugin};
//# sourceMappingURL=font-format-toolbar-plugin.js.map
