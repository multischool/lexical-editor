import{__extends as t,__assign as e}from"../../../../node_modules/tslib/tslib.es6.mjs.js";import{TextNode as r,$applyNodeReplacement as o}from"lexical";var a=function(r){function o(t,e,o){var a=r.call(this,e,o)||this;return a.__className=t,a}return t(o,r),o.getType=function(){return"emoji"},o.clone=function(t){return new o(t.__className,t.__text,t.__key)},o.prototype.createDOM=function(t){var e=document.createElement("span"),o=r.prototype.createDOM.call(this,t);return e.className=this.__className,o.className="emoji-inner",e.appendChild(o),e},o.prototype.updateDOM=function(t,e,o){var a=e.firstChild;return null===a||(r.prototype.updateDOM.call(this,t,a,o),!1)},o.importJSON=function(t){var e=s(t.className,t.text);return e.setFormat(t.format),e.setDetail(t.detail),e.setMode(t.mode),e.setStyle(t.style),e},o.prototype.exportJSON=function(){return e(e({},r.prototype.exportJSON.call(this)),{className:this.getClassName(),type:"emoji"})},o.prototype.getClassName=function(){return this.getLatest().__className},o}(r);function s(t,e){var r=new a(t,e).setMode("token");return o(r)}export{s as $createEmojiNode,a as EmojiNode};
//# sourceMappingURL=emoji-node.js.map
