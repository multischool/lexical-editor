import{$isListNode as e,ListNode as t}from"@lexical/list";import{$isHeadingNode as o}from"@lexical/rich-text";import{$findMatchingParent as l,$getNearestNodeOfType as r}from"@lexical/utils";import{$isRangeSelection as a,$isRootOrShadowRoot as n}from"lexical";import{useToolbarContext as i}from"../../context/toolbar-context.js";import{useUpdateToolbarHandler as c}from"../../editor-hooks/use-update-toolbar.js";import{Select as m,SelectTrigger as p,SelectContent as u,SelectGroup as f}from"../../../ui/select.js";import{blockTypeToBlockName as s}from"./block-format/block-format-data.js";function g(g){var y=g.children,v=i(),x=v.activeEditor,E=v.blockType,T=v.setBlockType;return c((function(i){if(a(i)){var c=i.anchor.getNode(),m="root"===c.getKey()?c:l(c,(function(e){var t=e.getParent();return null!==t&&n(t)}));null===m&&(m=c.getTopLevelElementOrThrow());var p=m.getKey();if(null!==x.getElementByKey(p))if(e(m)){var u=r(c,t),f=u?u.getListType():m.getListType();T(f)}else{(f=o(m)?m.getTag():m.getType())in s&&T(f)}}})),React.createElement(m,{value:E,onValueChange:function(e){T(e)}},React.createElement(p,{className:"h-8 w-min gap-1"},s[E].icon,React.createElement("span",null,s[E].label)),React.createElement(u,null,React.createElement(f,null,y)))}export{g as BlockFormatDropDown};
//# sourceMappingURL=block-format-toolbar-plugin.js.map
