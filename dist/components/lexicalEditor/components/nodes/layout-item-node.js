import{__extends as t,__assign as e}from"../../../../node_modules/tslib/tslib.es6.mjs.js";import{addClassNamesToElement as o}from"@lexical/utils";import{ElementNode as r}from"lexical";var n=function(r){function n(){return null!==r&&r.apply(this,arguments)||this}return t(n,r),n.getType=function(){return"layout-item"},n.clone=function(t){return new n(t.__key)},n.prototype.createDOM=function(t){var e=document.createElement("div");return"string"==typeof t.theme.layoutItem&&o(e,t.theme.layoutItem),e},n.prototype.updateDOM=function(){return!1},n.importDOM=function(){return{}},n.importJSON=function(){return u()},n.prototype.isShadowRoot=function(){return!0},n.prototype.exportJSON=function(){return e(e({},r.prototype.exportJSON.call(this)),{type:"layout-item",version:1})},n}(r);function u(){return new n}export{u as $createLayoutItemNode,n as LayoutItemNode};
//# sourceMappingURL=layout-item-node.js.map
