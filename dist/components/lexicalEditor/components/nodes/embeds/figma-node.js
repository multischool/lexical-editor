import{__extends as t,__assign as e}from"../../../../../node_modules/tslib/tslib.es6.mjs.js";import*as o from"react";import{BlockWithAlignableContents as r}from"../../../../../node_modules/@lexical/react/LexicalBlockWithAlignableContents.mjs.js";import{DecoratorBlockNode as n}from"../../../../../node_modules/@lexical/react/LexicalDecoratorBlockNode.mjs.js";function i(t){var e=t.className,n=t.format,i=t.nodeKey,c=t.documentID;return o.createElement(r,{className:e,format:n,nodeKey:i},o.createElement("iframe",{width:"560",height:"315",src:"https://www.figma.com/embed?embed_host=lexical&url=        https://www.figma.com/file/".concat(c),allowFullScreen:!0}))}var c=function(r){function n(t,e,o){var n=r.call(this,e,o)||this;return n.__id=t,n}return t(n,r),n.getType=function(){return"figma"},n.clone=function(t){return new n(t.__id,t.__format,t.__key)},n.importJSON=function(t){var e=a(t.documentID);return e.setFormat(t.format),e},n.prototype.exportJSON=function(){return e(e({},r.prototype.exportJSON.call(this)),{documentID:this.__id,type:"figma",version:1})},n.prototype.updateDOM=function(){return!1},n.prototype.getId=function(){return this.__id},n.prototype.getTextContent=function(t,e){return"https://www.figma.com/file/".concat(this.__id)},n.prototype.decorate=function(t,e){var r=e.theme.embedBlock||{},n={base:r.base||"",focus:r.focus||""};return o.createElement(i,{className:n,format:this.__format,nodeKey:this.getKey(),documentID:this.__id})},n}(n);function a(t){return new c(t)}export{a as $createFigmaNode,c as FigmaNode};
//# sourceMappingURL=figma-node.js.map
