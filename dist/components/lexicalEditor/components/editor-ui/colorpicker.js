import{__rest as e,__assign as o}from"../../../../node_modules/tslib/tslib.es6.mjs.js";import*as l from"react";import{HexColorPicker as t}from"../../../../node_modules/react-colorful/dist/index.mjs.js";import{Button as a}from"../../ui/button.js";import{Input as n}from"../../ui/input.js";import{Popover as r,PopoverTrigger as i,PopoverContent as s}from"../../ui/popover.js";function m(m){var c=m.disabled,u=void 0!==c&&c;m.stopCloseOnClickSelf;var d=m.color,p=m.onChange,f=m.icon;m.label;var v=e(m,["disabled","stopCloseOnClickSelf","color","onChange","icon","label"]);return l.createElement(r,{modal:!0},l.createElement(i,{asChild:!0,disabled:u},l.createElement(a,o({size:"sm",variant:"outline",className:"h-8 w-8"},v),l.createElement("span",{className:"size-4 rounded-full"},f))),l.createElement(s,{className:"w-[200px] p-0"},l.createElement(t,{color:d,onChange:function(e){return null==p?void 0:p(e,!1)}}),l.createElement(n,{maxLength:7,onChange:function(e){var o;e.stopPropagation(),null==p||p(null===(o=null==e?void 0:e.currentTarget)||void 0===o?void 0:o.value,!1)},value:d})))}export{m as default};
//# sourceMappingURL=colorpicker.js.map
