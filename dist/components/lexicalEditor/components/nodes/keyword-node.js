import{__extends as t,__assign as e}from"../../../../node_modules/tslib/tslib.es6.mjs.js";import{TextNode as r}from"lexical";var o=function(r){function o(){return null!==r&&r.apply(this,arguments)||this}return t(o,r),o.getType=function(){return"keyword"},o.clone=function(t){return new o(t.__text,t.__key)},o.importJSON=function(t){var e=n(t.text);return e.setFormat(t.format),e.setDetail(t.detail),e.setMode(t.mode),e.setStyle(t.style),e},o.prototype.exportJSON=function(){return e(e({},r.prototype.exportJSON.call(this)),{type:"keyword",version:1})},o.prototype.createDOM=function(t){var e=r.prototype.createDOM.call(this,t);return e.style.cursor="default",e.className="keyword text-purple-900 font-bold",e},o.prototype.canInsertTextBefore=function(){return!1},o.prototype.canInsertTextAfter=function(){return!1},o.prototype.isTextEntity=function(){return!0},o}(r);function n(t){return new o(t)}export{n as $createKeywordNode,o as KeywordNode};
//# sourceMappingURL=keyword-node.js.map
