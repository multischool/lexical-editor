import{INSERT_UNORDERED_LIST_COMMAND as e}from"@lexical/list";import{$setBlocksType as t}from"../../../../../../node_modules/@lexical/selection/LexicalSelection.mjs.js";import{$getSelection as o,$isRangeSelection as r,$createParagraphNode as i}from"lexical";import{useToolbarContext as n}from"../../../context/toolbar-context.js";import{SelectItem as a}from"../../../../ui/select.js";import{blockTypeToBlockName as l}from"./block-format-data.js";var c="bullet";function m(){var m=n(),f=m.activeEditor,s=m.blockType;return React.createElement(a,{value:c,onPointerDown:function(){"number"!==s?f.dispatchCommand(e,void 0):f.update((function(){var e=o();r(e)&&t(e,(function(){return i()}))}))}},React.createElement("div",{className:"flex items-center gap-1 font-normal"},l[c].icon,l[c].label))}export{m as FormatBulletedList};
//# sourceMappingURL=format-bulleted-list.js.map
